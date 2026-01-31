// Header Component - navigation with scroll effects and mobile menu
// Part of MyModules library

export interface HeaderNavLink {
  /** Link text */
  text: string;
  /** Link href (anchor or URL) */
  href: string;
  /** Is link active by default */
  active?: boolean;
}

export interface HeaderPhone {
  /** Phone number text */
  text: string;
  /** Phone link (tel:) */
  href: string;
}

export interface HeaderLocation {
  /** Location name */
  name: string;
  /** Location address */
  address: string;
  /** Google Maps link or coordinates */
  mapLink?: string;
}

export interface HeaderConsultationForm {
  /** Form submit handler URL */
  submitUrl?: string;
  /** Form submit handler function */
  onSubmit?: (data: { name: string; phone: string }) => void | Promise<void>;
  /** Placeholder for name input */
  namePlaceholder?: string;
  /** Placeholder for phone input */
  phonePlaceholder?: string;
  /** Submit button text */
  submitText?: string;
}

export interface HeaderConfig {
  /** Logo configuration */
  logo: {
    /** Logo image path (if using img tag) */
    src?: string;
    /** SVG logo as string (if using SVG) */
    svg?: string;
    /** Alt text */
    alt: string;
    /** Logo link href */
    href?: string;
  };
  /** Navigation links */
  navLinks: HeaderNavLink[];
  /** Phone numbers (single or multiple) */
  phones?: HeaderPhone | HeaderPhone[];
  /** Locations for map dropdown */
  locations?: HeaderLocation[];
  /** Consultation form configuration */
  consultation?: HeaderConsultationForm;
  /** Additional CSS classes */
  additionalClasses?: string;
  /** Enable scroll effect (default: true) */
  enableScrollEffect?: boolean;
  /** Enable smooth scroll (default: true) */
  enableSmoothScroll?: boolean;
  /** Enable active link tracking (default: true) */
  enableActiveLink?: boolean;
  /** Enable auto burger menu (default: true) */
  enableAutoBurger?: boolean;
}

/**
 * Generate map pin icon SVG
 */
function generateMapPinSVG(): string {
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
  </svg>`;
}

/**
 * Generate phone icon SVG
 */
function generatePhoneSVG(): string {
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 8a3 3 0 0 1 3 3a1 1 0 0 0 2 0a5 5 0 0 0-5-5a1 1 0 0 0 0 2z" fill="currentColor"/>
    <path d="M13 4a7 7 0 0 1 7 7a1 1 0 0 0 2 0a9 9 0 0 0-9-9a1 1 0 0 0 0 2zm8.75 11.91a1 1 0 0 0-.72-.65l-6-1.37a1 1 0 0 0-.92.26c-.14.13-.15.14-.8 1.38a9.91 9.91 0 0 1-4.87-4.89C9.71 10 9.72 10 9.85 9.85a1 1 0 0 0 .26-.92L8.74 3a1 1 0 0 0-.65-.72a3.79 3.79 0 0 0-.72-.18A3.94 3.94 0 0 0 6.6 2A4.6 4.6 0 0 0 2 6.6A15.42 15.42 0 0 0 17.4 22a4.6 4.6 0 0 0 4.6-4.6a4.77 4.77 0 0 0-.06-.76a4.34 4.34 0 0 0-.19-.73z" fill="currentColor"/>
  </svg>`;
}

/**
 * Generate HTML for Header section
 */
export function generateHeaderHTML(config: HeaderConfig): string {
  const {
    logo,
    navLinks,
    phones,
    locations = [],
    consultation,
    additionalClasses = ''
  } = config;

  const headerClasses = ['header', additionalClasses].filter(Boolean).join(' ');

  const logoHref = logo.href || '#hero';
  let logoHTML = '';

  if (logo.svg) {
    // Use SVG directly
    logoHTML = `<a href="${logoHref}" class="header__logo">
      <div class="header__logo-img">${logo.svg}</div>
    </a>`;
  } else if (logo.src) {
    // Use img tag
    logoHTML = `<a href="${logoHref}" class="header__logo">
      <img src="${logo.src}" alt="${logo.alt}" class="header__logo-img" />
    </a>`;
  } else {
    // Fallback - text logo
    logoHTML = `<a href="${logoHref}" class="header__logo">
      <span class="header__logo-img">${logo.alt}</span>
    </a>`;
  }

  const navLinksHTML = navLinks.map(link => {
    const activeClass = link.active ? ' active' : '';
    return `<li><a href="${link.href}" class="header__nav-link${activeClass}">${link.text}</a></li>`;
  }).join('\n                    ');

  // Build menu actions (contacts) HTML
  let menuActionsHTML = '';
  if (phones || locations.length > 0) {
    const actions: string[] = [];
    if (phones) {
      const phoneArray = Array.isArray(phones) ? phones : [phones];
      phoneArray.forEach(phone => {
        actions.push(`<a href="${phone.href}" class="header__nav-action-link">${phone.text}</a>`);
      });
    }
    if (locations.length > 0) {
      locations.forEach(location => {
        const locationText = location.mapLink
          ? `<a href="${location.mapLink}" target="_blank" rel="noopener">${location.name} ${location.address}</a>`
          : `<span>${location.name} ${location.address}</span>`;
        actions.push(`<div class="header__nav-action-item">${locationText}</div>`);
      });
    }
    menuActionsHTML = `<div class="header__nav-actions">${actions.join('')}</div>`;
  }

  const navHTML = `<nav class="header__nav">
    <!-- Desktop navigation list -->
    <ul class="header__nav-list">
      ${navLinksHTML}
    </ul>
    <!-- Mobile menu structure -->
    <div class="header__nav-body">
      <div class="header__nav-title">Меню</div>
      ${menuActionsHTML}
      <div class="header__nav-content">
        <ul class="header__nav-list header__nav-list-mobile">
          ${navLinksHTML}
        </ul>
      </div>
    </div>
    <button class="header__nav-close" aria-label="Close menu">
      <span class="header__nav-close-line"></span>
      <span class="header__nav-close-line"></span>
    </button>
  </nav>`;

  // Burger button will be generated by BurgerMenu component if needed
  const burgerHTML = `<button class="header__burger" aria-label="Toggle menu" aria-expanded="false">
    <span class="header__burger-line"></span>
    <span class="header__burger-line"></span>
    <span class="header__burger-line"></span>
  </button>`;

  // Phone dropdown
  let phoneHTML = '';
  if (phones) {
    const phoneArray = Array.isArray(phones) ? phones : [phones];
    const hasMultiple = phoneArray.length > 1;
    const primaryPhone = phoneArray[0];

    if (hasMultiple) {
      const phoneItemsHTML = phoneArray.map(phone =>
        `<a href="${phone.href}" class="header__dropdown-item">${phone.text}</a>`
      ).join('');

      phoneHTML = `<div class="header__dropdown">
        <button class="header__phone header__dropdown-toggle" aria-expanded="false">
          <span class="header__phone-icon">${generatePhoneSVG()}</span>
          <span class="header__phone-text">${primaryPhone.text}</span>
          <svg class="header__dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="header__dropdown-menu">
          ${phoneItemsHTML}
        </div>
      </div>`;
    } else {
      phoneHTML = `<a href="${primaryPhone.href}" class="header__phone">
        <span class="header__phone-icon">${generatePhoneSVG()}</span>
        <span class="header__phone-text">${primaryPhone.text}</span>
      </a>`;
    }
  }

  // Locations dropdown
  let locationsHTML = '';
  if (locations.length > 0) {
    const locationItemsHTML = locations.map(location => {
      const mapLink = location.mapLink || '#';
      return `<a href="${mapLink}" target="_blank" class="header__dropdown-item">
        <div class="header__location-name">${location.name}</div>
        <div class="header__location-address">${location.address}</div>
      </a>`;
    }).join('');

    locationsHTML = `<div class="header__dropdown">
      <button class="header__location-btn header__dropdown-toggle" aria-expanded="false" aria-label="Locations">
        ${generateMapPinSVG()}
      </button>
      <div class="header__dropdown-menu">
        ${locationItemsHTML}
      </div>
    </div>`;
  }

  // Consultation button with dropdown form
  let consultationHTML = '';
  if (consultation) {
    const namePlaceholder = consultation.namePlaceholder || 'Ваше ім\'я';
    const phonePlaceholder = consultation.phonePlaceholder || 'Ваш номер телефону';
    const submitText = consultation.submitText || 'Надіслати';

    consultationHTML = `<div class="header__dropdown">
      <button class="header__consultation-btn header__dropdown-toggle" aria-expanded="false">
        Консультація
        <svg class="header__dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="header__dropdown-menu header__consultation-form">
        <form class="header__form" data-consultation-form>
          <input type="text" name="name" placeholder="${namePlaceholder}" required class="header__form-input" />
          <input type="tel" name="phone" placeholder="${phonePlaceholder}" required class="header__form-input" />
          <button type="submit" class="header__form-submit">${submitText}</button>
        </form>
      </div>
    </div>`;
  }

  const actionsHTML = phones || locations.length > 0 || consultation
    ? `<div class="header__actions">
      ${phoneHTML}
      ${locationsHTML}
      ${consultationHTML}
    </div>`
    : '';

  return `<header class="${headerClasses}">
  <div class="header__top header-top">
    <div class="header__container">
      <div class="header-top__row">
        <div class="header-top__col_left">
          ${logoHTML}
        </div>
        <div class="header-top__col _right">
          <div class="header-top__actions">
            ${navHTML}
            ${actionsHTML}
            ${burgerHTML}
          </div>
        </div>
      </div>
    </div>
  </div>
</header>`.trim();
}

/**
 * Insert Header into DOM and initialize all functionality
 */
export function insertHeader(
  container: HTMLElement | string,
  config: HeaderConfig
): HTMLElement | null {
  const html = generateHeaderHTML(config);
  const targetElement = typeof container === 'string'
    ? document.querySelector<HTMLElement>(container)
    : container;

  if (!targetElement) {
    console.error('Header container not found');
    return null;
  }

  targetElement.innerHTML = html;
  const header = targetElement.querySelector<HTMLElement>('.header');

  if (header) {
    initHeader(header, config);
  }

  return header;
}

/**
 * Initialize all header functionality
 */
function initHeader(header: HTMLElement, config: HeaderConfig): void {
  const {
    enableScrollEffect = true,
    enableSmoothScroll = true,
    enableActiveLink = true,
    enableAutoBurger = true
  } = config;

  if (enableScrollEffect) {
    initScrollEffect(header);
  }

  // Auto-burger is now handled by initResponsiveStages

  if (enableSmoothScroll) {
    initSmoothScroll(header);
  }

  if (enableActiveLink) {
    initActiveNavLink(header);
  }

  // Burger menu is now handled separately via BurgerMenu component
  // initMobileMenu is kept for backward compatibility but can use BurgerMenu
  initMobileMenu(header);
  initDropdowns(header, config);
  initResponsiveStages(header); // Multi-stage responsive system
  if (config.consultation) {
    initConsultationForm(header, config);
  }
}

/**
 * Initialize scroll effect - add 'scrolled' class on scroll
 */
function initScrollEffect(header: HTMLElement): void {
  const handleScroll = (): void => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check initial state
}

/**
 * Initialize auto burger menu - show burger when elements collide
 */
function initAutoBurgerMenu(header: HTMLElement): void {
  const nav = header.querySelector<HTMLElement>('.header__nav');
  const actions = header.querySelector<HTMLElement>('.header__actions');
  const burger = header.querySelector<HTMLElement>('.header__burger');

  if (!nav || !actions || !burger) return;

  const checkCollision = (): void => {
    const isMenuOpen = nav.classList.contains('active');
    if (isMenuOpen) return;

    // Always show burger on mobile
    if (window.innerWidth <= 768) {
      (burger as HTMLElement).style.display = 'flex';
      if (!isMenuOpen) {
        nav.style.display = 'none';
      }
      return;
    }

    // Get the last nav link (FAQ) and first action element (phone button)
    const navLinks = nav.querySelectorAll<HTMLElement>('.header__nav-link');
    const lastNavLink = navLinks[navLinks.length - 1];
    const firstAction = actions.querySelector<HTMLElement>('.header__phone, .header__location-btn, .header__consultation-btn');

    if (!lastNavLink || !firstAction) {
      // Fallback to container-based check
      const navRect = nav.getBoundingClientRect();
      const actionsRect = actions.getBoundingClientRect();
      const gap = actionsRect.left - navRect.right;
      // Calculate minimum gap: first action button width + comfortable margin
      const firstActionWidth = firstAction ? firstAction.getBoundingClientRect().width : 200;
      const minGap = firstActionWidth + 30; // Button width + 30px margin
      const isTouching = gap < minGap;

      requestAnimationFrame(() => {
        if (nav.classList.contains('active')) return;

        if (isTouching) {
          nav.style.display = 'none';
          burger.style.display = 'flex';
          header.classList.add('burger-mode');
        } else {
          burger.style.display = 'none';
          nav.style.display = 'flex';
          header.classList.remove('burger-mode');
        }
      });
      return;
    }

    const lastNavRect = lastNavLink.getBoundingClientRect();
    const firstActionRect = firstAction.getBoundingClientRect();
    const gap = firstActionRect.left - lastNavRect.right;
    // Calculate minimum gap: first action button width + comfortable margin
    const firstActionWidth = firstAction.getBoundingClientRect().width;
    const minGap = firstActionWidth + 30; // Button width + 30px margin
    const isTouching = gap < minGap;

    requestAnimationFrame(() => {
      if (nav.classList.contains('active')) return;

      if (isTouching) {
        nav.style.display = 'none';
        burger.style.display = 'flex';
        header.classList.add('burger-mode');
      } else {
        burger.style.display = 'none';
        nav.style.display = 'flex';
        header.classList.remove('burger-mode');
      }
    });
  };

  checkCollision();

  let resizeRequestId: number | null = null;
  window.addEventListener('resize', () => {
    if (resizeRequestId) cancelAnimationFrame(resizeRequestId);
    resizeRequestId = requestAnimationFrame(checkCollision);
  }, { passive: true });

  let scrollRequestId: number | null = null;
  window.addEventListener('scroll', () => {
    if (nav.classList.contains('active')) return;
    if (scrollRequestId) cancelAnimationFrame(scrollRequestId);
    scrollRequestId = requestAnimationFrame(checkCollision);
  }, { passive: true });
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll(header: HTMLElement): void {
  const nav = header.querySelector<HTMLElement>('.header__nav');
  const navLinks = header.querySelectorAll<HTMLAnchorElement>('.header__nav-link[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e: MouseEvent) => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Handle home/hero link
      if (href === '#' || href === '#hero') {
        e.preventDefault();
        if (nav?.classList.contains('active')) {
          const burger = header.querySelector<HTMLElement>('.header__burger');
          if (burger) burger.click();
        }
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, nav?.classList.contains('active') ? 150 : 0);
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        if (nav?.classList.contains('active')) {
          const burger = header.querySelector<HTMLElement>('.header__burger');
          if (burger) burger.click();
        }
        setTimeout(() => {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }, nav?.classList.contains('active') ? 150 : 0);
      }
    });
  });
}

/**
 * Initialize active nav link tracking
 */
function initActiveNavLink(header: HTMLElement): void {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = header.querySelectorAll<HTMLAnchorElement>('.header__nav-link[href^="#"]');

  const updateActiveLink = (): void => {
    let current = '';
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (scrollY < 100) {
      current = 'hero';
    } else {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.getAttribute('id');

        if (sectionId) {
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          const viewportMiddle = windowHeight / 2;

          if (sectionTop <= viewportMiddle && sectionBottom > 0) {
            current = sectionId;
          }
        }
      });
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');

      if (href === `#${current}` ||
        (current === 'hero' && (href === '#' || href === '#hero'))) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/**
 * Initialize mobile menu (burger menu)
 */
function initMobileMenu(header: HTMLElement): void {
  const burger = header.querySelector<HTMLElement>('.header__burger');
  const nav = header.querySelector<HTMLElement>('.header__nav');

  if (!burger || !nav) return;

  // Initial state
  burger.classList.remove('active');
  nav.classList.remove('active');
  if (burger instanceof HTMLButtonElement) {
    burger.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';

  const closeMenu = (skipAnimation: boolean = false): void => {
    if (skipAnimation) {
      nav.classList.add('no-transition');
    }
    burger.classList.remove('active');
    nav.classList.remove('active');
    if (burger instanceof HTMLButtonElement) {
      burger.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
    if (skipAnimation) {
      // Remove no-transition class after a brief moment
      setTimeout(() => {
        nav.classList.remove('no-transition');
      }, 10);
    }
  };

  burger.addEventListener('click', (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const isActive = burger.classList.contains('active');
    header.classList.remove('burger-mode');

    burger.classList.toggle('active');
    nav.classList.toggle('active');
    if (burger instanceof HTMLButtonElement) {
      burger.setAttribute('aria-expanded', String(!isActive));
    }

    if (!isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      closeMenu();
    }
  });

  // Close button
  const navClose = nav.querySelector<HTMLElement>('.header__nav-close');
  if (navClose) {
    navClose.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  // Close on backdrop click (click outside menu)
  const navBody = nav.querySelector<HTMLElement>('.header__nav-body');
  nav.addEventListener('click', (e: MouseEvent) => {
    // Close if clicking on nav but not on nav-body
    if (e.target === nav || (navBody && !navBody.contains(e.target as Node))) {
      closeMenu();
    }
  });

  // Close on nav link click
  const navLinks = nav.querySelectorAll<HTMLAnchorElement>('.header__nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on resize to desktop
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  mediaQuery.addEventListener('change', (e: MediaQueryListEvent) => {
    if (!e.matches && nav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      closeMenu();
    }
  });
}

/**
 * Initialize multi-stage responsive header system
 * 
 * Based on modern best practices:
 * - Mobile-first approach with clear breakpoints
 * - Progressive disclosure: elements hide/transform as space decreases
 * - Consultation button always visible (high priority CTA)
 * - Smooth transitions with hysteresis to prevent flickering
 * 
 * Responsive Stages:
 * 1. Desktop (>1024px): Full header with all elements visible
 * 2. Tablet (768-1024px): Phone transforms to icon when space is tight
 * 3. Compact (<768px or collision): Navigation hides, burger menu appears
 * 4. Mobile (<768px): Always burger menu, phone as icon, consultation visible
 * 
 * @param header - The header element to initialize
 */
function initResponsiveStages(header: HTMLElement): void {
  const nav = header.querySelector<HTMLElement>('.header__nav');
  const actions = header.querySelector<HTMLElement>('.header__actions');
  const burger = header.querySelector<HTMLElement>('.header__burger');
  const phoneButton = header.querySelector<HTMLElement>('.header__phone') ||
    actions?.querySelector<HTMLElement>('.header__phone');
  const locationButton = header.querySelector<HTMLElement>('.header__location-btn');
  const consultationButton = header.querySelector<HTMLElement>('.header__consultation-btn');

  if (!nav || !actions || !burger) {
    console.warn('Header: Required elements not found for responsive stages');
    return;
  }

  /**
   * Close menu helper (similar to alex-house approach)
   * Used when programmatically closing menu during responsive transitions
   */
  const closeMenu = (skipAnimation: boolean = false): void => {
    if (skipAnimation) {
      nav.classList.add('no-transition');
    }
    burger.classList.remove('active');
    nav.classList.remove('active');
    if (burger instanceof HTMLButtonElement) {
      burger.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
    if (skipAnimation) {
      // Remove no-transition class after a brief moment
      setTimeout(() => {
        nav.classList.remove('no-transition');
      }, 10);
    }
  };

  // Responsive breakpoints (following modern standards)
  const BREAKPOINTS = {
    MOBILE: 768,      // Mobile devices
    TABLET: 1024,    // Tablets
    DESKTOP: 1200    // Desktop
  };

  // Hysteresis values to prevent flickering when elements toggle
  const HYSTERESIS = {
    PHONE_ICON: 20,  // Extra margin for phone icon toggle
    BURGER_MENU: 15  // Extra margin for burger menu toggle
  };

  // Store measured widths for calculations
  let fullPhoneWidth = 0;
  let phoneIconWidth = 44; // Standard icon-only width (44x44px for touch targets)
  let locationWidth = 0;
  let consultationWidth = 0;

  /**
   * Measure element widths accurately
   * Uses cloning technique to measure full width even when element is in icon mode
   */
  const measureWidths = (): void => {
    if (phoneButton) {
      // Always measure full width using clone to get accurate value
      const clone = phoneButton.cloneNode(true) as HTMLElement;
      clone.classList.remove('phone-icon-only');
      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.width = 'auto';
      clone.style.height = 'auto';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      clone.style.display = 'inline-flex';
      document.body.appendChild(clone);
      fullPhoneWidth = clone.offsetWidth || 150; // Fallback to 150px if measurement fails
      document.body.removeChild(clone);
    }

    if (locationButton) {
      // Measure location button width (even if hidden)
      const wasHidden = locationButton.classList.contains('header__hidden');
      if (wasHidden) {
        locationButton.classList.remove('header__hidden');
        locationWidth = locationButton.offsetWidth;
        locationButton.classList.add('header__hidden');
      } else {
        locationWidth = locationButton.offsetWidth;
      }
    }

    if (consultationButton && !consultationButton.classList.contains('header__hidden')) {
      consultationWidth = consultationButton.offsetWidth;
    }
  };

  // Track navigation width for smart calculations
  let navFullWidth = 0;

  /**
   * Measure navigation width accurately
   */
  const measureNav = (): void => {
    const wasHidden = nav.style.display === 'none' || header.classList.contains('burger-mode');
    if (!wasHidden) {
      navFullWidth = nav.offsetWidth;
    } else {
      // Try to measure from children if nav is hidden
      const list = nav.querySelector<HTMLElement>('.header__nav-list');
      if (list) {
        navFullWidth = 0;
        Array.from(list.children).forEach(child => {
          navFullWidth += (child as HTMLElement).offsetWidth + 40; // + gap
        });
        navFullWidth -= 40; // remove last gap
      }
    }
  };

  /**
   * Smart resize handler - calculates available space in container
   * Based on alex-house.com.ua approach: checks if navigation fits by measuring actual widths
   * This approach is more reliable than gap-based calculations
   */
  const smartResize = (): void => {
    const container = header.querySelector<HTMLElement>('.header__container') || 
      header.querySelector<HTMLElement>('.header-top__row');
    const logo = header.querySelector<HTMLElement>('.header__logo');

    if (!container || !logo) return;

    const containerWidth = container.clientWidth;
    const logoWidth = (logo as HTMLElement).offsetWidth;
    
    // Get CSS variable for spacing (like alex-house uses --space)
    const computedStyle = getComputedStyle(header);
    const space = parseInt(computedStyle.getPropertyValue('--space') || '12', 10);
    
    // Measure actual widths of all elements
    measureWidths();
    measureNav();
    
    // Calculate total width needed for all elements
    const navList = nav.querySelector<HTMLElement>('.header__nav-list');
    const navListWidth = navList ? navList.offsetWidth : navFullWidth;
    
    // Calculate actions width dynamically
    let actionsTotalWidth = 0;
    if (phoneButton && !phoneButton.classList.contains('phone-icon-only')) {
      actionsTotalWidth += fullPhoneWidth + space;
    } else if (phoneButton) {
      actionsTotalWidth += phoneIconWidth + space;
    }
    if (locationButton && !locationButton.classList.contains('header__hidden')) {
      actionsTotalWidth += (locationWidth || locationButton.offsetWidth) + space;
    }
    if (consultationButton && !consultationButton.classList.contains('header__hidden')) {
      actionsTotalWidth += (consultationWidth || consultationButton.offsetWidth) + space;
    }
    
    // Calculate if everything fits (similar to alex-house function Z())
    const totalNeededWidth = logoWidth + navListWidth + actionsTotalWidth + space;
    const availableSpace = containerWidth;

    // Mobile check (override)
    if (window.innerWidth <= BREAKPOINTS.MOBILE) {
      // Close menu without animation on mobile
      if (nav.classList.contains('active')) {
        closeMenu(true);
      }
      if (phoneButton) phoneButton.classList.add('phone-icon-only');
      if (locationButton) locationButton.classList.add('header__hidden');
      // Consultation always visible
      if (consultationButton) consultationButton.classList.remove('header__hidden');
      header.classList.remove('burger-mode'); // Let CSS handle mobile
      burger.style.display = 'flex';
      return;
    }

    // Re-measure phone width to ensure accuracy - always measure fresh
    measureWidths();
    
    // Ensure fullPhoneWidth is valid
    if (fullPhoneWidth === 0 || fullPhoneWidth < 100) {
      // Force re-measurement if value seems incorrect
      if (phoneButton) {
        const clone = phoneButton.cloneNode(true) as HTMLElement;
        clone.classList.remove('phone-icon-only');
        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.width = 'auto';
        clone.style.height = 'auto';
        clone.style.top = '-9999px';
        clone.style.left = '-9999px';
        clone.style.display = 'inline-flex';
        document.body.appendChild(clone);
        fullPhoneWidth = clone.offsetWidth || 150;
        document.body.removeChild(clone);
      }
    }
    
    // Decision tree based on available space (similar to alex-house logic)
    // Try different configurations until we find one that fits
    
    // Configuration 1: Full phone button
    const spaceNeededFull = logoWidth + navListWidth + (fullPhoneWidth + space) + 
      (locationButton && !locationButton.classList.contains('header__hidden') ? (locationWidth || locationButton.offsetWidth) + space : 0) +
      (consultationButton && !consultationButton.classList.contains('header__hidden') ? (consultationWidth || consultationButton.offsetWidth) + space : 0);
    
    // Configuration 2: Icon phone button
    const spaceNeededIcon = logoWidth + navListWidth + (phoneIconWidth + space) +
      (locationButton && !locationButton.classList.contains('header__hidden') ? (locationWidth || locationButton.offsetWidth) + space : 0) +
      (consultationButton && !consultationButton.classList.contains('header__hidden') ? (consultationWidth || consultationButton.offsetWidth) + space : 0);
    
    // Configuration 3: Icon phone, no location
    const spaceNeededIconNoLocation = logoWidth + navListWidth + (phoneIconWidth + space) +
      (consultationButton && !consultationButton.classList.contains('header__hidden') ? (consultationWidth || consultationButton.offsetWidth) + space : 0);

    let isBurger = false;

    // Decision tree: try configurations from most complete to least
    if (availableSpace >= spaceNeededFull) {
      // Fits everything comfortably - full phone button
      // Close menu without animation if switching from burger mode
      if (header.classList.contains('burger-mode') && nav.classList.contains('active')) {
        closeMenu(true);
      }
      if (phoneButton) phoneButton.classList.remove('phone-icon-only');
      if (locationButton) locationButton.classList.remove('header__hidden');
      header.classList.remove('burger-mode');
      burger.style.display = 'none';
    } else if (availableSpace >= spaceNeededIcon) {
      // Fits if phone is icon - switch to icon mode
      // Close menu without animation if switching from burger mode
      if (header.classList.contains('burger-mode') && nav.classList.contains('active')) {
        closeMenu(true);
      }
      if (phoneButton) phoneButton.classList.add('phone-icon-only');
      if (locationButton) locationButton.classList.remove('header__hidden');
      header.classList.remove('burger-mode');
      burger.style.display = 'none';
    } else if (availableSpace >= spaceNeededIconNoLocation) {
      // Fits if phone is icon and location is hidden
      if (header.classList.contains('burger-mode') && nav.classList.contains('active')) {
        closeMenu(true);
      }
      if (phoneButton) phoneButton.classList.add('phone-icon-only');
      if (locationButton) locationButton.classList.add('header__hidden');
      header.classList.remove('burger-mode');
      burger.style.display = 'none';
    } else {
      // Doesn't fit nav even with minimal elements -> Burger Mode
      // Close menu without animation before switching to burger-mode
      if (nav.classList.contains('active')) {
        closeMenu(true);
      }
      if (phoneButton) phoneButton.classList.add('phone-icon-only');
      if (locationButton) locationButton.classList.add('header__hidden');
      header.classList.add('burger-mode');
      burger.style.display = 'flex';
      isBurger = true;
    }

    // Ensure consultation is always visible
    if (consultationButton) {
      consultationButton.classList.remove('header__hidden');
    }
  };

  // Initial setup with delay to ensure DOM and styles are ready
  const initialize = (): void => {
    // Measure widths first to get accurate values
    measureWidths();
    measureNav();
    // Small delay to ensure styles are applied
    setTimeout(() => {
      measureWidths(); // Re-measure after styles are applied
      smartResize();
    }, 50);
  };

  // Use multiple initialization strategies for reliability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM already loaded, but wait for styles
    setTimeout(initialize, 100);
  }

  /**
   * Optimized resize handler (similar to alex-house optimizedResize)
   * Uses requestAnimationFrame to batch resize events for better performance
   */
  const createOptimizedResize = (eventName: string, target: Window | HTMLElement = window): void => {
    let ticking = false;
    target.addEventListener(eventName, () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          target.dispatchEvent(new CustomEvent('optimizedResize'));
          ticking = false;
        });
      }
    }, { passive: true });
  };

  // Create optimized resize event
  createOptimizedResize('resize', window);

  // Debounced resize handler with optimized resize for performance
  let resizeTimeout: number | null = null;

  window.addEventListener('optimizedResize', () => {
    // Clear any pending timeouts
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }

    // Debounce: wait for resize to finish, then measure and check
    resizeTimeout = window.setTimeout(() => {
      // Re-measure on resize (elements may have changed size)
      measureWidths();
      measureNav();
      // Force re-measurement of phone width to ensure accuracy
      if (phoneButton) {
        const clone = phoneButton.cloneNode(true) as HTMLElement;
        clone.classList.remove('phone-icon-only');
        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.width = 'auto';
        clone.style.height = 'auto';
        clone.style.top = '-9999px';
        clone.style.left = '-9999px';
        clone.style.display = 'inline-flex';
        document.body.appendChild(clone);
        fullPhoneWidth = clone.offsetWidth || 150;
        document.body.removeChild(clone);
      }
      // Small delay to ensure layout is stable
      setTimeout(() => {
        smartResize();
      }, 10);
      resizeTimeout = null;
    }, 150); // 150ms debounce
  }, { passive: true });

  // Scroll handler (for sticky headers that may change size)
  let scrollRequestId: number | null = null;
  window.addEventListener('scroll', () => {
    // Don't check during menu interaction
    if (nav.classList.contains('active')) return;

    if (scrollRequestId) cancelAnimationFrame(scrollRequestId);
    
    scrollRequestId = requestAnimationFrame(() => {
      smartResize();
      scrollRequestId = null;
    });
  }, { passive: true });

  // Re-measure on orientation change (mobile devices)
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      measureWidths();
      measureNav();
      smartResize();
    }, 200);
  }, { passive: true });
}

/**
 * Initialize phone icon toggle - show only icon when elements collide
 * @deprecated Use initResponsiveStages instead
 */
function initPhoneIconToggle(header: HTMLElement): void {
  const nav = header.querySelector<HTMLElement>('.header__nav');
  const actions = header.querySelector<HTMLElement>('.header__actions');
  // Phone button might be in dropdown or directly in actions
  const phoneButton = header.querySelector<HTMLElement>('.header__phone') ||
    actions?.querySelector<HTMLElement>('.header__phone');

  if (!nav || !actions || !phoneButton) {
    return;
  }

  // Store the full width of the phone button initially
  let fullPhoneWidth = 0;

  // Clone to measure full width if needed, or measure if currently visible
  const measureFullWidth = () => {
    if (!phoneButton.classList.contains('phone-icon-only')) {
      fullPhoneWidth = phoneButton.offsetWidth;
    } else {
      // Create a temporary clone to measure
      const clone = phoneButton.cloneNode(true) as HTMLElement;
      clone.classList.remove('phone-icon-only');
      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.height = 'auto';
      clone.style.width = 'auto';
      document.body.appendChild(clone);
      fullPhoneWidth = clone.offsetWidth;
      document.body.removeChild(clone);
    }
  };

  // Initial measurement
  measureFullWidth();

  const checkPhoneIcon = (): void => {
    // Always show icon on mobile
    if (window.innerWidth <= 768) {
      phoneButton.classList.add('phone-icon-only');
      return;
    }

    const isIconOnly = phoneButton.classList.contains('phone-icon-only');
    const navLinks = nav.querySelectorAll<HTMLElement>('.header__nav-link');
    const lastNavLink = navLinks[navLinks.length - 1];

    let currentGap = 0;

    if (lastNavLink) {
      const lastNavRect = lastNavLink.getBoundingClientRect();
      const phoneRect = phoneButton.getBoundingClientRect();
      currentGap = phoneRect.left - lastNavRect.right;
    } else {
      // Fallback if no nav links
      const navRect = nav.getBoundingClientRect();
      const actionsRect = actions.getBoundingClientRect();
      currentGap = actionsRect.left - navRect.right;
    }

    // Thresholds
    // Trigger to ICON mode when gap is tight - use dynamic calculation based on button width
    const toIconThreshold = fullPhoneWidth + 50; // Full button width + 50px margin

    // Trigger to TEXT mode only when we have enough space for the full button AND the safety gap
    // We need: currentGap + (fullWidth - currentIconWidth) > toIconThreshold + hysteresis
    // Simplified: gap must be large enough to accommodate the expansion

    if (!isIconOnly) {
      // Currently showing text
      if (currentGap < toIconThreshold) {
        phoneButton.classList.add('phone-icon-only');
      }
    } else {
      // Currently icon only
      // Calculate how much space we would take if we expanded
      const currentIconWidth = phoneButton.offsetWidth;
      const expansionNeeded = fullPhoneWidth - currentIconWidth;

      // If we expand, the gap will shrink by 'expansionNeeded'
      // So predictedGap = currentGap - expansionNeeded
      // We want predictedGap > toIconThreshold + buffer
      const buffer = 50; // Extra buffer to prevent rapid flipping

      if (currentGap - expansionNeeded > toIconThreshold + buffer) {
        phoneButton.classList.remove('phone-icon-only');
      }
    }
  };

  // Run initial check
  // Small delay to ensure styles are applied
  setTimeout(() => {
    measureFullWidth();
    checkPhoneIcon();
  }, 100);

  let resizeRequestId: number | null = null;
  window.addEventListener('resize', () => {
    if (resizeRequestId) {
      cancelAnimationFrame(resizeRequestId);
    }
    resizeRequestId = requestAnimationFrame(() => {
      // Re-measure in case font loaded or something changed
      if (!phoneButton.classList.contains('phone-icon-only')) {
        fullPhoneWidth = phoneButton.offsetWidth;
      }
      checkPhoneIcon();
      resizeRequestId = null;
    });
  });

  // Also check on scroll (in case header changes size)
  window.addEventListener('scroll', () => {
    if (resizeRequestId) return;
    resizeRequestId = requestAnimationFrame(() => {
      checkPhoneIcon();
      resizeRequestId = null;
    });
  }, { passive: true });
}

/**
 * Initialize dropdown menus (phone, locations)
 */
function initDropdowns(header: HTMLElement, config: HeaderConfig): void {
  const dropdowns = header.querySelectorAll<HTMLElement>('.header__dropdown');

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector<HTMLElement>('.header__dropdown-toggle');
    const menu = dropdown.querySelector<HTMLElement>('.header__dropdown-menu');

    if (!toggle || !menu) return;

    const closeDropdown = (): void => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      if (toggle instanceof HTMLButtonElement) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    };

    const openDropdown = (): void => {
      // Close other dropdowns
      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          const otherToggle = otherDropdown.querySelector<HTMLElement>('.header__dropdown-toggle');
          const otherMenu = otherDropdown.querySelector<HTMLElement>('.header__dropdown-menu');
          if (otherToggle && otherMenu) {
            otherToggle.classList.remove('active');
            otherMenu.classList.remove('active');
            if (otherToggle instanceof HTMLButtonElement) {
              otherToggle.setAttribute('aria-expanded', 'false');
            }
          }
        }
      });

      toggle.classList.add('active');
      menu.classList.add('active');
      if (toggle instanceof HTMLButtonElement) {
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    toggle.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      const isActive = toggle.classList.contains('active');
      if (isActive) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e: MouseEvent) => {
      if (!dropdown.contains(e.target as Node)) {
        closeDropdown();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && toggle.classList.contains('active')) {
        closeDropdown();
      }
    });
  });
}

/**
 * Initialize consultation form
 */
function initConsultationForm(header: HTMLElement, config: HeaderConfig): void {
  const form = header.querySelector<HTMLFormElement>('[data-consultation-form]');
  if (!form || !config.consultation) return;

  form.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;

    if (!name || !phone) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    try {
      if (config.consultation?.onSubmit) {
        await config.consultation.onSubmit({ name, phone });
      } else if (config.consultation?.submitUrl) {
        const response = await fetch(config.consultation.submitUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, phone }),
        });

        if (!response.ok) {
          throw new Error('Помилка відправки форми');
        }
      }

      // Reset form and close dropdown
      form.reset();
      const dropdown = form.closest<HTMLElement>('.header__dropdown');
      const toggle = dropdown?.querySelector<HTMLElement>('.header__dropdown-toggle');
      if (toggle) {
        toggle.classList.remove('active');
        const menu = dropdown?.querySelector<HTMLElement>('.header__dropdown-menu');
        if (menu) menu.classList.remove('active');
        if (toggle instanceof HTMLButtonElement) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      }

      alert('Дякуємо! Ми зв\'яжемося з вами найближчим часом.');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Помилка відправки. Спробуйте ще раз.');
    }
  });
}
