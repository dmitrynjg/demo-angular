import { PaginationResponse, MessageResponse } from '../api/response.types';

export interface Product {
  createdAt: string;
  id: number;
  isDelete: boolean;
  name: string;
  price: number;
  updatedAt: string;
}

export interface ProductHistoryItem {
  action: string;
  createdAt: string;
  id: number;
  productName: string;
  userLogin: string;
}

export type ProductResponse = PaginationResponse<Product>;
export interface ResponseCreatedAndUpdated extends MessageResponse {
  product: Product;
}
export type DeleteResponse = MessageResponse;
export type ProductHistoryResponse = PaginationResponse<ProductHistoryItem>;
