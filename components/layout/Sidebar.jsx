"use client";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { SidebarToggle } from "./SidebarToggle";
import Link from "next/link";

const navigation = [
  { name: "홈", href: "/" },
  { name: "물리학 개념", href: "/concepts" },
  { name: "예제 문제", href: "/problems" },
  { name: "애니메이션", href: "/animations" },
  { name: "커뮤니티", href: "/community" },
];

export function Sidebar() {
  const { isOpen } = useSidebar();

  return (
    <>
      <SidebarToggle />
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-white/80 backdrop-blur-md",
          "w-[280px] border-r border-gray-200",
          "transition-all duration-300 ease-in-out",
          !isOpen && "-translate-x-full" // 닫혔을 때 왼쪽으로 이동
        )}
      >
        <div className="flex flex-col h-full">
          {/* 로고 */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">
              물리하는 쥐새끼
            </h1>
          </div>

          {/* 네비게이션 */}
          <nav className="flex-1 px-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 하단 영역 */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <p className="text-sm text-gray-600">로그인하여 시작하기</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
