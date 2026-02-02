import React, { useState, useRef, useEffect } from 'react';
import { faqItems } from '../../lib/content';

interface FAQSectionProps {
  id?: string;
  background?: React.ReactNode;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ id, background }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  // Refs for calculating height correctly for smooth animation
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id} className="relative py-24 md:py-32 overflow-hidden border-t border-white/5 bg-neutral-900">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        {background}
      </div>
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10 pointer-events-none"></div>

      <div className="relative z-20 container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Часті запитання</h2>
          <p className="text-neutral-400 max-w-xl mx-auto">Усе, що ви хотіли знати про процес розробки та співпрацю.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`
                    animate-fade-in-up 
                    bg-white/5 border rounded-2xl overflow-hidden transition-colors duration-300
                    ${isOpen ? 'border-amber-500/50 bg-white/10' : 'border-white/10 hover:border-white/20'}
                `}
                style={{ animationDelay: `${100 + (index * 100)}ms` }}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-bold text-lg md:text-xl transition-colors duration-300 ${isOpen ? 'text-amber-400' : 'text-white'}`}>
                    {item.question}
                  </span>
                  <span className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'border-amber-400 text-amber-400 rotate-45' : 'border-white/20 text-white'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  </span>
                </button>
                
                <div 
                  ref={el => { answerRefs.current[index] = el }}
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{ 
                      maxHeight: isOpen ? `${answerRefs.current[index]?.scrollHeight ? answerRefs.current[index]?.scrollHeight + 40 : 200}px` : '0px',
                      opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="p-6 pt-0 text-neutral-300 leading-relaxed border-t border-white/5 mt-2">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};