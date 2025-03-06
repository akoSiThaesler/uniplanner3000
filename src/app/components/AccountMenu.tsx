import React from "react";
import { useAuth } from "../../context/AuthContext";

const AccountMenu: React.FC = () => {
  const { user } = useAuth();

  const guestUser = {
    email: "Anonymous@guest.com",
    role: "Guest",
  };
  const currentUser = user || guestUser;

  const displayName = currentUser.email.split("@")[0];
  const displayInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-4 justify-center p-4 flex-col">
      {/* Profile Picture Placeholder */}
      <div className="rounded-full w-12 h-12 bg-gray-300 flex justify-center items-center cursor-pointer">
        <span className="text-white font-bold">{displayInitial}</span>
      </div>
      {/* Profile Name and Role */}
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm font-bold">{displayName}</p>
        <p className="text-xs text-gray-500">{currentUser.role}</p>
      </div>
    </div>
  );
};

export default AccountMenu;
