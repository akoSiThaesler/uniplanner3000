"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dummy data for Teacher view (multiple classes)
const teacherDataByClass = {
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
};

// Dummy data for Student view (multiple subjects)
const studentDataBySubject = {
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
      { assignment: "Aufgabe 1", score: 2.3 },
      { assignment: "Aufgabe 2", score: 2.0 },
      { assignment: "Aufgabe 3", score: 1.7 },
      { assignment: "Aufgabe 4", score: 2.0 },
    ],
    barData: [
      { topic: "Algorithmen", score: 2.3 },
      { topic: "Datenstrukturen", score: 2.0 },
      { topic: "Objektorientierung", score: 1.7 },
    ],
    pieData: [
      { name: "Übungen", value: 50 },
      { name: "Theorie", value: 50 },
    ],
    metrics: {
      currentGrade: "2,0",
      pendingAssignments: 2,
      attendanceRate: "95%",
    },
  },
  Mathematik: {
    lineData: [
      { assignment: "Klausur 1", score: 3.0 },
      { assignment: "Klausur 2", score: 2.7 },
      { assignment: "Klausur 3", score: 3.3 },
      { assignment: "Klausur 4", score: 3.0 },
    ],
    barData: [
      { topic: "Analysis", score: 3.0 },
      { topic: "Lineare Algebra", score: 2.7 },
      { topic: "Stochastik", score: 3.3 },
    ],
    pieData: [
      { name: "Übungsaufgaben", value: 40 },
      { name: "Theorie", value: 60 },
    ],
    metrics: {
      currentGrade: "3,0",
      pendingAssignments: 1,
      attendanceRate: "90%",
    },
  },
};

const Dashboard = () => {
  const [mode, setMode] = useState<"student" | "teacher">("student");
  const [selectedClass, setSelectedClass] = useState<
    "Web-Engineering 101" | "Programmierung 101" | "Mathematik 101"
  >("Web-Engineering 101");
  const [selectedSubject, setSelectedSubject] = useState<
    "Web-Engineering" | "Programmierung" | "Mathematik"
  >("Web-Engineering");

  const toggleMode = () =>
    setMode((prev) => (prev === "student" ? "teacher" : "student"));

  // Data selection based on mode
  const teacherData = teacherDataByClass[selectedClass];
  const studentData = studentDataBySubject[selectedSubject];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          onClick={toggleMode}
          startIcon={mode === "student" ? <WorkIcon /> : <SchoolIcon />}
        >
          Switch to {mode === "student" ? "Teacher" : "Student"} Mode
        </Button>
      </Box>

      {/* Teacher Class Selector */}
      {mode === "teacher" && (
        <Box mb={3}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="class-select-label">Select Class</InputLabel>
            <Select
              labelId="class-select-label"
              value={selectedClass}
              label="Select Class"
              onChange={(e) =>
                setSelectedClass(
                  e.target.value as
                    | "Web-Engineering 101"
                    | "Programmierung 101"
                    | "Mathematik 101"
                )
              }
            >
              {Object.keys(teacherDataByClass).map((className) => (
                <MenuItem key={className} value={className}>
                  {className}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Student Subject Selector */}
      {mode === "student" && (
        <Box mb={3}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="subject-select-label">Select Subject</InputLabel>
            <Select
              labelId="subject-select-label"
              value={selectedSubject}
              label="Select Subject"
              onChange={(e) =>
                setSelectedSubject(
                  e.target.value as
                    | "Web-Engineering"
                    | "Programmierung"
                    | "Mathematik"
                )
              }
            >
              {Object.keys(studentDataBySubject).map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Metrics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {mode === "student" ? "Current Grade" : "Total Students"}
              </Typography>
              <Typography variant="h4">
                {mode === "student"
                  ? studentData.metrics.currentGrade
                  : teacherData.metrics.totalStudents}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {mode === "student"
                  ? "Pending Assignments"
                  : "Assignments Graded"}
              </Typography>
              <Typography variant="h4">
                {mode === "student"
                  ? studentData.metrics.pendingAssignments
                  : teacherData.metrics.assignmentsGraded}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {mode === "student" ? "Attendance Rate" : "Avg Class Score"}
              </Typography>
              <Typography variant="h4">
                {mode === "student"
                  ? studentData.metrics.attendanceRate
                  : teacherData.metrics.avgScore}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Graphs Section */}
      <Grid container spacing={3}>
        {/* Line Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
              {mode === "student"
                ? `Assignment Progress - ${selectedSubject}`
                : `Weekly Average Score - ${selectedClass}`}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={
                  mode === "student"
                    ? studentData.lineData
                    : teacherData.lineData
                }
              >
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey={mode === "student" ? "assignment" : "week"} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={mode === "student" ? "score" : "avgScore"}
                  stroke={mode === "student" ? "#82ca9d" : "#8884d8"}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
              {mode === "student"
                ? `Topic Scores - ${selectedSubject}`
                : `Assignments Graded per Week - ${selectedClass}`}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={
                  mode === "student" ? studentData.barData : teacherData.barData
                }
              >
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey={mode === "student" ? "topic" : "week"} />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey={mode === "student" ? "score" : "graded"}
                  fill={mode === "student" ? "#ffc658" : "#82ca9d"}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
              {mode === "student"
                ? `Study Time Distribution - ${selectedSubject}`
                : `Grade Distribution - ${selectedClass}`}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={
                    mode === "student"
                      ? studentData.pieData
                      : teacherData.pieData
                  }
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {(mode === "student"
                    ? studentData.pieData
                    : teacherData.pieData
                  ).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Activity Panel */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {mode === "student" ? (
              <Typography variant="body1">
                You submitted your latest assignment in {selectedSubject} today!
              </Typography>
            ) : (
              <Typography variant="body1">
                Graded 10 new assignments for {selectedClass} today!
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
