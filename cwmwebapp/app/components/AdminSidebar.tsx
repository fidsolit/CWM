import Link from "next/link";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { AiFillHome, AiFillProduct } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { FaShieldAlt } from "react-icons/fa";
import { setNavActive } from "@/utils/AdminNavSlice";
import { useDispatch, useSelector } from "react-redux";

// Types
interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface LinkItem {
  href: Parameters<typeof Link>[0]["href"];
  icon: React.ReactNode;
  label: string;
}

// Navigation Items Configuration
const NAV_ITEMS: NavItem[] = [
  { id: "Base", icon: <AiFillHome className="mx-2" />, label: "Home" },
  {
    id: "activeCategories",
    icon: <BiCategory className="mx-2" />,
    label: "Categories",
  },
  {
    id: "activeProducts",
    icon: <AiFillProduct className="mx-2" />,
    label: "Products",
  },
  {
    id: "activePendingOrder",
    icon: <MdOutlinePendingActions className="mx-2" />,
    label: "Pending Orders",
  },
  {
    id: "activeDeliveredOrder",
    icon: <GrCompliance className="mx-2" />,
    label: "Completed Orders",
  },
  {
    id: "activeStockIn",
    icon: <GrCompliance className="mx-2" />,
    label: "Stock In",
  },
  { id: "activePOS", icon: <GrCompliance className="mx-2" />, label: "POS" },
  {
    id: "activeUsers",
    icon: <GrCompliance className="mx-2" />,
    label: "Users",
  },
  {
    id: "activeWarrantyClaims",
    icon: <FaShieldAlt className="mx-2" />,
    label: "Warranty Claims",
  },
];

const LINK_ITEMS: LinkItem[] = [
  {
    href: "/product/add-product" as const,
    icon: <IoIosAddCircle className="mx-2" />,
    label: "Add Products",
  },
  {
    href: "/category/add-category" as const,
    icon: <IoIosAddCircle className="mx-2" />,
    label: "Add Category",
  },
];

// Styles
const styles = {
  sidebar: "w-64 hidden dark:text-black md:block bg-white h-full shadow-lg",
  header: "w-full text-center py-4 px-4 h-20 border-b",
  headerTitle:
    "flex text-2xl font-bold items-center justify-center text-gray-800",
  headerIcon: "mx-2 text-blue-600",
  navList: "flex flex-col space-y-1",
  navItem:
    "w-full flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200",
  activeNavItem: "bg-blue-50 text-blue-600 border-r-4 border-blue-600",
  navIcon: "mx-2",
  navLabel: "font-medium",
};

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const activeNav = useSelector((state: any) => state.AdminNav.ActiveNav);

  const renderNavItem = (item: NavItem) => (
    <li key={item.id}>
      <button
        onClick={() => dispatch(setNavActive(item.id))}
        className={`${styles.navItem} ${
          activeNav === item.id ? styles.activeNavItem : ""
        }`}
      >
        {item.icon}
        <span className={styles.navLabel}>{item.label}</span>
      </button>
    </li>
  );

  const renderLinkItem = (item: LinkItem) => (
    <li key={item.label}>
      <Link href={item.href} className={styles.navItem}>
        {item.icon}
        <span className={styles.navLabel}>{item.label}</span>
      </Link>
    </li>
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          <RxDashboard className={styles.headerIcon} /> Dashboard
        </h1>
      </div>
      <div className="w-full py-4">
        <ul className={styles.navList}>
          {NAV_ITEMS.map(renderNavItem)}
          {LINK_ITEMS.map(renderLinkItem)}
        </ul>
      </div>
    </div>
  );
}
