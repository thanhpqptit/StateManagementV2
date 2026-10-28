import { useTheme } from './ThemeContext';

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
    </button>
  );
}

export default ThemeButton;
