"use client";

import React, { useEffect, useState } from "react";
import { productsApi } from "@/lib/api";
import { motion } from "framer-motion";
import { ExternalLink, ShoppingBag, Loader2 } from "lucide-react";
import Image from "next/image";
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

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productsApi.getAll();
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Our <span className="gradient-text">Products</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Discover our suite of high-performance AI solutions designed for the next generation of business.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="text-teal-500 animate-spin" size={48} />
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="glass-card group overflow-hidden flex flex-col h-full"
                            >
                                {/* Product Image */}
                                <div className="relative h-64 w-full overflow-hidden bg-white/5">
                                    <img
                                        src={product.image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop"}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-teal-600/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                            {product.category}
                                        </span>
                                    </div>
                                    {product.featured && (
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                                Featured
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {product.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        {product.price && (
                                            <span className="text-xl font-bold text-emerald-400">
                                                ${product.price}
                                            </span>
                                        )}
                                        <Link
                                            href={`/products/${product._id}`}
                                            className="flex items-center gap-2 text-teal-400 font-semibold hover:text-teal-300 transition-colors"
                                        >
                                            Learn More <ExternalLink size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <ShoppingBag className="mx-auto text-slate-600 mb-6" size={64} />
                        <h3 className="text-2xl font-bold text-white mb-2">No products available yet.</h3>
                        <p className="text-slate-500">Our engineering team is working on some exciting solutions. Stay tuned!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
