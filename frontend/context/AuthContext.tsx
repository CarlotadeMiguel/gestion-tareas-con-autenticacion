'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type User = {
  username: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Verificar autenticación al cargar
  useEffect(() => {
    // Comprobar si hay token en las cookies (no accede a httpOnly)
    const checkAuth = async () => {
      try {
        // Hacemos una petición a /api/tasks para verificar si el token es válido
        const response = await fetch('http://localhost:5000/api/tasks', {
          credentials: 'include', // Incluye cookies en la petición
        });
        
        if (response.ok) {
          const data = await response.json();
          // Podemos extraer username del JWT decodificado que devuelve Flask
          setUser({ username: data.username || 'Usuario' });
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = (token: string) => {
    // El token se guardará como httpOnly en el servidor,
    // pero guardamos un indicador en el cliente
    Cookies.set('isLoggedIn', 'true', { path: '/' });
    router.push('/tasks');
  };
  
  const logout = async () => {
    // Eliminar cookies
    Cookies.remove('isLoggedIn');
    
    // Llamar al endpoint de logout en Next.js API route (que eliminará httpOnly cookies)
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
    router.push('/login');
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
