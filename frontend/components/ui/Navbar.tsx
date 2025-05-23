'use client';

import ThemeToggle from './ThemeToggle';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4 flex justify-between items-center">
      <ThemeToggle />
          <button
            onClick={logout}
            className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
    </nav>
  );
}