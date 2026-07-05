import { StatCard } from "./StatCard";

export const DashboardStats = () => {
  // Dummy data for now
  const stats = {
    total: 12,
    todo: 4,
    inProgress: 3,
    completed: 4,
    overdue: 1,
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
      <StatCard title="Total Tasks" value={stats.total} />

      <StatCard title="To Do" value={stats.todo} />

      <StatCard title="In Progress" value={stats.inProgress} />

      <StatCard title="Completed" value={stats.completed} />

      <StatCard title="Overdue" value={stats.overdue} />
    </section>
  );
};