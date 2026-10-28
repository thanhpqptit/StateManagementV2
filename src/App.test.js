import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderAt(url) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>
  );
}

// Bài 1
test('Bài 1: bấm nút đổi theme sáng/tối', () => {
  renderAt('/bai1');
  fireEvent.click(screen.getByRole('button', { name: 'Chế độ tối' }));
  expect(screen.getByText('Theme hiện tại: dark').closest('section')).toHaveStyle({ background: '#222' });
  fireEvent.click(screen.getByRole('button', { name: 'Chế độ sáng' }));
  expect(screen.getByText('Theme hiện tại: light')).toBeInTheDocument();
});

// Bài 2
test('Bài 2: thêm và xoá sản phẩm trong giỏ', () => {
  renderAt('/bai2');
  const add = screen.getAllByRole('button', { name: 'Thêm vào giỏ' });
  fireEvent.click(add[0]);
  expect(screen.getByText('Giỏ hàng (1)')).toBeInTheDocument();
  fireEvent.click(add[1]);
  expect(screen.getByText('Giỏ hàng (2)')).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('button', { name: 'Xoá' })[0]);
  expect(screen.getByText('Giỏ hàng (1)')).toBeInTheDocument();
});

// Bài 3
test('Bài 3: số lượng, tổng tiền, lưu localStorage, xoá giỏ', () => {
  renderAt('/bai3');
  const add = screen.getAllByRole('button', { name: 'Thêm vào giỏ' });
  fireEvent.click(add[0]);
  fireEvent.click(add[0]);
  fireEvent.click(add[1]);
  expect(screen.getByText('Giỏ hàng (3)')).toBeInTheDocument();
  expect(screen.getByText(/Tổng tiền: 1\.200\.000đ/)).toBeInTheDocument();

  const row = screen.getByText('Chuột').closest('tr');
  fireEvent.click(within(row).getByRole('button', { name: '−' }));
  expect(screen.queryByText('Chuột')).toBeNull();
  expect(JSON.parse(localStorage.getItem('mini-shop-cart')).items).toEqual([
    { id: 1, name: 'Bàn phím', price: 500000, qty: 2 },
  ]);

  fireEvent.click(screen.getByRole('button', { name: 'Xoá giỏ hàng' }));
  expect(screen.getByText('Giỏ hàng (0)')).toBeInTheDocument();
});

test('URL khác chuyển về Bài 1', () => {
  renderAt('/abc');
  expect(screen.getByRole('link', { name: 'Bài 1 – Theme (Context)' })).toHaveClass('active');
});
