import { memo } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { CURRENCY } from '../constants';

export const ProductCard = memo(({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card border border-white/5 p-5 flex flex-col transition-all duration-500 hover:border-gold/30"
    >
      <div className="relative aspect-square overflow-hidden bg-black mb-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        {product.isNew && (
          <span className="absolute top-0 right-0 bg-pink text-black text-[8px] font-bold px-2 py-1 uppercase tracking-widest z-10">
            NEW
          </span>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold">
             <Plus size={20} />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xs font-medium tracking-wide text-white group-hover:text-gold transition-colors uppercase">{product.name}</h3>
          <p className="text-gold text-xs font-bold whitespace-nowrap ml-4">
            {CURRENCY} {product.price.toLocaleString()}
          </p>
        </div>
        <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-medium">{product.category}</p>
        
        <button
          onClick={() => onAddToCart(product)}
          className="mt-6 w-full py-3 border border-white/10 text-[9px] uppercase tracking-[0.3em] font-bold text-white/50 hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
        >
          Add to Collection
        </button>
      </div>
    </motion.div>
  );
});
