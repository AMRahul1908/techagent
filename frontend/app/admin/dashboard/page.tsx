"use client";

import React, { useEffect, useState } from "react";
import { productsApi } from "@/lib/api";
import { motion } from "framer-motion";
import { Box, Users, MessageSquare, TrendingUp, Loader2 } from "lucide-react";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        enquiries: 0,
        activeUsers: 1,
        views: 1240
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await productsApi.getAll();
                setStats(prev => ({ ...prev, products: response.data.length }));
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { name: "Total Products", value: stats.products, icon: <Box className="text-teal-400" />, color: "teal" },
        { name: "Messages", value: stats.enquiries, icon: <MessageSquare className="text-emerald-400" />, color: "emerald" },
        { name: "Admin Users", value: stats.activeUsers, icon: <Users className="text-blue-400" />, color: "blue" },
        { name: "Site Views", value: stats.views, icon: <TrendingUp className="text-purple-400" />, color: "purple" },
    ];

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-teal-500" size={32} />
        </div>
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Systems Overview</h1>
                <p className="text-slate-400">Welcome back, here&apos;s what&apos;s happening at Tech Agent today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                {stat.icon}
                            </div>
                            <span className="text-slate-400 font-medium">{stat.name}</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
                                    <Box size={18} />
                                </div>
                                <div>
                                    <p className="text-white font-medium">New product system deployed</p>
                                    <p className="text-sm text-slate-500 mt-1">Version 2.0.4.5 successfully integrated into the main grid.</p>
                                    <p className="text-xs text-slate-600 mt-2">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8">
                    <h3 className="text-xl font-bold text-white mb-6">System Health</h3>
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-slate-400">Core Engine</span>
                                <span className="text-sm text-teal-400">Stable</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 w-[98%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-slate-400">API Response</span>
                                <span className="text-sm text-emerald-400">Optimal</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[92%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-slate-400">Database Load</span>
                                <span className="text-sm text-slate-400">Normal</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 w-[15%]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
