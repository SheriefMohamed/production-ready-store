import { Router } from "express";
import {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
  removeProduct
} from "../controllers/productController.js";

export const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", postProduct);
productRouter.put("/:id", putProduct);
productRouter.delete("/:id", removeProduct);
