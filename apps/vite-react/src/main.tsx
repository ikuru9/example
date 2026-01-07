import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "@/routeTree.gen.ts";

import * as TanStackQueryProvider from "./context/tanstack-query/root-provider.tsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import "@/styles/index.css";
import reportWebVitals from "@/reportWebVitals.ts";
import { ThemeProvider } from "@/context/theme-provider.tsx";
import { DirectionProvider } from "@/context/direction-provider.tsx";

// Create a new router instance
const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
export const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <ThemeProvider>
          <DirectionProvider>
            <RouterProvider router={router} />
          </DirectionProvider>
        </ThemeProvider>
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
