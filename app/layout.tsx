import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Chat from "./components/chat";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const Irish_Grover = localFont({
  src: "./fonts/IrishGrover-Regular.ttf",
  variable: "--font-Irish-Grover",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Witch Fortune",
  description: "A fortune teller chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Irish_Grover.className} antialiased`}>
        <main className="">{children}</main>
      </body>
    </html>
  );
}
