import { CombineComponents, type Providers } from "@/components/combine-components";
import MSWProvider from "@/components/msw-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { queryClientConfigs } from "@/config/query-client-configs";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/utils/font";
import { ReactQueryProviders } from "@/lib/utils/react-query/Provider";
import { cn } from "@/lib/utils/shadcn";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  const providers: Providers = [
    [ReactQueryProviders, { configs: queryClientConfigs }],
    [
      ThemeProvider,
      {
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
      },
    ],
  ];

  // msw 실행
  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    providers.unshift([MSWProvider]);
  }

  const AppContextProviders = CombineComponents(providers);

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <AppContextProviders>
          {children}
          <TailwindIndicator />
        </AppContextProviders>
      </body>
    </html>
  );
}
