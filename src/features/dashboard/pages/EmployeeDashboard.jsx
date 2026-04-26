import { Topbar } from "../../../shared/components/Topbar";

export function EmployeeDashboard() {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <Topbar name="Alice" surname="Rossi"/>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold">Ordini Attivi</h3>
          <p className="text-2xl">12</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold">Tavoli Occupati</h3>
          <p className="text-2xl">8</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold">Tempo Medio</h3>
          <p className="text-2xl">5 min</p>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-2xl shadow">
        <h3 className="font-semibold mb-2">Lista Ordini</h3>
        <ul className="text-sm text-gray-600">
          <li>#123 - 2 Spritz</li>
          <li>#124 - 1 Mojito</li>
          <li>#125 - 3 Birre</li>
        </ul>
      </div>
    </div>
  );
}