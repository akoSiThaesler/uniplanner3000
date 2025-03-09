"use client";
import React, { useState, useMemo, useEffect, memo } from "react";
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { useData } from "../../context/DataContext";

// --- Helper Functions ---
const timeToMinutes = (time: string): number => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const minutesToTime = (mins: number): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

const roundTimeToSlot = (time: string): string => {
  const minutes = timeToMinutes(time);
  const rounded = Math.round(minutes / 30) * 30;
  return minutesToTime(rounded);
};

const getExactDateForDay = (currentDate: Date, day: string): Date => {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const currentDay = currentDate.getDay();
  const diff = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() + diff);
  const index = weekDays.indexOf(day);
  const result = new Date(monday);
  result.setDate(monday.getDate() + index);
  return result;
};

const isSameDate = (d1: Date, d2: Date): boolean =>
  d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear();

const predefinedColors = [
  "#60a5fa",
  "#f87171",
  "#fbbf24",
  "#34d399",
  "#a78bfa",
];

type ViewMode = "daily" | "weekly" | "3day" | "monthly";

// --- Droppable Cell Component ---
interface DroppableCellProps {
  time: string;
  day: string;
  onDrop: (eventId: string, time: string, day: string) => void;
  children: React.ReactNode;
}

// --- SchedulerEvent Type ---
// Note: We have added an optional courseId field so events can be linked to courses.
export interface SchedulerEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  day: string;
  color?: string;
  priority?: "high" | "medium" | "low";
  courseId?: string;
}

// Instead of a hardcoded sampleEvents array, we now derive events from global context.
// We use useData() to get the global termine and vorlesungen, and then map termine to SchedulerEvent.
const useGlobalEvents = () => {
  const { termine, vorlesungen } = useData();
  return useMemo(() => {
    return termine.map((t) => {
      // Find the course corresponding to this event (using vorlesungId).
      const course = vorlesungen.find((v) => v.id === t.vorlesungId);
      const eventDate = new Date(t.date);
      const day = eventDate.toLocaleDateString("en-US", { weekday: "long" });
      return {
        id: t.id,
        title: course?.title || "Unnamed Event",
        description: course?.description,
        date: eventDate,
        startTime: t.startTime,
        endTime: t.endTime,
        day,
        color: course?.color || "#bae6fd",
        courseId: course ? course.id : undefined,
      } as SchedulerEvent;
    });
  }, [termine, vorlesungen]);
};

const DroppableCell: React.FC<DroppableCellProps> = ({
  time,
  day,
  onDrop,
  children,
}) => {
  const [, drop] = useDrop({
    accept: "EVENT",
    drop: (item: { id: string }) => {
      if (item && item.id) {
        onDrop(item.id, time, day);
      }
    },
  });
  return (
    <div
      ref={(node) => {
        drop(node);
      }}
      className="w-full h-full"
    >
      {children}
    </div>
  );
};

// --- Draggable Event Component ---
interface DraggableEventProps {
  event: SchedulerEvent;
  children: React.ReactNode;
  onClick?: () => void;
}
const DraggableEvent: React.FC<DraggableEventProps> = memo(
  ({ event, children, onClick }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "EVENT",
      item: { id: event.id },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    return (
      <div
        ref={(node) => {
          drag(node);
        }}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        {children}
      </div>
    );
  }
);
DraggableEvent.displayName = "DraggableEvent";

// --- Current Time Line Component ---
interface CurrentTimeLineProps {
  timelineHeight: number;
}
const CurrentTimeLine: React.FC<CurrentTimeLineProps> = ({
  timelineHeight,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  // Only show the line if within our range (6:00-19:00)
  const adjustedMinutes = Math.min(Math.max(currentMinutes, 6 * 60), 19 * 60);
  const currentLineTop =
    ((adjustedMinutes - 6 * 60) / ((19 - 6) * 60)) * timelineHeight;
  return (
    <div
      className="absolute left-0 right-0 h-1 bg-red-500"
      style={{ top: `${currentLineTop}px` }}
    />
  );
};

// --- Main Scheduler Component ---
interface MultiViewSchedulerProps {
  widget?: boolean;
}
const MultiViewScheduler: React.FC<MultiViewSchedulerProps> = ({
  widget = false,
}) => {
  const globalEvents = useGlobalEvents();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("weekly");
  const [events, setEvents] = useState<SchedulerEvent[]>(globalEvents);
  const [modalVisible, setModalVisible] = useState(false);

  // Mobile-specific view mode: "list" for a list of month events or "calendar" for the month grid
  const [mobileView, setMobileView] = useState<"list" | "calendar">("list");

  // Event creation/editing state
  const [selectedSlotRange, setSelectedSlotRange] = useState<{
    day: string;
    start: string;
    end: string;
  } | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventColor, setNewEventColor] = useState("#60a5fa");
  const [newEventStartTime, setNewEventStartTime] = useState("");
  const [newEventEndTime, setNewEventEndTime] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [editingEvent, setEditingEvent] = useState<SchedulerEvent | null>(null);

  // Timeline slots now limited to 06:00 - 19:00
  const timelineSlots = useMemo(() => {
    const slots: string[] = [];
    for (let hour = 6; hour < 19; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    slots.push("19:00");
    return slots;
  }, []);
  const slotHeight = 40;
  // timelineHeight now corresponds to the number of slots within our restricted range
  const timelineHeight = widget ? timelineSlots.length * slotHeight : "100%";

  // Compute displayed days (for timeline & calendar views)
  const displayedDays = useMemo(() => {
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    if (viewMode === "daily") {
      const index = currentDate.getDay() - 1;
      const dayName = weekDays[index] || "Monday";
      return [{ day: dayName, date: currentDate }];
    } else if (viewMode === "weekly") {
      const currentDay = currentDate.getDay();
      const diff = currentDay === 0 ? -6 : 1 - currentDay;
      const monday = new Date(currentDate);
      monday.setDate(currentDate.getDate() + diff);
      return weekDays.map((d, i) => ({
        day: d,
        date: new Date(
          monday.getFullYear(),
          monday.getMonth(),
          monday.getDate() + i
        ),
      }));
    } else if (viewMode === "3day") {
      const currentDay = currentDate.getDay();
      const diff = currentDay === 0 ? -6 : 1 - currentDay;
      const monday = new Date(currentDate);
      monday.setDate(currentDate.getDate() + diff);
      return weekDays.slice(0, 3).map((d, i) => ({
        day: d,
        date: new Date(
          monday.getFullYear(),
          monday.getMonth(),
          monday.getDate() + i
        ),
      }));
    }
    return [];
  }, [viewMode, currentDate]);

  // Drag selection state (desktop only)
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{
    time: string;
    day: string;
  } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{
    time: string;
    day: string;
  } | null>(null);

  const isCellSelected = (time: string, day: string): boolean => {
    const timeIndex = timelineSlots.indexOf(time);
    if (selectedSlotRange && selectedSlotRange.day === day) {
      const start = timelineSlots.indexOf(selectedSlotRange.start);
      const end = timelineSlots.indexOf(selectedSlotRange.end);
      return (
        timeIndex >= Math.min(start, end) && timeIndex <= Math.max(start, end)
      );
    }
    if (
      isSelecting &&
      selectionStart &&
      selectionEnd &&
      selectionStart.day === day
    ) {
      const start = timelineSlots.indexOf(selectionStart.time);
      const end = timelineSlots.indexOf(selectionEnd.time);
      return (
        timeIndex >= Math.min(start, end) && timeIndex <= Math.max(start, end)
      );
    }
    return false;
  };

  // Filter events for timeline view (only events whose date matches a displayed day)
  const timelineEvents = useMemo(() => {
    return events.filter((ev) =>
      displayedDays.some((d) => isSameDate(d.date, ev.date))
    );
  }, [events, displayedDays]);

  // Collision handling for overlapping events (desktop only)
  const calculateLayoutForDay = (
    dayEvents: SchedulerEvent[]
  ): { [id: string]: { left: number; width: number } } => {
    const sorted = [...dayEvents].sort(
      (a, b) =>
        timelineSlots.indexOf(a.startTime) - timelineSlots.indexOf(b.startTime)
    );
    const groups: SchedulerEvent[][] = [];
    let currentGroup: SchedulerEvent[] = [];
    sorted.forEach((event) => {
      const start = timelineSlots.indexOf(event.startTime);
      const end = timelineSlots.indexOf(event.endTime);
      if (currentGroup.length === 0) {
        currentGroup.push(event);
      } else {
        const overlaps = currentGroup.some((e) => {
          const s = timelineSlots.indexOf(e.startTime);
          const eEnd = timelineSlots.indexOf(e.endTime);
          return start < eEnd && s < end;
        });
        if (overlaps) {
          currentGroup.push(event);
        } else {
          groups.push(currentGroup);
          currentGroup = [event];
        }
      }
    });
    if (currentGroup.length > 0) groups.push(currentGroup);
    const positions: { [id: string]: { left: number; width: number } } = {};
    groups.forEach((group) => {
      const count = group.length;
      group.forEach((e, idx) => {
        positions[e.id] = { left: idx * (100 / count), width: 100 / count };
      });
    });
    return positions;
  };

  const layoutMapping = useMemo(
    () => {
      const mapping: {
        [day: string]: { [eventId: string]: { left: number; width: number } };
      } = {};
      displayedDays.forEach((dayObj) => {
        const dayEvents = timelineEvents.filter((ev) =>
          isSameDate(ev.date, dayObj.date)
        );
        mapping[dayObj.day] = calculateLayoutForDay(dayEvents);
      });

      return mapping;
    },
    /* eslint-disable-next-line */
    [displayedDays, timelineEvents, timelineSlots]
  );

  // --- Unified Navigation Header for all views ---
  const renderNavigationHeader = () => {
    let headerText = "";
    if (viewMode === "monthly") {
      headerText = currentDate.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
    } else if (viewMode === "weekly") {
      const currentDay = currentDate.getDay();
      const diff = currentDay === 0 ? -6 : 1 - currentDay;
      const monday = new Date(currentDate);
      monday.setDate(currentDate.getDate() + diff);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      headerText = `${monday.toLocaleDateString()} - ${sunday.toLocaleDateString()}`;
    } else if (viewMode === "daily" || viewMode === "3day") {
      headerText = currentDate.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrev}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
        >
          Prev
        </button>
        <div className="text-lg font-semibold ">{headerText}</div>
        <button
          onClick={handleNext}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
        >
          Next
        </button>
      </div>
    );
  };

  const handlePrev = () => {
    if (viewMode === "monthly") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
    } else if (viewMode === "weekly") {
      setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
    } else if (viewMode === "daily") {
      setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000));
    } else if (viewMode === "3day") {
      setCurrentDate(new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000));
    }
  };

  const handleNext = () => {
    if (viewMode === "monthly") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    } else if (viewMode === "weekly") {
      setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
    } else if (viewMode === "daily") {
      setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));
    } else if (viewMode === "3day") {
      setCurrentDate(new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000));
    }
  };

  // Desktop mouse selection for event creation
  const handleCellMouseDown = widget
    ? undefined
    : (time: string, day: string, e: React.MouseEvent) => {
        e.preventDefault();
        setIsSelecting(true);
        setSelectionStart({ time, day });
        setSelectionEnd({ time, day });
        setSelectedSlotRange(null);
      };

  const handleCellMouseEnter = widget
    ? undefined
    : (time: string, day: string) => {
        if (isSelecting && selectionStart && selectionStart.day === day) {
          setSelectionEnd({ time, day });
        }
      };

  const handleMouseUp = widget
    ? undefined
    : () => {
        if (
          isSelecting &&
          selectionStart &&
          selectionEnd &&
          selectionStart.day === selectionEnd.day
        ) {
          const startIdx = timelineSlots.indexOf(selectionStart.time);
          const endIdx = timelineSlots.indexOf(selectionEnd.time);
          const startTime =
            startIdx <= endIdx ? selectionStart.time : selectionEnd.time;
          const endTime =
            startIdx <= endIdx ? selectionEnd.time : selectionStart.time;
          setSelectedSlotRange({
            day: selectionStart.day,
            start: startTime,
            end: endTime,
          });
          setNewEventStartTime(roundTimeToSlot(startTime));
          setNewEventEndTime(roundTimeToSlot(endTime));
          setModalVisible(true);
        }
        setIsSelecting(false);
        setSelectionStart(null);
        setSelectionEnd(null);
      };

  // Drop handler for desktop view
  const handleEventDrop = (
    eventId: string,
    newTime: string,
    newDay: string
  ) => {
    const newDateObj = displayedDays.find((d) => d.day === newDay)?.date;
    if (!newDateObj) return;
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const duration =
            timeToMinutes(ev.endTime) - timeToMinutes(ev.startTime);
          const newStartMins = timeToMinutes(newTime);
          const newEndMins = newStartMins + duration;
          return {
            ...ev,
            day: newDay,
            startTime: newTime,
            endTime: minutesToTime(newEndMins),
            date: newDateObj,
          };
        }
        return ev;
      })
    );
  };

  // Create event handler
  const handleCreateEvent = () => {
    if (!newEventTitle.trim()) {
      alert("Please enter an event title.");
      return;
    }
    if (!newEventStartTime || !newEventEndTime) {
      alert("Please select start and end times.");
      return;
    }
    const roundedStart = roundTimeToSlot(newEventStartTime);
    const roundedEnd = roundTimeToSlot(newEventEndTime);
    if (timeToMinutes(roundedEnd) <= timeToMinutes(roundedStart)) {
      alert("End time must be after start time.");
      return;
    }
    const eventDate = newEventDate
      ? new Date(newEventDate)
      : selectedSlotRange
      ? getExactDateForDay(currentDate, selectedSlotRange.day)
      : new Date();
    const dayName = selectedSlotRange
      ? selectedSlotRange.day
      : eventDate.toLocaleDateString("en-US", { weekday: "long" });
    const newEvent: SchedulerEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      description: newEventDescription,
      date: eventDate,
      startTime: roundedStart,
      endTime: roundedEnd,
      day: dayName,
      color: newEventColor,
    };
    setEvents((prev) => [...prev, newEvent]);
    // Reset form
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventColor("#60a5fa");
    setNewEventStartTime("");
    setNewEventEndTime("");
    setNewEventDate("");
    setSelectedSlotRange(null);
  };

  // Edit event handler
  const handleEventClick = (event: SchedulerEvent) => {
    if (widget) return;
    setEditingEvent(event);
    setNewEventTitle(event.title);
    setNewEventDescription(event.description || "");
    setNewEventColor(event.color || "#60a5fa");
    setNewEventStartTime(event.startTime);
    setNewEventEndTime(event.endTime);
    setNewEventDate(event.date.toISOString().split("T")[0]);
    setModalVisible(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;
    if (!newEventTitle.trim()) {
      alert("Please enter an event title.");
      return;
    }
    if (!newEventStartTime || !newEventEndTime) {
      alert("Please select start and end times.");
      return;
    }
    const roundedStart = roundTimeToSlot(newEventStartTime);
    const roundedEnd = roundTimeToSlot(newEventEndTime);
    if (timeToMinutes(roundedEnd) <= timeToMinutes(roundedStart)) {
      alert("End time must be after start time.");
      return;
    }
    const updatedDate = newEventDate
      ? new Date(newEventDate)
      : editingEvent.date;
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === editingEvent.id) {
          return {
            ...ev,
            title: newEventTitle,
            description: newEventDescription,
            color: newEventColor,
            startTime: roundedStart,
            endTime: roundedEnd,
            date: updatedDate,
            day: updatedDate.toLocaleDateString("en-US", { weekday: "long" }),
          };
        }
        return ev;
      })
    );
    setEditingEvent(null);
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventColor("#60a5fa");
    setNewEventStartTime("");
    setNewEventEndTime("");
    setNewEventDate("");
  };

  // Delete event handler
  const handleDeleteEvent = () => {
    if (!editingEvent) return;
    setEvents((prev) => prev.filter((ev) => ev.id !== editingEvent.id));
    setEditingEvent(null);
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventColor("#60a5fa");
    setNewEventStartTime("");
    setNewEventEndTime("");
    setNewEventDate("");
  };

  // --- Mobile List View (all events for the current month) ---
  const renderMobileListView = () => {
    const monthEvents = events.filter(
      (ev) =>
        ev.date.getFullYear() === currentDate.getFullYear() &&
        ev.date.getMonth() === currentDate.getMonth()
    );
    monthEvents.sort((a, b) => {
      if (a.date.getTime() === b.date.getTime()) {
        return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
      }
      return a.date.getTime() - b.date.getTime();
    });
    return (
      <div className="flex flex-col h-full p-2 space-y-4">
        {monthEvents.length === 0 ? (
          <div className="text-center text-gray-500">
            No events for this month
          </div>
        ) : (
          monthEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => handleEventClick(ev)}
              className="p-4 border rounded shadow-sm bg-[var(--background-2)] cursor-pointer"
            >
              <div className="font-semibold">{ev.title}</div>
              <div className="text-sm text-gray-600">
                {ev.date.toLocaleDateString()} {ev.startTime} - {ev.endTime}
              </div>
              {ev.description && (
                <div className="text-sm">{ev.description}</div>
              )}
            </div>
          ))
        )}
      </div>
    );
  };

  // --- Desktop Timeline Header ---
  const renderTimelineHeader = () => (
    <div
      className="grid pb-5"
      style={{
        gridTemplateColumns: `100px repeat(${displayedDays.length}, minmax(100px, 1fr))`,
      }}
    >
      <div></div>
      {displayedDays.map(({ day }) => (
        <div
          key={day}
          className="flex items-center justify-center font-semibold p-2 border-b border-gray-200"
        >
          {day}
        </div>
      ))}
    </div>
  );

  // --- Desktop Timeline View ---
  const renderTimelineView = () => {
    const gridContent = (
      <div
        className="grid"
        style={{
          gridTemplateColumns: `100px repeat(${displayedDays.length}, minmax(100px, 1fr))`,
          gridAutoRows: `${slotHeight}px`,
          height: timelineHeight,
        }}
      >
        {timelineSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="text-center text-xs font-semibold p-1 text-[var(--foreground)]">
              {time}
            </div>
            {displayedDays.map(({ day }) => (
              <DroppableCell
                key={`${time}-${day}`}
                time={time}
                day={day}
                onDrop={handleEventDrop}
              >
                <div
                  onMouseDown={
                    handleCellMouseDown
                      ? (e) => handleCellMouseDown(time, day, e)
                      : undefined
                  }
                  onMouseEnter={
                    handleCellMouseEnter
                      ? () => handleCellMouseEnter(time, day)
                      : undefined
                  }
                  className={`w-full h-full p-1 m-0.5 border border-[var(--background-2)] rounded transition-colors duration-200 ${
                    isCellSelected(time, day)
                      ? "bg-[var(--glass-background)]"
                      : "bg-[var(--background)]"
                  }`}
                ></div>
              </DroppableCell>
            ))}
          </React.Fragment>
        ))}
      </div>
    );

    const eventsOverlay = (
      <div
        className="absolute inset-0 pointer-events-none grid"
        style={{
          gridTemplateColumns: `100px repeat(${displayedDays.length}, minmax(100px, 1fr))`,
          gridAutoRows: `${slotHeight}px`,
        }}
      >
        {timelineEvents.map((event) => {
          const dayIndex = displayedDays.findIndex((d) =>
            isSameDate(d.date, event.date)
          );
          if (dayIndex === -1) return null;
          const startIndex = timelineSlots.indexOf(event.startTime);
          const endIndex = timelineSlots.indexOf(event.endTime);
          const rowSpan = endIndex - startIndex;
          const layout =
            layoutMapping[event.day] && layoutMapping[event.day][event.id]
              ? layoutMapping[event.day][event.id]
              : { left: 0, width: 100 };
          return (
            <div
              key={event.id}
              style={{
                gridColumn: dayIndex + 2,
                gridRow: `${startIndex + 1} / span ${rowSpan}`,
              }}
              className="relative m-1 pointer-events-auto"
            >
              <DraggableEvent
                event={event}
                onClick={() => handleEventClick(event)}
              >
                <div
                  className="absolute top-0 left-0 h-full rounded shadow-md flex items-center justify-center text-xs cursor-pointer hover:opacity-90"
                  style={{
                    backgroundColor: event.color || "#bae6fd",
                    color: "#000",
                    left: `${layout.left}%`,
                    width: `${layout.width}%`,
                  }}
                >
                  {event.title}
                </div>
              </DraggableEvent>
            </div>
          );
        })}
      </div>
    );

    return (
      <div className="flex flex-col h-full relative">
        {renderTimelineHeader()}
        <div
          className="relative flex-grow overflow-x-hidden"
          onMouseUp={handleMouseUp}
        >
          {gridContent}
          {eventsOverlay}
          <CurrentTimeLine timelineHeight={timelineSlots.length * slotHeight} />
        </div>
      </div>
    );
  };

  // --- Desktop Month View (Calendar) ---
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();
    const totalCells = 42;
    const calendarDays = [];
    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - startDay + 1;
      calendarDays.push(
        dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null
      );
    }
    const weeks = [];
    for (let i = 0; i < totalCells; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    const today = new Date();
    return (
      <div className="mt-4 overflow-hidden">
        <div className="grid grid-cols-7 text-center font-semibold">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="p-2 border border-gray-200">
              {d}
            </div>
          ))}
        </div>
        {weeks.map((week, i) => (
          <div
            key={i}
            className="grid grid-cols-7 text-center border-t border-gray-200"
          >
            {week.map((day, idx) => {
              const cellDate = day ? new Date(year, month, day) : null;
              const isToday = cellDate && isSameDate(cellDate, today);
              const cellEvents = cellDate
                ? events.filter((ev) => {
                    const evDate = ev.date;
                    return (
                      evDate.getFullYear() === cellDate.getFullYear() &&
                      evDate.getMonth() === cellDate.getMonth() &&
                      evDate.getDate() === cellDate.getDate()
                    );
                  })
                : [];
              return (
                <div
                  key={idx}
                  className={`p-2 border border-gray-200 h-20 relative ${
                    isToday ? "bg-yellow-50" : ""
                  }`}
                >
                  {day && (
                    <div className="absolute top-1 left-1 text-xs font-semibold">
                      {day}
                    </div>
                  )}
                  {cellEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="bg-blue-200 text-xs rounded px-1 mt-4 truncate"
                    >
                      {ev.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // Determine if mobile (using window.innerWidth)
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768 ? true : false;

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div
        className={`h-full rounded-lg shadow bg-[var(--background)] ${
          widget
            ? "p-2"
            : "p-4 pb-24 border overflow-hidden border-[var(--foreground)]"
        }`}
      >
        {/* Navigation header is now always shown */}
        {!widget && renderNavigationHeader()}

        {/* Desktop view switcher is hidden on mobile */}
        {!widget && !isMobile && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(["daily", "weekly", "3day", "monthly"] as ViewMode[]).map(
              (mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded flex-shrink-1 ${
                    viewMode === mode
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              )
            )}
          </div>
        )}

        {/* Mobile-specific toggle for List vs Calendar view */}
        {!widget && isMobile && (
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setMobileView("list")}
              className={`px-4 py-2 rounded ${
                mobileView === "list"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setMobileView("calendar")}
              className={`px-4 py-2 rounded ${
                mobileView === "calendar"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Calendar View
            </button>
          </div>
        )}

        {/* Conditionally render views */}
        {isMobile
          ? mobileView === "list"
            ? renderMobileListView()
            : renderMonthView()
          : viewMode === "monthly"
          ? renderMonthView()
          : renderTimelineView()}

        {/* Creation Modal */}
        {!widget && modalVisible && !editingEvent && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setModalVisible(false);
              setSelectedSlotRange(null);
            }}
          >
            <div
              className="bg-[var(--background)] p-6 rounded shadow-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Create New Event</h3>
              {selectedSlotRange && (
                <p className="mb-2 text-sm text-gray-600">{`Selected day: ${selectedSlotRange.day}`}</p>
              )}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border rounded p-2 border-slate-800 bg-[var(--background-2)]"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="Event Title"
                className="w-full border rounded p-2 mb-2 border-slate-800 bg-[var(--background-2)]"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="w-full border rounded p-2 mb-2 border-slate-800 bg-[var(--background-2)]"
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
              ></textarea>
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 ">
                    Start
                  </label>
                  <input
                    type="time"
                    className="w-full border rounded p-1 border-slate-800 bg-[var(--background-2)]"
                    value={newEventStartTime}
                    onChange={(e) => setNewEventStartTime(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">End</label>
                  <input
                    type="time"
                    className="w-full border rounded p-1 border-slate-800 bg-[var(--background-2)]"
                    value={newEventEndTime}
                    onChange={(e) => setNewEventEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Select Color
                </label>
                <div className="flex space-x-2">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border ${
                        newEventColor === color
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewEventColor(color)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setModalVisible(false);
                    setSelectedSlotRange(null);
                    setNewEventStartTime("");
                    setNewEventEndTime("");
                    setNewEventDate("");
                  }}
                  className="px-4 py-2 bg-gray-300 rounded text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleCreateEvent();
                    setModalVisible(false);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {!widget && modalVisible && editingEvent && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setModalVisible(false);
              setEditingEvent(null);
            }}
          >
            <div
              className="bg-[var(--background)] p-6 rounded shadow-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Edit Event</h3>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border rounded p-2 border-slate-800 bg-[var(--background-2)]"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="Event Title"
                className="w-full border rounded p-2 mb-2 border-slate-800 bg-[var(--background-2)]"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="w-full border rounded p-2 mb-2 border-slate-800 bg-[var(--background-2)]"
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
              ></textarea>
              <div className="flex flex-col sm:flex-row gap-2 mb-2 ">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Start
                  </label>
                  <input
                    type="time"
                    className="w-full border rounded p-1 border-slate-800 bg-[var(--background-2)]"
                    value={newEventStartTime}
                    onChange={(e) => setNewEventStartTime(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">End</label>
                  <input
                    type="time"
                    className="w-full border rounded p-1 border-slate-800 bg-[var(--background-2)]"
                    value={newEventEndTime}
                    onChange={(e) => setNewEventEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Select Color
                </label>
                <div className="flex space-x-2">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border ${
                        newEventColor === color
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewEventColor(color)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setModalVisible(false);
                    setEditingEvent(null);
                    setNewEventTitle("");
                    setNewEventDescription("");
                    setNewEventColor("#60a5fa");
                    setNewEventStartTime("");
                    setNewEventEndTime("");
                    setNewEventDate("");
                  }}
                  className="px-4 py-2 bg-gray-300 rounded text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDeleteEvent();
                    setModalVisible(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleUpdateEvent();
                    setModalVisible(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default MultiViewScheduler;
