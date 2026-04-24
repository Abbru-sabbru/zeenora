import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CURRENCY } from '../constants';
import { Product } from '../types';

export const Products = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'], []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pb-24 min-h-screen bg-dark">
      <div className="container mx-auto px-10">
        {/* Header */}
        <div className="mb-20 pt-20 flex flex-col md:flex-row items-end justify-between border-b border-white/10 pb-12 gap-8">
          <div className="max-w-xl text-left">
            <h1 className="text-5xl md:text-7xl font-serif italic text-white mb-6">Our <span className="text-gold">Collection</span></h1>
            <p className="text-white/40 font-light text-sm tracking-wide leading-relaxed">
              Explore our meticulously curated selection of premium jewelry, imported to bring unmatched elegance to your wardrobe.
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input
              type="text"
              placeholder="SEARCH PIECES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 rounded-none pl-8 pr-4 py-3 text-[10px] tracking-widest focus:outline-none focus:border-gold transition-all text-white uppercase placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 text-[9px] font-bold uppercase tracking-[0.3em] transition-all border ${
                selectedCategory === cat
                  ? 'bg-gold text-black border-gold'
                  : 'bg-transparent text-white/50 border-white/10 hover:border-gold/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-gray-300 mb-4 inline-block">
              <Search size={64} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};
