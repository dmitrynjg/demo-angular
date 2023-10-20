export interface PaginationResponse<T> {
  page: number;
  result: T[];
  total: number;
  totalPage: number;
  totalPages: number;
}

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  error: string
  errorCode: number
}