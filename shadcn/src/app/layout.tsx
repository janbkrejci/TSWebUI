import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TS Web UI - Shadcn Mirror",
  description: "React implementation of TS Web UI components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            {/* Sidebar - hidden on mobile, fixed width on desktop */}
            <aside className="hidden w-64 flex-col md:flex">
                <AppSidebar />
            </aside>
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
                    <div className="flex w-full items-center justify-between">
                        <div className="font-medium">TSWebUI Demo</div>
                        <ModeToggle />
                    </div>
                </header>
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}