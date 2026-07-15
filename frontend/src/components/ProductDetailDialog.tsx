import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography
} from "@mui/material";
import type { Product } from "../types/product";

type ProductDetailDialogProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductDetailDialog({ product, onClose }: ProductDetailDialogProps) {
  return (
    <Dialog open={Boolean(product)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{product?.name}</DialogTitle>
      <DialogContent>
        {product ? (
          <Stack spacing={2}>
            <Typography color="text.secondary">
              {product.description || "No description provided."}
            </Typography>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">Price</Typography>
              <Typography fontWeight={700}>${product.price}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">Stock</Typography>
              <Typography>{product.stock}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">SKU</Typography>
              <Typography>{product.sku || "None"}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">Created</Typography>
              <Typography>{new Date(product.createdAt).toLocaleString()}</Typography>
            </Stack>
          </Stack>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
