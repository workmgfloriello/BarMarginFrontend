export function Topbar({name, surname}) {
  return (
    <div className="w-full flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex gap-3 items-center">
        <p>{name} {surname}</p>
        <div className="w-8 h-8 bg-zinc-300 rounded-full" />
      </div>
    </div>
  );
}
