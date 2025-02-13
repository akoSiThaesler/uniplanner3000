import { JSX } from "@emotion/react/jsx-runtime";
import { useState } from "react";

type Notification = {
  key: number;
  title: string;
  time: Date;
  isRead: boolean;
};

const exampleNotifications: Notification[] = [
  {
    key: 1,
    title: "Someone liked your course",
    time: new Date(2025, 1, 1, 12, 34, 55),
    isRead: false,
  },
  {
    key: 2,
    title: "Unfortunately you failed the Analysis exam",
    time: new Date(2025, 1, 1, 12, 34, 56),
    isRead: false,
  },
  {
    key: 3,
    title: "Your exam results are in",
    time: new Date(2025, 1, 1, 12, 34, 57),
    isRead: false,
  },
  {
    key: 4,
    title: "Welcome to the new Semester",
    time: new Date(2025, 9, 1, 0, 0, 0),
    isRead: true,
  },
];

export default function NotificationsPage(): JSX.Element {
  const [notifications, setNotifications] =
    useState<Notification[]>(exampleNotifications);

  function markAsRead(key: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.key === key ? { ...n, isRead: true } : n))
    );
  }

  function markAsNotRead(key: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.key === key ? { ...n, isRead: false } : n))
    );
  }

  function getReadNotificationCards(): JSX.Element | null {
    const readNotes = notifications.filter((n) => n.isRead);
    if (readNotes.length === 0) {
      return null;
    }
    return (
      <>
        <h1 className="text-l pt-5 pb-1">Read Notifications</h1>
        {readNotes.map((n) => getNotificationCard(n))}
      </>
    );
  }

  function getUnreadNotificationCards(): JSX.Element | null {
    const unreadNotes = notifications.filter((n) => !n.isRead);
    if (unreadNotes.length === 0) {
      return null;
    }
    return (
      <>
        <h1 className="text-l pt-5 pb-1">Unread Notifications</h1>
        {unreadNotes.map((n) => getNotificationCard(n))}
      </>
    );
  }

  function getNotificationCard(note: Notification): JSX.Element {
    return (
      <div
        key={note.key}
        className={`border-t-4 rounded px-4 py-3 shadow-md mt-2 ${
          note.isRead
            ? "bg-gray-300 border-gray-500 text-gray-600"
            : "bg-gray-100 border-gray-400 text-gray-800"
        }`}
        role="alert"
      >
        <div className="flex justify-between items-center">
          <div className="flex">
            <div className="py-1">
              {/* Icon */}
              <svg
                className="fill-current h-6 w-6 text-gray-800 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">{note.title}</p>
              <p className="text-sm">{note.time.toLocaleString("en-US")}</p>
            </div>
          </div>
          <button
            onClick={
              note.isRead
                ? () => markAsNotRead(note.key)
                : () => markAsRead(note.key)
            }
            className={`px-3 py-1 rounded text-white ${
              note.isRead ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            {note.isRead ? "Mark as Unread" : "Mark as Read"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl">Notifications</h1>
      {getUnreadNotificationCards()}
      {getReadNotificationCards()}
    </>
  );
}
