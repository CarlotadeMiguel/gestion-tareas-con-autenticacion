'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Alert from '../ui/Alert';

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (data: any) => {
    console.log('RegisterForm:', data);
    setError('');
    setSuccess('');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      setSuccess('Usuario registrado correctamente');
    } else {
      setError(result.message || 'Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Registro</h2>
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      <input {...register('username', { required: true })} placeholder="Usuario" className="mb-2 w-full p-2 rounded border" />
      {errors.username && <span className="text-red-500 text-xs">Usuario requerido</span>}
      <input {...register('password', { required: true })} type="password" placeholder="Contraseña" className="mb-2 w-full p-2 rounded border" />
      {errors.password && <span className="text-red-500 text-xs">Contraseña requerida</span>}
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700">Registrarse</button>
    </form>
  );
}
