import { Provider, useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, useTheme } from '../bai1/ThemeContext';
import ThemeButton from '../bai1/ThemeButton';
import { formatPrice, products } from '../data';
import { addItem, removeItem } from './cartSlice';
import { store } from './store';



function Header() {
  const count = useSelector((state) => state.cart.items.length);

  return (
    <header className="sm-header">
      <h3>Mini shop – Bài 2</h3>
      <span>Giỏ hàng ({count})</span>
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
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h4>Giỏ hàng</h4>
      {items.length === 0 && <p>Giỏ hàng trống</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}{' '}
            <button onClick={() => dispatch(removeItem(item.id))}>Xoá</button>
          </li>
        ))}
      </ul>
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

function Bai2() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </Provider>
  );
}

export default Bai2;
