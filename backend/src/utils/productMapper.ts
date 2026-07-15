import type { Product } from "@prisma/client";
import type { ProductResponse } from "../types/product.js";

export function toProductResponse(product: Product): ProductResponse {
  return {
    ...product,
    price: product.price.toFixed(2)
  };
}
