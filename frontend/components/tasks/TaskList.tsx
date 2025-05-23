'use client';

import { useState } from 'react';
import useSWR from 'swr';
import Alert from '@/components/ui/Alert';

const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error('Error al cargar tareas');
  return res.json();
};

export default function TaskList({ initialTasks = [] }) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const { data, error, mutate } = useSWR('/api/tasks', fetcher, {
    fallbackData: initialTasks,
    revalidateOnFocus: false,
  });

  const handleDelete = async (id: string) => {
    try {
      // Guardar copia original para posible rollback
      const originalTasks = data;
      
      // Actualización optimista
      mutate(
        (currentTasks: any[]) => currentTasks.filter(task => task.id !== id),
        false
      );

      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Error al eliminar');
      }

      // Revalidar para asegurar sincronización
      mutate();
    } catch (error) {
      // Revertir cambios si hay error
      mutate(originalTasks, false);
      console.error('Error al eliminar tarea:', error);
    }
  };

  if (error) return <Alert type="error" message={error.message} />;

  const tasks = data || [];
  const totalPages = Math.ceil(tasks.length / pageSize);
  const paginatedTasks = tasks.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Lista de Tareas</h2>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr className="border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Título</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descripción</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {task.title}
                {task.isOptimistic && <span className="text-gray-500 text-xs ml-2">(guardando...)</span>}
              </td>
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
      {/* Paginación */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-600 dark:text-gray-400">Página {page} de {totalPages}</span>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
