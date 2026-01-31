import React, { ReactNode, useState } from 'react';
import { portfolioItems } from '../../lib/content';

interface CarouselSectionProps {
  background: ReactNode;
}

export const CarouselSection: React.FC<CarouselSectionProps> = ({ background }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? portfolioItems.length - 1 : prev - 1));
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-t border-white/5">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0 opacity-60">
        {background}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 px-2">
            <div className="mb-4 md:mb-0">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Наші проекти</h2>
                <p className="text-neutral-400">Приклади того, як ми допомагаємо бізнесу рости.</p>
            </div>
            <div className="hidden md:block">
                <a href="#" className="text-amber-400 hover:text-white font-medium text-sm transition-colors flex items-center gap-2">
                    Весь каталог →
                </a>
            </div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Main Image Window */}
          <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-neutral-900">
            <div 
                className="flex transition-transform duration-500 md:duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {portfolioItems.map((slide, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 relative">
                        <img 
                            src={slide.image} 
                            alt={slide.title} 
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12">
                            {/* Text Container */}
                            <div className="transform transition-all duration-500 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                                <div className="flex items-center gap-3 md:gap-4 mb-2">
                                    <span className="text-amber-400 font-mono text-[10px] md:text-xs uppercase tracking-wider">{slide.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                                    <span className="text-neutral-400 font-mono text-[10px] md:text-xs">{slide.year}</span>
                                </div>
                                <h3 className="text-2xl md:text-4xl font-bold text-white">{slide.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button 
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 active:scale-95"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 active:scale-95"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-between items-center mt-6 px-2">
             <div className="text-neutral-500 text-xs md:text-sm font-mono">
                 0{currentIndex + 1} / 0{portfolioItems.length}
             </div>
             <div className="flex gap-2">
                {portfolioItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'w-8 md:w-12 bg-amber-400' : 'w-2 md:w-4 bg-neutral-700 hover:bg-neutral-500'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            <div className="md:hidden">
                <a href="#" className="text-amber-400 font-medium text-xs">
                    Всі роботи →
                </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};