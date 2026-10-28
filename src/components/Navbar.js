import { NavLink } from 'react-router-dom';

const links = [
  { to: '/bai1', label: 'Bài 1 – Theme (Context)' },
  { to: '/bai2', label: 'Bài 2 – Giỏ hàng (Redux Toolkit)' },
  { to: '/bai3', label: 'Bài 3 – Hoàn thiện giỏ hàng' },
];

function Navbar() {
  return (
    <nav className="navbar">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
