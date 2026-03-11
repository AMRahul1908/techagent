"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
    const pathname = usePathname();

    // Do not show public footer on admin pages
    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="bg-[#0b1120] border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Logo & Description */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 overflow-hidden flex items-center justify-center">
                                <img src="/images/logo2.jpeg" alt="Tech Agent Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xl font-bold tracking-tight gradient-text">
                                Tech Agent
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Tech Agent builds intelligent AI-powered systems that help businesses automate, scale, and innovate for a future beyond limits.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {["Home", "Products", "About", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-slate-400 hover:text-teal-400 text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Legal</h4>
                        <ul className="space-y-4">
                            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-teal-400 text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Icons */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-teal-500 hover:text-white transition-all">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-teal-500 hover:text-white transition-all">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-teal-500 hover:text-white transition-all">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} Tech Agent Systems Inc. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-xs italic">
                        Built for the future.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
