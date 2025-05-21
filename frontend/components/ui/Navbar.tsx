import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/" className="text-white font-bold text-xl">Gestor de Tareas</Link>
      <div>
        <Link href="/tasks" className="text-gray-300 hover:text-white mx-2">Tareas</Link>
        <Link href="/login" className="text-gray-300 hover:text-white mx-2">Login</Link>
        <Link href="/register" className="text-gray-300 hover:text-white mx-2">Registro</Link>
      </div>
    </nav>
  );
}
