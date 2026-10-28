# Chữa bài – State Management (cửa hàng mini)

Chạy `npm start`, mở các route `/bai1`, `/bai2`, `/bai3` (có link trên Navbar).

| Bài | Thư mục | Nội dung |
|---|---|---|
| 1 | `bai1/` | `ThemeContext` (createContext + Provider + useContext), `ThemeButton` |
| 2 | `bai2/` | `cartSlice` (addItem, removeItem), `store`, Header / ProductList / Cart |
| 3 | `bai3/` | `cartSlice` có `qty`, selector tổng số lượng / tổng tiền, `clearCart`, lưu localStorage |

Bài 2 và Bài 3 dùng lại `ThemeProvider`, `ThemeButton` của Bài 1 (bài sau làm tiếp trên bài trước).

## Bài 1 – Tìm hiểu thêm: viết bằng prop drilling

```jsx
function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  return <Layout theme={theme} toggleTheme={toggleTheme} />;
}
function Layout({ theme, toggleTheme }) {          // không dùng, chỉ chuyển tiếp
  return (<><Header theme={theme} toggleTheme={toggleTheme} /><Content theme={theme} /></>);
}
function Header({ theme, toggleTheme }) {           // không dùng, chỉ chuyển tiếp
  return <ThemeButton theme={theme} toggleTheme={toggleTheme} />;
}
```

Phải sửa **cả 5 component**: App truyền xuống; Layout, Header, ThemeButton, Content đều nhận props, trong đó
Layout và Header chỉ nhận rồi truyền tiếp. Với Context chỉ component thật sự dùng (ThemeButton, Content) mới gọi `useContext`.

## Bài 3 – Thử nghiệm và giải thích

1. **Tab Action của Redux DevTools khi thêm 3 sản phẩm:** thấy 3 action `cart/addItem`.
   `payload` là object sản phẩm, VD `{ id: 1, name: 'Bàn phím', price: 500000 }`.
   (Thêm lại sản phẩm đã có vẫn là `cart/addItem`; reducer tự tăng `qty`.)
2. **Jump về action đầu tiên:** giao diện quay về giỏ chỉ có 1 sản phẩm. Làm được vì state chỉ đổi qua action
   và reducer là hàm thuần: DevTools lưu lịch sử action, tính lại state từ đầu đến action được chọn (time-travel).
3. **F5:** có lưu localStorage thì giỏ hàng còn nguyên (store đọc lại làm `preloadedState`).
   Bỏ đoạn `store.subscribe(...)` thì F5 giỏ hàng trống, vì store chỉ nằm trong bộ nhớ của trang.
4. **`state.items.push(...)`:** trong `createSlice` chạy đúng vì RTK dùng **Immer**: `state` là bản nháp,
   Immer ghi lại thay đổi rồi tạo state mới bất biến. Trong reducer Redux thuần, `push` sửa trực tiếp mảng cũ
   → tham chiếu không đổi → `useSelector` coi như không có gì thay đổi, giao diện **không cập nhật**;
   DevTools cũng hiển thị sai lịch sử. Phải viết `return { ...state, items: [...state.items, newItem] }`.

## Lưu ý khi chấm

- Tổng số lượng, tổng tiền phải tính bằng selector (`reduce`), **không** lưu thành field trong store.
- Header, ProductList, Cart không truyền props cho nhau.
- Bài 2 chưa có số lượng: bấm “Thêm vào giỏ” với sản phẩm đã có thì bỏ qua (tránh trùng `key`).
