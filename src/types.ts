export type UserRole = 'instructor' | 'student' | 'guest';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  avatarUrl?: string;
  studentId?: string; // Only for student role
  instructorId?: string; // Only for instructor role
  department?: string;
}

export interface Course {
  id: string;
  code: string;
  nameThai: string;
  nameEnglish: string;
  credit: string;
  academicYear: string;
  semester: string;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  studentCode: string;
  overallPercent: number;
  completedTasks: number;
  totalTasks: number;
  attendanceCount: number;
  lastActive: string;
}

export interface NursingTask {
  id: string;
  category: 'labor' | 'postpartum' | 'newborn' | 'antenatal' | 'other';
  title: string;
  description: string;
  requiredCount: number;
}

export interface LearningRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  courseId: string;
  taskId: string;
  taskTitle: string;
  category: string;
  date: string;
  time: string;
  ward: string;
  patientInitials: string;
  hnMock?: string;
  clinicalDetails: string;
  skillsPerformed: string[];
  selfReflection: string;
  status: 'pending' | 'approved' | 'rejected';
  instructorFeedback?: string;
  instructorName?: string;
  verifiedAt?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  courseId: string;
  date: string;
  timeIn: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  ward: string;
  instructorId: string;
  instructorName: string;
  verifiedByQRId: string;
}

export interface QRSession {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  expiryMinutes: number;
  createdAt: string;
  expiresAt: string;
  ward: string;
  type: 'attendance' | 'procedure';
  taskId?: string; // If procedure type
  taskTitle?: string;
  isActive: boolean;
  qrCodeUrl: string; // Dynamic URL code or value
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}
