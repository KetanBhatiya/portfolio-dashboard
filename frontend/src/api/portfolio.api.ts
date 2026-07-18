import apiClient from "./axios";
import { PortfolioApiResponse } from "../../types/portfolio";

export const getPortfolio = async (): Promise<PortfolioApiResponse> => {
  const response =
    await apiClient.get<PortfolioApiResponse>("/api/v1/portfolio");

  return response.data;
};
