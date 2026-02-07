// MyModules - Component Library
// Export all components

// Carousel Component
export { Carousel, type CarouselOptions } from './Carousel';

// Footer Component
export {
  generateFooterHTML,
  insertFooter,
  updateFooter,
  type FooterConfig,
  type FooterLink,
  type FooterSocial,
  type FooterContact
} from './Footer';

// Hero Component
export {
  generateHeroHTML,
  insertHero,
  updateHero,
  type HeroConfig,
  type HeroMediaType
} from './Hero';

// FAQ Component
export {
  generateFAQHTML,
  insertFAQ,
  updateFAQ,
  type FAQConfig,
  type FAQItem
} from './FAQ';

// Header Component
export {
  generateHeaderHTML,
  insertHeader,
  type HeaderConfig,
  type HeaderNavLink,
  type HeaderPhone,
  type HeaderLocation,
  type HeaderConsultationForm
} from './Header';

// BurgerMenu Component
export {
  BurgerMenu,
  generateBurgerMenuHTML,
  insertBurgerMenu,
  type BurgerMenuConfig,
  type BurgerMenuLink
} from './BurgerMenu';