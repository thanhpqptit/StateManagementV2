import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Trang chủ' },
  { to: '/courses', label: 'Khoá học' },
  { to: '/about', label: 'Giới thiệu' },
  { to: '/contact', label: 'Liên hệ' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/bai1', label: 'SM Bài 1' },
  { to: '/bai2', label: 'SM Bài 2' },
  { to: '/bai3', label: 'SM Bài 3' },
];

function Navbar() {
  return (
    <nav className="navbar">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
