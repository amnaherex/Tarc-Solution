# TrackDesk - Internal Task Tracker

TrackDesk is a full-stack internal task management application . The application allows authenticated users to manage tasks efficiently through a secure dashboard with complete CRUD functionality.

---

# Features

## Authentication

- User Sign Up using Supabase Authentication
- User Login using Supabase Authentication
- Secure Logout
- Protected Dashboard Routes
- Redirect authenticated users away from Login and Signup pages
- Synchronization of authenticated users with PostgreSQL

---

## Dashboard

- Total Tasks
- To Do Tasks
- In Progress Tasks
- Completed Tasks
- Overdue Tasks

Dashboard statistics are generated dynamically from the database.

---

## Task Management

- View all tasks
- Create new task
- Edit existing task
- Delete task
- Confirmation before deletion

Each task contains:

- Title
- Description
- Assigned Person
- Priority
- Status
- Due Date
- Created Date

---

## Task Filtering

Tasks can be filtered by:

- Status
- Priority
- Assigned Person

Search functionality is also available for task titles.

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- TypeScript
- Tailwind CSS

## Backend

- Next.js Route Handlers
- Prisma ORM

## Database

- PostgreSQL

## Authentication

- Supabase Authentication

## Deployment

- Vercel

---

#  Project Structure

```
trackdesk/
│
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── signup/
│   ├── api/
│   └── ...
│
├── components/
│   ├── dashboard/
│   ├── layout/
│   ├── tasks/
│   └── ui/
│
├── lib/
│   ├── prisma.ts
│   └── supabase/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── middleware.ts
│
└── package.json
```

---

#  Authentication Flow

The application uses **Supabase Authentication** for secure user authentication.

### Signup Flow

1. User submits the signup form.
2. Supabase creates the authentication account.
3. A custom API Route creates the corresponding user in PostgreSQL using Prisma.
4. User is redirected to the Login page.

### Login Flow

1. User enters email and password.
2. Supabase verifies credentials.
3. A session is created.
4. Middleware protects authenticated routes.
5. User is redirected to the dashboard.

---

#  Database

The application uses PostgreSQL with Prisma ORM.

## User

- id
- name
- email
- createdAt
- updatedAt

## Task

- id
- title
- description
- priority
- status
- dueDate
- createdAt
- updatedAt
- assignedTo

---

#  Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

#  Local Setup

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd trackdesk
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Push database schema

```bash
npx prisma db push
```

Run the project

```bash
npm run dev
```

---

#  Test Credentials

Create a user using the Sign Up page.

Or use the provided test account if available.

```
Email:
intern@tarcsolutions.co

Password:
Test1234
```

---

#  API Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Create PostgreSQL user |
| GET | /api/tasks | Fetch all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |


Supabase manages authentication and user sessions, while Prisma is responsible for database operations related to users and tasks.

