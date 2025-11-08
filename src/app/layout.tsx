import "./globals.css"
import { Toaster } from "sonner";
import { Header } from "./ui/header/header";
import { JetBrains_Mono, Poppins, Roboto } from "next/font/google"
import { Suspense } from "react";


const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${jetbrains.variable} ${roboto.variable} ${poppins.variable}`}>
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
