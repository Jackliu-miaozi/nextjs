"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';

export const DemoBanner = () => {
  const pathname = usePathname();
  
  // 如果当前路径是booking页面则不显示banner
  if (pathname === '/booking') {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 bg-gray-900 p-4 text-center text-lg font-semibold text-gray-100 [&_a:hover]:text-indigo-500 [&_a]:text-fuchsia-500">
      欢迎来到自习室 - 专注学习，共创未来{" "}
      <Link href="/booking">点击预约座位</Link>
    </div>
  );
};
