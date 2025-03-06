"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
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
  const coursesForClass = teacherData[teacherClass]
    ? Object.keys(teacherData[teacherClass])
    : [];
  const [selectedCourse, setSelectedCourse] = useState<string>(
    coursesForClass[0] || ""
  );

  // When teacherClass changes, update selectedCourse if necessary
  useEffect(() => {
    const courses = teacherData[teacherClass]
      ? Object.keys(teacherData[teacherClass])
      : [];
    if (courses.length > 0 && !courses.includes(selectedCourse)) {
      setSelectedCourse(courses[0]);
    }
  }, [teacherClass, teacherData, selectedCourse]);

  const toggleMode = () =>
    setMode((prev) => (prev === "student" ? "teacher" : "student"));

  // Get current data for charts
  const currentTeacherData =
    teacherData && teacherData[teacherClass]
      ? teacherData[teacherClass][selectedCourse]
      : null;
  const currentStudentData = studentData[selectedSubject];

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: "var(--background)",
      border: "1px solid var(--foreground)",
    },
    labelStyle: { color: "var(--foreground)" },
    itemStyle: { color: "var(--foreground)" },
  };

  return (
    <Box sx={{ p: "var(--spacing-8)", color: "var(--foreground)" }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="var(--spacing-3)"
      >
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          onClick={toggleMode}
          startIcon={
            mode === "student" ? (
              <WorkIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
            ) : (
              <SchoolIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
            )
          }
          sx={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--foreground)",
            padding: { xs: "4px 8px", sm: "6px 12px", md: "8px 16px" },
            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
            "&:hover": {
              backgroundColor: "var(--background-2)",
            },
          }}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            Switch to {mode === "student" ? "Teacher" : "Student"} Mode
          </Box>
        </Button>
      </Box>

      {/* Mode-Specific Selectors */}
      {mode === "teacher" ? (
        <Box display="flex" gap="var(--spacing-2)" mb="var(--spacing-3)">
          <FormControl
            sx={{
              minWidth: 200,
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
          >
            <InputLabel
              id="teacher-class-select-label"
              sx={{
                color: "var(--foreground)",
                px: 1,
                "&.Mui-focused": {
                  color: "var(--foreground)",
                  backgroundColor: "var(--background)",
                },
              }}
            >
              Select Class
            </InputLabel>
            <Select
              labelId="teacher-class-select-label"
              value={teacherClass}
              label="Select Class"
              onChange={(e) =>
                setTeacherClass(e.target.value as "TIF24" | "TIF25" | "TIF26")
              }
              sx={{
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
              }}
            >
              {teacherClasses.map((tc) => (
                <MenuItem key={tc} value={tc}>
                  {tc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              minWidth: 200,
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
          >
            <InputLabel
              id="course-select-label"
              sx={{
                color: "var(--foreground)",
                px: 1,
                "&.Mui-focused": {
                  color: "var(--foreground)",
                  backgroundColor: "var(--background)",
                },
              }}
            >
              Select Course
            </InputLabel>
            <Select
              labelId="course-select-label"
              value={selectedCourse}
              label="Select Course"
              onChange={(e) => setSelectedCourse(e.target.value)}
              sx={{
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
              }}
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
        <Box mb="var(--spacing-3)">
          <FormControl
            sx={{
              minWidth: 200,
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
          >
            <InputLabel
              id="subject-select-label"
              sx={{
                color: "var(--foreground)",
                px: 1,
                "&.Mui-focused": {
                  color: "var(--foreground)",
                  backgroundColor: "var(--background)",
                },
              }}
            >
              Select Subject
            </InputLabel>
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
              sx={{
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
              }}
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
      <Grid container spacing={3} mb="var(--spacing-3)">
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--foreground)",
            }}
          >
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
          <Card
            sx={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--foreground)",
            }}
          >
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
          <Card
            sx={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--foreground)",
            }}
          >
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
              <Paper
                sx={{
                  p: "var(--spacing-2)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--foreground)",
                }}
              >
                <Typography variant="h6" mb="var(--spacing-2)">
                  Weekly Average Score - {selectedCourse} ({teacherClass})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={currentTeacherData.lineData}
                    style={{ backgroundColor: "var(--background)" }}
                  >
                    <CartesianGrid stroke="var(--chart-grid-stroke)" />
                    <XAxis dataKey="week" stroke="var(--chart-axis-stroke)" />
                    <YAxis stroke="var(--chart-axis-stroke)" />
                    <Tooltip {...tooltipStyle} />
                    <Line
                      type="monotone"
                      dataKey="avgScore"
                      stroke="var(--chart-line-stroke)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Assignments Graded */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: "var(--spacing-2)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--foreground)",
                }}
              >
                <Typography variant="h6" mb="var(--spacing-2)">
                  Assignments Graded - {selectedCourse} ({teacherClass})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={currentTeacherData.barData}
                    style={{ backgroundColor: "var(--background)" }}
                  >
                    <CartesianGrid stroke="var(--chart-grid-stroke)" />
                    <XAxis dataKey="week" stroke="var(--chart-axis-stroke)" />
                    <YAxis stroke="var(--chart-axis-stroke)" />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="graded" fill="var(--chart-bar-fill)" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Grade Distribution */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: "var(--spacing-2)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--foreground)",
                }}
              >
                <Typography variant="h6" mb="var(--spacing-2)">
                  Grade Distribution - {selectedCourse} ({teacherClass})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart style={{ backgroundColor: "var(--background)" }}>
                    <Pie
                      data={currentTeacherData.pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="var(--chart-line-stroke)"
                      label
                    >
                      {currentTeacherData.pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`var(--pie-color-${index + 1})`}
                        />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Combined Trends Dual-Axis Chart */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: "var(--spacing-2)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--foreground)",
                }}
              >
                <Typography variant="h6" mb="var(--spacing-2)">
                  Combined Trends - {selectedCourse} ({teacherClass})
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={currentTeacherData.lineData}
                    style={{ backgroundColor: "var(--background)" }}
                  >
                    <CartesianGrid stroke="var(--chart-grid-stroke)" />
                    <XAxis dataKey="week" stroke="var(--chart-axis-stroke)" />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      stroke="var(--chart-line-stroke)"
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="var(--chart-bar-fill)"
                    />
                    <Tooltip {...tooltipStyle} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="avgScore"
                      stroke="var(--chart-line-stroke)"
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
                      stroke="var(--chart-bar-fill)"
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
              <Paper
                sx={{
                  p: "var(--spacing-2)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--foreground)",
                }}
              >
                <Typography variant="h6" mb="var(--spacing-2)">
                  Assignment Progress - {selectedSubject}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={currentStudentData.lineData}
                    style={{ backgroundColor: "var(--background)" }}
                  >
                    <CartesianGrid stroke="var(--chart-grid-stroke)" />
                    <XAxis
                      dataKey="assignment"
                      stroke="var(--chart-axis-stroke)"
                    />
                    <YAxis stroke="var(--chart-axis-stroke)" />
                    <Tooltip {...tooltipStyle} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--chart-line-stroke)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Topic Scores */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: "var(--spacing-2)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--foreground)",
                }}
              >
                <Typography variant="h6" mb="var(--spacing-2)">
                  Topic Scores - {selectedSubject}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={currentStudentData.barData}
                    style={{ backgroundColor: "var(--background)" }}
                  >
                    <CartesianGrid stroke="var(--chart-grid-stroke)" />
                    <XAxis dataKey="topic" stroke="var(--chart-axis-stroke)" />
                    <YAxis stroke="var(--chart-axis-stroke)" />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="score" fill="var(--chart-bar-fill)" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Study Time Distribution */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: "var(--spacing-2)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--foreground)",
                }}
              >
                <Typography variant="h6" mb="var(--spacing-2)">
                  Study Time Distribution - {selectedSubject}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart style={{ backgroundColor: "var(--background)" }}>
                    <Pie
                      data={currentStudentData.pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="var(--chart-line-stroke)"
                      label
                    >
                      {currentStudentData.pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`var(--pie-color-${index + 1})`}
                        />
                      ))}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Score Trend Area Chart */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: "var(--spacing-2)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--foreground)",
                }}
              >
                <Typography variant="h6" mb="var(--spacing-2)">
                  Score Trend Area - {selectedSubject}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={currentStudentData.lineData}
                    style={{ backgroundColor: "var(--background)" }}
                  >
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
                          stopColor="var(--chart-area-stroke)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--chart-area-stroke)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--chart-grid-stroke)"
                    />
                    <XAxis
                      dataKey="assignment"
                      stroke="var(--chart-axis-stroke)"
                    />
                    <YAxis stroke="var(--chart-axis-stroke)" />
                    <Tooltip {...tooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="var(--chart-area-stroke)"
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
              p: "var(--spacing-2)",
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--foreground)",
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
