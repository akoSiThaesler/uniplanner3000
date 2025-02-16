"use client";
import React, { useState, useEffect, MouseEvent } from "react";

interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string; // e.g. "09:00"
  endTime: string; // e.g. "11:00"
  day: string;
  color?: string; // Custom color chosen by the user.
  priority?: "high" | "medium" | "low"; // Optional priority.
}

// Helper: Get a contrasting text color (black or white) based on background hex color.
const getContrastColor = (hex: string): string => {
  // Remove '#' if present.
  const cleanedHex = hex.replace("#", "");
  if (cleanedHex.length !== 6) return "#000000";
  const r = parseInt(cleanedHex.substr(0, 2), 16);
  const g = parseInt(cleanedHex.substr(2, 2), 16);
  const b = parseInt(cleanedHex.substr(4, 2), 16);
  // Calculate brightness (using standard luminance formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#ffffff";
};

const Scheduler: React.FC = () => {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Generate timeline slots in 30-minute intervals (00:00 to 23:30)
  const generateTimelineSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  const timelineSlots = generateTimelineSlots();
  const slotHeight = 40; // each slot is 40px tall
  const timelineHeight = timelineSlots.length * slotHeight;

  const getCurrentMonth = (date: Date): string =>
    new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState<string>(
    getCurrentMonth(new Date())
  );
  const [events, setEvents] = useState<Event[]>([]);

  // Drag selection states
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{
    time: string;
    day: string;
  } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{
    time: string;
    day: string;
  } | null>(null);
  // Persisted selection range after mouse up
  const [selectedSlotRange, setSelectedSlotRange] = useState<{
    day: string;
    start: string;
    end: string;
  } | null>(null);

  // Modal state for event creation/editing
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalPriority, setModalPriority] = useState<
    "high" | "medium" | "low" | ""
  >("");
  const [modalColor, setModalColor] = useState("#ffffff");

  // Current time for the current time line
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      setCurrentMonth(getCurrentMonth(newDate));
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      setCurrentMonth(getCurrentMonth(newDate));
      return newDate;
    });
  };

  // Calculate the exact date for a given weekday relative to currentDate.
  const getExactDateForSlot = (day: string): Date => {
    const currentDayIndex = currentDate.getDay(); // 0 (Sun) to 6 (Sat)
    // Assume Monday-Friday correspond to 1-5.
    const targetIndex = weekDays.indexOf(day) + 1;
    const diff = targetIndex - currentDayIndex;
    const slotDate = new Date(currentDate);
    slotDate.setDate(currentDate.getDate() + diff);
    return slotDate;
  };

  const getTimeIndex = (time: string): number => timelineSlots.indexOf(time);

  // Drag selection handlers
  const handleCellMouseDown = (time: string, day: string, e: MouseEvent) => {
    e.preventDefault();
    setIsSelecting(true);
    setSelectionStart({ time, day });
    setSelectionEnd({ time, day });
    setSelectedSlotRange(null);
  };

  const handleCellMouseEnter = (time: string, day: string) => {
    if (isSelecting && selectionStart && selectionStart.day === day) {
      setSelectionEnd({ time, day });
    }
  };

  const handleMouseUp = () => {
    if (
      isSelecting &&
      selectionStart &&
      selectionEnd &&
      selectionStart.day === selectionEnd.day
    ) {
      const startIndex = getTimeIndex(selectionStart.time);
      const endIndex = getTimeIndex(selectionEnd.time);
      const rangeStart =
        startIndex < endIndex ? selectionStart.time : selectionEnd.time;
      const rangeEnd =
        startIndex < endIndex ? selectionEnd.time : selectionStart.time;
      setSelectedSlotRange({
        day: selectionStart.day,
        start: rangeStart,
        end: rangeEnd,
      });
      setModalMode("create");
      setModalTitle("");
      setModalDescription("");
      setModalPriority("");
      setModalColor("#ffffff");
      setModalVisible(true);
    }
    setIsSelecting(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  // Handle event creation or editing in the modal.
  const handleAddOrEditEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      modalMode === "create" &&
      selectedSlotRange &&
      modalTitle.trim() !== ""
    ) {
      const { day, start, end } = selectedSlotRange;
      const newEvent: Event = {
        id: Date.now().toString(),
        title: modalTitle,
        description: modalDescription,
        date: getExactDateForSlot(day),
        startTime: start,
        endTime: end,
        day,
        priority: modalPriority || undefined,
        color: modalColor !== "#ffffff" ? modalColor : undefined,
      };
      setEvents((prev) => [...prev, newEvent]);
    } else if (
      modalMode === "edit" &&
      editingEvent &&
      modalTitle.trim() !== ""
    ) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id
            ? {
                ...ev,
                title: modalTitle,
                description: modalDescription,
                priority: modalPriority || undefined,
                color: modalColor !== "#ffffff" ? modalColor : undefined,
              }
            : ev
        )
      );
    }
    setModalVisible(false);
    setSelectedSlotRange(null);
    setEditingEvent(null);
    setModalTitle("");
    setModalDescription("");
    setModalPriority("");
    setModalColor("#ffffff");
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  // Double-click to edit event.
  const handleEventDoubleClick = (event: Event) => {
    setModalMode("edit");
    setEditingEvent(event);
    setModalTitle(event.title);
    setModalDescription(event.description || "");
    setModalPriority(event.priority || "");
    setModalColor(event.color || "#ffffff");
    setModalVisible(true);
  };

  // Return events for a given time slot and day.
  /*  const getEventsForSlot = (time: string, day: string) => {
    return events.filter(
      (event) => event.startTime === time && event.day === day
    );
  }; */

  // Determine if a cell is selected (for highlighting).
  const isCellSelected = (time: string, day: string): boolean => {
    if (selectedSlotRange && selectedSlotRange.day === day) {
      const startIndex = getTimeIndex(selectedSlotRange.start);
      const endIndex = getTimeIndex(selectedSlotRange.end);
      const currentIndex = getTimeIndex(time);
      return currentIndex >= startIndex && currentIndex <= endIndex;
    }
    if (
      isSelecting &&
      selectionStart &&
      selectionEnd &&
      selectionStart.day === day
    ) {
      const startIndex = getTimeIndex(selectionStart.time);
      const endIndex = getTimeIndex(selectionEnd.time);
      const currentIndex = getTimeIndex(time);
      const minIndex = Math.min(startIndex, endIndex);
      const maxIndex = Math.max(startIndex, endIndex);
      return currentIndex >= minIndex && currentIndex <= maxIndex;
    }
    return false;
  };

  // Compute current time line position (over full day: 1440 minutes).
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const fraction = currentMinutes / 1440;
  const currentLineTop = fraction * timelineHeight;

  // Map priority to default background colors.
  const priorityColorClass = (priority: "high" | "medium" | "low"): string => {
    switch (priority) {
      case "high":
        return "bg-red-300";
      case "medium":
        return "bg-yellow-300";
      case "low":
        return "bg-green-300";
      default:
        return "bg-blue-200";
    }
  };

  return (
    <div
      className="container mx-auto p-4 border border-gray-300 rounded-lg shadow select-none"
      onMouseUp={handleMouseUp}
    >
      {/* Month Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-gray-200 rounded mb-2 sm:mb-0"
        >
          Previous
        </button>
        <div className="text-center text-3xl font-bold text-gray-700">
          {currentMonth}
        </div>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {/* Scheduler Grid Header */}
      <div className="grid grid-cols-[100px_repeat(5,1fr)] mb-4 border-b-2 ">
        <div className="text-center font-semibold p-2 bg-gray-200">Time</div>
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center font-semibold p-2 bg-gray-100 rounded"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Scrollable Scheduler Grid */}
      <div className="relative overflow-y-auto" style={{ height: "400px" }}>
        {/* Base Grid Layer */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "100px repeat(5, 1fr)",
            gridAutoRows: `${slotHeight}px`,
            height: timelineHeight,
          }}
        >
          {timelineSlots.map((time) => (
            <React.Fragment key={time}>
              <div className="text-center text-xs font-semibold p-1 text-gray-600">
                {time}
              </div>
              {weekDays.map((day) => (
                <div
                  key={`${time}-${day}`}
                  onMouseDown={(e) => handleCellMouseDown(time, day, e)}
                  onMouseEnter={() => handleCellMouseEnter(time, day)}
                  className={`p-1 m-0.5 border border-gray-200 rounded cursor-pointer transition-colors duration-200 ${
                    isCellSelected(time, day) ? "bg-blue-100" : "bg-white"
                  }`}
                ></div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Events Layer */}
        <div
          className="absolute inset-0 pointer-events-none grid"
          style={{
            gridTemplateColumns: "100px repeat(5, 1fr)",
            gridAutoRows: `${slotHeight}px`,
          }}
        >
          {events.map((event) => {
            const dayIndex = weekDays.indexOf(event.day);
            if (dayIndex === -1) return null;
            const startIndex = getTimeIndex(event.startTime);
            const endIndex = getTimeIndex(event.endTime);
            const gridRowStart = startIndex + 1;
            const gridRowEnd = endIndex + 2; // grid row end is exclusive
            // Use custom color if provided; else use priority color if set; else default.
            const eventBg =
              event.color && event.color !== "#ffffff"
                ? event.color
                : event.priority
                ? priorityColorClass(event.priority)
                : "bg-blue-200";
            // Calculate contrasting text color.
            const textColor =
              event.color && event.color !== "#ffffff"
                ? getContrastColor(event.color)
                : "#000000";
            return (
              <div
                key={event.id}
                style={{
                  gridColumn: dayIndex + 2,
                  gridRow: `${gridRowStart} / ${gridRowEnd}`,
                }}
                onDoubleClick={() => handleEventDoubleClick(event)}
                className={`relative m-1 p-1 rounded shadow-md pointer-events-auto flex flex-col items-center justify-center text-center text-xs`}
                // Inline style to apply the event background and text color.
              >
                <div
                  className="w-full"
                  style={{ backgroundColor: eventBg, color: textColor }}
                >
                  <span className="block truncate font-semibold">
                    {event.title}
                  </span>
                  {event.description && (
                    <span className="block truncate text-[10px] opacity-70 mt-1">
                      {event.description}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEvent(event.id);
                  }}
                  className="mt-1 text-red-600 text-xl"
                >
                  x
                </button>
              </div>
            );
          })}
        </div>

        {/* Current Time Line */}
        <div
          className="absolute left-0 right-0 h-1 bg-red-500"
          style={{ top: `${currentLineTop}px` }}
        ></div>
      </div>

      {/* Modal for Event Creation/Editing */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {modalMode === "create" ? "Add Event" : "Edit Event"}
            </h3>
            <form onSubmit={handleAddOrEditEvent}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">
                  {modalMode === "create"
                    ? `Event for ${selectedSlotRange?.day} from ${selectedSlotRange?.start} to ${selectedSlotRange?.end}`
                    : "Event Title"}
                </label>
                <input
                  type="text"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  placeholder="e.g. Math Lecture"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 mb-3"
                />
                <label className="block text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={modalDescription}
                  onChange={(e) => setModalDescription(e.target.value)}
                  placeholder="e.g. Lecture on calculus concepts"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 mb-3"
                ></textarea>
                <label className="block text-gray-700 mb-1">
                  Priority (optional)
                </label>
                <select
                  value={modalPriority}
                  onChange={(e) =>
                    setModalPriority(
                      e.target.value as "high" | "medium" | "low" | ""
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 mb-3"
                >
                  <option value="">None</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <label className="block text-gray-700 mb-1">
                  Color (optional)
                </label>
                <input
                  type="color"
                  value={modalColor}
                  onChange={(e) => setModalColor(e.target.value)}
                  className="w-full h-10 p-0 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalVisible(false);
                    setSelectedSlotRange(null);
                    setEditingEvent(null);
                    setModalTitle("");
                    setModalDescription("");
                    setModalPriority("");
                    setModalColor("#ffffff");
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  {modalMode === "create" ? "Add Event" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
