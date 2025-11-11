import "./globals.css"
import { Toaster } from "sonner";
import { JetBrains_Mono, Poppins, Roboto } from "next/font/google"
import { Suspense } from "react";
import Header from "./ui/header/header";


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
      <head>
        <title>Devtalk</title>
      </head>
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
