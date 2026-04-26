import { useState } from "react";
import { Sidebar } from "../shared/components/Sidebar";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { CompanyDashboard } from "../features/dashboard/pages/CompanyDashboard";
import { EmployeeDashboard } from "../features/dashboard/pages/EmployeeDashboard";
import { ProductsPage } from "../features/products/pages/ProductPage";

export default function App() {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("dashboard");

  if (!role) return <LoginPage setRole={setRole} />;

  return (
    <div className="flex">
      <Sidebar role={role} setRole={setRole} setPage={setPage} />

      {role === "company" && page === "dashboard" && <CompanyDashboard />}
      {role === "company" && page === "products" && <ProductsPage />}
      {role === "employee" && <EmployeeDashboard />}
    </div>
  );
}