import React, { ReactNode } from 'react';

interface FeatureGridProps {
  background: ReactNode;
  id?: string;
}

const services = [
  { 
    title: "Локальне SEO", 
    desc: "Ми налаштуємо ваш сайт так, щоб клієнти з вашого міста знаходили вас першими в Google.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    )
  },
  { 
    title: "Адаптивність", 
    desc: "Ваш сайт ідеально виглядатиме на будь-якому пристрої: від старого iPhone до великого монітора.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
    )
  },
  { 
    title: "Швидкість завантаження", 
    desc: "Ніхто не любить чекати. Ми оптимізуємо код та зображення, щоб сайт літав.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    )
  },
  { 
    title: "Зручне управління", 
    desc: "Ви зможете самі змінювати ціни, додавати фото та редагувати тексти без програміста.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
    )
  },
  { 
    title: "Онлайн запис", 
    desc: "Інтеграція форм бронювання та CRM, щоб ви не втрачали жодного клієнта.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
    )
  },
  { 
    title: "Технічна підтримка", 
    desc: "Ми не кидаємо вас після запуску. Забезпечуємо стабільну роботу 24/7.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
    )
  }
];

export const FeatureGrid: React.FC<FeatureGridProps> = ({ background, id }) => {
  return (
    <section id={id} className="relative py-32 overflow-hidden bg-neutral-900 border-t border-white/5">
      {/* Background with opacity control */}
      <div className="absolute inset-0 z-0 opacity-40">
        {background}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none"></div>

      <div className="relative z-20 container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Чому обирають нас?</h2>
          <p className="text-neutral-400 max-w-xl mx-auto">Ми розуміємо потреби малого бізнесу: зробити швидко, якісно і за розумні гроші.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 hover:border-amber-500/50">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6 text-amber-400 group-hover:text-black group-hover:bg-amber-400 transition-colors">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};