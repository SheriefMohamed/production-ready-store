import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import type { CreateProductInput, UpdateProductInput } from "../validators/productSchemas.js";

function buildProductData(input: CreateProductInput | UpdateProductInput) {
  return {
    ...input,
    description: input.description === "" ? null : input.description,
    sku: input.sku === "" ? null : input.sku,
    price: input.price === undefined ? undefined : new Prisma.Decimal(input.price)
  };
}

export function listProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export function findProductById(id: string) {
  return prisma.product.findUnique({
    where: { id }
  });
}

export function createProduct(input: CreateProductInput) {
  return prisma.product.create({
    data: buildProductData(input) as Prisma.ProductCreateInput
  });
}

export function updateProduct(id: string, input: UpdateProductInput) {
  return prisma.product.update({
    where: { id },
    data: buildProductData(input) as Prisma.ProductUpdateInput
  });
}

export function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id }
  });
}
