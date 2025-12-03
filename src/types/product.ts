// Mismo enum que en tu DB
export type BentoSize = 'small' | 'wide' | 'tall' | 'large';

export interface Product {
  id: string;
  created_at: string;
  name: string;
  short_description: string;
  full_description: string; // La usaremos luego en el Drawer
  price: number;
  images: string[];
  category: string;
  stock: number;
  size: BentoSize;
  features: string[] | null;
}

