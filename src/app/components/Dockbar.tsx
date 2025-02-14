import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import Notifications from "@mui/icons-material/Notifications";

type DockbarProps = {
  direction: "vertical" | "horizontal";
  icons?: React.ReactElement[];
};

const Dockbar = (props: DockbarProps) => {
  const icons: React.ReactElement[] = [
    <HomeIcon sx={{ fontSize: "24px" }} key="home" />,
    <CalendarMonthIcon sx={{ fontSize: "24px" }} key="calendar" />,
    <Notifications sx={{ fontSize: "24px" }} key="notifications" />,
    <SettingsIcon sx={{ fontSize: "24px" }} key="settings" />,
  ];

  return (
    <div
      className={`
      fixed bottom-0 left-0 right-0
      p-4 mx-4 mb-4
      border border-[var(--glass-border)] 
      bg-[var(--glass-background)]
      backdrop-blur-md
      rounded-lg
      shadow-lg
      flex ${props.direction === "vertical" ? "flex-col" : "flex-row"}
      justify-center items-center
      gap-6
    `}
    >
      {icons.map((icon, index) => (
        <button
          key={index}
          className="p-3 rounded-full hover:bg-[var(--hover-background)] hover:drop-shadow-md transition-all duration-300 cursor-pointer text-[var(--foreground)]"
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default Dockbar;
