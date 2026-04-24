export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets';
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
