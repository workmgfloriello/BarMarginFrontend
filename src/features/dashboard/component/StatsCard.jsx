export function StatCard({ title, value, change }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex flex-col gap-2">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-green-500">{change}</span>
    </div>
  );
}