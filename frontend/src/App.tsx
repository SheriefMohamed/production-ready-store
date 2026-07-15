import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct
} from "./api/products";
import { ProductDetailDialog } from "./components/ProductDetailDialog";
import { ProductFormDialog } from "./components/ProductFormDialog";
import type { Product, ProductFormValues } from "./types/product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      setProducts(await getProducts());
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const openCreateForm = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleSubmit = async (values: ProductFormValues) => {
    setSaving(true);
    setError(null);

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, values);
      } else {
        await createProduct(values);
      }

      setFormOpen(false);
      setEditingProduct(null);
      await loadProducts();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    const confirmed = window.confirm(`Delete "${product.name}"?`);

    if (!confirmed) {
      return;
    }

    setError(null);

    try {
      await deleteProduct(product.id);
      await loadProducts();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not delete product");
    }
  };

  return (
    <Box className="min-h-screen bg-slate-100 py-8">
      <Container maxWidth="lg">
        <Paper elevation={0} className="overflow-hidden border border-slate-200">
          <Toolbar className="flex flex-col items-start gap-4 border-b border-slate-200 bg-white py-5 sm:flex-row sm:items-center sm:justify-between">
            <Box>
              <Typography variant="h4" component="h1" fontWeight={800}>
                Products
              </Typography>
              <Typography color="text.secondary">
                Manage store inventory and pricing.
              </Typography>
            </Box>
            <Button startIcon={<AddIcon />} variant="contained" onClick={openCreateForm}>
              Add product
            </Button>
          </Toolbar>

          {loading ? (
            <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 280 }}>
              <CircularProgress />
            </Stack>
          ) : products.length === 0 ? (
            <Stack alignItems="center" spacing={2} sx={{ minHeight: 280, p: 4 }}>
              <Typography variant="h6">No products yet</Typography>
              <Typography color="text.secondary" textAlign="center">
                Create the first product to start building the catalog.
              </Typography>
              <Button startIcon={<AddIcon />} variant="contained" onClick={openCreateForm}>
                Add product
              </Button>
            </Stack>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Stock</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Typography fontWeight={700}>{product.name}</Typography>
                        <Typography color="text.secondary" variant="body2" noWrap maxWidth={360}>
                          {product.description || "No description"}
                        </Typography>
                      </TableCell>
                      <TableCell>{product.sku || "None"}</TableCell>
                      <TableCell align="right">${product.price}</TableCell>
                      <TableCell align="right">{product.stock}</TableCell>
                      <TableCell>
                        <Chip
                          label={product.stock > 0 ? "In stock" : "Out of stock"}
                          color={product.stock > 0 ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View">
                          <IconButton onClick={() => setViewingProduct(product)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => openEditForm(product)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => void handleDelete(product)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>

      <ProductFormDialog
        open={formOpen}
        product={editingProduct}
        saving={saving}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />
      <ProductDetailDialog product={viewingProduct} onClose={() => setViewingProduct(null)} />
      <Snackbar open={Boolean(error)} autoHideDuration={5000} onClose={() => setError(null)}>
        <Alert severity="error" variant="filled" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
