import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

function makeQueryClient(configs: QueryClientConfig) {
  return new QueryClient(configs);
}

let browserQueryClient: QueryClient | undefined = undefined;
export default function getQueryClient(configs: QueryClientConfig) {
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient(configs);
  }
  if (typeof window === "undefined") {
    // Server: always make a new query client
    browserQueryClient = makeQueryClient(configs);
  }

  return browserQueryClient;
}
