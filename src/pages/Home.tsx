import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, Star, Quote, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, BRAND_NAME, CURRENCY } from '../constants';
import { Product } from '../types';

export const Home = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
  const featuredProducts = useMemo(() => PRODUCTS.slice(0, 6), []);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    description: ''
  });

  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setStatus('success');
    setTimeout(() => {
      setFormData({ name: '', phone: '', description: '' });
      setStatus('idle');
    }, 3000);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex border-b border-white/10">
        <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-dark z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-pink" />
              <span className="text-pink text-xs uppercase tracking-[0.4em] font-bold">Dhaka, Bangladesh</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif italic leading-[0.85] text-white mb-10">
              Elegance<br />
              <span className="text-gold">Redefined</span>
            </h1>
            
            <p className="text-white/50 text-sm max-w-sm leading-relaxed mb-12 font-medium tracking-wide">
              Premium collections imported directly from China. We sell happiness, not materials.
            </p>
            
            <Link
              to="/products"
              className="inline-block bg-gold text-black px-12 py-5 font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all transform hover:-translate-y-1"
            >
              Discover Collection
            </Link>
          </motion.div>
        </div>
        
        <div className="hidden md:flex md:w-1/2 relative bg-[#111] overflow-hidden items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent z-10" />
          <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-gold/20 via-gold/10 to-transparent blur-[100px] opacity-40 animate-pulse" />
          
          <div className="relative w-80 h-80 border border-white/10 rotate-45 flex items-center justify-center group">
            <div className="absolute inset-0 border border-gold/20 scale-110 -rotate-12 transition-transform duration-1000 group-hover:rotate-0" />
            <div className="w-64 h-64 border border-gold flex items-center justify-center">
              <div className="w-40 h-40 bg-gradient-to-br from-gold via-white to-gold/60 rotate-12 shadow-[0_0_80px_rgba(212,175,55,0.4)] transition-transform duration-700 group-hover:rotate-45" />
            </div>
            
            <div className="absolute bottom-[-100px] right-[-50px] -rotate-45 text-right whitespace-nowrap">
               <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Seasonal Edition</p>
               <p className="text-xl italic font-serif text-white">Majestic Diamond Series</p>
            </div>
          </div>
        </div>

        {/* Floating Pre-Order Badge */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-12 h-56 bg-gold flex flex-col items-center justify-center gap-4 text-black font-bold border-l-8 border-dark shrink-0 z-40 hidden lg:flex">
          <div className="rotate-90 whitespace-nowrap text-[10px] tracking-[0.5em] font-black">PRE-ORDER OPEN</div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-10">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-serif italic text-white flex items-center gap-4">
              Featured <span className="text-gold">Pieces</span>
            </h2>
            <Link to="/products" className="text-[10px] uppercase tracking-[0.3em] text-white/40 border-b border-white/20 pb-2 hover:text-gold hover:border-gold transition-all">
              View All Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Order Section */}
      <section className="py-32 relative overflow-hidden bg-black text-white border-y border-white/5">
        <div className="container mx-auto px-10 relative z-10 flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-widest font-bold uppercase">Custom Orders</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 italic">Pre-Order Your<br/>Favorite Design</h2>
            <p className="text-lg text-white/40 mb-12 leading-relaxed font-light max-w-lg">
              We import premium jewelry directly from China and provide high-quality stylish collections for our customers in Bangladesh.
            </p>
            <div className="space-y-8">
              {[
                "Direct Import from China",
                "High Quality Stylish Collections",
                "Custom Order Verification"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-6 text-white/60">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold">
                    <Star size={16} />
                  </div>
                  <span className="text-sm uppercase tracking-widest font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full max-w-lg">
            <form onSubmit={handleSubmit} className="bg-card p-10 border border-white/5">
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-2">
                  <label className="block text-[8px] uppercase tracking-[0.3em] font-black text-white/30 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent text-white text-xs tracking-widest focus:outline-none uppercase"
                    placeholder="ENTER NAME"
                  />
                </div>
                <div className="border-b border-white/10 pb-2">
                  <label className="block text-[8px] uppercase tracking-[0.3em] font-black text-white/30 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent text-white text-xs tracking-widest focus:outline-none"
                    placeholder="+880"
                  />
                </div>
                <div className="border-b border-white/10 pb-2">
                  <label className="block text-[8px] uppercase tracking-[0.3em] font-black text-white/30 mb-2">Request Details</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-transparent text-white text-xs tracking-widest focus:outline-none resize-none uppercase"
                    placeholder="DESCRIBE YOUR PIECE"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'success'}
                  className={`w-full py-5 font-bold uppercase text-[10px] tracking-[0.4em] transition-all ${
                    status === 'success' ? 'bg-green-600 text-white' : 'bg-gold text-black hover:bg-white'
                  }`}
                >
                  {status === 'success' ? 'SUBMITTED' : 'SEND REQUEST'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-card/50 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[120px] rounded-full" />
        <div className="container mx-auto px-10 max-w-5xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-10 italic">
            "We sell happiness, not materials."
          </h2>
          <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light mb-12 max-w-3xl mx-auto tracking-wide">
            We import premium jewelry directly from China and provide high-quality stylish collections for our customers in Bangladesh. Based in Dhaka, Zeenora is your destination for elegance.
          </p>
          <div className="h-[1px] w-24 bg-gold/40 mx-auto" />
        </div>
      </section>
    </div>
  );
};
