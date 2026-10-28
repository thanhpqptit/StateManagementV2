import { Provider, useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, useTheme } from '../bai1/ThemeContext';
import ThemeButton from '../bai1/ThemeButton';
import { formatPrice, products } from '../data';
import {
  addItem,
  clearCart,
  decrease,
  increase,
  removeItem,
  selectItems,
  selectTotalPrice,
  selectTotalQty,
} from './cartSlice';
import { store } from './store';

function Header() {
  const totalQty = useSelector(selectTotalQty);

  return (
    <header className="sm-header">
      <h3>Mini shop – Bài 3</h3>
      <span>Giỏ hàng ({totalQty})</span>
      <ThemeButton />
    </header>
  );
}

function ProductList() {
  const dispatch = useDispatch();

  return (
    <div>
      <h4>Sản phẩm</h4>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} – {formatPrice(p.price)}{' '}
            <button onClick={() => dispatch(addItem(p))}>Thêm vào giỏ</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cart() {
  const items = useSelector(selectItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div>
        <h4>Giỏ hàng</h4>
        <p>Giỏ hàng trống</p>
      </div>
    );
  }

  return (
    <div>
      <h4>Giỏ hàng</h4>
      <table className="sm-cart">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{formatPrice(item.price)}</td>
              <td>
                <button onClick={() => dispatch(decrease(item.id))}>−</button>
                <span className="sm-qty">{item.qty}</span>
                <button onClick={() => dispatch(increase(item.id))}>+</button>
              </td>
              <td>{formatPrice(item.price * item.qty)}</td>
              <td>
                <button onClick={() => dispatch(removeItem(item.id))}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <strong>Tổng tiền: {formatPrice(totalPrice)}</strong>
      </p>
      <button onClick={() => dispatch(clearCart())}>Xoá giỏ hàng</button>
    </div>
  );
}

function Layout() {
  const { theme } = useTheme();

  return (
    <div className={`sm-layout ${theme}`}>
      <Header />
      <div className="sm-shop">
        <ProductList />
        <Cart />
      </div>
    </div>
  );
}

function Bai3() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </Provider>
  );
}

export default Bai3;
