"use client";
import { DataProvider } from "../../context/DataContext";
import { useMediaQuery } from "../components/useMediaQuery";
import NavBar from "../components/Header";
import ResponsiveNavigation from "../components/ResponsiveNavigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const MOBILE_BREAKPOINT = "(max-width: 768px)";
  const unreadCount = 3;
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  return (
    <DataProvider>
      {!isMobile ? (
        // Desktop layout
        <div className="flex flex-col min-h-screen">
          <div className="fixed top-0 w-full z-50">
            <NavBar />
          </div>
          <div className="h-16" />
          <div className="flex flex-1">
            <ResponsiveNavigation unreadCount={unreadCount} />
            <div
              className="flex flex-col flex-1 ml-20 min-h-0 relative"
              style={{
                background: `radial-gradient(var(--dot-color, rgba(0, 0, 0, 0.1)) var(--dot-size, 1px), transparent var(--dot-size, 1px)), linear-gradient(135deg, var(--sidebar-bg, #f5f7fa), var(--background, #ffffff))`,
                backgroundSize:
                  "var(--dot-spacing, 20px) var(--dot-spacing, 20px), cover",
              }}
            >
              <main className="flex-1 p-12">{children}</main>
              <div className=" bottom-0 w-full"></div>
            </div>
          </div>
        </div>
      ) : (
        // Mobile layout
        <div
          className="flex flex-col min-h-screen relative w-full 
            bg-[var(--background)]
            bg-[radial-gradient(var(--dot-color)_var(--dot-size),transparent_var(--dot-size))]
            [background-size:var(--dot-spacing)_var(--dot-spacing)]"
        >
          <div className="fixed top-0 w-full z-50">
            <NavBar />
          </div>
          <main className="flex-1 px-4 pt-24 pb-4">{children}</main>
          <ResponsiveNavigation unreadCount={unreadCount} />
        </div>
      )}
    </DataProvider>
  );
}
