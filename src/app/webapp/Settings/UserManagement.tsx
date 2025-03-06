// src/app/webapp/Settings/UserManagement.tsx
"use client";
import React, { useState } from "react";
import {
  useAuth,
  User,
  UserRole,
  AuthUser,
} from "../../../context/AuthContext";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const UserManagement = () => {
  const { users, updateUser, addUser } = useAuth();
  // selectedUser will be non-null for edit mode; when null, we use add mode.
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  // Fields for both add and edit
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState<UserRole>("student");
  const [editedCourses, setEditedCourses] = useState("");
  const [editedClasses, setEditedClasses] = useState("");

  // Only used in add mode:
  const [editedPassword, setEditedPassword] = useState("");

  const openEditDialog = (user: User) => {
    setIsAddMode(false);
    setSelectedUser(user);
    setEditedEmail(user.email);
    setEditedRole(user.role);
    setEditedCourses(user.courses ? user.courses.join(", ") : "");
    setEditedClasses(user.classes ? user.classes.join(", ") : "");
  };

  const openAddDialog = () => {
    setIsAddMode(true);
    setSelectedUser(null);
    setEditedEmail("");
    setEditedPassword("");
    setEditedRole("student");
    setEditedCourses("");
    setEditedClasses("");
  };

  const handleSave = () => {
    if (isAddMode) {
      // Ensure email and password are provided in add mode
      if (!editedEmail || !editedPassword) return;
      const newUser: AuthUser = {
        email: editedEmail,
        password: editedPassword,
        role: editedRole,
        courses: editedCourses
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        classes: editedClasses
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      addUser(newUser);
    } else if (selectedUser) {
      updateUser({
        ...selectedUser,
        email: editedEmail,
        role: editedRole,
        courses: editedCourses
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        classes: editedClasses
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedUser(null);
    setIsAddMode(false);
  };

  return (
    <div className="flex flex-shrink-0 flex-col gap-4">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        className="flex justify-between"
      >
        <h2>User Management</h2>
        <Button variant="contained" onClick={openAddDialog}>
          Add New User
        </Button>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Courses</TableCell>
            <TableCell>Classes</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.email}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.courses?.join(", ") || "-"}</TableCell>
              <TableCell>{user.classes?.join(", ") || "-"}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => openEditDialog(user)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAddMode || Boolean(selectedUser)} onClose={handleClose}>
        <DialogTitle>{isAddMode ? "Add New User" : "Edit User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            fullWidth
            margin="dense"
          />
          {isAddMode && (
            <TextField
              label="Password"
              type="password"
              value={editedPassword}
              onChange={(e) => setEditedPassword(e.target.value)}
              fullWidth
              margin="dense"
            />
          )}
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value as UserRole)}
              label="Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
          {editedRole === "teacher" && (
            <TextField
              label="Assigned Courses (comma-separated)"
              value={editedCourses}
              onChange={(e) => setEditedCourses(e.target.value)}
              fullWidth
              margin="dense"
            />
          )}
          {(editedRole === "teacher" || editedRole === "student") && (
            <TextField
              label="Assigned Classes (comma-separated)"
              value={editedClasses}
              onChange={(e) => setEditedClasses(e.target.value)}
              fullWidth
              margin="dense"
            />
          )}
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

export default UserManagement;
