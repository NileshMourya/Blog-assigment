import "./globals.css";

import Header from "@/components/Header";
import { Poppins } from "next/font/google";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "solobuild.in",
  description: "Created by Nilesh Mourya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}  antialiased`}>
        <Header />
        <div className="py-7">{children}</div>
      </body>
    </html>
  );
}
