import { useState } from "react";
import {
  LayoutDashboard, Package, ClipboardList, Table2,
  ChevronLeft, ChevronRight, LogOut,Book,Table
} from "lucide-react";

export function Sidebar({ role, setRole, setPage }) {
  const [collapsed, setCollapsed] = useState(false);

  const itemsCompany = [
    { name: "Overview", icon: LayoutDashboard, key: "dashboard" },
    { name: "Prodotti", icon: Package, key: "products" },
    { name: "Tavoli" , icon:Table, key: "table"},
    { name: "Storico Ordini" , icon:Book, key: "order"},
  ];
  const itemsEmployee = [
    { name: "Ordini", icon: ClipboardList, key: "ordini" },
    { name: "Tavoli", icon: Table2, key: "tavoli" },
  ];

  const items = role === "company" ? itemsCompany : itemsEmployee;

  return (
    <div className={`${collapsed ? "w-16" : "w-56"} bg-zinc-900 text-white h-screen sticky top-0 py-4 px-3 flex flex-col justify-between transition-all duration-200`}>
      <div>
        <div className="flex items-center justify-between h-9 mb-5">
          {!collapsed && <span className="text-lg font-medium">BarMargin</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`bg-zinc-700 hover:bg-zinc-600 rounded-lg p-1.5 ${collapsed ? "mx-auto" : ""}`}
          >
            {collapsed
              ? <ChevronRight size={20} />
              : <ChevronLeft size={20} />}
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {items.map(({ name, icon: Icon, key }) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="text-sm">{name}</span>}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setRole(null)}
        className={`flex items-center gap-2.5 w-full bg-red-500 hover:bg-red-600 px-2.5 py-2 rounded-lg transition-colors ${collapsed ? "justify-center" : ""}`}
      >
        <LogOut size={18} className="shrink-0" />
        {!collapsed && <span className="text-sm">Logout</span>}
      </button>
    </div>
  );
}