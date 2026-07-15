import type { Product, ProductFormValues } from "../types/product";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

type ProductPayload = {
  name: string;
  description: string | null;
  price: number;
  stock: number;
  sku: string | null;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    },
    ...options
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Request failed");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function toPayload(values: ProductFormValues): ProductPayload {
  return {
    name: values.name.trim(),
    description: values.description.trim() || null,
    price: Number(values.price),
    stock: Number(values.stock),
    sku: values.sku.trim() || null
  };
}

export function getProducts() {
  return request<Product[]>("/products");
}

export function createProduct(values: ProductFormValues) {
  return request<Product>("/products", {
    method: "POST",
    body: JSON.stringify(toPayload(values))
  });
}

export function updateProduct(id: string, values: ProductFormValues) {
  return request<Product>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(toPayload(values))
  });
}

export function deleteProduct(id: string) {
  return request<void>(`/products/${id}`, {
    method: "DELETE"
  });
}
