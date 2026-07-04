import { PrismaClient, Priority, Status } from "../app/generated/prisma";

const prisma = new PrismaClient(); // Type assertion to bypass the type error

async function main() {
  // Create or update the test user
  const user = await prisma.user.upsert({
    where: {
      email: "intern@tarcsolutions.co",
    },
    update: {},
    create: {
      name: "Amna Amjad",
      email: "intern@tarcsolutions.co",
      password: "Test1234",
    },
  });

  // Delete existing tasks (optional, prevents duplicates)
  await prisma.task.deleteMany();

  // Create sample tasks
  await prisma.task.createMany({
    data: [
      {
        title: "Build Login Page",
        description: "Create the login page for the application.",
        status: Status.TODO,
        priority: Priority.HIGH,
        dueDate: new Date("2026-07-10"),
        assignedToId: user.id,
      },
      {
        title: "Design Dashboard",
        description: "Implement dashboard cards and statistics.",
        status: Status.IN_PROGRESS,
        priority: Priority.MEDIUM,
        dueDate: new Date("2026-07-12"),
        assignedToId: user.id,
      },
      {
        title: "Implement Task CRUD",
        description: "Create, update and delete tasks.",
        status: Status.COMPLETED,
        priority: Priority.HIGH,
        dueDate: new Date("2026-07-08"),
        assignedToId: user.id,
      },
      {
        title: "Responsive Layout",
        description: "Make the application responsive for mobile devices.",
        status: Status.TODO,
        priority: Priority.LOW,
        dueDate: new Date("2026-07-15"),
        assignedToId: user.id,
      },
      {
        title: "Deploy Application",
        description: "Deploy the application to Vercel.",
        status: Status.TODO,
        priority: Priority.MEDIUM,
        dueDate: new Date("2026-07-20"),
        assignedToId: user.id,
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });