
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/public/navbar";
import NavbarShadcn from "@/components/layout/public/navbarShadcn";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
      {/* <Navbar /> */}
      {/* <NavbarShadcn /> */}
      <div className={inter.className}>{children}</div>
      </>
  );
}
