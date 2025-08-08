import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="p-2 rounded transition bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
      title="Toggle dark/light"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}
