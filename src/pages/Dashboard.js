import { useLocation, useNavigate } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = location.state?.username;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Xin chào, {username ?? '(không nhận được state)'}</p>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}

export default Dashboard;
