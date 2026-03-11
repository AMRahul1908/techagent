"use client";

import React, { useState } from "react";
import { contactApi } from "@/lib/api";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await contactApi.submit(formData);
            setSuccess(true);
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Get in <span className="gradient-text">Touch</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Have a question or want to discuss a project? Reach out to our team of experts.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                    {/* Info Cards */}
                    <div className="space-y-8">
                        <div className="glass-card p-8 flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                                <p className="text-slate-400">hello@techagent.tech</p>
                                <p className="text-slate-400 text-sm mt-1">Response within 24 hours</p>
                            </div>
                        </div>

                        <div className="glass-card p-8 flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                                <p className="text-slate-400">+1 (555) 123-4567</p>
                                <p className="text-slate-400 text-sm mt-1">Mon - Fri, 9am - 6pm EST</p>
                            </div>
                        </div>

                        <div className="glass-card p-8 flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                                <p className="text-slate-400">123 Future Lane, Tech City, Mars 00001</p>
                                <p className="text-slate-400 text-sm mt-1">The orbital campus</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="glass-card p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px]" />

                        {success ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-6">
                                    <CheckCircle size={48} />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
                                <p className="text-slate-400 mb-8">Thank you for reaching out. Our team will get back to you shortly.</p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-500 transition-all"
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300 ml-1">Name</label>
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 ml-1">Phone (Optional)</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
                                    <textarea
                                        required
                                        name="message"
                                        rows={5}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all resize-none"
                                        placeholder="Tell us about your project..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>

                                {error && <p className="text-red-400 text-sm ml-1">{error}</p>}

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={24} /> : <><Send size={20} /> Send Message</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
