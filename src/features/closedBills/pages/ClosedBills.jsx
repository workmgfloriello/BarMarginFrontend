import { useAppStore } from "../../../store/AppContext";
import { Topbar } from "../../../shared/components/Topbar";

export function ClosedBills() {
  const { state } = useAppStore();
  const { closedBills } = state;
  const {dispatch} = useAppStore();

  const totalRevenue = closedBills.reduce((sum, bill) => sum + bill.total, 0);
  console.log("ClosedBills - closedBills:", closedBills);
  const onRecoverBill = (bill) => {
    console.log("Recovering bill with ID:", bill.id);
    dispatch({ type: "RECOVER_BILL", payload: bill.id });
    dispatch({type:"RESTORE_TABLE", payload: {tableName: bill.tableName, orderItems: bill.items}});
  };

  if (closedBills.length === 0) {
    return (
      <><Topbar/><div className="bg-white p-4 rounded-2xl shadow w-full">
        <h3 className="font-semibold mb-2">Conti Chiusi</h3>
        <p className="text-gray-400 text-sm">Nessun conto chiuso ancora</p>
      </div></>
    );
  }

  return (
    <>
   
    <div className="bg-white p-4 rounded-2xl shadow w-full"> 

      <div className="flex justify-between items-center mb-4">  
            <Topbar/>
        <h3 className="font-semibold">Conti Chiusi</h3>
        <span className="text-green-600 font-bold">
          Totale: €{totalRevenue.toFixed(2)}
        </span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {closedBills.map((bill) => (
          <div key={bill.id} className="border rounded-xl p-3">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{bill.tableName}</span>
              <div className="flex gap-3 items-center">
                <span className="text-xs text-gray-400">{bill.closedAt}</span>
                <span className="font-bold text-green-600">
                  €{bill.total.toFixed(2)}
                </span>
                <button
                  onClick={() => onRecoverBill(bill)}
                  className="bg-black text-white px-3 py-1 rounded-lg text-xs"
                >
                  Recupera
                </button>
              </div>
            </div>

            {/* PRODOTTI */}
            <div className="space-y-1">
              {bill.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span>{item.name} x{item.qty}</span>
                  <span>€{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </div></>
  );
}