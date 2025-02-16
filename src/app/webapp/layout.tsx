"use client";
import { useMediaQuery } from "../components/useMediaQuery";
import NavBar from "../components/topbar";
import Footer from "../components/footer";
import ResponsiveNavigation from "../components/ResponsiveNavigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const MOBILE_BREAKPOINT = "(max-width: 768px)";
  const unreadCount = 3;
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  return !isMobile ? (
    // Desktop layout
    <div className="flex flex-col min-h-screen">
      {/* Topbar spans the full width */}
      <NavBar />
      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        <ResponsiveNavigation unreadCount={unreadCount} />
        {/* Main content area with left margin to account for sidebar.
            The relative container applies the dotted background */}
        <div
          className="flex flex-col flex-1 ml-20 min-h-0 relative
          bg-[var(--background)]
          bg-[radial-gradient(var(--dot-color)_var(--dot-size),transparent_var(--dot-size))]
          [background-size:var(--dot-spacing)_var(--dot-spacing)]"
        >
          <main className="flex-1 p-4">{children}</main>
          <Footer />
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
      <NavBar />
      {/* Ensure main content has extra bottom padding to avoid overlap with fixed dockbar */}
      <main className="flex-1 p-4 pb-24">{children}</main>
      <ResponsiveNavigation unreadCount={unreadCount} />
    </div>
  );
}
