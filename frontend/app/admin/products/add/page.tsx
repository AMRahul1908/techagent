"use client";

import React, { useState } from "react";
import { productsApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const AddProductPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        category: "",
        price: "",
        featured: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await productsApi.create({
                ...formData,
                price: formData.price ? parseFloat(formData.price) : undefined
            });
            router.push("/admin/products/manage");
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/products/manage"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold text-white">Add New Product</h1>
            </div>

            <div className="glass-card p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Product Name</label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                                    placeholder="e.g. Neural Link Core"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Category</label>
                                <select
                                    required
                                    name="category"
                                    className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    <option value="AI Engine">AI Engine</option>
                                    <option value="Automation">Automation</option>
                                    <option value="Cybernetics">Cybernetics</option>
                                    <option value="Cloud Systems">Cloud Systems</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Price (Optional)</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex items-center gap-3 py-2">
                                <input
                                    name="featured"
                                    type="checkbox"
                                    id="featured"
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                />
                                <label htmlFor="featured" className="text-sm font-medium text-slate-300 cursor-pointer">
                                    Featured Product (Show on homepage/top)
                                </label>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Image URL</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        required
                                        name="image"
                                        type="url"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                                        placeholder="https://images.unsplash.com/..."
                                        value={formData.image}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Description</label>
                                <textarea
                                    required
                                    name="description"
                                    rows={6}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all resize-none"
                                    placeholder="Describe the product features and capabilities..."
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            disabled={loading}
                            type="submit"
                            className="px-10 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-teal-900/40 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <><Save size={20} /> Deploy Product</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;
