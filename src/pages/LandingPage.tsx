import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Users, QrCode, BookOpen, Clock, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { PrimaryButton, Card } from '../components/ReusableComponents';

export const LandingPage: React.FC = () => {
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelection = (role: 'instructor' | 'student') => {
    loginAs(role);
    if (role === 'instructor') {
      navigate('/instructor/dashboard');
    } else {
      navigate('/student/progress');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Upper Navigation / Decorative Banner */}
      <nav className="bg-white border-b border-slate-200 py-4 px-6 sm:px-12 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600 rounded-lg text-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-bold text-red-600 font-display">สถาบันการพยาบาลศรีสวรินทิรา สภากาชาดไทย</h1>
            <p className="text-[11px] text-slate-550 font-bold uppercase tracking-wider">Srisavarindhira Thai Red Cross Institute of Nursing</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>ระบบผ่านเกณฑ์มาตรฐานหลักสูตรสภาการพยาบาล</span>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="grow max-w-5xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col items-center justify-center text-center">
        {/* Course Code Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-50 text-red-700 rounded-full text-xs font-bold font-mono border border-red-200 mb-5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>COURSE NS312</span>
        </motion.div>

        {/* Title Block */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-slate-900 font-display leading-[1.125] tracking-tight"
        >
          ระบบบันทึกประสบการณ์การเรียนรู้
          <span className="block text-red-600 mt-2 text-2xl sm:text-4xl text-wrap font-bold">
            รายวิชาปฏิบัติการพยาบาลมารดาและการผดุงครรภ์ ๑
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-500 max-w-2xl mt-5"
        >
          ระบบติดตามสะสมทักษะและบันทึกประสบการณ์เรียนรู้ทางคลินิก (Nursing Checklist Tracker) สำหรับนักศึกษาพยาบาล ณ หออภิบาลคลอดและทารก บริหารจัดการรับรองหัตถการทันท่วงทีผ่านระบบคิวอาร์โค้ดอัจฉริยะ (Dynamic QR Code)
        </motion.p>

        {/* Subtitle english */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-xs text-slate-400 font-medium tracking-wide mt-1.5 italic font-mono uppercase"
        >
          Nursing Learning Experience Tracking System via Dynamic Sign-Off
        </motion.p>

        {/* Two Large Bento Cards for Role Entry */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mt-12">
          {/* Card 1: Instructor Portal Card */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-left"
          >
            <Card className="h-full flex flex-col justify-between border-slate-200/90 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-5 opacity-5 group-hover:scale-110 transition-transform">
                <Users className="w-32 h-32 text-slate-900" />
              </div>
              
              <div>
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900 mb-5 border border-slate-200">
                  <Users className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">อาจารย์ผู้สอน / อาจารย์นิเทศ</h3>
                <p className="text-xs text-slate-500 mt-2 uppercase tracking-wide font-semibold">INSTRUCTOR PORTAL</p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  จัดการรายวิชา ตรวจสอบคำขออนุมัติทักษะของนักศึกษา ตรวจตารางสรุปผลสัมฤทธิ์ สถิติสะสมหัตถการ และสร้างรหัสสแกนเวลาเข้าปฏิบัติงานด้วย Dynamic QR Code ณ จุดตรวจ
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => handleRoleSelection('instructor')}
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white rounded-lg font-semibold text-sm hover:bg-slate-800 transition active:scale-98 cursor-pointer shadow-sm group-hover:translate-x-0"
                >
                  <span>เข้าสู่ระบบระบบอาจารย์</span>
                  <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Student Portal Card */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-left"
          >
            <Card className="h-full flex flex-col justify-between border-slate-200/90 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-5 opacity-5 group-hover:scale-110 transition-transform">
                <QrCode className="w-32 h-32 text-red-900" />
              </div>

              <div>
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-5 border border-red-100">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">นิสิต / นักศึกษาพยาบาล</h3>
                <p className="text-xs text-red-650 mt-2 uppercase tracking-wide font-semibold">STUDENT PORTAL</p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  สแกนคิวอาร์โค้ดเพื่อเช็คชื่อลานฝึก ลงบันทึกประสบการณ์ทำคลอดปกติ (LR/PP Procedures) เขียนบันทึกสะท้อนคิดส่งเพื่อขอรับคำวิจารณ์ และติดตามสถิติทักษะของตนเองแบบสด
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => handleRoleSelection('student')}
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition active:scale-98 cursor-pointer shadow-sm"
                >
                  <span>เข้าสู่ระบบระบบนักศึกษา</span>
                  <ArrowRight className="w-4 h-4 text-red-200 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Feature stats tags */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl w-full mt-12 bg-white p-4 rounded-xl border border-slate-200 divide-x divide-slate-150">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-lg font-bold text-slate-900 font-display">10+ หัวข้อ</span>
            <span className="text-[10px] text-slate-400 mt-1 uppercase">เกณฑ์หัตถการผดุงครรภ์</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-lg font-bold text-slate-900 font-display">100% Real-Time</span>
            <span className="text-[10px] text-slate-400 mt-1 uppercase">สแกนตรวจสอบความถูกต้อง</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-lg font-bold text-slate-900 font-display">Paperless</span>
            <span className="text-[10px] text-slate-400 mt-1 uppercase">แทนสมุดบันทึกเล่มน้ำเงิน</span>
          </div>
        </div>
      </main>

      {/* Decorative Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 py-6 text-center text-xs">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} สถาบันการพยาบาลศรีสวรินทิรา สภากาชาดไทย. ระบบตรวจสอบหัตถการปฏิบัติการผดุงครรภ์</p>
          <div className="flex gap-4 text-[11px] font-medium">
            <span className="text-[#10B981] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
              พร้อมเชื่อมต่อฐานข้อมูล
            </span>
            <Link to="/login" className="hover:text-slate-300">ความช่วยเหลือ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
