import { TaskForm } from "@/components/tasks/TaskForm";

export default function CreateTaskPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-black">Create Task</h1>
        <p className="mt-2 text-gray-500">
          Fill in the details below to create a new task.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <TaskForm mode="create" />
        </div>
      </div>
    </div>
  );
}