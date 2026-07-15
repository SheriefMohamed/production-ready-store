import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import type { Product, ProductFormValues } from "../types/product";

const emptyValues: ProductFormValues = {
  name: "",
  description: "",
  price: "",
  stock: "0",
  sku: ""
};

type ProductFormDialogProps = {
  open: boolean;
  product: Product | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
};

export function ProductFormDialog({
  open,
  product,
  saving,
  onClose,
  onSubmit
}: ProductFormDialogProps) {
  const [values, setValues] = useState<ProductFormValues>(emptyValues);

  useEffect(() => {
    if (!open) {
      return;
    }

    setValues(
      product
        ? {
            name: product.name,
            description: product.description ?? "",
            price: product.price,
            stock: String(product.stock),
            sku: product.sku ?? ""
          }
        : emptyValues
    );
  }, [open, product]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  const updateField = (field: keyof ProductFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{product ? "Edit product" : "Create product"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Name"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={values.description}
              onChange={(event) => updateField("description", event.target.value)}
              minRows={3}
              multiline
              fullWidth
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Price"
                value={values.price}
                onChange={(event) => updateField("price", event.target.value)}
                type="number"
                inputProps={{ min: "0.01", step: "0.01" }}
                required
                fullWidth
              />
              <TextField
                label="Stock"
                value={values.stock}
                onChange={(event) => updateField("stock", event.target.value)}
                type="number"
                inputProps={{ min: "0", step: "1" }}
                required
                fullWidth
              />
            </Stack>
            <TextField
              label="SKU"
              value={values.sku}
              onChange={(event) => updateField("sku", event.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
