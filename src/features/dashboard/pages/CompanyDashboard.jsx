import { Topbar } from "../../../shared/components/Topbar";
import { StatCard } from "../component/StatsCard";

export function CompanyDashboard() {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <Topbar name="Bar" surname="del Porto"/>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Ricavi Oggi" value="€1,240" change="+12%" />
        <StatCard title="Margine Medio" value="62%" change="+3%" />
        <StatCard title="Prodotti Venduti" value="312" change="+8%" />
        <StatCard title="Sprechi" value="€45" change="-5%" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Insight</h3>
          <ul className="text-sm text-gray-600">
            <li>⚠️ 3 prodotti hanno margine basso</li>
            <li>🔥 Spritz è il più venduto</li>
            <li>📈 Aumenta prezzo Mojito +0.50€</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Top Prodotti</h3>
          <ul className="text-sm text-gray-600">
            <li>1. Spritz</li>
            <li>2. Mojito</li>
            <li>3. Negroni</li>
          </ul>
        </div>
      </div>
    </div>
  );
}