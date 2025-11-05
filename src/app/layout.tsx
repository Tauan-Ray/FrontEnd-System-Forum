import "./globals.css"
import { Toaster } from "sonner";
import { Header } from "./ui/header";
import { JetBrains_Mono, Roboto } from "next/font/google"
import { Suspense } from "react";


const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${jetbrains.variable} ${roboto.variable}`}>
      <body className="min-h-screen bg-background">
        <Toaster position="top-right" richColors />
        <Header/>
        <main className="container">
          <Suspense>
            {children}
          </Suspense>
        </main>
      </body>
    </html>
  );
}
