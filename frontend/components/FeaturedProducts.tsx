"use client";

import React, { useEffect, useState } from "react";
import { productsApi } from "@/lib/api";
import { motion } from "framer-motion";
import { ExternalLink, Loader2, ArrowRight } from "lucide-react";
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

const FeaturedProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productsApi.getAll();
                // We only want featured products, or the first few if none are featured
                const allProducts = response.data;
                const featured = allProducts.filter((p: Product) => p.featured);
                setProducts(featured.length > 0 ? featured.slice(0, 3) : allProducts.slice(0, 3));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="text-teal-500 animate-spin" size={48} />
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Featured <span className="gradient-text">Innovations</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl text-lg">
                            Experience the cutting-edge technology that powers our most advanced AI solutions.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="group flex items-center gap-2 text-teal-400 font-bold hover:text-teal-300 transition-colors"
                    >
                        Explore All Systems <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card group overflow-hidden flex flex-col h-full"
                        >
                            {/* Product Image */}
                            <div className="relative h-64 w-full overflow-hidden bg-white/5">
                                <img
                                    src={product.image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop"}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-teal-600/90 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm border border-white/10">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-grow flex flex-col relative">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    {product.price && (
                                        <span className="text-xl font-mono font-bold text-emerald-400">
                                            ${product.price.toLocaleString()}
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
            </div>
        </section>
    );
};

export default FeaturedProducts;
