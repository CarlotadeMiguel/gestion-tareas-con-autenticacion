'use client';
import { useState } from 'react';
import useSWR from 'swr';
import Alert from '@/components/ui/Alert';


const fetcher = async (url) => {
  console.log('Fetching tasks from API...');
  const res = await fetch('http://localhost:5000/api/tasks', {
    credentials: 'include', // Para incluir cookies
  });
  if (!res.ok) throw new Error('Error al cargar tareas');
  return res.json();
};

export default function TaskList({ initialTasks = [] }) {
  const [page, setPage] = useState(1);
  const pageSize = 5; // Tareas por página
  
  const { data, error, mutate } = useSWR('/api/tasks', fetcher, {
    fallbackData: initialTasks,
    revalidateOnFocus: false,
  });
  
  const tasks = data || [];
  const totalPages = Math.ceil(tasks.length / pageSize);
  const paginatedTasks = tasks.slice((page - 1) * pageSize, page * pageSize);
  
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      // Actualizar optimistamente la UI
      mutate(
        tasks.filter(task => task.id !== id),
        false
      );
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };
  
  if (error) {
    return <Alert type="error" message="Error al cargar las tareas" />;
  }
  
  if (!tasks.length) {
    return <div className="text-gray-600 dark:text-gray-400">No tienes tareas pendientes.</div>;
  }
  
  return (
    <div>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{task.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{task.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 hover:text-red-900 dark:hover:text-red-400 ml-4"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-gray-600 dark:text-gray-400">
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
