import React, { KeyboardEvent } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, Loader2, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ToastMessage } from '../types';

// ==================== KEYBOARD ENHANCED BUTTONS ====================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ children, icon, className = '', ariaLabel, ...props }) => (
  <button
    {...props}
    aria-label={ariaLabel}
    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 outline-none text-white font-medium text-sm rounded-lg shadow-sm hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:bg-blue-800 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {icon && <span className="w-4 h-4">{icon}</span>}
    {children}
  </button>
);

export const SecondaryButton: React.FC<ButtonProps> = ({ children, icon, className = '', ariaLabel, ...props }) => (
  <button
    {...props}
    aria-label={ariaLabel}
    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 outline-none text-slate-700 font-medium text-sm rounded-lg shadow-sm hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:bg-slate-100 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {icon && <span className="w-4 h-4 text-slate-500">{icon}</span>}
    {children}
  </button>
);

export const DangerButton: React.FC<ButtonProps> = ({ children, icon, className = '', ariaLabel, ...props }) => (
  <button
    {...props}
    aria-label={ariaLabel}
    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 border border-rose-200 outline-none text-rose-700 font-medium text-sm rounded-lg hover:bg-rose-100 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 active:bg-rose-200 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {icon && <span className="w-4 h-4">{icon}</span>}
    {children}
  </button>
);

// ==================== CARDS & BENTO SHAPES ====================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', id }) => (
  <div
    id={id}
    className={`bg-white rounded-xl border border-slate-200/85 p-6 shadow-xs ${className}`}
  >
    {children}
  </div>
);

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  color?: 'blue' | 'emerald' | 'amber' | 'rose' | 'slate';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  icon,
  color = 'blue',
  className = ''
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 border-blue-100',
      text: 'text-blue-700',
      iconContainer: 'bg-blue-100 text-blue-600',
    },
    emerald: {
      bg: 'bg-emerald-50 border-emerald-100',
      text: 'text-emerald-700',
      iconContainer: 'bg-emerald-100 text-emerald-600',
    },
    amber: {
      bg: 'bg-amber-50 border-amber-100',
      text: 'text-amber-700',
      iconContainer: 'bg-amber-100 text-amber-600',
    },
    rose: {
      bg: 'bg-rose-50 border-rose-100',
      text: 'text-rose-700',
      iconContainer: 'bg-rose-100 text-rose-600',
    },
    slate: {
      bg: 'bg-slate-50 border-slate-100',
      text: 'text-slate-700',
      iconContainer: 'bg-slate-100 text-slate-600',
    }
  };

  const style = colorMap[color] || colorMap.blue;

  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center justify-between ${className}`}>
      <div>
        <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{title}</p>
        <h4 className="text-2xl font-bold font-display text-slate-900 mt-1">{value}</h4>
        {subValue && <span className="text-xs text-slate-400 mt-0.5 block">{subValue}</span>}
      </div>
      <div className={`p-3 rounded-lg ${style.iconContainer} flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );
};

// ==================== TITLES & HEADERS ====================

interface PageTitleProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-bold font-display tracking-tight text-slate-900 sm:text-3xl leading-tight">
        {title}
      </h1>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
    {action && <div className="flex items-center gap-2 self-start sm:self-auto">{action}</div>}
  </div>
);

// ==================== MOCK TABLE PLACEHOLDER ====================

interface TablePlaceholderProps {
  headers: string[];
  rowCount?: number;
}

export const TablePlaceholder: React.FC<TablePlaceholderProps> = ({ headers, rowCount = 4 }) => (
  <div className="overflow-x-auto rounded-lg border border-slate-100">
    <table className="min-w-full divide-y divide-slate-100 text-left text-sm text-slate-500">
      <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-700">
        <tr>
          {headers.map((h, idx) => (
            <th key={idx} className="px-6 py-4">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {Array.from({ length: rowCount }).map((_, rIdx) => (
          <tr key={rIdx} className="hover:bg-slate-50">
            {headers.map((_, hIdx) => (
              <td key={hIdx} className="px-6 py-4 whitespace-nowrap">
                {hIdx === 0 ? (
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse" />
                    <div className="h-3 w-28 rounded bg-slate-200 animate-pulse" />
                  </div>
                ) : hIdx === headers.length - 1 ? (
                  <div className="h-8 w-16 rounded-md bg-slate-200 animate-pulse" />
                ) : (
                  <div className="h-3 w-16 rounded bg-slate-200 animate-pulse" />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ==================== STATES Overlay/Screen ====================

export const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 bg-slate-55 bg-opacity-70 backdrop-blur-xs flex flex-col items-center justify-center z-50">
    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
    <span className="mt-4 text-sm font-medium text-slate-700">กำลังดาวน์โหลดข้อมูลระบบพยาบาล...</span>
  </div>
);

interface StateProps {
  title?: string;
  description: string;
  onRetry?: () => void;
  ariaLabel?: string;
}

export const EmptyState: React.FC<StateProps> = ({
  title = 'ไม่พบข้อมูลในขณะนี้',
  description,
  onRetry,
  ariaLabel
}) => (
  <div
    aria-label={ariaLabel || title}
    className="flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200"
  >
    <div className="p-4 bg-white rounded-full shadow-xs mb-4">
      <AlertCircle className="w-8 h-8 text-slate-400" />
    </div>
    <h3 className="text-base font-semibold text-slate-800">{title}</h3>
    <p className="text-sm text-slate-500 max-w-sm mt-1">{description}</p>
    {onRetry && (
      <SecondaryButton onClick={onRetry} className="mt-4">
        โหลดข้อมูลใหม่
      </SecondaryButton>
    )}
  </div>
);

export const ErrorState: React.FC<StateProps> = ({
  title = 'เกิดข้อผิดพลาดในการทำงาน',
  description,
  onRetry
}) => (
  <div className="flex flex-col items-center justify-center text-center p-8 bg-rose-50/50 rounded-2xl border border-rose-100">
    <div className="p-4 bg-rose-100 text-rose-600 rounded-full mb-4">
      <XCircle className="w-8 h-8" />
    </div>
    <h3 className="text-base font-bold text-rose-900">{title}</h3>
    <p className="text-sm text-rose-600 max-w-sm mt-1">{description}</p>
    {onRetry && (
      <PrimaryButton onClick={onRetry} className="mt-4" bg-rose-600 hover:bg-rose-700>
        ลองใหม่อีกครั้ง
      </PrimaryButton>
    )}
  </div>
);

// ==================== COMPACT OVERLAYS & ALERTS ====================

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'ยืนยัน',
  cancelText = 'ยกเลิก',
  onConfirm,
  onCancel,
  isDanger = false
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          onClick={onCancel}
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100 z-10 relative p-6"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-desc"
        >
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-full ${isDanger ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
              {isDanger ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
            </div>
            <div>
              <h3 id="dialog-title" className="text-lg font-bold text-slate-900">
                {title}
              </h3>
              <p id="dialog-desc" className="text-sm text-slate-500 mt-2">
                {message}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2.5 mt-6 border-t border-slate-100 pt-4">
            <SecondaryButton onClick={onCancel}>{cancelText}</SecondaryButton>
            {isDanger ? (
              <DangerButton onClick={onConfirm}>{confirmText}</DangerButton>
            ) : (
              <PrimaryButton onClick={onConfirm}>{confirmText}</PrimaryButton>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// ==================== TOAST OVERLAYS ====================

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const typeStyles = {
            success: {
              border: 'border-emerald-200 bg-emerald-50 text-emerald-800',
              icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
            },
            error: {
              border: 'border-rose-200 bg-rose-50 text-rose-800',
              icon: <XCircle className="w-5 h-5 text-rose-600" />,
            },
            warning: {
              border: 'border-amber-200 bg-amber-50 text-amber-800',
              icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
            },
            info: {
              border: 'border-blue-200 bg-blue-50 text-blue-800',
              icon: <Info className="w-5 h-5 text-blue-600" />,
            },
          };

          const style = typeStyles[toast.type] || typeStyles.info;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg pointer-events-auto ${style.border}`}
            >
              <div className="shrink-0 mt-0.5">{style.icon}</div>
              <div className="grow text-sm font-medium pr-2 whitespace-pre-wrap">{toast.message}</div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="shrink-0 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Dismiss Alert"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
