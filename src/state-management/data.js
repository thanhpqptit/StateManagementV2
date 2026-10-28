// Dữ liệu mẫu cho Bài 2, Bài 3
export const products = [
  { id: 1, name: 'Bàn phím', price: 500000 },
  { id: 2, name: 'Chuột', price: 200000 },
  { id: 3, name: 'Tai nghe', price: 800000 },
];

export const formatPrice = (n) => n.toLocaleString('vi-VN') + 'đ';
