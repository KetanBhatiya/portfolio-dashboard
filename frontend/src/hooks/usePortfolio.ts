"use client";

import { useQuery } from "@tanstack/react-query";

import { getPortfolio } from "../api/portfolio.api";

export const usePortfolio = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });

  return {
    data,
    loading: isLoading,
    error,
    refetch,
  };
};
