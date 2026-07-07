import { TaskForm } from "@/components/tasks/TaskForm";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTaskPage({
  params,
}: Props) {
  const { id } = await params;
  const taskId = Number(id);

  if (Number.isNaN(taskId)) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 font-bold">
          Edit Task
        </h1>
      </div>

      <TaskForm
        mode="edit"
        taskId={taskId}
      />
    </div>
  );
}