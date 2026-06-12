import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage, NotAuthorizedPage, NotFoundPage } from '../pages/AuthAuxPages';
import {
  InstructorDashboard,
  InstructorCourses,
  InstructorStudents,
  InstructorSessions,
  InstructorDynamicQR,
  InstructorReports,
  InstructorSettings
} from '../pages/InstructorPages';
import {
  StudentProgress,
  StudentAttendance,
  StudentProfile
} from '../pages/StudentPages';
import { AppLayout } from '../layouts/NavLayouts';

// ==================== PROTECTED ROUTE CONTROLLER ====================

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'instructor' | 'student';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    // If logged in but does not have the target role, redirect to unauthorized
    return <Navigate to="/not-authorized" replace />;
  }

  // Wrap inside global application responsive layouts
  return <AppLayout>{children}</AppLayout>;
};

// ==================== GLOBAL ROUTING CONFIGURATION ====================

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Public Unsecured Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/not-authorized" element={<NotAuthorizedPage />} />

      {/* 2. Protected Instructor Core Routes */}
      <Route
        path="/instructor/dashboard"
        element={
          <ProtectedRoute allowedRole="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/courses"
        element={
          <ProtectedRoute allowedRole="instructor">
            <InstructorCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/students"
        element={
          <ProtectedRoute allowedRole="instructor">
            <InstructorStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/sessions"
        element={
          <ProtectedRoute allowedRole="instructor">
            <InstructorSessions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/dynamic-qr"
        element={
          <ProtectedRoute allowedRole="instructor">
            <InstructorDynamicQR />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/reports"
        element={
          <ProtectedRoute allowedRole="instructor">
            <InstructorReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/settings"
        element={
          <ProtectedRoute allowedRole="instructor">
            <InstructorSettings />
          </ProtectedRoute>
        }
      />

      {/* 3. Protected Student Core Routes */}
      <Route
        path="/student/progress"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentProgress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/attendance"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentProfile />
          </ProtectedRoute>
        }
      />

      {/* 4. Common Error Paths */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
