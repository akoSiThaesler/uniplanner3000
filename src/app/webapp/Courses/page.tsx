// src/app/webapp/courses/page.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useData } from "../../../context/DataContext";

/**
 * Course type alias (mirrors Vorlesung in DataContext)
 */
type Course = {
  id: string;
  title: string;
  description?: string;
  bannerGradient?: string;
  customIconUrl?: string;
  studiengaengeId: string;
  teacherName?: string;
  studentNames?: string[];
  assignments?: {
    id: string;
    title: string;
    dueDate: string;
    description?: string;
  }[];
  materials?: { id: string; title: string; url: string }[];
  eventIds?: string[];
};

/**
 * Studiengang type alias
 */
type Studiengang = {
  id: string;
  name: string;
};

/**
 * GradientSelector:
 * Displays preset gradient options as clickable boxes.
 */
type GradientOption = { value: string; label: string };

interface GradientSelectorProps {
  selectedGradient: string;
  onSelect: (value: string) => void;
}

const GradientSelector: React.FC<GradientSelectorProps> = ({
  selectedGradient,
  onSelect,
}) => {
  const options: GradientOption[] = [
    {
      value: "bg-gradient-to-r from-green-500 to-teal-500",
      label: "Green-Teal",
    },
    {
      value: "bg-gradient-to-r from-purple-600 to-blue-500",
      label: "Purple-Blue",
    },
    {
      value: "bg-gradient-to-r from-red-500 to-orange-500",
      label: "Red-Orange",
    },
    {
      value: "bg-gradient-to-r from-blue-500 to-indigo-500",
      label: "Blue-Indigo",
    },
    {
      value: "bg-gradient-to-r from-pink-500 to-yellow-500",
      label: "Pink-Yellow",
    },
  ];
  return (
    <div className="flex space-x-2">
      {options.map((option) => (
        <div
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`w-16 h-16 rounded cursor-pointer border-2 ${
            selectedGradient === option.value
              ? "border-blue-500"
              : "border-transparent"
          } ${option.value}`}
          title={option.label}
        ></div>
      ))}
    </div>
  );
};

/**
 * StudentMultiSelect:
 * Renders a list of checkboxes for each student.
 */
interface StudentMultiSelectProps {
  students: { id: string; name: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const StudentMultiSelect: React.FC<StudentMultiSelectProps> = ({
  students,
  selected,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {students.map((student) => (
        <label key={student.id} className="flex items-center">
          <input
            type="checkbox"
            value={student.name}
            checked={selected.includes(student.name)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...selected, student.name]);
              } else {
                onChange(selected.filter((name) => name !== student.name));
              }
            }}
            className="form-checkbox"
          />
          <span className="ml-2">{student.name}</span>
        </label>
      ))}
    </div>
  );
};

/**
 * CourseModal:
 * Animated modal displaying detailed course information.
 */
const CourseModal = ({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black opacity-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        ></motion.div>
        <motion.div
          className="bg-white relative z-50 rounded-lg p-6 max-w-lg w-full shadow-xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`h-32 w-full flex items-center ${
              course.bannerGradient
                ? course.bannerGradient
                : "bg-gradient-to-r from-purple-600 to-blue-500"
            }`}
          >
            {course.customIconUrl && (
              <Image
                src={course.customIconUrl}
                alt="Course Icon"
                className="h-12 w-12 m-4"
              />
            )}
          </div>
          <h2 className="text-2xl font-bold mt-4">{course.title}</h2>
          <p className="mt-2">{course.description}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Assignments</h3>
            {course.assignments && course.assignments.length > 0 ? (
              <ul className="list-disc ml-5">
                {course.assignments.map((a) => (
                  <li key={a.id} className="text-sm text-gray-600">
                    <strong>{a.title}</strong> (Due: {a.dueDate})
                    {a.description && ` - ${a.description}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No assignments available.</p>
            )}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Materials</h3>
            {course.materials && course.materials.length > 0 ? (
              <ul className="list-disc ml-5">
                {course.materials.map((m) => (
                  <li key={m.id} className="text-sm">
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {m.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No materials available.</p>
            )}
          </div>
          <p className="mt-4 text-xs text-gray-600">
            Teacher: {course.teacherName || "N/A"} | Students:{" "}
            {course.studentNames ? course.studentNames.join(", ") : "N/A"}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * CourseCard:
 * Displays a summarized course card in view mode.
 */
const CourseCard = ({
  course,
  onView,
}: {
  course: Course;
  onView: (course: Course) => void;
}) => {
  return (
    <motion.div
      className="border rounded-lg shadow-lg overflow-hidden m-4 cursor-pointer hover:scale-105 transition-transform"
      onClick={() => onView(course)}
      whileHover={{ scale: 1.03 }}
    >
      <div
        className={`h-40 w-full flex items-center ${
          course.bannerGradient
            ? course.bannerGradient
            : "bg-gradient-to-r from-purple-600 to-blue-500"
        }`}
      >
        {course.customIconUrl && (
          <Image
            src={course.customIconUrl}
            alt="Course Icon"
            className="h-12 w-12 m-4"
          />
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{course.title}</h2>
        <p className="text-sm text-gray-700 line-clamp-3">
          {course.description}
        </p>
        <p className="mt-1 text-xs text-gray-600">
          Teacher: {course.teacherName || "N/A"} | Students:{" "}
          {course.studentNames ? course.studentNames.join(", ") : "N/A"}
        </p>
      </div>
    </motion.div>
  );
};

/**
 * EditCourseForm:
 * A form for adding/updating courses.
 * Uses dropdowns for Studiengang and Teacher, and a checkbox list for selecting students.
 */
interface EditCourseFormProps {
  course: Course;
  onSubmit: (course: Course) => void;
  onCancel: () => void;
  teachers: { id: string; name: string }[];
  studiengaenge: Studiengang[];
  students: { id: string; name: string }[];
}

const EditCourseForm: React.FC<EditCourseFormProps> = ({
  course,
  onSubmit,
  onCancel,
  teachers,
  studiengaenge,
  students,
}) => {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description || "");
  const [bannerGradient, setBannerGradient] = useState(
    course.bannerGradient || ""
  );
  const [customIconUrl, setCustomIconUrl] = useState(
    course.customIconUrl || ""
  );
  const [studiengaengeId, setStudiengaengeId] = useState(
    course.studiengaengeId
  );
  const [teacherName, setTeacherName] = useState(course.teacherName || "");
  const [studentNames, setStudentNames] = useState<string[]>(
    course.studentNames || []
  );
  const [eventIdsStr, setEventIdsStr] = useState(
    course.eventIds ? course.eventIds.join(", ") : ""
  );

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacherName(e.target.value);
  };

  const handleStudiengangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStudiengaengeId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventIds = eventIdsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onSubmit({
      ...course,
      title,
      description,
      bannerGradient,
      customIconUrl,
      studiengaengeId,
      teacherName,
      studentNames,
      eventIds,
    });
  };

  return (
    <form className="p-4 border rounded mb-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">
        {course.id ? "Edit Course" : "Add New Course"}
      </h2>
      {/* Basic Details */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Course Title</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className="border p-2 w-full rounded"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      {/* Banner Options */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Select a Banner Gradient
        </label>
        <GradientSelector
          selectedGradient={bannerGradient}
          onSelect={setBannerGradient}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Custom Icon URL</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="https://example.com/icon.png"
          value={customIconUrl}
          onChange={(e) => setCustomIconUrl(e.target.value)}
        />
      </div>
      {/* Studiengang and Teacher Dropdowns */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Studiengang</label>
        <select
          className="border p-2 w-full rounded"
          value={studiengaengeId}
          onChange={handleStudiengangChange}
          required
        >
          <option value="">Select Studiengang</option>
          {studiengaenge.map((sg) => (
            <option key={sg.id} value={sg.id}>
              {sg.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Teacher</label>
        <select
          className="border p-2 w-full rounded"
          value={teacherName}
          onChange={handleTeacherChange}
          required
        >
          <option value="">Select a Teacher</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      {/* Student Multi-Select using checkboxes */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Students</label>
        <StudentMultiSelect
          students={students}
          selected={studentNames}
          onChange={setStudentNames}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Event IDs (comma separated)
        </label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="e.g. 201, 202"
          value={eventIdsStr}
          onChange={(e) => setEventIdsStr(e.target.value)}
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

/**
 * ConfirmPopup:
 * A custom confirmation popup that appears fixed at the bottom right.
 */
const ConfirmPopup = ({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 right-4 bg-white border rounded shadow-lg p-4 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
      >
        <p className="mb-4 text-sm">{message}</p>
        <div className="flex justify-end space-x-2">
          <button className="px-3 py-1 bg-gray-300 rounded" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Courses Page:
 * - Displays courses in a blog/wiki view by default.
 * - Offers an edit mode for CRUD operations.
 * - Uses a custom ConfirmPopup for delete confirmation and a Snackbar for notifications.
 * - Teacher and Studiengang selections are done via dropdowns.
 * - Student selection is handled via a custom multi-select (checkbox list).
 */
export default function Courses() {
  const {
    vorlesungen,
    addVorlesung,
    updateVorlesung,
    deleteVorlesung,
    dozenten,
    students,
    studiengaenge,
  } = useData();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedCourseForModal, setSelectedCourseForModal] =
    useState<Course | null>(null);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });
  const [confirmPopup, setConfirmPopup] = useState<{
    open: boolean;
    courseId: string | null;
  }>({
    open: false,
    courseId: null,
  });

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setCourseToEdit(null);
  };

  const handleCourseSubmit = (course: Course) => {
    if (courseToEdit) {
      updateVorlesung(course);
      setSnackbar({ open: true, message: "Course updated successfully!" });
    } else {
      addVorlesung({ ...course, id: Date.now().toString() });
      setSnackbar({ open: true, message: "Course added successfully!" });
    }
    setCourseToEdit(null);
    setEditMode(false);
  };

  const handleEditClick = (course: Course) => {
    setCourseToEdit(course);
    setEditMode(true);
  };

  const handleDeleteClick = (id: string) => {
    setConfirmPopup({ open: true, courseId: id });
  };

  const confirmDelete = () => {
    if (confirmPopup.courseId) {
      deleteVorlesung(confirmPopup.courseId);
      setSnackbar({ open: true, message: "Course deleted successfully!" });
    }
    setConfirmPopup({ open: false, courseId: null });
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Courses</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={toggleEditMode}
        >
          {editMode ? "Exit Edit Mode" : "Edit Courses"}
        </button>
      </div>

      {/* View Mode (Blog/Wiki) */}
      {!editMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vorlesungen.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onView={setSelectedCourseForModal}
            />
          ))}
        </div>
      )}

      {/* Edit Mode (CRUD) */}
      {editMode && (
        <div>
          <button
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() =>
              setCourseToEdit({
                id: "",
                title: "",
                studiengaengeId: "",
                lecturerId: "",
              } as Course)
            }
          >
            Add New Course
          </button>
          {courseToEdit && (
            <EditCourseForm
              course={courseToEdit}
              onSubmit={handleCourseSubmit}
              onCancel={() => {
                setCourseToEdit(null);
                setEditMode(false);
              }}
              teachers={dozenten}
              studiengaenge={studiengaenge}
              students={students}
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vorlesungen.map((course) => (
              <div key={course.id} className="relative">
                <CourseCard course={course} onView={() => {}} />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => handleEditClick(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDeleteClick(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourseForModal && (
          <CourseModal
            course={selectedCourseForModal}
            onClose={() => setSelectedCourseForModal(null)}
          />
        )}
      </AnimatePresence>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Custom Confirmation Popup for Delete */}
      {confirmPopup.open && (
        <ConfirmPopup
          message="Are you sure you want to delete this course? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setConfirmPopup({ open: false, courseId: null })}
        />
      )}
    </div>
  );
}
