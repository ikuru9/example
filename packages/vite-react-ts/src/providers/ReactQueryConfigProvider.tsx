import { useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  QueryClientProviderProps,
  DefaultOptions,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

const ReactQueryConfigProvider: React.FC<
  QueryClientProviderProps & { defaultOptions: DefaultOptions }
> = ({ children, defaultOptions }) => {
  const client = useQueryClient()
  const [newClient] = useState(
    () =>
      new QueryClient({
        queryCache: client.getQueryCache(),
        mutationCache: client.getMutationCache(),
        defaultOptions,
      })
  )

  return (
    <QueryClientProvider client={newClient}>{children}</QueryClientProvider>
  )
}

export { queryClient, ReactQueryConfigProvider, ReactQueryDevtools }
