export interface ApiSuccessResponse<T = null> {
  success: true;
  message: string;
  data?: T;
}

export interface ApiErrorDetails {
  [key: string]: unknown;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  details?: ApiErrorDetails;
  stack?: string;
}

export type NodeEnvironment = "development" | "production" | "test";
