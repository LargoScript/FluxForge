// Content Configuration
// Тут ми зберігаємо всі тексти та посилання на медіа.
// Щоб використати власні фото/відео:
// 1. Покладіть файл у папку 'public' вашого проекту (наприклад, public/hero-video.mp4)
// 2. Замініть посилання тут на '/hero-video.mp4'

export const heroContent = {
  // Для локального відео замініть на: '/videos/my-hero.mp4'
  videoSrc: "https://cdn.coverr.co/videos/coverr-working-in-a-luxury-office-4623/1080p.mp4",
  poster: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
  badge: "Web Development for Small Business",
  title: {
    line1: "Ми створюємо сайти, які",
    highlight: "приносять прибуток"
  },
  description: "FluxForge допомагає локальному бізнесу вийти в онлайн. Сучасний дизайн, SEO-оптимізація та зручне управління — все, що потрібно для вашого успіху.",
  buttons: {
    primary: "Замовити консультацію",
    secondary: "Дивитись портфоліо"
  }
};

export const portfolioItems = [
  {
    // Для локального фото: '/images/project1.jpg'
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2370&auto=format&fit=crop",
    title: "Cyber Security Hub",
    category: "Fintech • Interface Design",
    year: "2024"
  },
  {
    image: "https://images.unsplash.com/photo-1558655146-d09347e0b7a8?q=80&w=2370&auto=format&fit=crop",
    title: "Neon Nexus",
    category: "E-Commerce • WebGL",
    year: "2023"
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    title: "Apex Analytics",
    category: "SaaS • Dashboard",
    year: "2023"
  },
  {
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop",
    title: "Aero Space",
    category: "Brand Identity • 3D",
    year: "2024"
  }
];

export const featuresContent = [
  { 
    title: "Локальне SEO", 
    desc: "Ми налаштуємо ваш сайт так, щоб клієнти з вашого міста знаходили вас першими в Google.",
    // Icon SVG can be moved here too if needed, but keeping simple for now
  },
  // ... інші тексти можна винести сюди ж
];