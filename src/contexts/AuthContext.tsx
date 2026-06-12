import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockInstructor, mockStudent } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  updateUser: (fields: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to student for testing or student-centric, but starts logged in as demo student
  const [user, setUser] = useState<User | null>(mockStudent);
  const [role, setRole] = useState<UserRole>('student');

  const loginAs = (selectedRole: UserRole) => {
    if (selectedRole === 'student') {
      setUser(mockStudent);
      setRole('student');
    } else if (selectedRole === 'instructor') {
      setUser(mockInstructor);
      setRole('instructor');
    } else {
      setUser(null);
      setRole('guest');
    }
  };

  const logout = () => {
    setUser(null);
    setRole('guest');
  };

  const updateUser = (fields: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...fields });
    }
  };

  const isAuthenticated = user !== null && role !== 'guest';

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, loginAs, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
