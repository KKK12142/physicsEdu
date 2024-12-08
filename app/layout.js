"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { isOpen } = useSidebar();

  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main
            className={cn(
              "flex-1 transition-all duration-300 ease-in-out",
              "lg:ml-0", // 기본 마진
              isOpen && "lg:ml-[280px]" // 데스크톱에서 사이드바가 열렸을 때 마진 추가
            )}
          >
            <div className="container p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
