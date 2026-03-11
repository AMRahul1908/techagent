"use client";

import React, { useEffect, useState } from "react";
import { productsApi } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, Search, Loader2, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Product {
    _id: string;
    name: string;
    description: string;
    image: string;
    category: string;
    price?: number;
    featured?: boolean;
}

const ManageProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await productsApi.getAll();
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await productsApi.delete(id);
            setProducts(products.filter(p => p._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Manage Products</h1>
                    <p className="text-slate-400">View, edit, and maintain your product inventory.</p>
                </div>
                <Link
                    href="/admin/products/add"
                    className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-teal-900/20 w-fit"
                >
                    <Plus size={20} /> Add New Product
                </Link>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="px-8 py-5 text-sm font-semibold text-slate-300">Product</th>
                                <th className="px-8 py-5 text-sm font-semibold text-slate-300">Category</th>
                                <th className="px-8 py-5 text-sm font-semibold text-slate-300">Price</th>
                                <th className="px-8 py-5 text-sm font-semibold text-slate-300">Status</th>
                                <th className="px-8 py-5 text-sm font-semibold text-slate-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <Loader2 className="animate-spin text-teal-500 mx-auto" size={32} />
                                    </td>
                                </tr>
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0 border border-white/10">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{product.name}</p>
                                                    <p className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-[200px]">{product.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-slate-300">
                                            {product.price ? `$ ${product.price}` : "N/A"}
                                        </td>
                                        <td className="px-8 py-5">
                                            {product.featured ? (
                                                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Featured
                                                </span>
                                            ) : (
                                                <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Standard</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link
                                                    href={`/admin/products/edit/${product._id}`}
                                                    className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-teal-400 hover:bg-teal-400/10 transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-slate-500">
                                        No products found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProductsPage;
