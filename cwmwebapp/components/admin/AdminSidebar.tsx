"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaShieldAlt,
  FaCog,
} from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: FaHome },
    { name: "Products", href: "/admin/products", icon: FaBox },
    { name: "Users", href: "/admin/users", icon: FaUsers },
    { name: "Orders", href: "/admin/orders", icon: FaShoppingCart },
    {
      name: "Warranty Claims",
      href: "/admin/warranty-claims",
      icon: FaShieldAlt,
    },
    { name: "Settings", href: "/admin/settings", icon: FaCog },
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen">
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6 ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-300"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
