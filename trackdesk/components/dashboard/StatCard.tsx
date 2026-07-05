type StatCardProps = {
  title: string;
  value: number;
};

export const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-5">
      <h3 className="text-sm text-gray-500">{title}</h3>

      <p className="mt-2 text-3xl font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
};