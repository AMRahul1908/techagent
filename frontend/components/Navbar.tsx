"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Do not show public navbar on admin pages
    if (pathname.startsWith("/admin")) return null;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "nav-blur py-3" : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-110">
                        <img src="/images/logo2.jpeg" alt="Tech Agent Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight gradient-text">
                        Tech Agent
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-teal-400",
                                pathname === link.href ? "text-teal-400" : "text-slate-300"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/products"
                        className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-teal-900/20"
                    >
                        Explore Products
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
