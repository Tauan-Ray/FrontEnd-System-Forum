export default function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl shadow-sm w-full sm:w-48">
      {icon && (
        <div className="p-3 bg-blue-500/10 rounded-full">
          {icon}
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-sm text-gray-600">{title}</span>
        <span className="text-2xl font-semibold text-blue-primary">{value}</span>
      </div>
    </div>
  );
}
