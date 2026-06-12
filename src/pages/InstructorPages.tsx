import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  QrCode,
  FileBarChart,
  Settings,
  Clock,
  Check,
  X,
  Plus,
  RefreshCw,
  Search,
  Filter,
  CheckCircle,
  FileText,
  AlertTriangle,
  UserCheck,
  FileSpreadsheet,
  Award,
  BookOpen
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { Card, StatCard, PageTitle, TablePlaceholder, PrimaryButton, SecondaryButton, DangerButton, EmptyState } from '../components/ReusableComponents';
import { PageHeader, ContentContainer } from '../layouts/NavLayouts';
import { QRSession, LearningRecord } from '../types';

// ==================== 1. INSTRUCTOR DASHBOARD ====================

export const InstructorDashboard: React.FC = () => {
  const { studentsProgress, learningRecords, qrSessions, attendanceRecords, approveRecord, rejectRecord } = useApp();
  const [feedbackMap, setFeedbackMap] = useState<Record<string, string>>({});
  
  // Computed Stats
  const activeStudents = studentsProgress.length;
  const pendingRequests = learningRecords.filter((r) => r.status === 'pending');
  const activeQRs = qrSessions.filter((s) => s.isActive).length;
  const todayAttendances = attendanceRecords.filter((a) => a.date === new Date().toISOString().substring(0, 10)).length;

  const handleFeedbackChange = (id: string, text: string) => {
    setFeedbackMap((prev) => ({ ...prev, [id]: text }));
  };

  // Chart data for students' completing %
  const chartData = studentsProgress.map((s) => ({
    name: s.studentName.split(' ')[0], // first name for clean axis label
    'เสร็จสิ้น (%)': s.overallPercent,
    'เคสผ่านแล้ว': s.completedTasks,
  }));

  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#1F2937'];

  return (
    <>
      <PageHeader breadcrumbs={[{ label: 'ระบบอาจารย์ / แดชบอร์ดติดตามหลักสัมฤทธิ์' }]} />
      <ContentContainer>
        <PageTitle
          title="แผงควบคุมและประเมินผลสัมฤทธิ์"
          subtitle="วิชาปฏิบัติการพยาบาลมารดา ทารก และการผดุงครรภ์ ๑ (STIN)"
        />

        {/* Info Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="นักศึกษาทั้งหมด"
            value={activeStudents}
            subValue="ขึ้นเวรหมุนเวียน 3 แผนก"
            icon={<Users className="w-5 h-5 text-blue-600" />}
            color="blue"
          />
          <StatCard
            title="คำขอที่ค้างอนุมัติ"
            value={pendingRequests.length}
            subValue="รอพิจารณาสะท้อนคำตอบ"
            icon={<Clock className="w-5 h-5 text-amber-600" />}
            color="amber"
          />
          <StatCard
            title="สแกนเข้างานวันนี้"
            value={todayAttendances}
            subValue="ที่หอคลอด/หอหลังคลอด"
            icon={<UserCheck className="w-5 h-5 text-emerald-600" />}
            color="emerald"
          />
          <StatCard
            title="สถานะ QR แอคทีฟ"
            value={activeQRs}
            subValue="พร้อมรับการตรวจสอบ"
            icon={<QrCode className="w-5 h-5 text-rose-500" />}
            color="rose"
          />
        </div>

        {/* Mid section: Chart & Quick Stats */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Recharts Analytics */}
          <Card className="lg:col-span-2">
            <h3 className="text-base font-bold text-slate-900 font-display mb-4">สถิติความก้าวหน้าสะสมเคสจำลองทางพยาบาลรายบุคคล</h3>
            <div className="h-68">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis unit="%" tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => [`${value}%`, 'ความคืบหน้า']} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="เสร็จสิ้น (%)" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Practical Checklist details */}
          <Card>
            <h3 className="text-base font-bold text-slate-900 font-display mb-3">สถานะตรวจประเมินด่วนวันนี้</h3>
            <div className="space-y-4.5">
              <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <div className="p-1.5 bg-blue-105 rounded-md text-blue-600">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">อัตราเฉลี่ยความก้าวหน้ากลุ่ม</h4>
                  <p className="text-lg font-black text-blue-700 mt-0.5">68% <span className="text-xs font-normal text-slate-500">สะสมไปแล้ว (34/50 คดี)</span></p>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">ตารางกลุ่มแผนกปฏิบัติการ</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs py-1 px-2 hover:bg-slate-50 rounded">
                    <span className="text-slate-600 font-medium">Labor Room (LR)</span>
                    <span className="text-slate-900 font-bold">12 รายการผ่าน</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 px-2 hover:bg-slate-50 rounded">
                    <span className="text-slate-600 font-medium">Postpartum Ward (PP)</span>
                    <span className="text-slate-900 font-bold">15 รายการผ่าน</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 px-2 hover:bg-slate-50 rounded">
                    <span className="text-slate-600 font-medium">Antenatal Care (ANC)</span>
                    <span className="text-slate-900 font-bold">7 รายการผ่าน</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Lower section: Verification Queue */}
        <Card className="mb-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">คิวตรวจประเมินทักษะและบันทึกสะท้อนคิด</h3>
              <p className="text-xs text-slate-500 mt-0.5">รายการปฏิบัติงานที่นักศึกษายื่นขอ ลำดับล่าสุดจากแบบฟอร์ม</p>
            </div>
            <span className="px-2.5 py-1 bg-amber-150 text-amber-800 text-[11px] font-bold rounded-full">
              {pendingRequests.length} ลำดับ
            </span>
          </div>

          <AnimatePresence>
            {pendingRequests.length === 0 ? (
              <EmptyState
                title="ยินดีด้วย! ไม่มีงานค้างตรวจอนุมัติ"
                description="นักศึกษากลุ่มนี้ยังไม่มีรายการยื่นเข้ามาใหม่ สามารถเลือกเมนูสร้าง QR เช็คเวลารายวันเพื่อเตรียมรองรับนักศึกษาเวรบ่าย"
              />
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <motion.div
                    key={req.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-205 flex flex-col md:flex-row md:items-start justify-between gap-4 transition hover:shadow-xs"
                  >
                    <div className="space-y-2 max-w-2xl text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-blue-600 font-mono">[{req.studentCode}]</span>
                        <span className="text-sm font-bold text-slate-900">{req.studentName}</span>
                        <span className="px-2 py-0.5 bg-slate-200 border border-slate-300 text-slate-700 text-[10px] font-bold rounded-md uppercase">
                          {req.ward}
                        </span>
                        <span className="text-slate-400 text-xs font-medium">| {req.date} ({req.time} น.)</span>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{req.taskTitle}</h4>
                        <div className="mt-1 bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
                          <p><strong>รายละเอียดเคส:</strong> {req.clinicalDetails}</p>
                          <p className="mt-1"><strong>ทักษะย่อย:</strong> {req.skillsPerformed?.join(', ')}</p>
                          <p className="mt-2 text-slate-500 italic"><strong>บันทึกสะท้อนคิดคุณค่านักศึกษา:</strong> "{req.selfReflection}"</p>
                        </div>
                      </div>

                      {/* Instructor input */}
                      <div className="flex gap-2 items-center">
                        <span className="text-xs font-bold text-slate-600 shrink-0">ข้อแนะนำความเห็นครู:</span>
                        <input
                          type="text"
                          placeholder="เว้นหากไม่มีข้อคิดเห็นเพิ่มเติม หรือเขียนสอนเสริมนักศึกษา..."
                          value={feedbackMap[req.id] || ''}
                          onChange={(e) => handleFeedbackChange(req.id, e.target.value)}
                          className="grow px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-500 transition shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex md:flex-col gap-2 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => approveRecord(req.id, feedbackMap[req.id])}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-all shadow-sm cursor-pointer"
                        aria-label="Approve"
                      >
                        <Check className="w-4 h-4" />
                        <span>อนุมัติทักษะ</span>
                      </button>
                      <button
                        onClick={() => rejectRecord(req.id, feedbackMap[req.id])}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-lg transition-all cursor-pointer"
                        aria-label="Reject"
                      >
                        <X className="w-4 h-4" />
                        <span>ส่งกลับแก้ไข</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </Card>
      </ContentContainer>
    </>
  );
};

// ==================== 2. INSTRUCTOR COURSES ====================

export const InstructorCourses: React.FC = () => {
  const { course, tasks } = useApp();

  return (
    <>
      <PageHeader breadcrumbs={[{ label: 'ระบบอาจารย์' }, { label: 'รายวิชาหลักสูตร' }]} />
      <ContentContainer>
        <PageTitle
          title="โครงสร้างรายวิชาและจุดเน้นปฏิบัติการ"
          subtitle={`กำลังติดตาม: ${course.code} - ${course.nameThai}`}
        />

        {/* Detailed course metadata */}
        <Card className="mb-6 bg-slate-900 text-white border-slate-800">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="text-[10px] text-blue-400 font-semibold tracking-widest uppercase">COURSE DETAIL</span>
              <h3 className="text-lg font-bold font-display">{course.nameThai}</h3>
              <p className="text-xs text-slate-400 italic mt-0.5">{course.nameEnglish}</p>
            </div>
            <div className="space-y-1 md:border-l border-slate-800 md:pl-6 text-xs text-slate-300">
              <p><strong>รหัสวิชา:</strong> {course.code}</p>
              <p><strong>หน่วยกิต:</strong> {course.credit}</p>
              <p><strong>ภาคเรียน/ปีการศึกษา:</strong> {course.semester}/{course.academicYear}</p>
            </div>
            <div className="space-y-1 md:border-l border-slate-800 md:pl-6 text-xs text-slate-300">
              <p><strong>เกณฑ์ขั้นต่ำในการจบฝึก:</strong></p>
              <p className="text-[#10B981] font-semibold">✓ บันทึกเคสคลอดปกติครบ 5 รายการ</p>
              <p className="text-[#10B981] font-semibold">✓ ผ่านการประเมินเย็บแผลฝีเย็บ 3 รายการ</p>
              <p className="text-[#10B981] font-semibold">✓ ชั่วโมงสะสมฝึกหัด 200 ชม.</p>
            </div>
          </div>
        </Card>

        {/* Targets Checklist lists */}
        <h3 className="text-base font-bold text-slate-900 font-display mb-4">เกณฑ์รหัสหัตถการและเป้าหมายขั้นต่ำของหลักสูตร</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:border-blue-400 transition flex flex-col justify-between">
              <div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border mb-3 ${
                  task.category === 'labor' ? 'bg-red-50 text-red-700 border-red-200' :
                  task.category === 'postpartum' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                  'bg-teal-50 text-teal-700 border-teal-200'
                }`}>
                  {task.category === 'labor' ? 'LR (ห้องคลอด)' :
                   task.category === 'postpartum' ? 'PP (หลังคลอด)' :
                   'ANC (ฝากครรภ์)'}
                </span>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">{task.title}</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{task.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">เป้าหมายขั้นต่ำ:</span>
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md font-bold font-mono">
                  {task.requiredCount} ครั้ง
                </span>
              </div>
            </Card>
          ))}
        </div>
      </ContentContainer>
    </>
  );
};

// ==================== 3. INSTRUCTOR STUDENTS LIST ====================

export const InstructorStudents: React.FC = () => {
  const { studentsProgress } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = studentsProgress.filter(
    (s) =>
      s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentCode.includes(searchTerm)
  );

  return (
    <>
      <PageHeader breadcrumbs={[{ label: 'ระบบอาจารย์' }, { label: 'ประวัติความก้าวหน้าลูกวิชา' }]} />
      <ContentContainer>
        <PageTitle
          title="สถานภาพบันทึกนักศึกษาในการส่งลานปฏิบัติ"
          subtitle="รายชื่อนักศึกษาพยาบาลศาสตร์ ชั้นปีที่ 3 ที่รับการนิเทศจากกลุ่มงานมารดาบุณยเวช"
          action={
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหาชื่อหรือรหัสนักศึกษา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-500/20 shadow-xs outline-none"
              />
            </div>
          }
        />

        <Card className="overflow-hidden p-0 border-slate-200/80">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-700">
                <tr>
                  <th className="px-6 py-4">รหัสนักศึกษา</th>
                  <th className="px-6 py-4">ชื่อ - นามสกุล</th>
                  <th className="px-6 py-4 text-center">สะสมเวลารวม (วัน)</th>
                  <th className="px-6 py-4">ความก้าวหน้าสะสมเคส</th>
                  <th className="px-6 py-4">ขึ้นตรวจล่าสุดเมื่อ</th>
                  <th className="px-6 py-4 text-center">สถานภาพ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredStudents.map((student) => (
                  <tr key={student.studentId} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-600 whitespace-nowrap">
                      {student.studentCode}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">
                      {student.studentName}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700 h-12 whitespace-nowrap">
                      {student.attendanceCount} คาบปฏิบัติ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap min-w-56">
                      <div className="flex items-center gap-3">
                        <div className="grow bg-slate-100 rounded-full h-2.5 max-w-44 border border-slate-200">
                          <div
                            className="bg-blue-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${student.overallPercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-750 font-mono">
                          {student.overallPercent}% ({student.completedTasks}/50)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500 whitespace-nowrap">
                      {student.lastActive}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        student.overallPercent >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        student.overallPercent >= 50 ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {student.overallPercent >= 80 ? 'ผ่านเกณฑ์ดีมาก' :
                         student.overallPercent >= 50 ? 'ปกติ' :
                         'ต้องกระตุ้นส่งงาน'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </ContentContainer>
    </>
  );
};

// ==================== 4. INSTRUCTOR CLINICAL SESSIONS (HISTORY) ====================

export const InstructorSessions: React.FC = () => {
  const { learningRecords } = useApp();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredRecords = learningRecords.filter((rec) => {
    if (filterStatus === 'all') return true;
    return rec.status === filterStatus;
  });

  return (
    <>
      <PageHeader breadcrumbs={[{ label: 'ระบบอาจารย์' }, { label: 'รายการสมุดบันทึกทั้งหมด' }]} />
      <ContentContainer>
        <PageTitle
          title="แฟ้มประวัติการสะสมประสบการณ์พยาบาล"
          subtitle="ประวัติรวมรายงานทักษะความหัตถการและคำวิจารณ์ของอาจารย์ที่ปรึกษาทุกคน"
          action={
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e: any) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500/20 shadow-xs outline-none"
              >
                <option value="all">ทุกสถานะส่งรายงาน</option>
                <option value="pending">รอการตรวจสอบ (Pending)</option>
                <option value="approved">อนุมัติเรียบร้อย (Approved)</option>
                <option value="rejected">ถูกคอมเมนต์ให้แก้ไข (Rejected)</option>
              </select>
            </div>
          }
        />

        <div className="space-y-4">
          {filteredRecords.map((rec) => (
            <Card key={rec.id} className="hover:border-slate-300 transition text-left">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 font-mono">[{rec.studentCode}]</span>
                    <h4 className="text-sm font-bold text-slate-900">{rec.studentName}</h4>
                    <span className="text-slate-300">/</span>
                    <span className="text-xs text-slate-500 font-semibold">{rec.ward}</span>
                  </div>
                  <h3 className="text-sm font-bold text-blue-600">{rec.taskTitle}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium font-mono">{rec.date} {rec.time || '08:00'}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold ${
                    rec.status === 'approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 border' :
                    rec.status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-200 border' :
                    'bg-rose-50 text-rose-800 border-rose-250 border'
                  }`}>
                    {rec.status === 'approved' ? 'อนุมัติผ่าน' :
                     rec.status === 'pending' ? 'รอตรวจสอบ' :
                     'ส่งคืนแก้ไข'}
                  </span>
                </div>
              </div>

              {/* Patient Initials, HN, Details */}
              <div className="grid md:grid-cols-2 gap-4 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="space-y-1">
                  <p><strong>ผู้ป่วยเป้าหมาย:</strong> {rec.patientInitials} (HN: {rec.hnMock || '69-xxxxx'})</p>
                  <p><strong>รายละเอียดเคส:</strong> {rec.clinicalDetails}</p>
                </div>
                <div>
                  <p><strong>ทักษะปฏิบัติย่อย:</strong> {rec.skillsPerformed?.join(', ')}</p>
                  <p className="italic text-slate-500 mt-1"><strong>ความคิดสะท้อนตนเอง:</strong> "{rec.selfReflection}"</p>
                </div>
              </div>

              {/* Feedback box */}
              {rec.instructorName ? (
                <div className="p-3 bg-blue-50/50 border border-blue-105 rounded-lg text-xs leading-relaxed text-blue-900 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">ความคิดเห็นโดย {rec.instructorName}: </span>
                    <span>{rec.instructorFeedback || 'ผ่านทักษะตามสมรรถนะมาตรฐาน'}</span>
                    {rec.verifiedAt && <span className="block text-[10px] text-slate-400 mt-1">ยืนยันรหัสเมื่อ {rec.verifiedAt} น.</span>}
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 font-medium italic">ยังไม่มีข้อคิดเห็นตอบรับจากผู้สอน</p>
              )}
            </Card>
          ))}

          {filteredRecords.length === 0 && (
            <EmptyState
              title="ไม่มีบันทึกประสบการณ์ตามเงื่อนไขที่เลือก"
              description="ลองสลับเลือกกรองคุณลักษณะสถานภาพอื่นๆ หรือรอนักศึกษาเข้ามาส่งในระบบ"
            />
          )}
        </div>
      </ContentContainer>
    </>
  );
};

// ==================== 5. INSTRUCTOR DYNAMIC QR GENERATOR ====================

export const InstructorDynamicQR: React.FC = () => {
  const { tasks, qrSessions, createQRSession, toggleQRSession } = useApp();
  
  // States of QR builder form
  const [sessionType, setSessionType] = useState<'attendance' | 'procedure'>('attendance');
  const [ward, setWard] = useState('Labor Room (ห้องคลอด)');
  const [expiry, setExpiry] = useState(10);
  const [selectedTaskId, setSelectedTaskId] = useState(tasks[0]?.id || '');
  
  const [newlyCreatedSession, setNewlyCreatedSession] = useState<QRSession | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const task = tasks.find((t) => t.id === selectedTaskId);
    
    const sess = createQRSession({
      title: sessionType === 'attendance'
        ? `บันทึกเวลาเข้าเวรฝึกปฏิบัติ ณ ${ward}`
        : `อนุมัติทักษะพยาบาล - ${task?.title}`,
      courseId: 'course',
      courseName: 'ปฏิบัติการพยาบาลมารดา ทารก และการผดุงครรภ์ ๑',
      expiryMinutes: expiry,
      ward,
      type: sessionType,
      taskId: sessionType === 'procedure' ? selectedTaskId : undefined,
      taskTitle: sessionType === 'procedure' ? task?.title : undefined
    });

    setNewlyCreatedSession(sess);
  };

  return (
    <>
      <PageHeader breadcrumbs={[{ label: 'ระบบอาจารย์' }, { label: 'สร้าง Dynamic QR Code เช็คสด' }]} />
      <ContentContainer>
        <PageTitle
          title="บริหารรหัสคิวอาร์โค้ดสแกนด่วน (Dynamic QR)"
          subtitle="สร้าง QR Code เช็กสาด-อนุมัติทักษะของนักศึกษาแบบสดที่ข้างเตียง ไม่ต้องลงชื่อในกระดาษวิชา"
        />

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Builder Form */}
          <Card className="lg:col-span-2 text-left">
            <h3 className="text-base font-bold text-slate-900 font-display mb-4 border-b border-slate-100 pb-2">
              เครื่องมือสร้าง Dynamic QR
            </h3>
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  ประเภทคิวอาร์ (QR Type)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSessionType('attendance')}
                    className={`py-2 text-xs font-semibold rounded-lg border transition ${
                      sessionType === 'attendance'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    บันทึกเวลาเข้าเวร
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSessionType('procedure');
                      if (tasks.length > 0 && !selectedTaskId) setSelectedTaskId(tasks[0].id);
                    }}
                    className={`py-2 text-xs font-semibold rounded-lg border transition ${
                      sessionType === 'procedure'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    อนุมัติทักษะหัตถการ
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-display">
                  สถานที่ / แผนกหอผู้ป่วย
                </label>
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-850 outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Labor Room (ห้องคลอด)">Labor Room (ห้องคลอด / หอผู้ป่วยคลอด)</option>
                  <option value="Postpartum Ward (หอผู้ป่วยหลังคลอด)">Postpartum Ward (หอผู้ป่วยหลังคลอด)</option>
                  <option value="Antenatal Care Clinic (แผนกก่อนคลอด)">Antenatal Care Clinic (แผนกก่อนคลอด / OPD)</option>
                </select>
              </div>

              {sessionType === 'procedure' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    ชี้พิกัดหัตถการที่สอนเคสฝาก
                  </label>
                  <select
                    value={selectedTaskId}
                    onChange={(e) => setSelectedTaskId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-850 outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {tasks.map((t) => (
                      <option key={t.id} value={t.id}>
                        [{t.id.toUpperCase()}] {t.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  กำหนดหมดอายุ (สแกนแบบกำหนดวินาที)
                </label>
                <select
                  value={expiry}
                  onChange={(e) => setExpiry(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-850 outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value={5}>5 นาที (ปตท. ป้องกันการส่งรูปต่อ)</option>
                  <option value={10}>10 นาที (มาตรฐานในการสแกน)</option>
                  <option value={15}>15 นาที</option>
                  <option value={30}>30 นาที (สำหรับการสอนทั้งคาบ)</option>
                </select>
              </div>

              <PrimaryButton type="submit" className="w-full mt-4" icon={<Plus className="w-4 h-4" />}>
                สร้าง QR Code ชนิดแปรผันแบบสด
              </PrimaryButton>
            </form>
          </Card>

          {/* QR Display Output */}
          <Card className="lg:col-span-3 flex flex-col items-center justify-center p-6 text-center border-blue-105 min-h-96 relative">
            {newlyCreatedSession ? (
              <div className="space-y-4 w-full">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-full animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  QR Code พร้อมสำหรับการสแกน
                </span>
                
                <h4 className="text-sm font-bold text-slate-800 max-w-sm mx-auto leading-tight">
                  {newlyCreatedSession.title}
                </h4>
                
                {/* Simulated high tech vector QR Look */}
                <div className="p-4 bg-white border-2 border-dashed border-blue-600 rounded-2xl inline-block shadow-md">
                  <div className="bg-slate-900 p-3 rounded-lg relative">
                    <div className="w-48 h-48 flex flex-col items-center justify-center gap-2 relative bg-white rounded-md p-2">
                      <QrCode className="w-40 h-40 text-slate-900" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-1 px-2.5 bg-blue-600 text-[10px] font-black text-white rounded shadow-sm font-display tracking-widest uppercase">
                          STIN STAFF
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 max-w-sm mx-auto space-y-1">
                  <p><strong>ประเภท:</strong> {newlyCreatedSession.type === 'attendance' ? 'สแกนเช้ากลับเวร' : 'สแกนอนุมัติทักษะพิเศษ'}</p>
                  <p><strong>แผนกลาน:</strong> {newlyCreatedSession.ward}</p>
                  <p className="text-blue-600 font-mono font-semibold break-all bg-slate-50 p-1.5 rounded border border-slate-200">
                    ID คิวอาร์: {newlyCreatedSession.qrCodeUrl}
                  </p>
                  <p className="text-rose-500 font-bold mt-1">หมดอายุเวลา: {new Date(newlyCreatedSession.expiresAt).toLocaleTimeString()}</p>
                </div>

                <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                  * นักศึกษาพยาบาลในกลุ่มเปิดหน้าบอร์ดสแกนทักษะ จ่อกล้องมาที่รหัสนี้ ระบบจะลงชื่อให้อัตโนมัติในสารบบฐานข้อมูลพยาบาลทันที
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <QrCode className="w-16 h-16 text-slate-300 animate-pulse mx-auto" />
                <h4 className="text-base font-bold text-slate-700">รอคำสั่งสร้างคิวอาร์โค้ด</h4>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  เมื่อคุณเลือกคุณสมบัติและกดปุ่มสร้างด้านซ้าย รหัสคิวอาร์สำหรับยืนยันเวรของวันนี้จะเรนเดอร์ขึ้นตรงจุดนี้เพื่อใช้ฉายขึ้นจอภาพหรือถือสแกนข้างตัวผู้ป่วย
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Existing Sessions List log */}
        <div className="mt-8">
          <h3 className="text-base font-bold text-slate-900 font-display mb-4 text-left">รายการสแกนที่ยังแอคทีฟในระบบ</h3>
          <div className="space-y-3 text-left">
            {qrSessions.map((sess) => (
              <Card key={sess.id} className="p-4 hover:border-slate-300 transition flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      sess.type === 'attendance' ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-blue-800'
                    }`}>
                      {sess.type === 'attendance' ? 'เช็คลงชื่อ' : 'หัตถการ'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-none">{sess.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500">สถานที่: {sess.ward} | รหัส Token: <strong className="font-mono text-slate-800">{sess.qrCodeUrl}</strong></p>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${sess.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${sess.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-350'}`} />
                    {sess.isActive ? 'เปิดใช้งานอยู่' : 'ปิดใช้งานแล้ว'}
                  </span>
                  
                  <button
                    onClick={() => toggleQRSession(sess.id)}
                    className={`px-3 py-1.5 rounded-md text-[11px] font-bold border transition shrink-0 cursor-pointer ${
                      sess.isActive
                        ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {sess.isActive ? 'สั่งระงับรหัส' : 'เปิดใช้งานใหม่'}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ContentContainer>
    </>
  );
};

// ==================== 6. INSTRUCTOR REPORTS ====================

export const InstructorReports: React.FC = () => {
  const { studentsProgress, learningRecords } = useApp();

  // Pie chart calculation - total records by category
  const laborCount = learningRecords.filter((r) => r.category === 'labor').length;
  const ppCount = learningRecords.filter((r) => r.category === 'postpartum').length;
  const ancCount = learningRecords.filter((r) => r.category === 'antenatal').length;

  const pieData = [
    { name: 'Labor Room (LR)', value: laborCount || 4 },
    { name: 'Postpartum (PP)', value: ppCount || 3 },
    { name: 'Antenatal care (ANC)', value: ancCount || 2 },
  ];

  const COLORS = ['#2563EB', '#10B981', '#F59E0B'];

  return (
    <>
      <PageHeader breadcrumbs={[{ label: 'ระบบอาจารย์' }, { label: 'สรุปรายงานผลส่งหัตถการ' }]} />
      <ContentContainer>
        <PageTitle
          title="รายงานวิเคราะห์และการบรรลุเกณฑ์สมรรถนะพยาบาล"
          subtitle="การจัดหมวดความคืบหน้าของสหายพยาบาลกลุ่ม ๑ รายงานสัดส่วนเคสส่งสภาการพยาบาล"
          action={
            <SecondaryButton icon={<FileSpreadsheet className="w-4 h-4" />}>
              ส่งออกเป็น Excel (XLS)
            </SecondaryButton>
          }
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Distribution chart (Pie) */}
          <Card className="lg:col-span-1 text-left">
            <h3 className="text-base font-bold text-slate-900 font-display mb-3">สัดส่วนประสบการณ์แบ่งตามประเภทวอร์ด</h3>
            <div className="h-60 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => [`${val} รายการ`, 'สัดส่วนพิเศษ']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom Legends */}
            <div className="space-y-2 mt-2 text-xs">
              {pieData.map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-slate-600 font-semibold">{entry.name}</span>
                  </div>
                  <span className="text-slate-900 font-bold">{entry.value} เคสผ่าน</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Academic milestones status summary */}
          <Card className="lg:col-span-2 text-left space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display mb-1">สรุปการติดตามสมุดเล่มน้ำเงิน Paperless</h3>
            <p className="text-xs text-slate-500">หัวใจในการนิเทศคือนักศึกษาพยาบาล 100% ต้องสำเร็จเคสบังคับทำคลอดจริงก่อนช่วงสอบไล่</p>
            
            <div className="space-y-4 pt-3 border-t border-slate-100">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-600 font-bold">เกณฑ์ห้องคลอด (Normal delivery & perineal suture check)</span>
                  <span className="text-emerald-600 font-bold">เฉลี่ย 75% ผ่านพ้น</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full border border-slate-200">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-600 font-bold">เกณฑ์หลังคลอดและการสอนแนะนำอุ้มมารดานมแม่</span>
                  <span className="text-blue-600 font-bold">เฉลี่ย 88% ผ่านพ้น</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full border border-slate-200">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-600 font-bold">เกณฑ์คลองก่อนคลอดและการฝากครรภ์ตรวจ Leopold</span>
                  <span className="text-amber-500 font-bold">เฉลี่ย 48% ผ่านพ้น</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full border border-slate-200">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '48%' }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2 text-xs text-amber-800 leading-relaxed mt-4">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-bold">รายงานข้อจำกัดการปฏิบัติ:</p>
                <p>หัตถการคลอดปกติ (Normal Labor Delivery) ในปัจจุบันสะสมช้าเนื่องจากปริมาณมารดาผู้คลอดในไตรมาสแรกค่อนข้างน้อย อาจารย์แนะนำให้ขยายระยะเวลาออกรหัส QR สำหรับเคสตึก PP เพิ่มขึ้นร่วมด้วย</p>
              </div>
            </div>
          </Card>
        </div>
      </ContentContainer>
    </>
  );
};

// ==================== 7. INSTRUCTOR SETTINGS ====================

export const InstructorSettings: React.FC = () => {
  const { course } = useApp();
  const [notiEnabled, setNotiEnabled] = useState(true);
  const [offlineEnabled, setOfflineEnabled] = useState(true);

  return (
    <>
      <PageHeader breadcrumbs={[{ label: 'ระบบอาจารย์' }, { label: 'ตั้งค่าและสัญญาระบบพยาบาล' }]} />
      <ContentContainer>
        <PageTitle
          title="บริหารจัดการการตั้งค่าระบบวิชา"
          subtitle="ประเมินการโอนข้อมูลพยาบาล รวบประเด็นการประสานกับสำนักทะเบียน STIN"
        />

        <div className="max-w-2xl text-left space-y-6">
          {/* General setup section */}
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display border-b border-slate-150 pb-2">กำหนดระยะเวรปัจจุบัน</h3>
            
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-slate-650 block">รหัสปีการศึกษา</span>
                <input
                  type="text"
                  value={course.academicYear}
                  disabled
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-slate-650 block">ภาคการศึกษา (Semester)</span>
                <input
                  type="text"
                  value={course.semester}
                  disabled
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
          </Card>

          {/* Toggle triggers */}
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display border-b border-slate-150 pb-2">ระบบความปลอดภัยและการรายงานด่วน</h3>
            
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">รับพุชแจ้งเตือนคำขออนุมัติสด (Push Notifications)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">ส่งเสียงแจ้งอาจารย์เมื่อนิสิตกดรหัสยื่นประสบการณ์จากหน้างาน</p>
                </div>
                <input
                  type="checkbox"
                  checked={notiEnabled}
                  onChange={() => setNotiEnabled(!notiEnabled)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 transition cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3.5">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">สนับสนุนระบบสแกนเช้าเครื่องออฟไลน์ (Offline Fallback)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">ให้นิสิตส่งบันทึกผ่านหน่วยความจำบราวเซอร์กรณีอับสัญญาณในห้อง LR</p>
                </div>
                <input
                  type="checkbox"
                  checked={offlineEnabled}
                  onChange={() => setOfflineEnabled(!offlineEnabled)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 transition cursor-pointer"
                />
              </div>
            </div>
          </Card>

          {/* Prompt 2 Preview notification */}
          <div className="bg-blue-50 text-blue-800 p-4 border border-blue-200 rounded-xl text-xs space-y-2 leading-relaxed">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <strong className="text-sm font-bold">ข้อมูลการบำรุงรักษาถัดไป (Prompt 2):</strong>
            </div>
            <p>
              ใน Prompt ถัดไป ระบบความปลอดภัยจะได้รับการอัปเดตเพื่อเชื่อมโยงกับ <strong>Firebase Authentication</strong> สำหรับคัดแยกบัญชีนิพัทธ์ และ <strong>Cloud Firestore</strong> เพื่อเก็บรักษาประวัติคำขออนุมัติตลาดถาวร (ไม่มีการสูญหายเมื่อรีเฟรชบราวเซอร์)
            </p>
          </div>
        </div>
      </ContentContainer>
    </>
  );
};
