// src/context/AuthContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type UserRole = "admin" | "teacher" | "student";

// This type is used for login and storage (includes password)
export type AuthUser = {
  email: string;
  password: string;
  role: UserRole;
  courses?: string[];
  classes?: string[];
};

// This type is used for the logged-in user (we drop password)
export type User = {
  email: string;
  role: UserRole;
  courses?: string[];
  classes?: string[];
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserRole: (role: UserRole) => void;
  // For user management (list and modification)
  users: User[];
  updateUser: (updated: User) => void;
  addUser: (newUser: AuthUser) => void;
  // New deleteUser function
  deleteUser: (email: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Our initial sample users (passwords for demo)
const initialUsers: AuthUser[] = [
  { email: "admin@example.com", password: "admin", role: "admin" },
  {
    email: "teacher@example.com",
    password: "teacher",
    role: "teacher",
    courses: ["Web-Engineering 101"],
    classes: ["TIF24"],
  },
  {
    email: "student@example.com",
    password: "student",
    role: "student",
    classes: ["TIF24"],
  },
  {
    email: "Julian@example.com",
    password: "student",
    role: "student",
    classes: ["TIF24"],
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize authUsers from localStorage (if available) or use initialUsers.
  const [authUsers, setAuthUsers] = useState<AuthUser[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("authUsers");
      return stored ? JSON.parse(stored) : initialUsers;
    }
    return initialUsers;
  });

  // Persist authUsers whenever they change.
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authUsers", JSON.stringify(authUsers));
    }
  }, [authUsers]);

  // Derive a list of users without passwords (for display)
  const users: User[] = authUsers.map((u) => ({
    email: u.email,
    role: u.role,
    courses: u.courses || [],
    classes: u.classes || [],
  }));

  // Handle persistence of the logged-in user.
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (email: string, password: string) => {
    const found = authUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const loggedUser: User = {
        email: found.email,
        role: found.role,
        courses: found.courses || [],
        classes: found.classes || [],
      };
      setUser(loggedUser);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const updateUserRole = (role: UserRole) => {
    if (user) {
      const updated: User = { ...user, role };
      setUser(updated);
      updateUser(updated);
    }
  };

  const updateUser = (updated: User) => {
    setAuthUsers((prev) =>
      prev.map((u) =>
        u.email === updated.email
          ? {
              ...u,
              role: updated.role,
              courses: updated.courses,
              classes: updated.classes,
            }
          : u
      )
    );
  };

  const addUser = (newUser: AuthUser) => {
    setAuthUsers((prev) => [...prev, newUser]);
  };

  // New deleteUser function: filters out the user with the provided email.
  const deleteUser = (email: string) => {
    setAuthUsers((prev) => prev.filter((u) => u.email !== email));
    // Optionally, if the deleted user is currently logged in, you may log them out:
    if (user && user.email === email) {
      logout();
    }
  };

  // To avoid hydration mismatch when reading from localStorage,
  // only render children after mounting.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUserRole,
        users,
        updateUser,
        addUser,
        deleteUser, // Expose deleteUser in the context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
