import type { ComponentProps, ComponentType, FC } from 'react'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Providers = [ComponentType<any>, ComponentProps<any>?][]

export const CombineComponents = (providers: Providers): FC<React.PropsWithChildren> =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) =>
      ({ children }) => (
        <AccumulatedProviders>
          <Provider {...props}>{children}</Provider>
        </AccumulatedProviders>
      ),
    ({ children }) => <>{children}</>,
  )
