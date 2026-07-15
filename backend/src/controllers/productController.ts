import type { RequestHandler } from 'express';
import {
  createProduct,
  deleteProduct,
  findProductById,
  listProducts,
  updateProduct,
} from '../repositories/productRepository.js';
import { toProductResponse } from '../utils/productMapper.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validators/productSchemas.js';

type ProductParams = {
  id: string;
};

export const getProducts: RequestHandler = async (_req, res, next) => {
  try {
    const products = await listProducts();
    res.json(products.map(toProductResponse));
  } catch (error) {
    next(error);
  }
};

export const getProduct: RequestHandler<ProductParams> = async (
  req,
  res,
  next,
) => {
  try {
    const product = await findProductById(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(toProductResponse(product));
  } catch (error) {
    next(error);
  }
};

export const postProduct: RequestHandler = async (req, res, next) => {
  try {
    const input = createProductSchema.parse(req.body);
    const product = await createProduct(input);
    res.status(201).json(toProductResponse(product));
  } catch (error) {
    next(error);
  }
};

export const putProduct: RequestHandler<ProductParams> = async (
  req,
  res,
  next,
) => {
  try {
    const input = updateProductSchema.parse(req.body);
    const product = await updateProduct(req.params.id, input);
    res.json(toProductResponse(product));
  } catch (error) {
    next(error);
  }
};

export const removeProduct: RequestHandler<ProductParams> = async (
  req,
  res,
  next,
) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
