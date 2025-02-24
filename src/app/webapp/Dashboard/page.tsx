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
  AreaChart,
  Area,
} from "recharts";
import { useData } from "../../../context/DataContext";

export default function Dashboard() {
  // Global data from context
  const { teacherData, studentData } = useData();

  // Local state for mode and selectors
  const [mode, setMode] = useState<"student" | "teacher">("student");
  const [selectedSubject, setSelectedSubject] = useState<
    "Web-Engineering" | "Programmierung" | "Mathematik"
  >("Web-Engineering");

  // Teacher view: two selectors: one for the teacher class and one for the course
  const teacherClasses = ["TIF24", "TIF25", "TIF26"];
  const [teacherClass, setTeacherClass] = useState<"TIF24" | "TIF25" | "TIF26">(
    "TIF24"
  );
  // Dynamically set the selected course using the keys from teacherData for the chosen teacherClass
  const coursesForClass = teacherData[teacherClass]
    ? Object.keys(teacherData[teacherClass])
    : [];
  const [selectedCourse, setSelectedCourse] = useState<string>(
    coursesForClass[0] || ""
  );

  // When teacherClass changes, update selectedCourse if necessary
  React.useEffect(() => {
    const courses = teacherData[teacherClass]
      ? Object.keys(teacherData[teacherClass])
      : [];
    if (courses.length > 0 && !courses.includes(selectedCourse)) {
      setSelectedCourse(courses[0]);
    }
  }, [teacherClass, teacherData, selectedCourse]);

  const toggleMode = () =>
    setMode((prev) => (prev === "student" ? "teacher" : "student"));

  // Select the current teacher data based on teacherClass and selectedCourse
  const currentTeacherData =
    teacherData && teacherData[teacherClass]
      ? teacherData[teacherClass][selectedCourse]
      : null;
  // For student view, currentStudentData remains as before:
  const currentStudentData = studentData[selectedSubject];

  return (
    <Box sx={{ p: 8 }}>
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

      {/* Mode-Specific Selectors */}
      {mode === "teacher" ? (
        <Box display="flex" gap={2} mb={3}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="teacher-class-select-label">
              Select Class
            </InputLabel>
            <Select
              labelId="teacher-class-select-label"
              value={teacherClass}
              label="Select Class"
              onChange={(e) =>
                setTeacherClass(e.target.value as "TIF24" | "TIF25" | "TIF26")
              }
            >
              {teacherClasses.map((tc) => (
                <MenuItem key={tc} value={tc}>
                  {tc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="course-select-label">Select Course</InputLabel>
            <Select
              labelId="course-select-label"
              value={selectedCourse}
              label="Select Course"
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {coursesForClass.map((course) => (
                <MenuItem key={course} value={course}>
                  {course}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : (
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
              {Object.keys(studentData).map((subject) => (
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
                  ? currentStudentData?.metrics.currentGrade
                  : currentTeacherData?.metrics.totalStudents}
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
                  ? currentStudentData?.metrics.pendingAssignments
                  : currentTeacherData?.metrics.assignmentsGraded}
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
                  ? currentStudentData?.metrics.attendanceRate
                  : currentTeacherData?.metrics.avgScore}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Graphs Section */}
      <Grid container spacing={3}>
        {mode === "teacher" && currentTeacherData && (
          <>
            {/* Weekly Average Score */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" mb={2}>
                  Weekly Average Score - {selectedCourse} ({teacherClass})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentTeacherData.lineData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgScore" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            {/* Assignments Graded */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" mb={2}>
                  Assignments Graded - {selectedCourse} ({teacherClass})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={currentTeacherData.barData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="graded" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            {/* Grade Distribution */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" mb={2}>
                  Grade Distribution - {selectedCourse} ({teacherClass})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={currentTeacherData.pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {currentTeacherData.pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][
                              index % 4
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            {/* Combined Trends Dual-Axis Chart */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" mb={2}>
                  Combined Trends - {selectedCourse} ({teacherClass})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentTeacherData.lineData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#82ca9d"
                    />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="avgScore"
                      stroke="#8884d8"
                      name="Avg Score"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey={(data) => {
                        const match = currentTeacherData.barData.find(
                          (item) => item.week === data.week
                        );
                        return match ? match.graded : 0;
                      }}
                      stroke="#82ca9d"
                      name="Graded"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </>
        )}

        {mode === "student" && currentStudentData && (
          <>
            {/* Assignment Progress */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" mb={2}>
                  Assignment Progress - {selectedSubject}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentStudentData.lineData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="assignment" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            {/* Topic Scores */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" mb={2}>
                  Topic Scores - {selectedSubject}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={currentStudentData.barData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="topic" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            {/* Study Time Distribution */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" mb={2}>
                  Study Time Distribution - {selectedSubject}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={currentStudentData.pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {currentStudentData.pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][
                              index % 4
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            {/* Score Trend Area Chart */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" mb={2}>
                  Score Trend Area - {selectedSubject}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={currentStudentData.lineData}>
                    <defs>
                      <linearGradient
                        id="colorScore"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="assignment" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorScore)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </>
        )}

        {/* Common Activity Panel */}
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
                Graded 10 new assignments for {selectedCourse} ({teacherClass})
                today!
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
