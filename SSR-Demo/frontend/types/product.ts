export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
  image: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
  image: string;
}
