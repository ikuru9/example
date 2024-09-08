export const queryClientConfigs = {
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
}
