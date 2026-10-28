import { createContext, useContext, useState } from 'react';

// Bước 1: tạo context
export const ThemeContext = createContext(null);

// Bước 2: component bọc Provider, giữ state theme
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Bước 3: component nào cần thì gọi useContext (gói lại cho gọn)
export function useTheme() {
  return useContext(ThemeContext);
}
