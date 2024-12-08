import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export function SidebarToggle() {
  const { isOpen, toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      className={cn(
        "fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-sm",
        "hover:bg-white/20 transition-all duration-200",
        isOpen && "left-[280px]" // 사이드바가 열려있을 때 위치 조정
      )}
    >
      {isOpen ? (
        <XMarkIcon className="w-6 h-6 text-gray-600" />
      ) : (
        <Bars3Icon className="w-6 h-6 text-gray-600" />
      )}
    </button>
  );
}
