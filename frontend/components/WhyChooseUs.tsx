"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Users, Globe } from "lucide-react";

const features = [
    {
        title: "Innovative Solutions",
        description: "Cutting-edge AI integration for modern business challenges.",
        icon: <Zap className="text-teal-400" size={24} />,
    },
    {
        title: "High Quality Standards",
        description: "Rigorous testing and precision in every line of code.",
        icon: <ShieldCheck className="text-emerald-400" size={24} />,
    },
    {
        title: "Trusted by Customers",
        description: "A growing community of partners who rely on our expertise.",
        icon: <Users className="text-teal-400" size={24} />,
    },
    {
        title: "Scalable & Future-Ready",
        description: "Infrastructure built to grow alongside your ambitions.",
        icon: <Globe className="text-emerald-400" size={24} />,
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Why Choose <span className="gradient-text">Tech Agent?</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        We combine technical excellence with futuristic vision to deliver results that matter.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="glass-card p-8 group hover:border-teal-500/50 hover:shadow-teal-500/10"
                        >
                            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-teal-500/10 group-hover:border-teal-500/20 transition-all">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
