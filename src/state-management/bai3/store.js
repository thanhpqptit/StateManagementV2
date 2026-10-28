import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const STORAGE_KEY = 'mini-shop-cart';

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
}

const savedCart = loadCart();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: savedCart ? { cart: savedCart } : undefined,
});

store.subscribe(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().cart));
});
