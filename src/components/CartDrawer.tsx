import { memo } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { CURRENCY } from '../constants';

export const CartDrawer = memo(({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove
}: {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dark border-l border-white/10 shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ShoppingBag className="text-gold" size={20} />
                <h2 className="text-lg font-bold font-serif italic uppercase tracking-[0.2em] text-white">Your Collection</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6 text-white/20">
                    <ShoppingBag size={24} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 tracking-widest uppercase">Empty Bag</h3>
                  <p className="text-[10px] text-white/40 mb-8 uppercase tracking-widest">Add some sparkle to your life.</p>
                  <button
                    onClick={onClose}
                    className="border border-gold text-gold px-10 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-20 h-20 overflow-hidden flex-shrink-0 bg-card border border-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest leading-tight pr-4">{item.name}</h4>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="text-white/20 hover:text-pink transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-gold font-bold mt-1">
                          {CURRENCY} {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 border-b border-white/5 pb-2 mt-4 w-fit">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="hover:text-gold text-white/40 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="min-w-[20px] text-center text-[10px] font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="hover:text-gold text-white/40 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 bg-card border-t border-white/10">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">Total Collection</span>
                  <span className="text-xl font-serif font-bold text-gold italic">
                    {CURRENCY} {total.toLocaleString()}
                  </span>
                </div>
                <button
                  className="w-full bg-gold text-black py-5 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all transform active:scale-95"
                  onClick={() => alert('Proceeding to secure checkout...')}
                >
                  Confirm Purchase
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
