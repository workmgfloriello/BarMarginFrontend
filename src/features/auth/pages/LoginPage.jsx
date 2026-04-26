export function LoginPage({ setRole }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow flex flex-col gap-4 w-80">
        <h2 className="text-xl font-bold text-center">BarMargin Login</h2>
        <button onClick={() => setRole("company")} className="bg-black text-white p-2 rounded">
          Login Azienda
        </button>
        <button onClick={() => setRole("employee")} className="bg-gray-300 p-2 rounded">
          Login Dipendente
        </button>
      </div>
    </div>
  );
}