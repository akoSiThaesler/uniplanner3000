import React from "react";
/**
 * Props for the Main component
 * @interface MainProps
 * @property {string} currentPage - Current active page to display
 * @property {boolean} [isOpen] - Controls sidebar state and main content margin
 */

type MainProps = {
  currentPage: string;
  isOpen?: boolean;
};

const Main: React.FC<MainProps> = ({ currentPage, isOpen = true }) => {
  /**
   * Renders different page content based on currentPage prop
   * TODO: Replace div placeholders with actual page components
   */
  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <div className="p-4">Dashboard Content</div>;
      case "schedule":
        return <div className="p-4">Schedule Content</div>;
      case "courses":
        return <div className="p-4">Courses Content</div>;
      case "settings":
        return <div className="p-4">Settings Content</div>;
      default:
        return <div className="p-4">Welcome to Uniplanner</div>;
    }
  };

  return (
    /**
     * Main content wrapper
     * - Adjusts margin based on sidebar state (isOpen)
     * - Calculates height to account for footer
     * - Smooth transition for margin changes
     */
    <main
      className={`${isOpen ? "ml-64" : "ml-0"}  
      min-h-[calc(100vh-152px)]
      bg-gray-50
      dark:bg-gray-700
      transition-[margin]
      duration-300`}
    >
      {renderContent()}
    </main>
  );
};

export default Main;
