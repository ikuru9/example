/* eslint-disable react/display-name */
import { ComponentProps, ComponentType, FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Providers = [ComponentType<any>, ComponentProps<any>?][]

const combineComponents = (providers: Providers): FC<React.PropsWithChildren> =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) =>
      ({ children }) => (
        <AccumulatedProviders>
          <Provider {...props}>
            <>{children}</>
          </Provider>
        </AccumulatedProviders>
      ),
    ({ children }) => <>{children}</>
  )

export default combineComponents
