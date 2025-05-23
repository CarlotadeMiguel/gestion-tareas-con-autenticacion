'use client';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    >
      {isDarkMode ? '☀️ Claro' : '🌙 Oscuro'}
    </button>
  );
}
