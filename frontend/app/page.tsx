import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProducts from "@/components/FeaturedProducts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />

      {/* Mini CTA for Products */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#0b1120]">
        <div className="container mx-auto px-6">
          <div className="glass-card p-12 text-center max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px]" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to explore our <span className="gradient-text">technologies?</span>
            </h2>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg">
              Check out our lineup of intelligent systems designed to push the boundaries of what&apos;s possible.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-10 py-5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-teal-900/20 group"
            >
              View Products
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
