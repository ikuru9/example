import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import TanStackQueryDevtools from "@/context/tanstack-query/devtools";

import type { QueryClient } from "@tanstack/react-query";
import { NavigationProgress } from "@/components/navigation-progress";
import { Toaster } from "sonner";
import { NotFoundError } from "@/components/errors/not-found-error";
import { GeneralError } from "@/components/errors/general-error";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <NavigationProgress />
      <Outlet />
      <Toaster duration={5000} />
      {import.meta.env.MODE === "development" && (
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      )}
    </>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
});
