'use client';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <button
            onClick={logout}
            className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
    </nav>
  );
}
