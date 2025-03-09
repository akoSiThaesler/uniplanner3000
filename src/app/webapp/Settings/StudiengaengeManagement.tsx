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

  // New state for deletion confirmation
  const [studiengangToDelete, setStudiengangToDelete] =
    useState<Studiengang | null>(null);

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
    /* setSelectedTeachers(sg.teachers || []);
    setSelectedStudents(sg.students || []); */
  };

  // New function to open delete confirmation dialog
  const openDeleteDialog = (sg: Studiengang) => {
    setStudiengangToDelete(sg);
  };

  const handleSave = () => {
    if (isAddMode) {
      const newStudiengang: Studiengang = {
        id: Date.now().toString(),
        name,
        description,
        /* teachers: selectedTeachers, */
        /* students: selectedStudents, */
      };
      addStudiengang(newStudiengang);
    } else if (selectedStudiengang) {
      const updated: Studiengang = {
        ...selectedStudiengang,
        name,
        description,
        /* teachers: selectedTeachers, */
        /* students: selectedStudents, */
      };
      updateStudiengang(updated);
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedStudiengang(null);
    setIsAddMode(false);
  };

  // Handle deletion confirmation
  const handleDelete = () => {
    if (studiengangToDelete) {
      deleteStudiengang(studiengangToDelete.id);
      setStudiengangToDelete(null);
    }
  };

  return (
    <div className="mt-8">
      {/* Header row with left-aligned title and right-aligned add button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Class Management</h2>
        <Button variant="contained" color="primary" onClick={openAddDialog}>
          Add New Class
        </Button>
      </div>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "var(--foreground)" }}>Name</TableCell>
            <TableCell sx={{ color: "var(--foreground)" }}>
              Description
            </TableCell>
            {/* Uncomment below if needed */}
            {/* <TableCell>Teachers</TableCell>
            <TableCell>Students</TableCell> */}
            <TableCell sx={{ color: "var(--foreground)" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studiengaenge.map((sg: Studiengang) => (
            <TableRow key={sg.id}>
              <TableCell sx={{ color: "var(--foreground)" }}>
                {sg.name}
              </TableCell>
              <TableCell sx={{ color: "var(--foreground)" }}>
                {sg.description}
              </TableCell>
              {/* Uncomment below if needed */}
              {/* <TableCell>{sg.teachers?.join(", ") || "-"}</TableCell>
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
                  onClick={() => openDeleteDialog(sg)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Dialog */}
      <Dialog
        open={isAddMode || Boolean(selectedStudiengang)}
        onClose={handleClose}
      >
        <DialogTitle sx={{ color: "black" }}>
          {isAddMode ? "Add New Class" : "Edit Class"}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(studiengangToDelete)}
        onClose={() => setStudiengangToDelete(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {studiengangToDelete && (
            <p>
              Are you sure you want to delete the class{" "}
              <strong>{studiengangToDelete.name}</strong>?
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStudiengangToDelete(null)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudiengaengeManagement;
