import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Default fetcher function for React Query
export const defaultQueryFn = async ({ queryKey }) => {
  const response = await fetch(queryKey[0]);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Set default query function
queryClient.setQueryDefaults([''], {
  queryFn: defaultQueryFn,
});

// API request helper for mutations
export const apiRequest = async (method, url, data = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Network response was not ok');
  }
  
  return response;
};