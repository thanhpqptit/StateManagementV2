import { ThemeProvider, useTheme } from './ThemeContext';
import ThemeButton from './ThemeButton';


function Header() {
  return (
    <header className="sm-header">
      <h3>Bài 1 – Theme</h3>
      <ThemeButton />
    </header>
  );
}

function Content() {
  const { theme } = useTheme();

  const style =
    theme === 'light'
      ? { background: '#fff', color: '#000' }
      : { background: '#222', color: '#fff' };

  return (
    <section className="sm-content" style={style}>
      <p>Theme hiện tại: {theme}</p>
    </section>
  );
}

function Layout() {
  return (
    <div className="sm-layout">
      <Header />
      <Content />
    </div>
  );
}

function Bai1() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

export default Bai1;
