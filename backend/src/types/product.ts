export type ProductResponse = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  sku: string | null;
  createdAt: Date;
  updatedAt: Date;
};
