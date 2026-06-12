import { User, Course, NursingTask, StudentProgress, QRSession, LearningRecord, AttendanceRecord } from '../types';

export const mockInstructor: User = {
  id: 'inst-01',
  role: 'instructor',
  name: 'อ.เดโม นามสมมติ (Ajarn Demo)',
  email: 'instructor@stin.ac.th',
  instructorId: 'INST9981',
  department: 'สาขาการพยาบาลมารดา ทารก และการผดุงครรภ์',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
};

export const mockStudent: User = {
  id: 'stud-01',
  role: 'student',
  name: 'นศพ.นิสิต ทดสอบ (Student Demo)',
  email: 'student@stin.ac.th',
  studentId: '6512345091',
  department: 'คณะพยาบาลศาสตร์ ชั้นปีที่ 3',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
};

export const mockCourse: Course = {
  id: 'course-midwifery-01',
  code: 'NS312',
  nameThai: 'ปฏิบัติการพยาบาลมารดา ทารก และการผดุงครรภ์ ๑',
  nameEnglish: 'Clinical Practicum in Maternal-Newborn Nursing and Midwifery I',
  credit: '3 (0-12-6)',
  academicYear: '2569',
  semester: '1'
};

export const mockTasks: NursingTask[] = [
  // LR Labor Room Procedures
  {
    id: 'lr-01',
    category: 'labor',
    title: 'ทำคลอดปกติ (Normal Labor Delivery)',
    description: 'ฝึกปฏิบัติและช่วยเหลือการทำคลอดปกติ ควบคุมการเบ่งคลอด และประคองแผลฝีเย็บ',
    requiredCount: 5
  },
  {
    id: 'lr-02',
    category: 'labor',
    title: 'เย็บแผลฝีเย็บ (Episiotomy Repair)',
    description: 'ฝึกปฏิบัติการเย็บซ่อมแผลฝีเย็บภายใต้การควบคุมดูแลของอาจารย์นิเทศ',
    requiredCount: 3
  },
  {
    id: 'lr-03',
    category: 'labor',
    title: 'ประเมินและดูแลผู้คลอดในระยะที่ 1 (First Stage of Labor Care)',
    description: 'ประเมินการหดรัดตัวของมดลูก ตรวจภายในบันทึก Partograph และดูแลทางจิตสังคม',
    requiredCount: 10
  },
  {
    id: 'lr-04',
    category: 'labor',
    title: 'การประเมินสภาพและรับทารกแรกเกิดในห้องคลอด (Immediate Newborn Care)',
    description: 'ดูแลความกระชับอบอุ่น ดูดเสมหะ เช็ดตัว ประเมิน Apgar Score และหยอดตาทารก',
    requiredCount: 5
  },
  // Postpartum procedures
  {
    id: 'pp-01',
    category: 'postpartum',
    title: 'สอนและช่วยมารดาในนมบุตร (Breastfeeding Support)',
    description: 'ช่วยอุ้มประคองทารก ตรวจสอบท่าการดูดนม การประคองลานนม และแก้ไขปัญหายอดอกบอด/บุ๋ม',
    requiredCount: 10
  },
  {
    id: 'pp-02',
    category: 'postpartum',
    title: 'ตรวจประเมินร่างกายมารดาหลังคลอด (Postpartum Assessment)',
    description: 'ตรวจสุขภาพทั่วไป ตรวจระดับมดลูก แผลฝีเย็บ น้ำคาวปลา (Lochia) และเต้านม',
    requiredCount: 15
  },
  {
    id: 'pp-03',
    category: 'postpartum',
    title: 'การสาธิตการอาบน้ำทารกและทำความสะอาดสายสะดือ (Baby Bath Demonstrating)',
    description: 'สาธิตและสอนญาติ/มารดาในการอาบน้ำ สระผม และการเช็ดทำความสะอาดตอสะดือทารก',
    requiredCount: 5
  },
  // Antenatal care
  {
    id: 'anc-01',
    category: 'antenatal',
    title: 'ตรวจครรภ์ด้วยการคลำ Leopold Maneuvers',
    description: 'ตรวจครรภ์หาท่าของทารก (Presentation, Position) ส่วนนำ และประเมินระดับยอดมดลูก',
    requiredCount: 15
  },
  {
    id: 'anc-02',
    category: 'antenatal',
    title: 'ประเมินอัตราการเต้นของหัวใจทารกในครรภ์ (Fetal Heart Sound Screening)',
    description: 'ประเมินและฟังเสียงอัตราการเต้นของหัวใจทารกด้วยเครื่อง Doppler หรือ Pinard Horn',
    requiredCount: 15
  },
  {
    id: 'anc-03',
    category: 'antenatal',
    title: 'ให้คำแนะนำทางสุขภาพหญิงตั้งครรภ์รายบุคคล (Prenatal Health Education)',
    description: 'ให้คำปรึกษาอาหาร โภชนาการ สัญญาณอันตราย และการนับลูกดิ้นให้กับคุณแม่ตั้งครรภ์',
    requiredCount: 8
  }
];

export const mockStudentsProgress: StudentProgress[] = [
  {
    studentId: 'stud-01',
    studentName: 'นศพ.นิสิต ทดสอบ (Student Demo)',
    studentCode: '6512345091',
    overallPercent: 68,
    completedTasks: 34,
    totalTasks: 50,
    attendanceCount: 12,
    lastActive: '2026-06-11 14:30'
  },
  {
    studentId: 'stud-02',
    studentName: 'นศพ.กรวิภา เพียรดี',
    studentCode: '6512345003',
    overallPercent: 82,
    completedTasks: 41,
    totalTasks: 50,
    attendanceCount: 13,
    lastActive: '2026-06-11 16:15'
  },
  {
    studentId: 'stud-03',
    studentName: 'นศพ.ชลดา พรหมรักษา',
    studentCode: '6512345012',
    overallPercent: 54,
    completedTasks: 27,
    totalTasks: 50,
    attendanceCount: 11,
    lastActive: '2026-06-10 11:20'
  },
  {
    studentId: 'stud-04',
    studentName: 'นศพ.ทัชพงษ์ ยอดปัญญา',
    studentCode: '6512345025',
    overallPercent: 44,
    completedTasks: 22,
    totalTasks: 50,
    attendanceCount: 10,
    lastActive: '2026-06-11 09:45'
  },
  {
    studentId: 'stud-05',
    studentName: 'นศพ.รัญชนา แก้วอุไร',
    studentCode: '6512345044',
    overallPercent: 92,
    completedTasks: 46,
    totalTasks: 50,
    attendanceCount: 13,
    lastActive: '2026-06-11 17:10'
  }
];

export const mockQRSessions: QRSession[] = [
  {
    id: 'qr-att-01',
    title: 'บันทึกเวลาเข้าเวร - หอผู้ป่วยคลอด (LR Room Attendance)',
    courseId: 'course-midwifery-01',
    courseName: 'ปฏิบัติการพยาบาลมารดา ทารก และการผดุงครรภ์ ๑',
    expiryMinutes: 10,
    createdAt: '2026-06-11T07:45:00Z',
    expiresAt: '2026-06-11T07:55:00Z',
    ward: 'Labor Room (ห้องคลอด)',
    type: 'attendance',
    isActive: true,
    qrCodeUrl: 'STIN-ATT-LIVE-QR-CODE-2026-TOKEN-01'
  },
  {
    id: 'qr-proc-01',
    title: 'อนุมัติหัตถการ - ทำคลอดปกติ (Normal Delivery)',
    courseId: 'course-midwifery-01',
    courseName: 'ปฏิบัติการพยาบาลมารดา ทารก และการผดุงครรภ์ ๑',
    expiryMinutes: 15,
    createdAt: '2026-06-11T10:15:00Z',
    expiresAt: '2026-06-11T10:30:00Z',
    ward: 'Labor Room (ห้องคลอด)',
    type: 'procedure',
    taskId: 'lr-01',
    taskTitle: 'ทำคลอดปกติ (Normal Labor Delivery)',
    isActive: true,
    qrCodeUrl: 'STIN-PROC-LIVE-QR-CODE-2026-lr-01-TOKEN'
  },
  {
    id: 'qr-att-02',
    title: 'บันทึกเวลากลับเวร - หอคู่ผู้ป่วยหลังคลอด (Postpartum Guard)',
    courseId: 'course-midwifery-01',
    courseName: 'ปฏิบัติการพยาบาลมารดา ทารก และการผดุงครรภ์ ๑',
    expiryMinutes: 10,
    createdAt: '2026-06-11T15:45:00Z',
    expiresAt: '2026-06-11T15:55:00Z',
    ward: 'Postpartum Ward (หอผู้ป่วยหลังคลอด)',
    type: 'attendance',
    isActive: false,
    qrCodeUrl: 'STIN-ATT-EXPIRED-QR-CODE-TOKEN'
  }
];

export const mockLearningRecords: LearningRecord[] = [
  {
    id: 'rec-01',
    studentId: 'stud-01',
    studentName: 'นศพ.นิสิต ทดสอบ (Student Demo)',
    studentCode: '6512345091',
    courseId: 'course-midwifery-01',
    taskId: 'lr-01',
    taskTitle: 'ทำคลอดปกติ (Normal Labor Delivery)',
    category: 'labor',
    date: '2026-06-10',
    time: '13:45',
    ward: 'Labor Room (ห้องคลอด)',
    patientInitials: 'นาง ส.ม.',
    hnMock: '69-12345',
    clinicalDetails: 'ประเมินสภาพผู้คลอดในระยะที่ 2 ของการคลอด ทำคลอดปกติแบบศิริราชเทคนิค ประคองฝีเย็บรอยฉีกขาดเกรด 2 คุมตกเลือดหลังคลอดได้ปกติ',
    skillsPerformed: ['Episiotomy infiltration', 'Perineal support', 'Placenta expulsion inspection', 'Uterine massage'],
    selfReflection: 'ทำคลอดได้ราบรื่นขึ้น แต่ยังต้องคุมจังหวะเบ่งของผู้คลอดให้สัมพันธ์กับการประคองฝีเย็บให้รอบคอบกว่านี้เพื่อป้องกันแผลฉีกขาดรุนแรง',
    status: 'approved',
    instructorName: 'อ.เดโม นามสมมติ (Ajarn Demo)',
    instructorFeedback: 'เยี่ยมมาก! ประคองฝีเย็บได้แน่นมั่นคงดี การประเมินรกและน้ำสูญเสียทำได้ถูกต้องรวดเร็ว ขอให้กระชับประเด็นความรักและปฏิสัมพันธ์เชิงบวกกับมารดาผู้คลอดให้มากยิ่งขึ้น',
    verifiedAt: '2026-06-10 16:30'
  },
  {
    id: 'rec-02',
    studentId: 'stud-01',
    studentName: 'นศพ.นิสิต ทดสอบ (Student Demo)',
    studentCode: '6512345091',
    courseId: 'course-midwifery-01',
    taskId: 'pp-01',
    taskTitle: 'สอนและช่วยมารดาในนมบุตร (Breastfeeding Support)',
    category: 'postpartum',
    date: '2026-06-11',
    time: '09:00',
    ward: 'Postpartum Ward (หอหลังคลอด)',
    patientInitials: 'นางสาว ค.ญ.',
    hnMock: '69-12378',
    clinicalDetails: 'สอนอุ้มทารกท่า Cross-Cradle Hold ตรวจเต้านมพบหัวนมแบนเล็กน้อย (Flat nipple) แนะนำการทำ Hoffman maneuver และนวดกระตุ้นการไหลของน้ำนม เพื่อฟื้นฟูคุณสมบัตินมแม่',
    skillsPerformed: ['Breast assessment', 'Latching guidance', 'Hoffman maneuver demonstration'],
    selfReflection: 'คุณแม่ให้ความร่วมมือดีมาก หัวนมเริ่มตอบสนอง ทารกงับลานนมได้ดีหลังสวมปทุมแก้ว รู้สึกตื่นเต้นแต่ทำงานสำเร็จ',
    status: 'pending'
  },
  {
    id: 'rec-03',
    studentId: 'stud-01',
    studentName: 'นศพ.นิสิต ทดสอบ (Student Demo)',
    studentCode: '6512345091',
    courseId: 'course-midwifery-01',
    taskId: 'anc-01',
    taskTitle: 'ตรวจครรภ์ด้วยการคลำ Leopold Maneuvers',
    category: 'antenatal',
    date: '2026-06-09',
    time: '10:15',
    ward: 'Antenatal OPD (แผนกฝากครรภ์)',
    patientInitials: 'นาง ร.ว.',
    hnMock: '69-11990',
    clinicalDetails: 'ตรวจหญิงตั้งครรภ์ อายุครรภ์ 32 สัปดาห์ ตรวจคลำพบบริเวณยอดมดลูกเป็นก้นเด็ก ส่วนล่างเป็นหัวกลมแข็งซึมซาบในอุ้งเชิงกรานบางส่วน (Fetal Head presentation, LOA)',
    skillsPerformed: ['First-Fourth Leopold maneuvers', 'Symphysis-fundal height measuring'],
    selfReflection: 'แยกความตึงตัวของกล้ามเนื้อมดลูกกับก้นเด็กได้ชัดเจนขึ้นจากการจับเปรียบเทียบขอบข้างศีรษะเด็ก',
    status: 'approved',
    instructorName: 'อ.เดโม นามสมมติ (Ajarn Demo)',
    instructorFeedback: 'บันทึกได้ละเอียดจับประเด็น LOA ได้ถูกต้อง มั่นใจและใช้สัมผัสที่สุภาพนุ่มนวลดีมาก',
    verifiedAt: '2026-06-09 14:00'
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'att-01',
    studentId: 'stud-01',
    studentName: 'นศพ.นิสิต ทดสอบ (Student Demo)',
    studentCode: '6512345091',
    courseId: 'course-midwifery-01',
    date: '2026-06-11',
    timeIn: '07:48',
    status: 'present',
    ward: 'Labor Room (ห้องคลอด)',
    instructorId: 'inst-01',
    instructorName: 'อ.เดโม นามสมมติ (Ajarn Demo)',
    verifiedByQRId: 'qr-att-01'
  },
  {
    id: 'att-02',
    studentId: 'stud-01',
    studentName: 'นศพ.นิสิต ทดสอบ (Student Demo)',
    studentCode: '6512345091',
    courseId: 'course-midwifery-01',
    date: '2026-06-10',
    timeIn: '07:35',
    status: 'present',
    ward: 'Labor Room (ห้องคลอด)',
    instructorId: 'inst-01',
    instructorName: 'อ.เดโม นามสมมติ (Ajarn Demo)',
    verifiedByQRId: 'qr-legacy-att'
  },
  {
    id: 'att-03',
    studentId: 'stud-01',
    studentName: 'นศพ.นิสิต ทดสอบ (Student Demo)',
    studentCode: '6512345091',
    courseId: 'course-midwifery-01',
    date: '2026-06-09',
    timeIn: '07:54',
    status: 'late',
    ward: 'Postpartum Ward (หอผู้ป่วยหลังคลอด)',
    instructorId: 'inst-01',
    instructorName: 'อ.เดโม นามสมมติ (Ajarn Demo)',
    verifiedByQRId: 'qr-legacy-att-2'
  }
];
