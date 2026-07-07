type StatCardProps = {
  title: string;
  value: number;
};

export const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-white rounded-2xl border border-stone-100 bg-stone-50/80 p-6 backdrop-blur-md shadow-sm transition-all hover:bg-stone-100/80">
      <h3 className="text-xs font-semibold text-black uppercase tracking-widest text-stone-400">
        {title}
      </h3>
      <p className="mt-2 text-4xl font-light text-black text-stone-900 tracking-tight">
        {value}
      </p>
    </div>
  );
};