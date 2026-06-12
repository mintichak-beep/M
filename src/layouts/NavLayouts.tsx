import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  QrCode,
  FileBarChart,
  Settings,
  Clock,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  TrendingUp,
  History,
  UserCheck,
  Award,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ==================== TOP NAVIGATION BRANDING & ROLE SWITCHER ====================

export const TopNavigation: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const { user, role, loginAs, logout } = useAuth();
  const { toasts, removeToast } = useApp();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white text-slate-900 border-b border-slate-200 shadow-xs px-4 sm:px-6 flex items-center justify-between">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
          aria-label="Toggle Side Area"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 rounded-lg text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold leading-tight font-display tracking-wide text-slate-900">
              ระบบบันทึกประสบการณ์พยาบาลมารดาฯ
            </h1>
            <p className="text-[10px] text-slate-550 font-bold uppercase tracking-wider">
              Nursing Learning Experience Tracking System
            </p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-xs font-bold leading-tight font-display">STIN NURSING</h1>
          </div>
        </Link>
      </div>

      {/* Center/Right controls: Real-Time Quick Toggles for Testing & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Quick Testing Toggles (Very helpful to jump between Student and Instructor context!) */}
        <div className="flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg">
          <button
            onClick={() => {
              loginAs('student');
              navigate('/student/progress');
            }}
            className={`px-2.5 py-1 text-[11px] rounded transition-all cursor-pointer font-bold ${
              role === 'student' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
            aria-label="Switch to Student Demo"
          >
            นศ.
          </button>
          <button
            onClick={() => {
              loginAs('instructor');
              navigate('/instructor/dashboard');
            }}
            className={`px-2.5 py-1 text-[11px] rounded transition-all cursor-pointer font-bold ${
              role === 'instructor' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-400 hover:text-slate-900'
            }`}
            aria-label="Switch to Instructor Demo"
          >
            อาจารย์
          </button>
        </div>

        {/* User Status / Info dropdown */}
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3 pl-2 border-l border-slate-200">
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100"}
              alt="User profile"
              className="w-8 h-8 rounded-full border border-slate-200 object-cover"
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800">{user.name}</p>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{role}</p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="p-1.5 hover:bg-slate-100 text-slate-450 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
              title="ออกจากระบบ"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 px-3.5 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition"
          >
            เข้าสู่ระบบ
          </Link>
        )}
      </div>
    </header>
  );
};

// ==================== SIDEBAR NAVIGATION (DESKTOP / TABLET) ====================

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarNavigation: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role, user } = useAuth();

  const instructorMenus = [
    { title: 'แดชบอร์ดติดตาม', path: '/instructor/dashboard', icon: <LayoutDashboard className="w-4.5 h-4.5" /> },
    { title: 'รายวิชาของฉัน', path: '/instructor/courses', icon: <GraduationCap className="w-4.5 h-4.5" /> },
    { title: 'รายชื่อนักศึกษา', path: '/instructor/students', icon: <Users className="w-4.5 h-4.5" /> },
    { title: 'รายการประสบการณ์', path: '/instructor/sessions', icon: <Clock className="w-4.5 h-4.5" /> },
    { title: 'สร้าง Dynamic QR', path: '/instructor/dynamic-qr', icon: <QrCode className="w-4.5 h-4.5" /> },
    { title: 'รายงานและประเมินผล', path: '/instructor/reports', icon: <FileBarChart className="w-4.5 h-4.5" /> },
    { title: 'ตั้งค่าระบบ', path: '/instructor/settings', icon: <Settings className="w-4.5 h-4.5" /> }
  ];

  const studentMenus = [
    { title: 'ความก้าวหน้าของฉัน', path: '/student/progress', icon: <TrendingUp className="w-4.5 h-4.5" /> },
    { title: 'ประวัติเวลาปฏิบัติงาน', path: '/student/attendance', icon: <History className="w-4.5 h-4.5" /> },
    { title: 'ข้อมูลส่วนตัว', path: '/student/profile', icon: <UserIcon className="w-4.5 h-4.5" /> }
  ];

  const currentMenus = role === 'instructor' ? instructorMenus : studentMenus;

  return (
    <>
      {/* Mobile/Tablet Drawer Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Navigation Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-slate-700 border-r border-slate-200 flex flex-col justify-between transform transition-transform duration-250 lg:translate-x-0 lg:static lg:h-full shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-0 -translate-x-full'
        }`}
      >
        <div>
          {/* Header Inside Sidebar (For Mobile/Tablet Drawer Close button) */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 lg:hidden">
            <span className="font-bold text-slate-900 font-display">เมนูการใช้งาน</span>
            <button
              onClick={onClose}
              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Minimal Profile Card */}
          {user && (
            <div className="p-5 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100"}
                  alt=""
                  className="w-10 h-10 rounded-full border border-slate-200 object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{user.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {user.studentId || user.instructorId || 'STIN STAFF'}
                  </p>
                </div>
              </div>
              <div className="mt-3.5 px-3 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-center text-blue-600 flex items-center justify-center gap-1.5 uppercase tracking-wider shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {role === 'instructor' ? 'อาจารย์ผู้ประเมิน' : 'นักศึกษาชั้นคลินิก'}
              </div>
            </div>
          )}

          {/* Nav Links */}
          <nav className="p-4 flex flex-col gap-1">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider px-3 py-2 uppercase">
              {role === 'instructor' ? 'INSTRUCTOR PORTAL' : 'STUDENT PORTAL'}
            </p>
            {currentMenus.map((menu) => (
              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? role === 'instructor'
                        ? 'bg-[#0F172A] text-white shadow-xs'
                        : 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {menu.icon}
                <span>{menu.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Info Box Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 text-center">
          <p className="text-[10px] text-[#0F172A] font-bold uppercase tracking-wider">FACULTY OF NURSING</p>
          <p className="text-[9px] text-slate-500 mt-0.5">Experience Tracking System v1.0</p>
        </div>
      </aside>
    </>
  );
};

// ==================== MOBILE BOTTOM NAVIGATION (UNDER SCREEN FOR HAND HELD DEVICE) ====================

export const MobileBottomNavigation: React.FC = () => {
  const { role } = useAuth();

  const instructorBottomMenus = [
    { title: 'หน้าแรก', path: '/instructor/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { title: 'รายชื่อ', path: '/instructor/students', icon: <Users className="w-5 h-5" /> },
    { title: 'สร้าง QR', path: '/instructor/dynamic-qr', icon: <QrCode className="w-5 h-5" /> },
    { title: 'ประเมิน', path: '/instructor/sessions', icon: <Clock className="w-5 h-5" /> },
  ];

  const studentBottomMenus = [
    { title: 'ความก้าวหน้า', path: '/student/progress', icon: <TrendingUp className="w-5 h-5" /> },
    { title: 'เข้าเวร', path: '/student/attendance', icon: <History className="w-5 h-5" /> },
    { title: 'ข้อมูลฉัน', path: '/student/profile', icon: <UserIcon className="w-5 h-5" /> },
  ];

  const currentMenus = role === 'instructor' ? instructorBottomMenus : studentBottomMenus;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 text-slate-400 h-16 flex items-center justify-around lg:hidden shadow-md">
      {currentMenus.map((menu) => (
        <NavLink
          key={menu.path}
          to={menu.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center grow py-2 px-1 text-center font-bold transition-all ${
              isActive 
                ? role === 'instructor' 
                  ? 'text-[#0F172A]' 
                  : 'text-blue-600' 
                : 'text-slate-400 hover:text-slate-900'
            }`
          }
        >
          {menu.icon}
          <span className="text-[10px] mt-1 leading-none">{menu.title}</span>
        </NavLink>
      ))}
    </div>
  );
};

// ==================== REUSABLE PAGE HEADER AND CONTAINER ====================

interface PageHeaderProps {
  breadcrumbs: { label: string; path?: string }[];
  addon?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ breadcrumbs, addon }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-6">
    <nav className="flex text-xs font-semibold text-slate-500 whitespace-nowrap" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5">
        {breadcrumbs.map((bc, idx) => (
          <li key={idx} className="inline-flex items-center">
            {idx > 0 && <span className="mx-1.5 text-slate-350">/</span>}
            {bc.path ? (
              <Link to={bc.path} className="hover:text-blue-600 transition">
                {bc.label}
              </Link>
            ) : (
              <span className="text-slate-800 font-bold">{bc.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    {addon && <div className="mt-3 sm:mt-0 flex gap-2">{addon}</div>}
  </div>
);

export const ContentContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="grow overflow-y-auto px-4 py-6 sm:px-6 md:py-8 bg-[#F8FAFC]/90 pb-24 lg:pb-8 flex flex-col justify-start">
    {children}
  </main>
);

// ==================== APP LAYOUT OVERALL WRAPPER ====================

export const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Dynamic Header */}
      <TopNavigation onToggleSidebar={() => setSidebarOpen(true)} />

      {/* Main Container */}
      <div className="grow flex overflow-hidden">
        {/* Sidebar Navigation */}
        <SidebarNavigation isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content Panel */}
        <div className="grow flex flex-col overflow-hidden">
          {children}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNavigation />
    </div>
  );
};
