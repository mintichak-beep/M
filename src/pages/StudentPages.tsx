import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import {
  TrendingUp,
  History,
  User as UserIcon,
  Plus,
  BookOpen,
  Award,
  Calendar,
  CheckCircle,
  FileText,
  AlertCircle,
  Clock,
  Camera,
  Layers,
  ChevronRight,
  Heart,
  QrCode
} from 'lucide-react';
import { Card, StatCard, PageTitle, PrimaryButton, SecondaryButton, EmptyState } from '../components/ReusableComponents';
import { PageHeader, ContentContainer } from '../layouts/NavLayouts';
import { NursingTask, LearningRecord } from '../types';
import { motion, AnimatePresence } from 'motion/react';

// ==================== 1. STUDENT PROGRESS PORTAL ====================

export const StudentProgress: React.FC = () => {
  const { tasks, learningRecords, addLearningRecord, qrSessions, scanQR, studentsProgress } = useApp();
  const { user } = useAuth();
  
  // States
  const [isManualFormOpen, setIsManualFormOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [customTokenToScan, setCustomTokenToScan] = useState('');

  // Form Fields
  const [selectedTaskId, setSelectedTaskId] = useState(tasks[0]?.id || '');
  const [ward, setWard] = useState('Labor Room (ห้องคลอด)');
  const [patientInitials, setPatientInitials] = useState('');
  const [hnMock, setHnMock] = useState('');
  const [clinicalDetails, setClinicalDetails] = useState('');
  const [selfReflection, setSelfReflection] = useState('');
  const [subSkills, setSubSkills] = useState('');

  // Compute stats of logged-in student (stud-01)
  const myProgInfo = studentsProgress.find((p) => p.studentId === 'stud-01');
  const myRecords = learningRecords.filter((r) => r.studentId === 'stud-01');
  const myApprovedRecords = myRecords.filter((r) => r.status === 'approved');
  const myPendingRecords = myRecords.filter((r) => r.status === 'pending');

  const overallPercent = myProgInfo?.overallPercent || 0;
  const completedCount = myProgInfo?.completedTasks || 0;

  // Handle new log submission
  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientInitials || !clinicalDetails || !selfReflection) {
      alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }

    const task = tasks.find((t) => t.id === selectedTaskId);
    addLearningRecord({
      courseId: 'course-midwifery-01',
      taskId: selectedTaskId,
      taskTitle: task?.title || '',
      category: task?.category || 'labor',
      date: new Date().toISOString().substring(0, 10),
      time: new Date().toTimeString().substring(0, 5),
      ward,
      patientInitials,
      hnMock: hnMock || undefined,
      clinicalDetails,
      skillsPerformed: subSkills ? subSkills.split(',').map((s) => s.trim()) : [task?.title || ''],
      selfReflection
    });

    // Reset Form
    setIsManualFormOpen(false);
    setPatientInitials('');
    setHnMock('');
    setClinicalDetails('');
    setSelfReflection('');
    setSubSkills('');
  };

  // Handle scanner submission
  const handleScanQR = (tokenString: string) => {
    const res = scanQR(tokenString);
    if (res.success) {
      setIsQRScannerOpen(false);
      setCustomTokenToScan('');
    }
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'ประตูนรพ.' }, { label: 'เป้าหมายผ่านเกณฑ์ทักษะ' }]}
        addon={
          <div className="flex gap-2">
            <button
              onClick={() => setIsQRScannerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer shadow"
              aria-label="Scan Live QR Codes"
            >
              <Camera className="w-4 h-4" />
              <span>สแกน QR อนุมัติสด</span>
            </button>
            <SecondaryButton
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsManualFormOpen(true)}
              className="py-2.5 text-xs font-bold"
            >
              เขียนบันทึกประสบการณ์ส่งมือ
            </SecondaryButton>
          </div>
        }
      />
      <ContentContainer>
        <PageTitle
          title="สะสมประสบการณ์พยาบาลมารดาและการผดุงครรภ์ ๑"
          subtitle={`ผู้บันทึก: ${user?.name} (รหัส: ${user?.studentId})`}
        />

        {/* Dashboard grid metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="lg:col-span-2 text-left relative overflow-hidden flex flex-col justify-between p-5 border-blue-150">
            <div>
              <span className="text-[10px] text-blue-600 font-bold tracking-wider uppercase block">PROGRESS PIPELINE</span>
              <h4 className="text-2xl font-black font-display text-slate-900 mt-1">ความคืบหน้าสะสมรวม</h4>
              <p className="text-xs text-slate-500 mt-1">ผ่านเกณฑ์แล้วการรับรอง {completedCount} จาก 50 เคสเป้าหมายสภาฯ</p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="grow bg-slate-100 rounded-full h-3 border border-slate-205">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>
              <span className="text-sm font-black text-slate-800 font-mono shrink-0">{overallPercent}%</span>
            </div>
          </Card>

          <StatCard
            title="รอตรวจสอบคอมเมนต์"
            value={myPendingRecords.length}
            subValue="อยู่ระหว่างการพิจารณา"
            icon={<Clock className="w-5 h-5 text-amber-600" />}
            color="amber"
          />

          <StatCard
            title="อนุมัติผ่านแลัว"
            value={myApprovedRecords.length}
            subValue="บันทึกระบบถาวรเรียบร้อย"
            icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
            color="emerald"
          />
        </div>

        {/* Live Active QR Sessions Alert in Ward for Fast Testing */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center gap-2 mb-2 text-slate-900">
            <QrCode className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-bold font-display">กระดานคิวอาร์บอร์ดที่เปิดใช้งานรอบข้าง (ทดสอบความเข้ากัน)</h4>
          </div>
          <p className="text-xs text-slate-500 mb-3.5">
            สแกนเพื่อรับสิทธิ์และอนุมัติทันทีที่เตียงผู้ป่วยโดยจำลองการนำรหัสมาป้อน:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {qrSessions.filter(q => q.isActive).map((sess) => (
              <button
                key={sess.id}
                onClick={() => handleScanQR(sess.qrCodeUrl)}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-250 hover:border-blue-500 hover:bg-blue-50 rounded-lg text-xs leading-none transition text-slate-700 shadow-xs cursor-pointer group"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <span>จำลองสแกน: <strong className="font-mono text-slate-900 group-hover:text-blue-700">{sess.type === 'attendance' ? 'เวลาปฏิบัติงาน' : 'รับรองทักษะ'}</strong></span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Categories Checklist summary */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 text-left space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">รายการทักษะที่ต้องสะสม (Academic Targets)</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {tasks.map((task) => {
                const totalPassedThisTask = myApprovedRecords.filter((r) => r.taskId === task.id).length;
                const isCompleted = totalPassedThisTask >= task.requiredCount;
                const completionPerc = Math.min(Math.round((totalPassedThisTask / task.requiredCount) * 100), 100);

                return (
                  <Card key={task.id} className="p-4 flex flex-col justify-between hover:border-slate-350 transition">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          task.category === 'labor' ? 'bg-red-50 text-red-600 border border-red-200' :
                          task.category === 'postpartum' ? 'bg-purple-50 text-purple-600 border border-purple-200' :
                          'bg-teal-50 text-teal-600 border border-teal-200'
                        }`}>
                          {task.category === 'labor' ? 'Labor (LR)' :
                           task.category === 'postpartum' ? 'Postpartum' :
                           'OPD/ANC'}
                        </span>
                        
                        {isCompleted && <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">✓ สำเร็จเกณฑ์</span>}
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-tight">{task.title}</h4>
                      <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase">เป้าเกณฑ์: {task.requiredCount} ครั้ง</p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-500 font-mono font-bold">บันทึก: {totalPassedThisTask} / {task.requiredCount}</span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${completionPerc}%` }} />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Student recent logs sidebar */}
          <div className="text-left space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">ประวัติส่งบันทึกของฉัน</h3>
            <div className="space-y-3">
              {myRecords.slice(0, 5).map((rec) => (
                <Card key={rec.id} className="p-4 border-slate-205">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5 mb-2">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">{rec.taskTitle}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{rec.date} | {rec.ward}</span>
                    </div>

                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      rec.status === 'approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-250' :
                      rec.status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-250' :
                      'bg-rose-50 text-rose-800 border-rose-250'
                    }`}>
                      {rec.status === 'approved' ? 'ผ่านแล้ว' :
                       rec.status === 'pending' ? 'รอครูตรวจ' :
                       'ต้องแก้'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2"><strong>รายละเอียด:</strong> {rec.clinicalDetails}</p>
                  
                  {rec.instructorFeedback && (
                    <div className="mt-2.5 bg-slate-50 p-2 rounded text-[10px] border border-slate-200 leading-snug">
                      <strong className="text-slate-700">คอมเมนต์อาจารย์:</strong> "{rec.instructorFeedback}"
                    </div>
                  )}
                </Card>
              ))}

              {myRecords.length === 0 && (
                <EmptyState
                  description="ยังไม่มีประวัติการส่งบันทึก คุณสามารถเริ่มส่งโดยกดปุ่มเขียนบันทึกประสบการณ์"
                />
              )}
            </div>
          </div>
        </div>

        {/* ==================== SCREEN MODALS ==================== */}

        {/* 1. Manual Form Drawer */}
        <AnimatePresence>
          {isManualFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsManualFormOpen(false)}
                className="fixed inset-0 bg-slate-900/45 backdrop-blur-xs"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[85vh] z-10 relative p-6 text-left border border-slate-100"
              >
                <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-display">บันทึกสะสมทักษะและการเรียนรู้ทางคลินิก</h3>
                  <button onClick={() => setIsManualFormOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-md">
                    ปิด
                  </button>
                </div>

                <form onSubmit={handleSubmitLog} className="space-y-4 text-xs font-semibold text-slate-700">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1">เลือกหมวดหัตถการส่งงาน</label>
                      <select
                        value={selectedTaskId}
                        onChange={(e) => setSelectedTaskId(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-250 rounded-lg outline-none cursor-pointer"
                      >
                        {tasks.map((t) => (
                          <option key={t.id} value={t.id}>[{t.id.toUpperCase()}] {t.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block mb-1">หออภิบาลเวร (Ward)</label>
                      <select
                        value={ward}
                        onChange={(e) => setWard(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-250 rounded-lg outline-none cursor-pointer"
                      >
                        <option value="Labor Room (ห้องคลอด)">Labor Room (ห้องคลอด)</option>
                        <option value="Postpartum Ward (หอหลังคลอด)">Postpartum Ward (หอหลังคลอด)</option>
                        <option value="Antenatal Care Clinic (แผนกก่อนคลอด)">Antenatal Care Clinic (OPD)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1">อักษรย่อผู้ป่วยครรถ์ (เช่น นาง ส.ม.) *</label>
                      <input
                        type="text"
                        required
                        placeholder="กรอกแต่อักษรย่อเพื่อรักษาความลับ"
                        value={patientInitials}
                        onChange={(e) => setPatientInitials(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-lg outline-none"
                      />
                    </div>

                    <div>
                      <label className="block mb-1">หมายเลข HN (ปิดบังบางส่วน เช่น 69-xxxx)</label>
                      <input
                        type="text"
                        placeholder="ปิดบังบางส่วนเพื่อความปลอดภัย"
                        value={hnMock}
                        onChange={(e) => setHnMock(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-lg outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1">ทักษะพยาบาลย่อยเพิ่มเติม (คั่นด้วยเครื่องหมายจุลภาค ,)</label>
                    <input
                      type="text"
                      placeholder="เช่น perineal support, baby bathing, episiotomy suture"
                      value={subSkills}
                      onChange={(e) => setSubSkills(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">รายละเอียดทางคลินิก (Clinical Performed) *</label>
                    <textarea
                      required
                      placeholder="เขียนระบุรายละเอียดขั้นตอน หัตถการที่นักศึกษาปฏิบัติจริง..."
                      value={clinicalDetails}
                      onChange={(e) => setClinicalDetails(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">บันทึกสะท้อนคิดคุณธรรมค่านิยม (Self Reflection) *</label>
                    <textarea
                      required
                      placeholder="คุณธรรมสะท้อนการดูแลผู้ป่วย ความเห็นอกเห็นใจ ความระมัดระวังความเจ็บปวด..."
                      value={selfReflection}
                      onChange={(e) => setSelfReflection(e.target.value)}
                      rows={2.5}
                      className="w-full p-2.5 bg-slate-50 border border-slate-205 rounded-lg outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                    <SecondaryButton onClick={() => setIsManualFormOpen(false)} type="button">ยกเลิก</SecondaryButton>
                    <PrimaryButton type="submit">ส่งรายงานเข้าคิวตรวจ</PrimaryButton>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 2. QR Code Scanner simulator drawer */}
        <AnimatePresence>
          {isQRScannerOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsQRScannerOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden z-10 relative p-6 text-center border border-slate-100"
              >
                <div className="flex justify-between items-center pb-3 border-b mb-4">
                  <h4 className="text-sm font-bold text-slate-900 font-display">สแกนรหัสผ่าน QR อนุมัติสด</h4>
                  <button onClick={() => setIsQRScannerOpen(false)} className="text-slate-400 p-1 hover:text-slate-600 rounded">
                    ปิด
                  </button>
                </div>

                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-105 mb-4">
                  <Camera className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-2" />
                  <p className="text-xs text-slate-650 leading-relaxed">
                    หยิบมือถือเปิดหน้ากล้องจ่อที่หน้าจอคิวอาร์อาจารย์ เพื่อลงเวลาเวรหรืออนุมัติหัตถการข้างผู้ป่วยแบบด่วน
                  </p>
                </div>

                <div className="space-y-3.5 text-xs text-slate-700 font-semibold">
                  <div className="text-left">
                    <label className="block mb-1 text-[11px] font-bold text-slate-600">รหัสโทเค็น (หรือคัดลอกจากกระดานด้านนอกมาป้อน)</label>
                    <input
                      type="text"
                      placeholder="เช่น STIN-ATT-LIVE-QR-..."
                      value={customTokenToScan}
                      onChange={(e) => setCustomTokenToScan(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-250 rounded-lg outline-none font-mono"
                    />
                  </div>

                  <PrimaryButton
                    onClick={() => handleScanQR(customTokenToScan)}
                    disabled={!customTokenToScan}
                    className="w-full py-2.5"
                  >
                    ยืนยันสแกนตรวจสอบ
                  </PrimaryButton>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ContentContainer>
    </>
  );
};

// ==================== 2. STUDENT ATTENDANCE HISTORY ====================

export const StudentAttendance: React.FC = () => {
  const { attendanceRecords } = useApp();

  return (
    <>
      <PageHeader breadcrumbs={[{ label: 'ประตูนรพ.' }, { label: 'ประวัติลงเวลาคลินิก' }]} />
      <ContentContainer>
        <PageTitle
          title="ตารางนับบันทึกเวลาฝึกหัดทางคลินิก (Attendance logs)"
          subtitle="สถิติสะสมเข้าเวร เช้า บ่าย ดึก จากการยืนยันรหัสคิวอาร์รายวันสากล"
        />

        <div className="grid lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="รวมคาบขึ้นเวร"
            value={`${attendanceRecords.length} ครา`}
            subValue="เทียบเท่า 96 ชั่วโมงปฏิบัติ"
            icon={<Calendar className="w-5 h-5 text-blue-600" />}
            color="blue"
          />
          <StatCard
            title="เวลาการตอกเข้าตรง"
            value="100%"
            subValue="ไม่มีบันทึกสายเกินเกณฑ์"
            icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
            color="emerald"
          />
        </div>

        <Card className="overflow-hidden p-0 text-left border-slate-205">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-700">
                <tr>
                  <th className="px-6 py-4">วันปฏิบัติการ</th>
                  <th className="px-6 py-4">หออภิบาลเวร (Clinical Ward)</th>
                  <th className="px-6 py-4">เวลาลงทะเบียนเข้า</th>
                  <th className="px-6 py-4">อาจารย์นิเทศรับรอง</th>
                  <th className="px-6 py-4 text-center">สถานะเวร</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {attendanceRecords.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-bold text-slate-900 font-mono whitespace-nowrap">
                      {att.date}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700 whitespace-nowrap">
                      {att.ward}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-650 whitespace-nowrap">
                      {att.timeIn} น. (ลงชื่อผ่าน QR)
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-blue-700 whitespace-nowrap">
                      {att.instructorName}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        att.status === 'present' ? 'bg-emerald-50 text-emerald-700 border border-emerald-250' : 'bg-amber-50 text-amber-700 border border-amber-250'
                      }`}>
                        {att.status === 'present' ? 'ลงชื่อสำเร็จ' : 'สาย/อนุมัติพิเศษ'}
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

// ==================== 3. STUDENT PROFILE ====================

export const StudentProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <PageHeader breadcrumbs={[{ label: 'ประตูนรพ.' }, { label: 'ข้อมูลนักศึกษา' }]} />
      <ContentContainer>
        <PageTitle
          title="ข้อมูลนักศึกษาพยาบาลทางวิชาการ (Academic Passport)"
          subtitle="รายละเอียดประวัติส่วนบุคคลและใบรับรองขึ้นสิทธิ์สอบฝึก"
        />

        <div className="max-w-2xl text-left space-y-6">
          {/* Main Identity Box */}
          <Card className="flex flex-col sm:flex-row gap-6 items-center p-6 bg-slate-900 text-white border-slate-800">
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150"}
              alt=""
              className="w-24 h-24 rounded-full border-2 border-blue-500 object-cover shrink-0"
            />
            <div className="space-y-1.5 grow text-center sm:text-left">
              <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase block">STUDENT CARD</span>
              <h3 className="text-xl font-bold font-display">{user?.name}</h3>
              <p className="text-xs text-slate-400 font-mono">รหัสเทียบ: {user?.studentId || '6512345091'}</p>
              
              <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start text-xs">
                <span className="px-2.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">
                  {user?.department || 'คณะพยาบาลศาสตร์ ชั้นปีที่ 3'}
                </span>
                <span className="px-2.5 py-0.5 bg-[#10B981]/15 text-[#10B981] rounded border border-[#10B981]/25 font-semibold">
                  สิทธิ์สอบทำคลอด: มีสิทธิ์ (Active)
                </span>
              </div>
            </div>
          </Card>

          {/* Clinical stats checklist progress paperless */}
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-display border-b pb-2">ระบบนิเทศและที่ปรึกษา</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-650">
              <div className="space-y-1.5">
                <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider">อาจารย์คุมเวรประจำหอคลอด:</span>
                <p className="text-slate-900 border p-2.5 bg-slate-50 rounded-lg">อ.เดโม นามสมมติ (Ajarn Demo)</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider">กลุ่มไลน์นิเทศโรงพยาบาล:</span>
                <p className="text-blue-600 border p-2.5 bg-blue-50/20 border-blue-100 rounded-lg cursor-pointer">@STIN_MIDWIFERY_G1</p>
              </div>
            </div>
          </Card>
        </div>
      </ContentContainer>
    </>
  );
};
