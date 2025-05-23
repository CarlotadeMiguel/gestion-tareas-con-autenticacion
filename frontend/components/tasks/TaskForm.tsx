'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Alert from '@/components/ui/Alert';
import { useSWRConfig } from 'swr';

type FormData = {
  title: string;
  description: string;
};

export default function TaskForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { mutate } = useSWRConfig();

  const onSubmit = async (data: FormData) => {
    setError('');
    setSuccess('');
    
    // Crear objeto temporal con ID único
    const tempId = Date.now().toString();
    const optimisticTask = {
      id: tempId,
      ...data,
      isOptimistic: true // Marcar como temporal
    };

    try {
      // Actualización optimista
      mutate('/api/tasks', (currentTasks: any[] = []) => [...currentTasks, optimisticTask], false);

      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || 'Error al crear la tarea');
      }

      const realTask = await res.json();
      
      // Reemplazar tarea temporal con la real
      mutate('/api/tasks', (currentTasks: any[] = []) => 
        currentTasks.map(task => 
          task.id === tempId ? { ...realTask, isOptimistic: undefined } : task
        ), 
        true
      );

      setSuccess('Tarea creada correctamente');
      reset();
    } catch (err: any) {
      // Revertir cambios si hay error
      mutate('/api/tasks', (currentTasks: any[] = []) => 
        currentTasks.filter(task => task.id !== tempId), 
        true
      );
      setError(err.message || 'Error al conectar con el servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Nueva tarea</h2>
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      <div className="mb-4">
        <input
          {...register('title', { required: true })}
          placeholder="Título"
          className="w-full bg-gray-50 p-2 rounded border mb-1"
        />
        {errors.title && <span className="text-red-500 text-xs">El título es obligatorio</span>}
      </div>
      <div className="mb-4">
        <textarea
          {...register('description', { required: true })}
          placeholder="Descripción"
          className="w-full bg-gray-50 p-2 rounded border mb-1"
        />
        {errors.description && <span className="text-red-500 text-xs">La descripción es obligatoria</span>}
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Añadir tarea
      </button>
    </form>
  );
}
