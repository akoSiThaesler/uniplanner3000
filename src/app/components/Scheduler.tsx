import React, { useState } from "react";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  day: string;
}

const Scheduler: React.FC = () => {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["9:00", "10:00", "11:00", "12:00", "13:00"];

  // Now accepts a date parameter for dynamic formatting.
  const getCurrentMonth = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState<string>(
    getCurrentMonth(new Date())
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      setCurrentMonth(getCurrentMonth(newDate));
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      setCurrentMonth(getCurrentMonth(newDate));
      return newDate;
    });
  };

  const handleSlotClick = (time: string, day: string) => {
    setSelectedSlot(`${time}-${day}`);
    setNewEventTitle(""); // Reset the input when a slot is clicked.
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSlot && newEventTitle.trim() !== "") {
      const [time, day] = selectedSlot.split("-");
      const newEvent: Event = {
        id: Date.now().toString(),
        title: newEventTitle,
        date: currentDate, // This can be updated to calculate the exact date for the slot.
        time,
        day,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setSelectedSlot(null);
      setNewEventTitle("");
    }
  };

  // Return all events that match the given time and day.
  const getEventsForSlot = (time: string, day: string) => {
    return events.filter((event) => event.time === time && event.day === day);
  };

  return (
    <div className="container mx-auto p-4 border-2 border-black">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>
        <div className="text-center text-4xl">{currentMonth}</div>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {/* Scheduler Grid Header */}
      <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] mb-4 border-b-2 border-orange-500">
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

      {/* Scheduler Grid */}
      <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr]">
        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="text-center font-semibold p-2 bg-gray-200">
              {time}
            </div>
            {weekDays.map((day) => (
              <div
                key={`${time}-${day}`}
                className={`p-4 m-[2px] border border-gray-200 rounded min-h-[60px] bg-white cursor-pointer hover:bg-gray-50 ${
                  selectedSlot === `${time}-${day}`
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => handleSlotClick(time, day)}
              >
                {getEventsForSlot(time, day).map((event) => (
                  <div
                    key={event.id}
                    className="text-sm bg-blue-100 p-1 rounded mb-1"
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Event Creation Form */}
      {selectedSlot && (
        <form onSubmit={handleAddEvent} className="mt-4">
          <h3 className="text-xl mb-2">
            Add event for {selectedSlot.split("-")[1]} at{" "}
            {selectedSlot.split("-")[0]}
          </h3>
          <input
            type="text"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            placeholder="Event title"
            className="border border-gray-300 p-2 rounded w-full mb-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Event
          </button>
        </form>
      )}
    </div>
  );
};

export default Scheduler;
