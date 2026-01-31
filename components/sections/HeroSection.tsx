import React, { ReactNode } from 'react';
import { heroContent } from '../../lib/content';
import { useBackgroundConfig } from '../../hooks/useBackgroundConfig';
import { HeroConfig } from '../../types';

interface HeroSectionProps {
  id?: string;
  /** Optional dynamic background component */
  background?: ReactNode;
  /** Initial config (will be overridden by Registry if edited) */
  config?: HeroConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  id = 'hero-section', 
  background, 
  config: initialConfig 
}) => {
  // Merge defaults with props, but let Registry take precedence via the hook
  const defaultProps: HeroConfig = {
    badge: heroContent.badge,
    title: `${heroContent.title.line1} ${heroContent.title.highlight}`,
    description: heroContent.description,
    mediaType: 'video',
    mediaSrc: heroContent.videoSrc,
    poster: heroContent.poster,
    buttonText: heroContent.buttons.primary
  };

  const config = useBackgroundConfig(id, 'Hero Configuration', { ...defaultProps, ...initialConfig });

  return (
    <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20 pb-10">
      
      {/* 1. Media Layer (Video or Image) */}
      {config?.mediaSrc && (
        <div className="absolute inset-0 z-0">
            {config.mediaType === 'video' ? (
                <video 
                    className="w-full h-full object-cover opacity-60" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    poster={config.poster}
                    key={config.mediaSrc} // Force reload on src change
                >
                    <source src={config.mediaSrc} type="video/mp4" />
                </video>
            ) : (
                <img 
                    src={config.mediaSrc} 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-50" 
                />
            )}
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
        </div>
      )}

      {/* 2. Dynamic Background Layer (Optional Overlay) */}
      {background && (
        <div className={`absolute inset-0 z-1 ${config?.mediaSrc ? 'mix-blend-overlay opacity-30' : ''}`}>
          {background}
        </div>
      )}

      {/* 3. Content Layer */}
      <div className="relative z-20 container mx-auto px-4 text-center flex flex-col justify-center h-full">
        
        <div className="animate-fade-in-up">
            {config?.badge && (
                <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-amber-300 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                    {config.badge}
                </div>
            )}
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-2xl max-w-5xl mx-auto leading-[1.1]">
                {/* Simple HTML parsing for breaks if needed, or just rendering text */}
                {config?.title}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md font-light px-2">
                {config?.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                {config?.buttonText || 'Замовити консультацію'}
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-bold backdrop-blur-md transition-all">
                Дивитись портфоліо
            </button>
            </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-white/10 hidden sm:flex justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 flex-wrap">
            <span className="text-white font-bold text-sm md:text-xl">SHOPIFY</span>
            <span className="text-white font-bold text-sm md:text-xl">WORDPRESS</span>
            <span className="text-white font-bold text-sm md:text-xl">REACT</span>
            <span className="text-white font-bold text-sm md:text-xl">GOOGLE ADS</span>
        </div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
    </header>
  );
};