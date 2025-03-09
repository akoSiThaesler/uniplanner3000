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
  const { users, updateUser, addUser, deleteUser } = useAuth();
  // selectedUser will be non-null for edit mode; when null, we use add mode.
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  // New state for delete confirmation
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

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

  // New function to open delete confirmation dialog
  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
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

  // Function to handle delete confirmation
  const handleDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.email);
      setUserToDelete(null);
    }
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
            <TableCell sx={{ color: "var(--foreground)" }}>Email</TableCell>
            <TableCell sx={{ color: "var(--foreground)" }}>Role</TableCell>
            <TableCell sx={{ color: "var(--foreground)" }}>Courses</TableCell>
            <TableCell sx={{ color: "var(--foreground)" }}>Classes</TableCell>
            <TableCell sx={{ color: "var(--foreground)" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.email}>
              <TableCell sx={{ color: "var(--foreground)" }}>
                {user.email}
              </TableCell>
              <TableCell sx={{ color: "var(--foreground)" }}>
                {user.role}
              </TableCell>
              <TableCell sx={{ color: "var(--foreground)" }}>
                {user.courses?.join(", ") || "-"}
              </TableCell>
              <TableCell sx={{ color: "var(--foreground)" }}>
                {user.classes?.join(", ") || "-"}
              </TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => openEditDialog(user)}>
                  Edit
                </Button>
                {/* New Delete Button */}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => openDeleteDialog(user)}
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
      <Dialog open={isAddMode || Boolean(selectedUser)} onClose={handleClose}>
        <DialogTitle sx={{ color: "black" }}>
          {isAddMode ? "Add New User" : "Edit User"}
        </DialogTitle>
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {userToDelete && (
            <p>
              Are you sure you want to delete the user with email{" "}
              <strong>{userToDelete.email}</strong>?
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserToDelete(null)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
