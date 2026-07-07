import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const taskId = Number(id);

    if (isNaN(taskId)) {
      return NextResponse.json(
        { message: "Invalid task ID." },
        { status: 400 }
      );
    }

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        assignedTo: true,
      },
    });

    if (!task) {
      return NextResponse.json(
        { message: "Task not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);

    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const taskId = Number(id);

    if (isNaN(taskId)) {
      return NextResponse.json(
        { message: "Invalid task ID." },
        { status: 400 }
      );
    }

    const existingTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!existingTask) {
      return NextResponse.json(
        { message: "Task not found." },
        { status: 404 }
      );
    }

    const body = await request.json();

    const {
      title,
      description,
      priority,
      status,
      dueDate,
      assignedToId,
    } = body;

    if (assignedToId) {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(assignedToId),
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "Assigned user not found." },
          { status: 404 }
        );
      }
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...(title !== undefined && {
          title: title.trim(),
        }),

        ...(description !== undefined && {
          description: description.trim(),
        }),

        ...(priority !== undefined && {
          priority,
        }),

        ...(status !== undefined && {
          status,
        }),

        ...(dueDate !== undefined && {
          dueDate: new Date(dueDate),
        }),

        ...(assignedToId !== undefined && {
          assignedToId: Number(assignedToId),
        }),
      },
    });

    return NextResponse.json(
      {
        message: "Task updated successfully.",
        task: updatedTask,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating task:", error);

    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const taskId = Number(id);

    if (isNaN(taskId)) {
      return NextResponse.json(
        { message: "Invalid task ID." },
        { status: 400 }
      );
    }

    const existingTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!existingTask) {
      return NextResponse.json(
        { message: "Task not found." },
        { status: 404 }
      );
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json(
      {
        message: "Task deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting task:", error);

    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}