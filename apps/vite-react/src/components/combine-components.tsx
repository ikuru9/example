import type { ComponentProps, ComponentType, PropsWithChildren } from "react";

export type Provider = [ComponentType<any>, ComponentProps<any>?];

function CombineComponents({
  providers,
  children,
}: PropsWithChildren<{ providers: Provider[] }>) {
  const CombinedProviders = providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) => {
      const CombinedComponent = ({ children }: PropsWithChildren<unknown>) => (
        <AccumulatedProviders>
          <Provider {...props}>{children}</Provider>
        </AccumulatedProviders>
      );
      return CombinedComponent;
    },
    ({ children }: PropsWithChildren<unknown>) => <>{children}</>,
  );

  return <CombinedProviders>{children}</CombinedProviders>;
}

export default CombineComponents;
