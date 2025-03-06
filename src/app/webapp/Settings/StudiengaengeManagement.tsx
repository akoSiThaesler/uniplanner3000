// src/app/webapp/Settings/StudiengaengeManagement.tsx
"use client";
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useData, Studiengang } from "../../../context/DataContext";
import { useAuth } from "../../../context/AuthContext";

// Helper: for multi-select dropdown style
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StudiengaengeManagement = () => {
  const {
    studiengaenge,
    addStudiengang,
    updateStudiengang,
    deleteStudiengang,
  } = useData();
  const { users } = useAuth();

  // Create lists of teacher and student emails from existing users.
  const teacherOptions = users
    .filter((u) => u.role === "teacher")
    .map((u) => u.email);
  const studentOptions = users
    .filter((u) => u.role === "student")
    .map((u) => u.email);

  const [selectedStudiengang, setSelectedStudiengang] =
    useState<Studiengang | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const openAddDialog = () => {
    setIsAddMode(true);
    setSelectedStudiengang(null);
    setName("");
    setDescription("");
    setSelectedTeachers([]);
    setSelectedStudents([]);
  };

  const openEditDialog = (sg: Studiengang) => {
    setIsAddMode(false);
    setSelectedStudiengang(sg);
    setName(sg.name);
    setDescription(sg.description);
    /*     setSelectedTeachers(sg.teachers || []);
    setSelectedStudents(sg.students || []); */
  };

  const handleSave = () => {
    if (isAddMode) {
      const newStudiengang: Studiengang = {
        id: Date.now().toString(),
        name,
        description,
        /* teachers: selectedTeachers, */
        /*  students: selectedStudents, */
      };
      addStudiengang(newStudiengang);
    } else if (selectedStudiengang) {
      const updated: Studiengang = {
        ...selectedStudiengang,
        name,
        description,
        /*  teachers: selectedTeachers, */
        /*   students: selectedStudents, */
      };
      updateStudiengang(updated);
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedStudiengang(null);
    setIsAddMode(false);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Class Management</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={openAddDialog}
        className="mb-4"
      >
        Add New Class
      </Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Teachers</TableCell>
            <TableCell>Students</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studiengaenge.map((sg: Studiengang) => (
            <TableRow key={sg.id}>
              <TableCell>{sg.name}</TableCell>
              <TableCell>{sg.description}</TableCell>
              {/*    <TableCell>{sg.teachers?.join(", ") || "-"}</TableCell>
              <TableCell>{sg.students?.join(", ") || "-"}</TableCell> */}
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => openEditDialog(sg)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => deleteStudiengang(sg.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={isAddMode || Boolean(selectedStudiengang)}
        onClose={handleClose}
      >
        <DialogTitle>
          {isAddMode ? "Add New Studiengang" : "Edit Studiengang"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Teachers</InputLabel>
            <Select
              multiple
              value={selectedTeachers}
              onChange={(e) => setSelectedTeachers(e.target.value as string[])}
              input={<OutlinedInput label="Teachers" />}
              renderValue={(selected) => (selected as string[]).join(", ")}
              MenuProps={MenuProps}
            >
              {teacherOptions.map((teacher) => (
                <MenuItem key={teacher} value={teacher}>
                  <Checkbox checked={selectedTeachers.indexOf(teacher) > -1} />
                  <ListItemText primary={teacher} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Students</InputLabel>
            <Select
              multiple
              value={selectedStudents}
              onChange={(e) => setSelectedStudents(e.target.value as string[])}
              input={<OutlinedInput label="Students" />}
              renderValue={(selected) => (selected as string[]).join(", ")}
              MenuProps={MenuProps}
            >
              {studentOptions.map((student) => (
                <MenuItem key={student} value={student}>
                  <Checkbox checked={selectedStudents.indexOf(student) > -1} />
                  <ListItemText primary={student} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudiengaengeManagement;
