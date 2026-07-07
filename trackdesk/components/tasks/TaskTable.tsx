"use client";
//this is a task table component, it will be used in the dashboard page to display the tasks in a table format.
import Link from "next/link";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  dueDate: string;
  assignedTo?: {
    name: string;
  };
};

type TaskTableProps = {
  tasks: Task[];
};

export const TaskTable = ({ tasks }: TaskTableProps) => {
  const router = useRouter();

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        <h2 className="text-lg font-semibold">
          No Tasks Found
        </h2>

        <p className="mt-2 text-gray-500">
          Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg text-black border  bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-100  ">
          <tr>
            <th className="px-5 py-3 text-left">Title</th>
            <th className="px-5 py-3 text-left">Assigned To</th>
            <th className="px-5 py-3 text-left">Priority</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-left">Due Date</th>
            <th className="px-5 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              
            >
              <td className="px-5 py-4">
                <div className="font-medium">
                  {task.title}
                </div>

                <div className="text-sm text-gray-700">
                  {task.description}
                </div>
              </td>

              <td className="px-5 py-4">
                {task.assignedTo?.name ?? "-"}
              </td>

              <td className="px-5 py-4">
                {task.priority}
              </td>

              <td className="px-5 py-4">
                {task.status}
              </td>

              <td className="px-5 py-4">
                {new Date(task.dueDate).toLocaleDateString()}
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-center gap-3">
                  <Link
                    href={`/dashboard/tasks/${task.id}/edit`}
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};