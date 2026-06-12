import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Course, NursingTask, LearningRecord, AttendanceRecord, QRSession, StudentProgress, ToastMessage } from '../types';
import { mockCourse, mockTasks, mockStudentsProgress, mockQRSessions, mockLearningRecords, mockAttendanceRecords } from '../data/mockData';

interface AppContextType {
  course: Course;
  tasks: NursingTask[];
  qrSessions: QRSession[];
  learningRecords: LearningRecord[];
  attendanceRecords: AttendanceRecord[];
  studentsProgress: StudentProgress[];
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;
  addLearningRecord: (record: Omit<LearningRecord, 'id' | 'status' | 'studentId' | 'studentName' | 'studentCode'>) => void;
  approveRecord: (id: string, feedback?: string, instructorName?: string) => void;
  rejectRecord: (id: string, feedback?: string, instructorName?: string) => void;
  createQRSession: (session: Omit<QRSession, 'id' | 'isActive' | 'qrCodeUrl' | 'createdAt' | 'expiresAt'>) => QRSession;
  toggleQRSession: (id: string) => void;
  scanQR: (qrCodeValue: string) => { success: boolean; message: string };
  updateStudentMetrics: (studentId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [course] = useState<Course>(mockCourse);
  const [tasks] = useState<NursingTask[]>(mockTasks);
  const [qrSessions, setQrSessions] = useState<QRSession[]>(mockQRSessions);
  const [learningRecords, setLearningRecords] = useState<LearningRecord[]>(mockLearningRecords);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [studentsProgress, setStudentsProgress] = useState<StudentProgress[]>(mockStudentsProgress);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type, duration: 4000 }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper to recalculate mock progress indicators when records change
  const updateStudentMetrics = (studentId: string) => {
    setLearningRecords((currentRecords) => {
      const studentApproved = currentRecords.filter(
        (r) => r.studentId === studentId && r.status === 'approved'
      );
      
      const newCompletedCount = studentApproved.length;
      const progressPercent = Math.min(Math.round((newCompletedCount / 50) * 100), 100);

      setStudentsProgress((prev) =>
        prev.map((s) => {
          if (s.studentId === studentId) {
            return {
              ...s,
              completedTasks: newCompletedCount,
              overallPercent: progressPercent,
              lastActive: new Date().toISOString().replace('T', ' ').substring(0, 16)
            };
          }
          return s;
        })
      );
      return currentRecords;
    });
  };

  const addLearningRecord = (record: Omit<LearningRecord, 'id' | 'status' | 'studentId' | 'studentName' | 'studentCode'>) => {
    const newRecord: LearningRecord = {
      ...record,
      id: `rec-${Date.now()}`,
      studentId: 'stud-01', // Pre-populated with demo student
      studentName: 'นศพ.นิสิต ทดสอบ (Student Demo)',
      studentCode: '6512345091',
      status: 'pending'
    };

    setLearningRecords((prev) => [newRecord, ...prev]);
    addToast('ยื่นคำขออนุมัติสำเร็จวิรุฬห์ รออาจารย์ผู้สอนตรวจสอบความถูกต้อง', 'success');
  };

  const approveRecord = (id: string, feedback?: string, instructorName = 'อ.เดโม นามสมมติ (Ajarn Demo)') => {
    setLearningRecords((prev) =>
      prev.map((rec) => {
        if (rec.id === id) {
          addToast(`อนุมัติทักษะ "${rec.taskTitle}" เรียบร้อยแล้ว`, 'success');
          // Update student metrics in background
          setTimeout(() => updateStudentMetrics(rec.studentId), 50);
          return {
            ...rec,
            status: 'approved',
            instructorFeedback: feedback,
            instructorName,
            verifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
          };
        }
        return rec;
      })
    );
  };

  const rejectRecord = (id: string, feedback?: string, instructorName = 'อ.เดโม นามสมมติ (Ajarn Demo)') => {
    setLearningRecords((prev) =>
      prev.map((rec) => {
        if (rec.id === id) {
          addToast(`ส่งคำขอทักษะ "${rec.taskTitle}" กลับไปแก้ไข`, 'warning');
          return {
            ...rec,
            status: 'rejected',
            instructorFeedback: feedback,
            instructorName,
            verifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
          };
        }
        return rec;
      })
    );
  };

  const createQRSession = (session: Omit<QRSession, 'id' | 'isActive' | 'qrCodeUrl' | 'createdAt' | 'expiresAt'>) => {
    const id = `qr-${Date.now()}`;
    const now = new Date();
    const expires = new Date(now.getTime() + session.expiryMinutes * 60000);
    
    const qrCodeUrl = session.type === 'attendance'
      ? `STIN-ATT-LIVE-QR-${Date.now()}-${session.ward.replace(/\s+/g, '')}`
      : `STIN-PROC-LIVE-QR-${Date.now()}-${session.taskId}`;

    const newSession: QRSession = {
      ...session,
      id,
      isActive: true,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      qrCodeUrl
    };

    setQrSessions((prev) => [newSession, ...prev]);
    addToast(`สร้างหัวข้อ Dynamic QR Code สำเร็จ (${session.type === 'attendance' ? 'เช็คชื่อ' : 'ตรวจประเมินทักษะ'})`, 'success');
    return newSession;
  };

  const toggleQRSession = (id: string) => {
    setQrSessions((prev) =>
      prev.map((sess) => {
        if (sess.id === id) {
          const nextState = !sess.isActive;
          addToast(`เปลี่ยนสถานะ QR Code เป็น [${nextState ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}]`, 'info');
          return { ...sess, isActive: nextState };
        }
        return sess;
      })
    );
  };

  // Student scanning QR simulator
  const scanQR = (qrCodeValue: string): { success: boolean; message: string } => {
    // Find active session
    const session = qrSessions.find((s) => s.qrCodeUrl === qrCodeValue && s.isActive);
    if (!session) {
      addToast('คิวอาร์โค้ดนี้หมดอายุ ไม่เปิดใช้งาน หรือไม่มีในระบบ', 'error');
      return { success: false, message: 'คิวอาร์โค้ดใช้งานไม่ได้' };
    }

    // Is it expired by date?
    const expires = new Date(session.expiresAt);
    if (expires.getTime() < Date.now()) {
      addToast('คิวอาร์โค้ดหมดอายุตามกำหนดเวลา (Expired)', 'error');
      return { success: false, message: 'คิวอาร์โค้ดหมดอายุตามกำหนดเวลา' };
    }

    if (session.type === 'attendance') {
      // Create attendance log if not existing for today
      const todayString = new Date().toISOString().substring(0, 10);
      const isRegistered = attendanceRecords.some(
        (a) => a.studentId === 'stud-01' && a.date === todayString
      );

      if (isRegistered) {
        addToast('คุณได้ลงชื่อเข้าเวรของวันนี้เรียบร้อยแล้ว', 'warning');
        return { success: true, message: 'คุณลงชื่อแล้ววันนี้' };
      }

      const nowTime = new Date().toTimeString().substring(0, 5);
      const newAttendance: AttendanceRecord = {
        id: `att-${Date.now()}`,
        studentId: 'stud-01',
        studentName: 'นศพ.นิสิต ทดสอบ (Student Demo)',
        studentCode: '6512345091',
        courseId: session.courseId,
        date: todayString,
        timeIn: nowTime,
        status: 'present',
        ward: session.ward,
        instructorId: 'inst-01',
        instructorName: 'อ.เดโม นามสมมติ (Ajarn Demo)',
        verifiedByQRId: session.id
      };

      setAttendanceRecords((prev) => [newAttendance, ...prev]);
      
      // Update attendance count in progress
      setStudentsProgress((prev) =>
        prev.map((s) => {
          if (s.studentId === 'stud-01') {
            return { ...s, attendanceCount: s.attendanceCount + 1 };
          }
          return s;
        })
      );

      addToast(`บันทึกเวลาเข้าเวรสำเร็จที่ ${session.ward}`, 'success');
      return { success: true, message: `บันทึกเวลาที่ ${session.ward} เรียบร้อย` };
    } else {
      // Procedure approval
      const task = tasks.find((t) => t.id === session.taskId);
      if (!task) {
        addToast('หัตถการไม่ตรงกับหลักสูตรวิชา', 'error');
        return { success: false, message: 'ไม่พบรายการหัตถการนี้' };
      }

      // Add learning experience approved directly by this QR!
      const nowTime = new Date().toTimeString().substring(0, 5);
      const todayString = new Date().toISOString().substring(0, 10);
      const newRecord: LearningRecord = {
        id: `rec-${Date.now()}`,
        studentId: 'stud-01',
        studentName: 'นศพ.นิสิต ทดสอบ (Student Demo)',
        studentCode: '6512345091',
        courseId: session.courseId,
        taskId: task.id,
        taskTitle: task.title,
        category: task.category,
        date: todayString,
        time: nowTime,
        ward: session.ward,
        patientInitials: 'นางสแกน ค.อ.',
        hnMock: '69-QR999',
        clinicalDetails: 'หัตถการอนุมัติผ่านการสแกน Dynamic QR Code ทันทีโดยความเห็นชอบของอาจารย์นิเทศประจำกลุ่ม',
        skillsPerformed: [task.title],
        selfReflection: 'ได้รับการประเมินและผ่านหัตถการที่เตียงผู้ป่วยโดยตรงด้วยคิวอาร์โค้ดแบบด่วน',
        status: 'approved',
        instructorName: 'อ.เดโม นามสมมติ (Ajarn Demo)',
        instructorFeedback: 'ผ่านทักษะทางคลินิก ณ จุดปฏิบัติงาน (Bedside Direct Sign-off)',
        verifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      setLearningRecords((prev) => [newRecord, ...prev]);
      
      // Update student metrics in background
      setTimeout(() => updateStudentMetrics('stud-01'), 50);

      addToast(`สแกนผ่านหัตถการ "${task.title}" สำเร็จ!`, 'success');
      return { success: true, message: `สแกนอนุมัติทักษะ ${task.title} สำเร็จ` };
    }
  };

  return (
    <AppContext.Provider
      value={{
        course,
        tasks,
        qrSessions,
        learningRecords,
        attendanceRecords,
        studentsProgress,
        toasts,
        addToast,
        removeToast,
        addLearningRecord,
        approveRecord,
        rejectRecord,
        createQRSession,
        toggleQRSession,
        scanQR,
        updateStudentMetrics
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
