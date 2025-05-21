import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import Navbar from '@/components/ui/Navbar';

export default async function TasksPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/login');
  }

  // Fetch de tareas desde tu API usando el token
  const res = await fetch('http://localhost:5000/api/tasks', {
    headers: { Authorization: `Bearer ${token.value}` },
    cache: 'no-store', // para SSR puro
  });
  const tasks = await res.json();

  return (
    <div>
      <Navbar />
      <TaskForm />
      <TaskList initialTasks={tasks} />
    </div>
  );
}
