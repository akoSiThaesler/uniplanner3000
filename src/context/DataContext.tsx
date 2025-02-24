import React, { createContext, useContext, useState, ReactNode } from "react";

export type Studiengang = {
  id: string;
  name: string;
  description: string;
};

export type Vorlesung = {
  id: string;
  title: string;
  studiengaengeId: string;
  teacherName?: string;
  description?: string;
  bannerGradient?: string;
  customIconUrl?: string;
  assignments?: {
    id: string;
    title: string;
    dueDate: string;
    description?: string;
  }[];
  materials?: {
    id: string;
    title: string;
    url: string;
  }[];
  studentNames?: string[];
  eventIds?: string[];
};

export type Dozent = {
  id: string;
  name: string;
  email: string;
};

export type Vorlesungstermin = {
  id: string;
  vorlesungId: string;
  date: string; // e.g., "2025-01-15"
  startTime: string; // e.g., "10:00"
  endTime: string; // e.g., "12:00"
};

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

export type TeacherData = {
  lineData: { week: string; avgScore: number }[];
  barData: { week: string; graded: number }[];
  pieData: { name: string; value: number }[];
  metrics: {
    totalStudents: number;
    assignmentsGraded: number;
    avgScore: string;
  };
};

export type StudentData = {
  lineData: { assignment: string; score: number }[];
  barData: { topic: string; score: number }[];
  pieData: { name: string; value: number }[];
  metrics: {
    currentGrade: string;
    pendingAssignments: number;
    attendanceRate: string;
  };
};

export type GlobalTeacherData = {
  [teacherClass: string]: {
    [course: string]: TeacherData;
  };
};

interface DataContextType {
  studiengaenge: Studiengang[];
  vorlesungen: Vorlesung[];
  dozenten: Dozent[];
  students: { id: string; name: string }[];
  termine: Vorlesungstermin[];
  teacherData: GlobalTeacherData;
  studentData: { [key: string]: StudentData };
  addStudiengang: (studiengang: Studiengang) => void;
  updateStudiengang: (studiengang: Studiengang) => void;
  deleteStudiengang: (id: string) => void;
  addVorlesung: (vorlesung: Vorlesung) => void;
  updateVorlesung: (vorlesung: Vorlesung) => void;
  deleteVorlesung: (id: string) => void;
  addDozent: (dozent: Dozent) => void;
  updateDozent: (dozent: Dozent) => void;
  deleteDozent: (id: string) => void;
  addTermin: (termin: Vorlesungstermin) => void;
  updateTermin: (termin: Vorlesungstermin) => void;
  deleteTermin: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Sample studiengaenge (degree programs)
  const [studiengaenge, setStudiengaenge] = useState<Studiengang[]>([
    { id: "1", name: "Informatik", description: "Informatik" },
    {
      id: "2",
      name: "Wirtschaftsinformatik",
      description: "Wirtschaftsinformatik",
    },
    { id: "3", name: "BWL", description: "Betriebswirtschaftslehre" },
  ]);

  // Sample courses with teacher and student names
  const [vorlesungen, setVorlesungen] = useState<Vorlesung[]>([
    {
      id: "1",
      title: "Web Engineering",
      studiengaengeId: "1",
      teacherName: "Prof. Dr. Schmidt",
      description: "An advanced course on modern web technologies.",
      bannerGradient: "bg-gradient-to-r from-green-500 to-teal-500",
      customIconUrl: "https://via.placeholder.com/50",
      studentNames: ["Alice", "Bob", "Charlie"],
      eventIds: ["e1", "e2"],
    },
    {
      id: "2",
      title: "Betriebswirtschaft",
      studiengaengeId: "3",
      teacherName: "Prof. Dr. Müller",
      description: "Fundamentals of business administration.",
      bannerGradient: "bg-gradient-to-r from-purple-600 to-blue-500",
      customIconUrl: "https://via.placeholder.com/50",
      studentNames: ["David", "Eva"],
      eventIds: ["e3"],
    },
  ]);

  const [dozenten, setDozenten] = useState<Dozent[]>([
    { id: "1", name: "Prof. Dr. Schmidt", email: "schmidt@example.com" },
    { id: "2", name: "Prof. Dr. Müller", email: "mueller@example.com" },
  ]);

  // Sample students.
  /* eslint-disable-next-line */
  const [students, setStudents] = useState<{ id: string; name: string }[]>([
    { id: "101", name: "Alice" },
    { id: "102", name: "Bob" },
    { id: "103", name: "Charlie" },
    { id: "104", name: "David" },
    { id: "105", name: "Eva" },
  ]);

  const [termine, setTermine] = useState<Vorlesungstermin[]>([
    {
      id: "1",
      vorlesungId: "1",
      date: "2025-01-15",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "2",
      vorlesungId: "2",
      date: "2025-01-16",
      startTime: "14:00",
      endTime: "16:00",
    },
  ]);

  // Sample teacher graph data.
  /* eslint-disable-next-line */
  const [teacherData, setTeacherData] = useState<GlobalTeacherData>({
    TIF24: {
      "Web-Engineering 101": {
        lineData: [
          { week: "Woche 1", avgScore: 1.7 },
          { week: "Woche 2", avgScore: 1.7 },
          { week: "Woche 3", avgScore: 1.3 },
          { week: "Woche 4", avgScore: 1.0 },
        ],
        barData: [
          { week: "Woche 1", graded: 30 },
          { week: "Woche 2", graded: 32 },
          { week: "Woche 3", graded: 28 },
          { week: "Woche 4", graded: 35 },
        ],
        pieData: [
          { name: "Note 1", value: 40 },
          { name: "Note 2", value: 30 },
          { name: "Note 3", value: 20 },
          { name: "Note 4", value: 10 },
        ],
        metrics: {
          totalStudents: 100,
          assignmentsGraded: 125,
          avgScore: "1,7",
        },
      },
      "Programmierung 101": {
        lineData: [
          { week: "Woche 1", avgScore: 2.3 },
          { week: "Woche 2", avgScore: 2.0 },
          { week: "Woche 3", avgScore: 1.7 },
          { week: "Woche 4", avgScore: 2.0 },
        ],
        barData: [
          { week: "Woche 1", graded: 25 },
          { week: "Woche 2", graded: 28 },
          { week: "Woche 3", graded: 30 },
          { week: "Woche 4", graded: 27 },
        ],
        pieData: [
          { name: "Note 1", value: 25 },
          { name: "Note 2", value: 40 },
          { name: "Note 3", value: 20 },
          { name: "Note 4", value: 15 },
        ],
        metrics: {
          totalStudents: 90,
          assignmentsGraded: 110,
          avgScore: "2,0",
        },
      },
      "Mathematik 101": {
        lineData: [
          { week: "Woche 1", avgScore: 3.0 },
          { week: "Woche 2", avgScore: 3.0 },
          { week: "Woche 3", avgScore: 3.3 },
          { week: "Woche 4", avgScore: 3.0 },
        ],
        barData: [
          { week: "Woche 1", graded: 20 },
          { week: "Woche 2", graded: 22 },
          { week: "Woche 3", graded: 25 },
          { week: "Woche 4", graded: 23 },
        ],
        pieData: [
          { name: "Note 1", value: 15 },
          { name: "Note 2", value: 25 },
          { name: "Note 3", value: 30 },
          { name: "Note 4", value: 20 },
          { name: "Note 5", value: 10 },
        ],
        metrics: {
          totalStudents: 95,
          assignmentsGraded: 90,
          avgScore: "3,0",
        },
      },
    },
    TIF25: {
      "Web-Engineering 101": {
        lineData: [
          { week: "Woche 1", avgScore: 1.8 },
          { week: "Woche 2", avgScore: 1.9 },
          { week: "Woche 3", avgScore: 1.4 },
          { week: "Woche 4", avgScore: 1.2 },
        ],
        barData: [
          { week: "Woche 1", graded: 32 },
          { week: "Woche 2", graded: 33 },
          { week: "Woche 3", graded: 29 },
          { week: "Woche 4", graded: 36 },
        ],
        pieData: [
          { name: "Note 1", value: 42 },
          { name: "Note 2", value: 28 },
          { name: "Note 3", value: 18 },
          { name: "Note 4", value: 12 },
        ],
        metrics: {
          totalStudents: 105,
          assignmentsGraded: 130,
          avgScore: "1,8",
        },
      },
      "Programmierung 101": {
        lineData: [
          { week: "Woche 1", avgScore: 2.4 },
          { week: "Woche 2", avgScore: 2.1 },
          { week: "Woche 3", avgScore: 1.8 },
          { week: "Woche 4", avgScore: 2.1 },
        ],
        barData: [
          { week: "Woche 1", graded: 26 },
          { week: "Woche 2", graded: 29 },
          { week: "Woche 3", graded: 31 },
          { week: "Woche 4", graded: 28 },
        ],
        pieData: [
          { name: "Note 1", value: 27 },
          { name: "Note 2", value: 42 },
          { name: "Note 3", value: 18 },
          { name: "Note 4", value: 13 },
        ],
        metrics: {
          totalStudents: 92,
          assignmentsGraded: 115,
          avgScore: "2,1",
        },
      },
      "Mathematik 101": {
        lineData: [
          { week: "Woche 1", avgScore: 3.1 },
          { week: "Woche 2", avgScore: 3.0 },
          { week: "Woche 3", avgScore: 3.4 },
          { week: "Woche 4", avgScore: 3.1 },
        ],
        barData: [
          { week: "Woche 1", graded: 21 },
          { week: "Woche 2", graded: 23 },
          { week: "Woche 3", graded: 26 },
          { week: "Woche 4", graded: 24 },
        ],
        pieData: [
          { name: "Note 1", value: 16 },
          { name: "Note 2", value: 26 },
          { name: "Note 3", value: 31 },
          { name: "Note 4", value: 21 },
          { name: "Note 5", value: 11 },
        ],
        metrics: {
          totalStudents: 97,
          assignmentsGraded: 95,
          avgScore: "3,1",
        },
      },
    },
    TIF26: {
      "Web-Engineering 101": {
        lineData: [
          { week: "Woche 1", avgScore: 1.6 },
          { week: "Woche 2", avgScore: 1.5 },
          { week: "Woche 3", avgScore: 1.2 },
          { week: "Woche 4", avgScore: 1.0 },
        ],
        barData: [
          { week: "Woche 1", graded: 28 },
          { week: "Woche 2", graded: 30 },
          { week: "Woche 3", graded: 27 },
          { week: "Woche 4", graded: 33 },
        ],
        pieData: [
          { name: "Note 1", value: 38 },
          { name: "Note 2", value: 32 },
          { name: "Note 3", value: 18 },
          { name: "Note 4", value: 12 },
        ],
        metrics: {
          totalStudents: 98,
          assignmentsGraded: 120,
          avgScore: "1,6",
        },
      },
      "Programmierung 101": {
        lineData: [
          { week: "Woche 1", avgScore: 2.2 },
          { week: "Woche 2", avgScore: 2.0 },
          { week: "Woche 3", avgScore: 1.6 },
          { week: "Woche 4", avgScore: 1.9 },
        ],
        barData: [
          { week: "Woche 1", graded: 24 },
          { week: "Woche 2", graded: 27 },
          { week: "Woche 3", graded: 29 },
          { week: "Woche 4", graded: 25 },
        ],
        pieData: [
          { name: "Note 1", value: 26 },
          { name: "Note 2", value: 39 },
          { name: "Note 3", value: 19 },
          { name: "Note 4", value: 16 },
        ],
        metrics: {
          totalStudents: 88,
          assignmentsGraded: 108,
          avgScore: "2,0",
        },
      },
      "Mathematik 101": {
        lineData: [
          { week: "Woche 1", avgScore: 2.9 },
          { week: "Woche 2", avgScore: 2.8 },
          { week: "Woche 3", avgScore: 3.2 },
          { week: "Woche 4", avgScore: 2.9 },
        ],
        barData: [
          { week: "Woche 1", graded: 19 },
          { week: "Woche 2", graded: 21 },
          { week: "Woche 3", graded: 24 },
          { week: "Woche 4", graded: 22 },
        ],
        pieData: [
          { name: "Note 1", value: 14 },
          { name: "Note 2", value: 24 },
          { name: "Note 3", value: 29 },
          { name: "Note 4", value: 19 },
          { name: "Note 5", value: 9 },
        ],
        metrics: {
          totalStudents: 93,
          assignmentsGraded: 88,
          avgScore: "2,9",
        },
      },
    },
  });

  // Sample student graph data.
  /* eslint-disable-next-line */
  const [studentData, setStudentData] = useState<{
    [key: string]: StudentData;
  }>({
    "Web-Engineering": {
      lineData: [
        { assignment: "Projekt 1", score: 1.3 },
        { assignment: "Projekt 2", score: 2.0 },
        { assignment: "Projekt 3", score: 1.7 },
        { assignment: "Projekt 4", score: 1.0 },
      ],
      barData: [
        { topic: "HTML/CSS", score: 1.7 },
        { topic: "JavaScript", score: 2.0 },
        { topic: "Frameworks", score: 1.3 },
      ],
      pieData: [
        { name: "Praxis", value: 60 },
        { name: "Theorie", value: 40 },
      ],
      metrics: {
        currentGrade: "1,7",
        pendingAssignments: 1,
        attendanceRate: "100%",
      },
    },
    Programmierung: {
      lineData: [
        { assignment: "Übung 1", score: 2.2 },
        { assignment: "Übung 2", score: 2.4 },
        { assignment: "Übung 3", score: 2.1 },
        { assignment: "Übung 4", score: 2.3 },
      ],
      barData: [
        { topic: "Syntax", score: 2.2 },
        { topic: "Control Structures", score: 2.4 },
        { topic: "Data Structures", score: 2.1 },
      ],
      pieData: [
        { name: "Praxis", value: 55 },
        { name: "Theorie", value: 45 },
      ],
      metrics: {
        currentGrade: "2,2",
        pendingAssignments: 2,
        attendanceRate: "95%",
      },
    },
    Mathematik: {
      lineData: [
        { assignment: "Aufgabe 1", score: 3.0 },
        { assignment: "Aufgabe 2", score: 3.2 },
        { assignment: "Aufgabe 3", score: 3.1 },
        { assignment: "Aufgabe 4", score: 3.3 },
      ],
      barData: [
        { topic: "Algebra", score: 3.0 },
        { topic: "Analysis", score: 3.2 },
        { topic: "Stochastik", score: 3.1 },
      ],
      pieData: [
        { name: "Praxis", value: 50 },
        { name: "Theorie", value: 50 },
      ],
      metrics: {
        currentGrade: "3,1",
        pendingAssignments: 0,
        attendanceRate: "98%",
      },
    },
  });

  // CRUD functions.
  const addStudiengang = (studiengang: Studiengang) => {
    setStudiengaenge((prev) => [...prev, studiengang]);
  };
  const updateStudiengang = (studiengang: Studiengang) => {
    setStudiengaenge((prev) =>
      prev.map((sg) => (sg.id === studiengang.id ? studiengang : sg))
    );
  };
  const deleteStudiengang = (id: string) => {
    setStudiengaenge((prev) => prev.filter((sg) => sg.id !== id));
  };

  const addVorlesung = (vorlesung: Vorlesung) => {
    setVorlesungen((prev) => [...prev, vorlesung]);
  };
  const updateVorlesung = (vorlesung: Vorlesung) => {
    setVorlesungen((prev) =>
      prev.map((v) => (v.id === vorlesung.id ? vorlesung : v))
    );
  };
  const deleteVorlesung = (id: string) => {
    setVorlesungen((prev) => prev.filter((v) => v.id !== id));
  };

  const addDozent = (dozent: Dozent) => {
    setDozenten((prev) => [...prev, dozent]);
  };
  const updateDozent = (dozent: Dozent) => {
    setDozenten((prev) => prev.map((d) => (d.id === dozent.id ? dozent : d)));
  };
  const deleteDozent = (id: string) => {
    setDozenten((prev) => prev.filter((d) => d.id !== id));
  };

  const addTermin = (termin: Vorlesungstermin) => {
    setTermine((prev) => [...prev, termin]);
  };
  const updateTermin = (termin: Vorlesungstermin) => {
    setTermine((prev) => prev.map((t) => (t.id === termin.id ? termin : t)));
  };
  const deleteTermin = (id: string) => {
    setTermine((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        studiengaenge,
        vorlesungen,
        dozenten,
        students,
        termine,
        teacherData,
        studentData,
        addStudiengang,
        updateStudiengang,
        deleteStudiengang,
        addVorlesung,
        updateVorlesung,
        deleteVorlesung,
        addDozent,
        updateDozent,
        deleteDozent,
        addTermin,
        updateTermin,
        deleteTermin,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
