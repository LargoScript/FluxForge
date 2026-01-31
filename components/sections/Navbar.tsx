import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 md:py-3 flex items-center justify-between shadow-2xl relative">
          
          {/* Logo */}
          <div className="flex items-center gap-2 z-50">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black font-bold text-xs">FF</div>
            <span className="text-white font-bold text-lg tracking-tight">FluxForge</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#" className="hover:text-amber-400 transition-colors">Послуги</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Портфоліо</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Відгуки</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Контакти</a>
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <button className="bg-amber-500 text-black px-5 py-2 rounded-lg text-sm font-bold hover:bg-amber-400 transition-colors">
              Обговорити проект
            </button>
          </div>

          {/* Mobile Burger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`absolute top-full left-0 w-full bg-neutral-900/95 backdrop-blur-xl border-b border-white/10 overflow-hidden transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-6 ${isOpen ? 'max-h-96 py-8 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
            <a href="#" className="text-lg font-medium text-white hover:text-amber-400" onClick={() => setIsOpen(false)}>Послуги</a>
            <a href="#" className="text-lg font-medium text-white hover:text-amber-400" onClick={() => setIsOpen(false)}>Портфоліо</a>
            <a href="#" className="text-lg font-medium text-white hover:text-amber-400" onClick={() => setIsOpen(false)}>Відгуки</a>
            <a href="#" className="text-lg font-medium text-white hover:text-amber-400" onClick={() => setIsOpen(false)}>Контакти</a>
            <button className="bg-amber-500 text-black px-8 py-3 rounded-lg text-lg font-bold w-3/4" onClick={() => setIsOpen(false)}>
              Обговорити проект
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};