import { memo, useMemo } from 'react';
import { ShoppingBag, ChevronRight, Menu, X, Facebook, Instagram, Youtube, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND_NAME, PHONE, LOCATION } from '../constants';

export const Navbar = memo(({ cartCount, onOpenCart, isOpen, toggleMenu }: { cartCount: number; onOpenCart: () => void; isOpen: boolean; toggleMenu: () => void }) => {
  const location = useLocation();

  const navLinks = useMemo(() => [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ], []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
        <Link to="/" className="text-3xl font-serif font-bold text-gold tracking-[0.2em] uppercase">
          {BRAND_NAME}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:text-gold ${
                location.pathname === link.path ? 'text-pink' : 'text-white/70'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={onOpenCart}
            className="flex items-center space-x-2 px-3 py-1.5 border border-gold text-gold text-[10px] tracking-widest font-bold hover:bg-gold hover:text-black transition-all"
            aria-label="Open cart"
          >
            <span>CART</span>
            <span>({cartCount})</span>
          </button>
          
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black border-b border-gold/20 pb-8 px-4"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMenu}
                  className={`text-xl tracking-widest uppercase font-medium ${
                    location.pathname === link.path ? 'text-gold' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});
