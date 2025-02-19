/* import React, { useState, useRef, useEffect } from "react";

const AccountSettings = ({ username, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Toggle the popup when the button is clicked
  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  // Close popup when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={togglePopup}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center space-x-2 p-2 rounded hover:bg-[var(--hover-background)] transition-colors focus:outline-none focus:ring"
      >
        {icon ? (
          <img src={icon} alt="User avatar" className="w-8 h-8 rounded-full" />
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
        <span className="font-medium text-gray-800">{username}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-[var(--background)] border border-[var(--glass-border)] rounded shadow-lg z-10"
          role="menu"
          aria-label="Account settings"
          style={{
            animation: `fadeIn var(--transition-duration) var(--transition-timing)`,
          }}
        >
          <div className="p-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
 */
