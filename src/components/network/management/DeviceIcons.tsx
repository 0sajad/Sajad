
import React from "react";
import { Laptop, Smartphone, Tv, Gamepad, Printer, HelpCircle } from "lucide-react";

export const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'laptop': return <Laptop size={16} />;
    case 'smartphone': return <Smartphone size={16} />;
    case 'tv': return <Tv size={16} />;
    case 'gaming': return <Gamepad size={16} />;
    case 'printer': return <Printer size={16} />;
    default: return <HelpCircle size={16} />;
  }
};

export const getStatusIcon = (status: string) => {
  const CheckCircle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
  const XCircle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;
  const AlertTriangle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
  const HelpCircleIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;

  switch (status) {
    case 'online': return <CheckCircle />;
    case 'offline': return <XCircle />;
    case 'warning': return <AlertTriangle />;
    default: return <HelpCircleIcon />;
  }
};
