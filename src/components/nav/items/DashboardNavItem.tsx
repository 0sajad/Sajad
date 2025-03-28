
import React from "react";
import { NavItem } from "../NavItem";
import { LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface DashboardNavItemProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
}

// هذا المكون تم تعطيله حسب طلب المستخدم
export const DashboardNavItem = ({
  onMouseEnter,
  onMouseLeave,
  isHovered
}: DashboardNavItemProps = {}) => {
  return null; // لا يعرض أي شيء
};
