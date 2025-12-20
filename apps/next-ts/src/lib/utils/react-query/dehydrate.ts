import { queryClientConfigs } from "@/config/query-client-configs";
import { looseEqual } from "@/lib/utils/is";
import {
  QueryClient,
  type QueryClientConfig,
  type QueryKey,
  type QueryState,
  dehydrate,
} from "@tanstack/react-query";
import { cache } from "react";

export const getQueryClient = cache(
  (configs: QueryClientConfig = queryClientConfigs) => new QueryClient(configs),
);

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

export async function getDehydratedQuery<Q extends QueryProps>({ queryKey, queryFn }: Q) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey, queryFn });

  const { queries } = dehydrate(queryClient);
  const [dehydratedQuery] = queries.filter((query) => looseEqual(query.queryKey, queryKey));

  return dehydratedQuery as DehydratedQueryExtended<UnwrapPromise<ReturnType<Q["queryFn"]>>>;
}

export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = getQueryClient();
  await Promise.all(
    queries.map(({ queryKey, queryFn }) => queryClient.prefetchQuery({ queryKey, queryFn })),
  );

  return dehydrate(queryClient).queries as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q[number]["queryFn"]>>
  >[];
}
