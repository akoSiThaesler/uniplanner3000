import React, { createContext, useContext, useState, ReactNode } from "react";

// Data types for academic data.
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
  color?: string;
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

// Blog post type.
export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  thumbnail: string;
  author: string;
  tags: string[];
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
  // Blog posts and CRUD functions.
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Sample degree programs.
  const [studiengaenge, setStudiengaenge] = useState<Studiengang[]>([
    { id: "1", name: "Informatik", description: "Informatik" },
    {
      id: "2",
      name: "Wirtschaftsinformatik",
      description: "Wirtschaftsinformatik",
    },
    { id: "3", name: "BWL", description: "Betriebswirtschaftslehre" },
  ]);

  // Sample courses.
  const [vorlesungen, setVorlesungen] = useState<Vorlesung[]>([
    {
      id: "1",
      title: "Web‑Engineering",
      studiengaengeId: "1",
      teacherName: "Prof. Dr. Schmidt",
      description: "An advanced course on modern web technologies.",
      bannerGradient: "bg-gradient-to-r from-green-500 to-teal-500",
      customIconUrl: "",
      studentNames: ["Alice", "Bob", "Charlie"],
      eventIds: ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"],
      color: "#60a5fa", // Blue
    },
    {
      id: "2",
      title: "Programming",
      studiengaengeId: "2",
      teacherName: "Prof. Dr. Lang",
      description: "Introduction to programming concepts and practical coding.",
      bannerGradient: "bg-gradient-to-r from-blue-500 to-indigo-500",
      customIconUrl: "",
      studentNames: ["Frank", "Grace", "Heidi"],
      eventIds: ["t10", "t11", "t12", "t13", "t14", "t15", "t16", "t17"],
      color: "#f87171", // Red
    },
    {
      id: "3",
      title: "Math",
      studiengaengeId: "3",
      teacherName: "Prof. Dr. Gauss",
      description:
        "Fundamentals of mathematics including algebra and calculus.",
      bannerGradient: "bg-gradient-to-r from-green-500 to-teal-500",
      customIconUrl: "",
      studentNames: ["Ivan", "Judy"],
      eventIds: ["t18", "t19", "t20", "t21"],
      color: "#fbbf24", // Amber
    },
    {
      id: "4",
      title: "BWL",
      studiengaengeId: "4",
      teacherName: "Prof. Dr. Müller",
      description: "Fundamentals of business administration and management.",
      bannerGradient: "bg-gradient-to-r from-purple-600 to-blue-500",
      customIconUrl: "",
      studentNames: ["Karl", "Laura"],
      eventIds: ["t22", "t23", "t24", "t25", "t26"],
      color: "#34d399", // Green
    },
    {
      id: "5",
      title: "Digital Technology",
      studiengaengeId: "5",
      teacherName: "Prof. Dr. Fischer",
      description: "Exploring the impact of digital technology on society.",
      bannerGradient: "bg-gradient-to-r from-pink-500 to-red-500",
      customIconUrl: "",
      studentNames: ["Mallory", "Niaj"],
      eventIds: ["t27", "t28", "t29", "t30"],
      color: "#a78bfa", // Purple
    },
    {
      id: "6",
      title: "Logic",
      studiengaengeId: "6",
      teacherName: "Prof. Dr. Turing",
      description: "Introduction to logical reasoning and formal logic.",
      bannerGradient: "bg-gradient-to-r from-purple-600 to-blue-500",
      customIconUrl: "",
      studentNames: ["Olivia", "Peggy"],
      eventIds: ["t31", "t32", "t33", "t34", "t35"],
      color: "#f472b6", // Pink
    },
  ]);

  const [dozenten, setDozenten] = useState<Dozent[]>([
    { id: "1", name: "Prof. Dr. Schmidt", email: "schmidt@example.com" },
    { id: "2", name: "Prof. Dr. Müller", email: "mueller@example.com" },
  ]);

  // Sample students.
  //eslint-disable-next-line
  const [students, setStudents] = useState<{ id: string; name: string }[]>([
    { id: "101", name: "Alice" },
    { id: "102", name: "Bob" },
    { id: "103", name: "Charlie" },
    { id: "104", name: "David" },
    { id: "105", name: "Eva" },
  ]);

  const [termine, setTermine] = useState<Vorlesungstermin[]>([
    // Logic on Saturdays in March: 1st, 8th, 15th, 22nd, 29th
    {
      id: "t1",
      vorlesungId: "6",
      date: "2025-03-01",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "t2",
      vorlesungId: "6",
      date: "2025-03-08",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "t3",
      vorlesungId: "6",
      date: "2025-03-15",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "t4",
      vorlesungId: "6",
      date: "2025-03-22",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "t5",
      vorlesungId: "6",
      date: "2025-03-29",
      startTime: "10:00",
      endTime: "12:00",
    },

    // Web‑Engineering on Mondays & Wednesdays:
    // Mondays: 3rd, 10th, 17th, 24th, 31st
    {
      id: "t6",
      vorlesungId: "1",
      date: "2025-03-03",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "t8",
      vorlesungId: "1",
      date: "2025-03-10",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "t10",
      vorlesungId: "1",
      date: "2025-03-17",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "t12",
      vorlesungId: "1",
      date: "2025-03-24",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "t14",
      vorlesungId: "1",
      date: "2025-03-31",
      startTime: "10:00",
      endTime: "12:00",
    },
    // Wednesdays: 5th, 12th, 19th, 26th
    {
      id: "t7",
      vorlesungId: "1",
      date: "2025-03-05",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "t9",
      vorlesungId: "1",
      date: "2025-03-12",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "t11",
      vorlesungId: "1",
      date: "2025-03-19",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      id: "t13",
      vorlesungId: "1",
      date: "2025-03-26",
      startTime: "10:00",
      endTime: "12:00",
    },

    // Programming on Tuesdays & Thursdays:
    // Tuesdays: 4th, 11th, 18th, 25th
    {
      id: "t15",
      vorlesungId: "2",
      date: "2025-03-04",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      id: "t17",
      vorlesungId: "2",
      date: "2025-03-11",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      id: "t19",
      vorlesungId: "2",
      date: "2025-03-18",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      id: "t21",
      vorlesungId: "2",
      date: "2025-03-25",
      startTime: "14:00",
      endTime: "16:00",
    },
    // Thursdays: 6th, 13th, 20th, 27th
    {
      id: "t16",
      vorlesungId: "2",
      date: "2025-03-06",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      id: "t18",
      vorlesungId: "2",
      date: "2025-03-13",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      id: "t20",
      vorlesungId: "2",
      date: "2025-03-20",
      startTime: "14:00",
      endTime: "16:00",
    },
    {
      id: "t22",
      vorlesungId: "2",
      date: "2025-03-27",
      startTime: "14:00",
      endTime: "16:00",
    },

    // Math on Fridays: 7th, 14th, 21st, 28th
    {
      id: "t23",
      vorlesungId: "3",
      date: "2025-03-07",
      startTime: "08:00",
      endTime: "10:00",
    },
    {
      id: "t24",
      vorlesungId: "3",
      date: "2025-03-14",
      startTime: "08:00",
      endTime: "10:00",
    },
    {
      id: "t25",
      vorlesungId: "3",
      date: "2025-03-21",
      startTime: "08:00",
      endTime: "10:00",
    },
    {
      id: "t26",
      vorlesungId: "3",
      date: "2025-03-28",
      startTime: "08:00",
      endTime: "10:00",
    },

    // BWL on Mondays: 3rd, 10th, 17th, 24th, 31st
    {
      id: "t27",
      vorlesungId: "4",
      date: "2025-03-03",
      startTime: "12:00",
      endTime: "14:00",
    },
    {
      id: "t28",
      vorlesungId: "4",
      date: "2025-03-10",
      startTime: "12:00",
      endTime: "14:00",
    },
    {
      id: "t29",
      vorlesungId: "4",
      date: "2025-03-17",
      startTime: "12:00",
      endTime: "14:00",
    },
    {
      id: "t30",
      vorlesungId: "4",
      date: "2025-03-24",
      startTime: "12:00",
      endTime: "14:00",
    },
    {
      id: "t31",
      vorlesungId: "4",
      date: "2025-03-31",
      startTime: "12:00",
      endTime: "14:00",
    },

    // Digital Technology on Wednesdays: 5th, 12th, 19th, 26th
    {
      id: "t32",
      vorlesungId: "5",
      date: "2025-03-05",
      startTime: "16:00",
      endTime: "18:00",
    },
    {
      id: "t33",
      vorlesungId: "5",
      date: "2025-03-12",
      startTime: "16:00",
      endTime: "18:00",
    },
    {
      id: "t34",
      vorlesungId: "5",
      date: "2025-03-19",
      startTime: "16:00",
      endTime: "18:00",
    },
    {
      id: "t35",
      vorlesungId: "5",
      date: "2025-03-26",
      startTime: "16:00",
      endTime: "18:00",
    },
  ]);

  // Sample teacher graph data.
  //eslint-disable-next-line
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
  //eslint-disable-next-line
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

  // Blog posts state with sample data.
  const initialBlogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Introducing Our Latest Feature",
      excerpt: "Revolutionize your workflow with our new productivity booster.",
      content:
        "We're excited to announce our latest feature that revolutionizes productivity. Our new tool integrates seamlessly into your workflow, automates repetitive tasks, and provides real-time analytics to help you make data-driven decisions.",
      date: "2025-03-01",
      thumbnail:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "teacher@example.com",
      tags: ["feature", "innovation", "productivity"],
    },
    {
      id: 2,
      title: "Minimalism in Modern UI",
      excerpt:
        "Discover how minimalism enhances user experience in digital design.",
      content:
        "Modern UI design has embraced minimalism to declutter digital interfaces and focus on what truly matters. This article explores the principles behind minimalism, the benefits of clean design, and how it leads to better user engagement.",
      date: "2025-02-20",
      thumbnail:
        "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "teacher@example.com",
      tags: ["design", "minimalism", "UI"],
    },
    {
      id: 3,
      title: "Tech Trends in 2025",
      excerpt:
        "Stay ahead with insights on AI, blockchain, and quantum computing.",
      content:
        "The technology landscape is evolving rapidly. In this article, we dive into the most promising trends of 2025, including advancements in artificial intelligence, the growing influence of blockchain, and the potential of quantum computing to reshape industries.",
      date: "2025-02-10",
      thumbnail:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "admin@example.com",
      tags: ["tech", "trends", "innovation"],
    },
    {
      id: 4,
      title: "Understanding React Hooks",
      excerpt:
        "Learn how React Hooks simplify state management and lifecycle methods.",
      content:
        "React Hooks have transformed how developers write functional components. This article provides a deep dive into useState, useEffect, and custom hooks, offering practical examples that demonstrate how these powerful tools can simplify complex state management tasks.",
      date: "2025-03-05",
      thumbnail:
        "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "owner@example.com",
      tags: ["react", "hooks", "javascript"],
    },
    {
      id: 5,
      title: "Mastering CSS Grid Layout",
      excerpt: "Unlock the full potential of CSS Grid for responsive design.",
      content:
        "CSS Grid Layout has revolutionized web design by enabling the creation of complex, responsive layouts with ease. In this comprehensive guide, we explore techniques, best practices, and creative approaches to using CSS Grid to build modern, fluid web interfaces.",
      date: "2025-03-02",
      thumbnail:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "admin@example.com",
      tags: ["css", "grid", "web design"],
    },
    {
      id: 6,
      title: "Building Scalable APIs with Node.js",
      excerpt: "Best practices for creating robust and efficient backend APIs.",
      content:
        "Node.js offers a powerful platform for building scalable APIs. This article covers essential techniques including API design, error handling, and performance optimization. Learn how to create robust backend services that can handle high traffic and complex data interactions.",
      date: "2025-03-03",
      thumbnail:
        "https://staticg.sportskeeda.com/editor/2022/05/4b83a-16515997742264-1920.jpg",
      author: "admin@example.com",
      tags: ["node", "api", "backend"],
    },
    {
      id: 7,
      title: "Effective Debugging Techniques",
      excerpt:
        "Master the art of debugging to speed up your development process.",
      content:
        "Debugging is an indispensable skill for any developer. In this article, we share effective strategies for identifying and resolving code issues—from leveraging advanced logging techniques to utilizing modern debugging tools and best practices for efficient troubleshooting.",
      date: "2025-03-04",
      thumbnail:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "student@example.com",
      tags: ["debugging", "tips", "development"],
    },
  ];

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);

  // CRUD functions for blog posts.
  const addBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => [post, ...prev]);
  };

  const updateBlogPost = (updatedPost: BlogPost) => {
    setBlogPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const deleteBlogPost = (id: number) => {
    setBlogPosts((prev) => prev.filter((post) => post.id !== id));
  };

  // CRUD functions for other data.
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
  const deleteUser = (email: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
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
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
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
