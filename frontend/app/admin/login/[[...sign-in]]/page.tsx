"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";

const AdminLoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10">
                <div className="text-center mb-10">
                    <div className="flex flex-col items-center gap-4 mb-6">
                        <div className="w-16 h-16 overflow-hidden flex items-center justify-center">
                            <img src="/images/logo2.jpeg" alt="Tech Agent Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight gradient-text">
                            Tech Agent
                        </span>
                    </div>
                </div>
                <SignIn
                    routing="path"
                    path="/admin/login"
                    fallbackRedirectUrl="/admin/dashboard"
                />
            </div>
        </div>
    );
};

export default AdminLoginPage;
