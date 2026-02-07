# MyModules Components

Модульна бібліотека компонентів для веб-розробки.

## Структура компонентів

Кожен компонент складається з:
- `ComponentName.ts` - TypeScript модуль з HTML генерацією та логікою
- `ComponentName.css` - Базові стилі компонента (опціонально)

## Використання CSS

### Варіант 1: Імпорт CSS файлів (рекомендовано)

```typescript
// В main.ts або style.css
import './MyModules/Components/Header.css';
import './MyModules/Components/BurgerMenu.css';
import './MyModules/Components/Carousel.css';
```

### Варіант 2: Копіювання стилів

Скопіюйте стилі з `ComponentName.css` у ваш основний `style.css` файл.

### Варіант 3: Кастомізація через CSS змінні

Більшість компонентів підтримують CSS змінні для кастомізації:

```css
:root {
  --burger-menu-width: 320px;
  --burger-menu-bg: rgba(255, 255, 255, 0.98);
  /* ... інші змінні */
}
```

## Переваги окремого CSS

✅ **Легка кастомізація** - просто перевизначте класи у вашому CSS  
✅ **Краще кешування** - CSS кешується окремо від JS  
✅ **CSS препроцесори** - можна використовувати SASS/LESS  
✅ **Краща продуктивність** - браузер оптимізує CSS  
✅ **Зручне дебажиння** - всі стилі в DevTools  
✅ **Темизація** - через CSS змінні  

## Компоненти

- **Header** - Адаптивний хедер з навігацією
- **BurgerMenu** - Модульне бургер-меню
- **Carousel** - Карусель зображень
- **Hero** - Hero секція
- **FAQ** - FAQ акордеон
- **Footer** - Футер

## Приклад використання

```typescript
import { insertHeader, type HeaderConfig } from './components/Header.js';
import { insertBurgerMenu, type BurgerMenuConfig } from './components/BurgerMenu.js';

// Header
const header = insertHeader('#header-container', {
  logo: { alt: 'Logo', href: '/' },
  navLinks: [
    { text: 'Home', href: '#home' },
    { text: 'About', href: '#about' }
  ]
});

// Burger Menu
const burgerMenu = insertBurgerMenu('#header-container', {
  links: [
    { text: 'Home', href: '#home' },
    { text: 'About', href: '#about' }
  ]
});
```
