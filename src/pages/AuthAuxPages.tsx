import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { ShieldAlert, LogIn, AlertOctagon, HelpCircle, ArrowLeft, RefreshCw, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { PrimaryButton, SecondaryButton, Card } from '../components/ReusableComponents';

// ==================== LOGIN COMPONENT PLACEHOLDER ====================

export const LoginPage: React.FC = () => {
  const { loginAs, isAuthenticated, user, role } = useAuth();
  const { addToast } = useApp();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('student@stin.ac.th');
  const [password, setPassword] = useState('••••••••');
  const [selectedPreset, setSelectedPreset] = useState<'student' | 'instructor'>('student');

  const handlePresetSelect = (preset: 'student' | 'instructor') => {
    setSelectedPreset(preset);
    if (preset === 'student') {
      setEmail('student@stin.ac.th');
    } else {
      setEmail('instructor@stin.ac.th');
    }
  };

  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedPreset);
    addToast(`ยินดีต้อนรับกลับเข้าสู่ระบบ, ${selectedPreset === 'student' ? 'คุณนิสิตพยาบาล' : 'ท่านอาจารย์ผู้ทรงความรู้'}`, 'success');
    if (selectedPreset === 'instructor') {
      navigate('/instructor/dashboard');
    } else {
      navigate('/student/progress');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-slate-200/80">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 font-display">เข้าสู่ระบบลงทะเบียนหัตถการ</h2>
            <p className="text-xs text-slate-500 mt-1">
              สถาบันการพยาบาลศรีสวรินทิรา สภากาชาดไทย (STIN Account Only)
            </p>
          </div>

          {/* Quick presets selectors */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg mb-6">
            <button
              onClick={() => handlePresetSelect('student')}
              className={`py-2 text-xs font-semibold rounded-md transition-all ${
                selectedPreset === 'student' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              type="button"
            >
              บัญชีนิสิตพยาบาล
            </button>
            <button
              onClick={() => handlePresetSelect('instructor')}
              className={`py-2 text-xs font-semibold rounded-md transition-all ${
                selectedPreset === 'instructor' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              type="button"
            >
              บัญชีอาจารย์นิเทศ
            </button>
          </div>

          <form onSubmit={handleMockLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                อีเมลผู้ใช้มหาวิทยาลัย
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition"
                placeholder="email@stin.ac.th"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                รหัสผ่านเข้าระบบ
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition"
              />
            </div>

            {/* Note alert */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800 text-[11px] leading-relaxed">
              <strong>หมายเหตุสำหรับการทดสอบ:</strong> บัญชีมีโปรไฟล์และจำลองข้อมูลไว้ล่วงหน้า คลิกปุ่ม <strong>เข้าสู่ระบบ</strong> ได้ทันทีเพื่อเริ่มทดสอบความเข้ากันของระบบ
            </div>

            <PrimaryButton type="submit" className="w-full py-3" icon={<LogIn className="w-4 h-4" />}>
              เข้าสู่ระบบระบบพยาบาล
            </PrimaryButton>
          </form>

          {/* Prompt 2 Info Card */}
          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
            <p className="text-xs text-slate-400">
              * การลงชื่อเข้าใช้อย่างเป็นทางการผ่านระบบ Firebase Auth จะได้รับการติดตั้งในขั้นตอนถัดไป (Prompt 2)
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

// ==================== NOT AUTHORIZED COMPONENT ====================

export const NotAuthorizedPage: React.FC = () => {
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="max-w-md text-center shadow-lg border-slate-200/80">
        <div className="p-4 bg-amber-100 text-amber-600 rounded-full inline-block mb-4">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-black text-slate-900 font-display">ไม่มีสิทธิ์การเข้าถึงข้อมูลหน้านี้</h2>
        <p className="text-sm text-slate-500 mt-2">
          ขออภัย บทบาทบัญชีสิทธิ์ปัจจุบันของคุณไม่ได้รับการอนุญาตให้เข้าเรียนรู้ส่วนแผงควบคุมหลักนี้
        </p>

        {/* Dynamic Fix Toggles */}
        <div className="mt-6 p-4 bg-slate-100 rounded-xl text-left border border-slate-200">
          <p className="text-xs font-bold text-slate-700 mb-2">แก้ไขเฉพาะหน้าโดยผู้ทดสอบระบบ:</p>
          <div className="flex gap-2">
            <PrimaryButton
              className="py-2.5 text-xs grow"
              onClick={() => {
                loginAs('instructor');
                navigate('/instructor/dashboard');
              }}
            >
              สลับเป็น อาจารย์
            </PrimaryButton>
            <SecondaryButton
              className="py-2.5 text-xs grow"
              onClick={() => {
                loginAs('student');
                navigate('/student/progress');
              }}
            >
              สลับเป็น นักศึกษา
            </SecondaryButton>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4 flex gap-2">
          <Link to="/" className="w-full">
            <SecondaryButton className="w-full">กลับสู่หน้าแรก</SecondaryButton>
          </Link>
        </div>
      </Card>
    </div>
  );
};

// ==================== 404 NOT FOUND COMPONENT ====================

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="p-4 bg-slate-100 text-slate-500 rounded-full inline-block mb-4">
          <Compass className="w-12 h-12 animate-pulse text-blue-500" />
        </div>
        <h2 className="text-5xl font-black text-blue-600 font-display">404</h2>
        <h3 className="text-lg font-bold text-slate-900 mt-2">ไม่พบหน้านี้ในสารบบข้อมูลพยาบาล</h3>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold font-mono">Page Not Found</p>
        <p className="text-sm text-slate-500 mt-3 max-w-sm mx-auto">
          ลิงก์เชื่อมต่ออาจเสียหาย ถูกย้ายหมวดหมู่ หรือสิทธิ์การเข้าใช้งานหมดประสิทธิภาพ
        </p>

        <div className="mt-6">
          <Link to="/">
            <PrimaryButton icon={<ArrowLeft className="w-4 h-4" />}>
              กลับคืนสู่หน้าหลัก
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
