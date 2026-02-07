import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { name: 'Послуги', id: 'services' },
    { name: 'Портфоліо', id: 'portfolio' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Контакти', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 md:py-3 flex items-center justify-between shadow-2xl relative">
          
          {/* Logo */}
          <a href="#" onClick={(e) => scrollToSection(e, 'hero-section')} className="flex items-center gap-2 z-50 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black font-bold text-xs">FF</div>
            <span className="text-white font-bold text-lg tracking-tight">FluxForge</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
                <a 
                    key={link.name}
                    href={`#${link.id}`} 
                    onClick={(e) => scrollToSection(e, link.id)}
                    className="hover:text-amber-400 transition-colors"
                >
                    {link.name}
                </a>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <a 
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="bg-amber-500 text-black px-5 py-2 rounded-lg text-sm font-bold hover:bg-amber-400 transition-colors inline-block"
            >
              Обговорити проект
            </a>
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
          <div className={`absolute top-full left-0 w-full bg-neutral-900/95 backdrop-blur-xl border-b border-white/10 overflow-hidden transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-6 ${isOpen ? 'max-h-screen py-8 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
            {navLinks.map((link) => (
                <a 
                    key={link.name}
                    href={`#${link.id}`} 
                    className="text-lg font-medium text-white hover:text-amber-400" 
                    onClick={(e) => scrollToSection(e, link.id)}
                >
                    {link.name}
                </a>
            ))}
            <a 
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="bg-amber-500 text-black px-8 py-3 rounded-lg text-lg font-bold w-3/4 text-center"
            >
              Обговорити проект
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
};