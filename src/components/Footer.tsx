import { memo } from 'react';
import { Facebook, Instagram, Youtube, Phone, MapPin } from 'lucide-react';
import { BRAND_NAME, PHONE, LOCATION } from '../constants';

export const Footer = memo(() => {
  return (
    <footer className="bg-black border-t border-white/5 py-12 px-10 text-[10px] uppercase tracking-[0.2em] text-white/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8">
        <div className="text-center md:text-left">
          &copy; {new Date().getFullYear()} {BRAND_NAME} Jewelry Bangladesh
        </div>
        <div className="flex justify-center space-x-8">
          <a href="#" className="hover:text-gold transition-colors">Facebook</a>
          <a href="#" className="hover:text-gold transition-colors">Instagram</a>
          <a href="#" className="hover:text-gold transition-colors">YouTube</a>
        </div>
        <div className="text-center md:text-right space-y-1">
          <div>Location: {LOCATION}</div>
          <div>Support: {PHONE}</div>
        </div>
      </div>
    </footer>
  );
});
