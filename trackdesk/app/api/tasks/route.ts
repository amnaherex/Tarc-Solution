import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        assignedTo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      priority,
      dueDate,
      assignedToId,
    } = body;

    // Validate required fields
    if (
      !title?.trim() ||
      !description?.trim() ||
      !priority ||
      !dueDate ||
      !assignedToId
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if assigned user exists
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

    // Create task
    const newTask = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: new Date(dueDate),
        assignedToId: Number(assignedToId),
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}