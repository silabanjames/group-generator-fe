"use client"

import React, { useState } from 'react'
import Sidebar from "@/components/layout/admin/Sidebar"
import { usePathname } from 'next/navigation'


function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const [showSidebar, setShowSidebar] = useState(false);
  
  return (
    <>
      <Sidebar router={pathname}></Sidebar>
      <div className="p-8 sm:ml-64">{children}</div>
    </>
  );
}

export default Layout