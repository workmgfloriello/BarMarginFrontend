import { Topbar } from "../../../shared/components/Topbar";
import { StatCard } from "../component/StatsCard";
import { useAppStore } from "../../../store/AppContext";

export function CompanyDashboard() {
  const { state } = useAppStore();
  const { tables, products } = state;

  // 💰 Ricavi totali da tutti i tavoli
const totalRevenue = state.closedBills
  .reduce((sum, bill) => sum + bill.total, 0);

  // 🛍️ Prodotti venduti totali
  const totalSold = tables
    .flatMap((t) => t.orderItems)
    .reduce((sum, i) => sum + i.qty, 0);

  // 📊 Margine medio sui prodotti
  const avgMargin =
    products.length > 0
      ? products.reduce((sum, p) => {
          const margin = p.cost ? ((p.price - p.cost) / p.price) * 100 : 0;
          return sum + margin;
        }, 0) / products.length
      : 0;

  // 🏆 Top prodotti per quantità venduta
  const topProducts = Object.values(
    tables
      .flatMap((t) => t.orderItems)
      .reduce((acc, item) => {
        if (!acc[item.id]) acc[item.id] = { ...item, totalQty: 0 };
        acc[item.id].totalQty += item.qty;
        return acc;
      }, {})
  )
    .sort((a, b) => b.totalQty - a.totalQty)
    .slice(0, 3);

  // ⚠️ Prodotti con margine basso (< 30%)
  const lowMarginProducts = products.filter((p) => {
    if (!p.cost) return false;
    const margin = ((p.price - p.cost) / p.price) * 100;
    return margin < 30;
  });

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <Topbar name="Bar" surname="del Porto" />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Ricavi Oggi"
          value={`€${totalRevenue.toFixed(2)}`}
        />
        <StatCard
          title="Margine Medio"
          value={`${avgMargin.toFixed(0)}%`}
        />
        <StatCard
          title="Prodotti Venduti"
          value={totalSold}
        />
        <StatCard
          title="Tavoli Attivi"
          value={tables.filter((t) => t.orderItems.length > 0).length}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Insight</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {lowMarginProducts.length > 0 ? (
              <li>⚠️ {lowMarginProducts.length} prodotti hanno margine basso</li>
            ) : (
              <li>✅ Tutti i prodotti hanno buon margine</li>
            )}
            {topProducts[0] && (
              <li>🔥 {topProducts[0].name} è il più venduto</li>
            )}
            {totalSold === 0 && (
              <li>📭 Nessun ordine ancora</li>
            )}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Top Prodotti</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {topProducts.length > 0 ? (
              topProducts.map((p, i) => (
                <li key={p.id}>
                  {i + 1}. {p.name} — {p.totalQty} venduti
                </li>
              ))
            ) : (
              <li className="text-gray-400">Nessun ordine ancora</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}