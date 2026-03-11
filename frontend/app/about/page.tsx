"use client";

import { motion } from "framer-motion";
import { Target, Eye, Rocket } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-8"
                    >
                        About <span className="gradient-text">Tech Agent</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-400 leading-relaxed"
                    >
                        Tech Agent is a forward-thinking technology startup focused on building intelligent, scalable, and future-ready systems. We believe in defying the status quo to build tools that empower the next generation of innovators.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-[60px] group-hover:bg-teal-500/20 transition-all" />
                        <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
                            <Eye size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                        <p className="text-slate-400 leading-relaxed">
                            To be the global leader in AI-driven automation, creating a world where technology works seamlessly to solve humanity&apos;s most complex challenges.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] group-hover:bg-emerald-500/20 transition-all" />
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                            <Target size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-slate-400 leading-relaxed">
                            To build reliable, scalable, and intuitive AI systems that empower businesses to innovate faster, scale stronger, and shape a better future.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 glass-card p-12 max-w-5xl mx-auto text-center"
                >
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <div className="w-16 h-16 overflow-hidden flex items-center justify-center">
                            <img src="/images/logo2.jpeg" alt="Tech Agent Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight gradient-text">
                            Tech Agent
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6">The Journey So Far</h2>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                        Founded by a group of passionate engineers and visionaries, Tech Agent has quickly grown into a hub for cutting-edge development. Every line of code we write and every system we deploy is a step towards a future where technology is more than just a tool—it's a partner in progress.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutPage;
