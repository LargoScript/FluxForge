// Burger Menu Component - modular and reusable mobile menu
// Part of MyModules library
//
// CSS Styles: Import BurgerMenu.css in your main stylesheet
// Example: @import './MyModules/Components/BurgerMenu.css';
// Or copy the styles to your main CSS file

export interface BurgerMenuLink {
  /** Link text */
  text: string;
  /** Link href (anchor or URL) */
  href: string;
  /** Is link active by default */
  active?: boolean;
  /** Submenu items (optional) */
  submenu?: BurgerMenuLink[];
}

export interface BurgerMenuConfig {
  /** Unique ID for the burger menu */
  id?: string;
  /** Menu links */
  links: BurgerMenuLink[];
  /** Title for the mobile menu */
  title?: string;
  /** Close button text */
  closeButtonText?: string;
  /** Additional actions/buttons to show in menu */
  actions?: Array<{
    /** Action HTML content */
    html: string;
  }>;
  /** Selector for burger button (if already exists) */
  burgerButtonSelector?: string;
  /** Selector for menu container (if already exists) */
  menuSelector?: string;
  /** Auto-close on link click (default: true) */
  autoCloseOnLinkClick?: boolean;
  /** Auto-close on resize to desktop (default: true) */
  autoCloseOnResize?: boolean;
  /** Desktop breakpoint in pixels (default: 768) */
  desktopBreakpoint?: number;
  /** Additional CSS classes */
  additionalClasses?: string;
  /** Enable swipe gestures for mobile (requires touch support, default: false) */
  enableSwipe?: boolean;
  /** Swipe threshold in pixels (default: 200) */
  swipeThreshold?: number;
}

/**
 * Generate HTML for burger button
 */
function generateBurgerButtonHTML(id: string = 'default'): string {
  return `
    <button class="burger-menu__button" data-burger-id="${id}" aria-label="Toggle menu" aria-expanded="false">
      <span class="burger-menu__line"></span>
      <span class="burger-menu__line"></span>
      <span class="burger-menu__line"></span>
    </button>
  `;
}

/**
 * Generate HTML for menu links
 */
function generateMenuLinksHTML(links: BurgerMenuLink[]): string {
  return links.map(link => {
    const submenuHTML = link.submenu && link.submenu.length > 0
      ? `<ul class="burger-menu__submenu">${generateMenuLinksHTML(link.submenu)}</ul>`
      : '';
    
    return `
      <li class="burger-menu__item ${link.active ? 'active' : ''}">
        <a href="${link.href}" class="burger-menu__link">${link.text}</a>
        ${submenuHTML}
      </li>
    `;
  }).join('');
}

/**
 * Generate HTML for burger menu
 */
export function generateBurgerMenuHTML(config: BurgerMenuConfig): string {
  const {
    id = 'default',
    links,
    title,
    closeButtonText = 'Close',
    actions = [],
    additionalClasses = ''
  } = config;

  const linksHTML = generateMenuLinksHTML(links);
  const actionsHTML = actions.length > 0
    ? `<div class="burger-menu__actions">${actions.map(a => a.html).join('')}</div>`
    : '';

  return `
    <div class="burger-menu ${additionalClasses}" data-burger-menu-id="${id}">
      <div class="burger-menu__overlay"></div>
      <nav class="burger-menu__nav">
        <div class="burger-menu__header">
          ${title ? `<h2 class="burger-menu__title">${title}</h2>` : ''}
          <button class="burger-menu__close" aria-label="${closeButtonText}">×</button>
        </div>
        <div class="burger-menu__body">
          <ul class="burger-menu__list">
            ${linksHTML}
          </ul>
          ${actionsHTML}
        </div>
      </nav>
    </div>
  `;
}

/**
 * BurgerMenu class - handles all burger menu functionality
 */
export class BurgerMenu {
  private button: HTMLElement | null;
  private menu: HTMLElement | null;
  private nav: HTMLElement | null;
  private overlay: HTMLElement | null;
  private closeButton: HTMLElement | null;
  private config: BurgerMenuConfig;
  private isOpen: boolean = false;
  private desktopBreakpoint: number;
  private swipeThreshold: number;
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private touchEndX: number = 0;
  private touchEndY: number = 0;

  // Event handlers for cleanup
  private buttonClickHandler!: (e: MouseEvent) => void;
  private closeButtonClickHandler!: (e: MouseEvent) => void;
  private overlayClickHandler!: (e: MouseEvent) => void;
  private linkClickHandler!: (e: MouseEvent) => void;
  private keydownHandler!: (e: KeyboardEvent) => void;
  private resizeHandler!: () => void;
  private mediaQueryHandler!: (e: MediaQueryListEvent) => void;

  constructor(
    container: HTMLElement | string,
    config: BurgerMenuConfig
  ) {
    this.config = config;
    this.desktopBreakpoint = config.desktopBreakpoint ?? 768;
    this.swipeThreshold = config.swipeThreshold ?? 200;

    // Find or create elements
    const containerEl = typeof container === 'string'
      ? document.querySelector<HTMLElement>(container)
      : container;

    if (!containerEl) {
      throw new Error(`BurgerMenu: Container not found: ${container}`);
    }

    // Find or create burger button
    if (config.burgerButtonSelector) {
      this.button = containerEl.querySelector<HTMLElement>(config.burgerButtonSelector) ||
        document.querySelector<HTMLElement>(config.burgerButtonSelector);
    } else {
      // Generate and insert button
      const buttonHTML = generateBurgerButtonHTML(config.id);
      containerEl.insertAdjacentHTML('beforeend', buttonHTML);
      this.button = containerEl.querySelector<HTMLElement>(`.burger-menu__button[data-burger-id="${config.id || 'default'}"]`);
    }

    // Find or create menu
    if (config.menuSelector) {
      this.menu = document.querySelector<HTMLElement>(config.menuSelector);
    } else {
      // Generate and insert menu
      const menuHTML = generateBurgerMenuHTML(config);
      document.body.insertAdjacentHTML('beforeend', menuHTML);
      this.menu = document.querySelector<HTMLElement>(`.burger-menu[data-burger-menu-id="${config.id || 'default'}"]`);
    }

    if (!this.button || !this.menu) {
      throw new Error('BurgerMenu: Required elements not found');
    }

    this.nav = this.menu.querySelector<HTMLElement>('.burger-menu__nav');
    this.overlay = this.menu.querySelector<HTMLElement>('.burger-menu__overlay');
    this.closeButton = this.menu.querySelector<HTMLElement>('.burger-menu__close');

    // Initialize
    this.initialize();
  }

  /**
   * Initialize burger menu
   */
  private initialize(): void {
    // Initial state
    this.close();

    // Bind event handlers
    this.buttonClickHandler = this.handleButtonClick.bind(this);
    this.closeButtonClickHandler = this.handleCloseButtonClick.bind(this);
    this.overlayClickHandler = this.handleOverlayClick.bind(this);
    this.linkClickHandler = this.handleLinkClick.bind(this);
    this.keydownHandler = this.handleKeydown.bind(this);
    this.resizeHandler = this.handleResize.bind(this);

    // Attach event listeners
    this.button!.addEventListener('click', this.buttonClickHandler);
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.closeButtonClickHandler);
    }
    if (this.overlay) {
      this.overlay.addEventListener('click', this.overlayClickHandler);
    }
    // Handle click on menu container (backdrop) - similar to alex-house
    if (this.menu) {
      this.menu.addEventListener('click', (e: MouseEvent) => {
        // Close if clicking on menu container itself (not on nav content)
        if (e.target === this.menu && this.isOpen) {
          this.close();
        }
      });
    }
    if (this.nav) {
      this.nav.addEventListener('click', this.linkClickHandler);
    }
    document.addEventListener('keydown', this.keydownHandler);

    // Auto-close on resize
    if (this.config.autoCloseOnResize !== false) {
      window.addEventListener('resize', this.resizeHandler);
      
      // Media query for better performance
      const mediaQuery = window.matchMedia(`(min-width: ${this.desktopBreakpoint}px)`);
      this.mediaQueryHandler = (e: MediaQueryListEvent) => {
        if (e.matches && this.isOpen) {
          this.close();
        }
      };
      mediaQuery.addEventListener('change', this.mediaQueryHandler);
    }

    // Initialize swipe gestures if enabled
    if (this.config.enableSwipe) {
      this.initSwipeGestures();
    }
  }

  /**
   * Initialize swipe gestures for mobile (similar to alex-house approach)
   */
  private initSwipeGestures(): void {
    if (!this.menu || !this.overlay) return;

    // Swipe to open from left edge
    let touchStartHandler = (e: TouchEvent) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    };

    let touchMoveHandler = (e: TouchEvent) => {
      // Prevent default scrolling while swiping
      if (Math.abs(e.touches[0].clientX - this.touchStartX) > 10) {
        e.preventDefault();
      }
    };

    let touchEndHandler = (e: TouchEvent) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = this.touchEndX - this.touchStartX;
      const deltaY = this.touchEndY - this.touchStartY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Check if horizontal swipe is dominant
      if (absDeltaX > absDeltaY && absDeltaX > this.swipeThreshold) {
        if (deltaX > 0 && !this.isOpen) {
          // Swipe right to open (from left edge)
          this.open();
        } else if (deltaX < 0 && this.isOpen) {
          // Swipe left to close
          this.close();
        }
      }
    };

    // Add touch listeners to document for swipe to open
    document.addEventListener('touchstart', touchStartHandler, { passive: true });
    document.addEventListener('touchmove', touchMoveHandler, { passive: false });
    document.addEventListener('touchend', touchEndHandler, { passive: true });

    // Store handlers for cleanup
    (this as any).touchStartHandler = touchStartHandler;
    (this as any).touchMoveHandler = touchMoveHandler;
    (this as any).touchEndHandler = touchEndHandler;
  }

  /**
   * Handle burger button click
   */
  private handleButtonClick(e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
    this.toggle();
  }

  /**
   * Handle close button click
   */
  private handleCloseButtonClick(e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
    this.close();
  }

  /**
   * Handle overlay click
   * Also handles click on menu container itself (backdrop click)
   */
  private handleOverlayClick(e: MouseEvent): void {
    e.stopPropagation();
    // Close if clicking on overlay or menu container (but not on nav content)
    if (e.target === this.overlay || (e.target === this.menu && this.nav && !this.nav.contains(e.target as Node))) {
      this.close();
    }
  }

  /**
   * Handle link click
   */
  private handleLinkClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const link = target.closest<HTMLAnchorElement>('.burger-menu__link');
    
    if (link && this.config.autoCloseOnLinkClick !== false) {
      // Close menu after a short delay to allow navigation
      setTimeout(() => {
        this.close();
      }, 100);
    }
  }

  /**
   * Handle keyboard events (ESC key)
   * Supports both modern (e.key) and legacy (e.keyCode, e.which) for compatibility
   */
  private handleKeydown(e: KeyboardEvent): void {
    const isEscape = e.key === 'Escape' || 
                     (e as any).keyCode === 27 || 
                     (e as any).which === 27;
    
    if (isEscape && this.isOpen) {
      this.close();
    }
  }

  /**
   * Handle window resize
   */
  private handleResize(): void {
    if (window.innerWidth >= this.desktopBreakpoint && this.isOpen) {
      this.close();
    }
  }

  /**
   * Open menu
   */
  public open(): void {
    if (this.isOpen) return;

    this.isOpen = true;
    this.menu?.classList.add('active');
    this.button?.classList.add('active');
    
    if (this.button instanceof HTMLButtonElement) {
      this.button.setAttribute('aria-expanded', 'true');
    }

    // Lock body scroll and add classes (similar to alex-house approach)
    document.body.style.overflow = 'hidden';
    document.body.classList.add('burger-active');
    document.body.classList.add('is-lock');
  }

  /**
   * Close menu
   */
  public close(skipAnimation: boolean = false): void {
    if (!this.isOpen) return;

    if (skipAnimation && this.menu) {
      this.menu.classList.add('no-transition');
    }

    this.isOpen = false;
    this.menu?.classList.remove('active');
    this.button?.classList.remove('active');
    
    if (this.button instanceof HTMLButtonElement) {
      this.button.setAttribute('aria-expanded', 'false');
    }

    // Unlock body scroll and remove classes (similar to alex-house approach)
    document.body.style.overflow = '';
    document.body.classList.remove('burger-active');
    document.body.classList.remove('is-lock');

    if (skipAnimation && this.menu) {
      setTimeout(() => {
        this.menu?.classList.remove('no-transition');
      }, 10);
    }
  }

  /**
   * Toggle menu
   */
  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Check if menu is open
   */
  public getIsOpen(): boolean {
    return this.isOpen;
  }

  /**
   * Update menu links
   */
  public updateLinks(links: BurgerMenuLink[]): void {
    if (!this.nav) return;

    const list = this.nav.querySelector<HTMLElement>('.burger-menu__list');
    if (list) {
      list.innerHTML = generateMenuLinksHTML(links);
    }
  }

  /**
   * Destroy burger menu and clean up
   */
  public destroy(): void {
    this.close();

    // Remove event listeners
    this.button?.removeEventListener('click', this.buttonClickHandler);
    this.closeButton?.removeEventListener('click', this.closeButtonClickHandler);
    this.overlay?.removeEventListener('click', this.overlayClickHandler);
    this.nav?.removeEventListener('click', this.linkClickHandler);
    document.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('resize', this.resizeHandler);

    // Remove swipe gesture listeners if enabled
    if (this.config.enableSwipe) {
      const touchStartHandler = (this as any).touchStartHandler;
      const touchMoveHandler = (this as any).touchMoveHandler;
      const touchEndHandler = (this as any).touchEndHandler;
      if (touchStartHandler) document.removeEventListener('touchstart', touchStartHandler);
      if (touchMoveHandler) document.removeEventListener('touchmove', touchMoveHandler);
      if (touchEndHandler) document.removeEventListener('touchend', touchEndHandler);
    }

    // Remove media query listener
    if (this.config.autoCloseOnResize !== false) {
      const mediaQuery = window.matchMedia(`(min-width: ${this.desktopBreakpoint}px)`);
      mediaQuery.removeEventListener('change', this.mediaQueryHandler);
    }

    // Remove elements from DOM
    this.menu?.remove();
    // Note: Button might be part of another component, so we don't remove it automatically
  }
}

/**
 * Insert burger menu into container and initialize it
 */
export function insertBurgerMenu(
  container: HTMLElement | string,
  config: BurgerMenuConfig
): BurgerMenu | null {
  try {
    const burgerMenu = new BurgerMenu(container, config);
    return burgerMenu;
  } catch (error) {
    console.error('BurgerMenu: Failed to initialize:', error);
    return null;
  }
}
