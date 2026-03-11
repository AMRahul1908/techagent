"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productsApi } from "@/lib/api";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Shield,
    Cpu,
    Zap,
    Globe,
    Loader2,
    Calendar,
    Tag,
    Clock,
    Box
} from "lucide-react";
import Link from "next/link";

interface Product {
    _id: string;
    name: string;
    description: string;
    image: string;
    category: string;
    price?: number;
    featured?: boolean;
    createdAt?: string;
}

const ProductDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productsApi.getById(id as string);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
                // Redirect if not found
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0b1120]">
                <Loader2 className="text-teal-500 animate-spin" size={48} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b1120] text-white p-6">
                <h1 className="text-4xl font-bold mb-4">System Not Found</h1>
                <p className="text-slate-400 mb-8 text-center max-w-md">
                    The requested technology core could not be located in our systems. It may have been decommissioned or moved.
                </p>
                <Link
                    href="/products"
                    className="flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-500 rounded-xl font-bold transition-all"
                >
                    <ArrowLeft size={20} /> Back to Systems
                </Link>
            </div>
        );
    }

    const specifications = [
        { label: "Processing Architecture", value: "Neural Core V3.2", icon: <Cpu size={18} /> },
        { label: "Sync Speed", value: "Sub-nanosecond", icon: <Zap size={18} /> },
        { label: "Encryption", value: "Quantum-Safe AES", icon: <Shield size={18} /> },
        { label: "Deployment", value: "Edge Optimized", icon: <Globe size={18} /> },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[#0b1120]">
            <div className="container mx-auto px-6">
                {/* Breadcrumb / Back Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Systems Inventory
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side: Product Image & Metadata */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="glass-card p-2 relative group overflow-hidden rounded-[2rem]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="aspect-square relative rounded-[1.8rem] overflow-hidden bg-[#0f172a]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {product.featured && (
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 rounded-full bg-emerald-500/90 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-xl border border-white/20">
                                            Priority Asset
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Metadata Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="glass-card p-4 text-center">
                                <Tag className="mx-auto text-teal-400 mb-2" size={20} />
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Status</p>
                                <p className="text-sm font-bold text-white">Operational</p>
                            </div>
                            <div className="glass-card p-4 text-center">
                                <Calendar className="mx-auto text-teal-400 mb-2" size={20} />
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Deploys</p>
                                <p className="text-sm font-bold text-white">1.2k+</p>
                            </div>
                            <div className="glass-card p-4 text-center">
                                <Clock className="mx-auto text-teal-400 mb-2" size={20} />
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Uptime</p>
                                <p className="text-sm font-bold text-white">99.99%</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Product Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-10"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-widest border border-teal-500/20">
                                    {product.category}
                                </span>
                                <span className="text-slate-600">/</span>
                                <span className="text-slate-400 text-xs font-mono">ID: {product._id.slice(-8).toUpperCase()}</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                                {product.description}
                            </p>
                        </div>

                        {/* Pricing and Primary CTA */}
                        <div className="flex flex-wrap items-center gap-8 py-6 border-y border-white/5">
                            {product.price && (
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-medium">Enterprise Licensing</p>
                                    <p className="text-4xl font-mono font-bold text-emerald-400">
                                        ${product.price.toLocaleString()}<span className="text-slate-500 text-lg font-normal"> /node</span>
                                    </p>
                                </div>
                            )}
                            <button className="px-12 py-5 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-teal-900/40 hover:-translate-y-1 active:scale-95">
                                Initialize Deployment
                            </button>
                        </div>

                        {/* Technical Specifications */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <Box className="text-teal-400" size={24} /> Technical Specifications
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {specifications.map((spec) => (
                                    <div key={spec.label} className="glass-card p-6 flex items-center gap-4 hover:border-teal-500/30 transition-all">
                                        <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                                            {spec.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{spec.label}</p>
                                            <p className="text-white font-semibold">{spec.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Extra Content Section */}
                        <div className="glass-card p-8 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-[60px]" />
                            <h4 className="text-white font-bold mb-4">Engineer's Note</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                This system unit represents the pinnacle of current neural-link technology. Designed with scalability in mind, it supports seamless integration with existing Tech Agent infrastructure.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
