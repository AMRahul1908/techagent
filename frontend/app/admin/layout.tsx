"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    PlusCircle,
    Settings,
    LogOut,
    Box,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token && pathname !== "/admin/login") {
            router.push("/admin/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/admin/login");
    };

    if (pathname === "/admin/login") {
        return <div className="bg-[#0f172a] min-h-screen">{children}</div>;
    }

    if (isAuthenticated === null) return null;

    const menuItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Add Product", href: "/admin/products/add", icon: <PlusCircle size={20} /> },
        { name: "Manage Products", href: "/admin/products/manage", icon: <Box size={20} /> },
        { name: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex min-h-screen bg-[#0b1120] text-slate-100">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 bg-[#0f172a] border-r border-white/5 w-64 z-50">
                <div className="h-full flex flex-col p-4">
                    <div className="flex items-center justify-between mb-10 px-2">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 overflow-hidden flex items-center justify-center shrink-0">
                                <img src="/images/logo2.jpeg" alt="Tech Agent Icon" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xl font-bold gradient-text">Tech Agent</span>
                        </Link>
                    </div>

                    <nav className="flex-grow space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    pathname === item.href
                                        ? "bg-teal-600/20 text-teal-400 border border-teal-500/20"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <span className={cn(pathname === item.href ? "text-teal-400" : "group-hover:text-teal-400")}>{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all mt-auto"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow ml-64">
                <div className="p-8 pb-20">
                    {children}
                </div>
            </main>
        </div>
    );
}
