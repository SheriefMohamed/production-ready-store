export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  sku: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductFormValues = {
  name: string;
  description: string;
  price: string;
  stock: string;
  sku: string;
};
