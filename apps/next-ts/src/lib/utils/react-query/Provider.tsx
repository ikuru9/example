"use client";

import getQueryClient from "@/lib/utils/react-query/getQueryClient";
import { type QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function ReactQueryProviders({
  configs,
  children,
}: React.PropsWithChildren<{ configs: QueryClientConfig }>) {
  const queryClient = getQueryClient(configs);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
