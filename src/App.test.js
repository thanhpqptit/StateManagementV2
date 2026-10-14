import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderAt(url) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
});

// Bài 1
test('/ hiển thị trang chủ, chỉ mục Trang chủ active', () => {
  renderAt('/');
  expect(screen.getByRole('heading', { name: 'Trang chủ' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Trang chủ' })).toHaveClass('active');
  expect(screen.getByRole('link', { name: 'Giới thiệu' })).not.toHaveClass('active');
});

test('/about chỉ tô mục Giới thiệu', () => {
  renderAt('/about');
  expect(screen.getByRole('link', { name: 'Giới thiệu' })).toHaveClass('active');
  expect(screen.getByRole('link', { name: 'Trang chủ' })).not.toHaveClass('active');
});

test('URL không tồn tại hiển thị trang 404', () => {
  renderAt('/abc');
  expect(screen.getByText('404 – Không tìm thấy trang')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Về trang chủ' })).toHaveAttribute('href', '/');
});

// Bài 2
test('/courses hiển thị danh sách và index route', () => {
  renderAt('/courses');
  expect(screen.getByRole('link', { name: 'NodeJS' })).toBeInTheDocument();
  expect(screen.getByText('Hãy chọn một khoá học')).toBeInTheDocument();
});

test('/courses/2 hiển thị chi tiết khoá học', () => {
  renderAt('/courses/2');
  expect(screen.getByText('NodeJS – 15 bài học')).toBeInTheDocument();
});

test('/courses/99 báo không tìm thấy', () => {
  renderAt('/courses/99');
  expect(screen.getByText('Không tìm thấy khoá học')).toBeInTheDocument();
});

// Bài 3
test('chưa đăng nhập vào /dashboard bị chuyển về /login', () => {
  renderAt('/dashboard');
  expect(screen.getByRole('heading', { name: 'Đăng nhập' })).toBeInTheDocument();
});

test('đăng nhập sai hiện thông báo lỗi', () => {
  renderAt('/login');
  userEvent.type(screen.getByPlaceholderText('Tên đăng nhập'), 'admin');
  userEvent.type(screen.getByPlaceholderText('Mật khẩu'), 'sai');
  userEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }));
  expect(screen.getByText('Sai tên đăng nhập hoặc mật khẩu')).toBeInTheDocument();
});

test('đăng nhập đúng vào Dashboard, nhận username qua state', () => {
  renderAt('/login');
  userEvent.type(screen.getByPlaceholderText('Tên đăng nhập'), 'admin');
  userEvent.type(screen.getByPlaceholderText('Mật khẩu'), '123');
  userEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }));
  expect(screen.getByText('Xin chào, admin')).toBeInTheDocument();
  expect(localStorage.getItem('user')).toBe('admin');

  userEvent.click(screen.getByRole('button', { name: 'Đăng xuất' }));
  expect(screen.getByRole('heading', { name: 'Đăng nhập' })).toBeInTheDocument();
  expect(localStorage.getItem('user')).toBeNull();
});

test('đã đăng nhập nhưng mở thẳng /dashboard thì không có state', () => {
  localStorage.setItem('user', 'admin');
  renderAt('/dashboard');
  expect(screen.getByText('Xin chào, (không nhận được state)')).toBeInTheDocument();
});
