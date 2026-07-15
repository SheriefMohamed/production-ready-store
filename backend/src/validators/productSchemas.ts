import { z } from "zod";

const priceSchema = z.coerce
  .number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number"
  })
  .positive("Price must be greater than 0")
  .multipleOf(0.01, "Price can have at most 2 decimal places");

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  description: z.string().trim().max(1000).optional().nullable(),
  price: priceSchema,
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  sku: z.string().trim().max(80).optional().nullable()
});

export const updateProductSchema = createProductSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
);

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
