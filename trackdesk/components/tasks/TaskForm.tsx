//this is to create a new task form component and edit task form component, it will be used in the create and edit task pages.
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
};

type Task = {
  id: number;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  dueDate: Date | string;
  assignedToId: number;
};

type FormState = {
  title: string;
  description: string;
  assignedToId: string;
  priority: Task["priority"];
  status: Task["status"];
  dueDate: string;
};

type TaskFormProps = {
  mode: "create" | "edit";
  taskId?: number;
};

const emptyFormState: FormState = {
  title: "",
  description: "",
  assignedToId: "",
  priority: "MEDIUM",
  status: "TODO",
  dueDate: "",
};

export const TaskForm = ({
  mode,
  taskId,
}: TaskFormProps) => {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<FormState>(emptyFormState);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoadingData(true);
      setError("");

      try {
        const usersResponse = await fetch("/api/users");

        if (!usersResponse.ok) {
          throw new Error("Failed to load users.");
        }

        const usersData: User[] = await usersResponse.json();

        if (!isMounted) {
          return;
        }

        setUsers(usersData);

        if (mode === "edit") {
          if (!taskId) {
            throw new Error("Task ID is required for edit mode.");
          }

          const taskResponse = await fetch(`/api/tasks/${taskId}`);

          if (!taskResponse.ok) {
            throw new Error("Failed to load task.");
          }

          const taskData: Task = await taskResponse.json();

          if (!isMounted) {
            return;
          }

          setForm({
            title: taskData.title,
            description: taskData.description,
            assignedToId: taskData.assignedToId.toString(),
            priority: taskData.priority,
            status: taskData.status,
            dueDate: new Date(taskData.dueDate)
              .toISOString()
              .split("T")[0],
          });
        }
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load form data."
        );
      } finally {
        if (isMounted) {
          setLoadingData(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [mode, taskId]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const payload = {
      title: form.title,
      description: form.description,
      assignedToId: Number(form.assignedToId),
      priority: form.priority,
      status: form.status,
      dueDate: form.dueDate,
    };

    try {
      const response = await fetch(
        mode === "create"
          ? "/api/tasks"
          : `/api/tasks/${taskId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      router.push("/dashboard/tasks");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save task.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black rounded-lg shadow p-6 space-y-5 max-w-3xl"
    >
      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {loadingData && (
        <p className="text-sm text-gray-500">
          Loading form data...
        </p>
      )}

      <div>
        <label className="block mb-2 text-black font-medium">
          Title
        </label>

        <input
          type="text"
          className="w-full border rounded-md p-2"
          value={form.title}
          onChange={(e) =>
            setForm((current) => ({
              ...current,
              title: e.target.value,
            }))
          }
          required
          disabled={loadingData}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          rows={4}
          className="w-full border rounded-md p-2"
          value={form.description}
          onChange={(e) =>
            setForm((current) => ({
              ...current,
              description: e.target.value,
            }))
          }
          required
          disabled={loadingData}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Assigned Person
        </label>

        <select
          className="w-full border rounded-md p-2"
          value={form.assignedToId}
          onChange={(e) =>
            setForm((current) => ({
              ...current,
              assignedToId: e.target.value,
            }))
          }
          required
          disabled={loadingData}
        >
          <option value="">Select User</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Priority
        </label>

        <select
          className="w-full border rounded-md p-2"
          value={form.priority}
          onChange={(e) =>
            setForm((current) => ({
              ...current,
              priority: e.target.value as Task["priority"],
            }))
          }
          disabled={loadingData}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      {mode === "edit" && (
        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            className="w-full border rounded-md p-2"
            value={form.status}
            onChange={(e) =>
              setForm((current) => ({
                ...current,
                status: e.target.value as Task["status"],
              }))
            }
            disabled={loadingData}
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      )}

      <div>
        <label className="block mb-2 font-medium">
          Due Date
        </label>

        <input
          type="date"
          className="w-full border rounded-md p-2"
          value={form.dueDate}
          onChange={(e) =>
            setForm((current) => ({
              ...current,
              dueDate: e.target.value,
            }))
          }
          required
          disabled={loadingData}
        />
      </div>

      <button
        type="submit"
        disabled={loading || loadingData}
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : mode === "create"
          ? "Create Task"
          : "Update Task"}
      </button>
    </form>
  );
};