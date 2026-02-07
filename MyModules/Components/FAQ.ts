// FAQ Component - accordion section
// Part of MyModules library

export interface FAQItem {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
  /** AOS animation delay (optional) */
  aosDelay?: number;
}

export interface FAQConfig {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle: string;
  /** Background image URL (optional) */
  backgroundImage?: string;
  /** FAQ items array */
  items: FAQItem[];
  /** Section ID (default: 'faq') */
  sectionId?: string;
  /** Additional CSS classes */
  additionalClasses?: string;
  /** Enable AOS animations (default: true) */
  enableAOS?: boolean;
}

/**
 * Generate HTML for FAQ section
 */
export function generateFAQHTML(config: FAQConfig): string {
  const {
    title,
    subtitle,
    backgroundImage,
    items,
    sectionId = 'faq',
    additionalClasses = '',
    enableAOS = true
  } = config;

  const sectionClasses = ['faq', additionalClasses].filter(Boolean).join(' ');
  const backgroundStyle = backgroundImage 
    ? `style="background: url('${backgroundImage}') center / cover no-repeat;"`
    : '';

  const aosAttr = enableAOS ? 'data-aos="fade-up"' : '';
  const titleAOS = enableAOS ? 'data-aos="fade-up"' : '';
  const subtitleAOS = enableAOS ? 'data-aos="fade-up" data-aos-delay="50"' : '';
  
  const itemsHTML = items.map((item, index) => {
    const delay = item.aosDelay ?? (100 + index * 50);
    const itemAOS = enableAOS ? `data-aos="fade-up" data-aos-delay="${delay}"` : '';
    return `<div class="faq__item" ${itemAOS}>
  <div class="faq__question">${item.question}</div>
  <div class="faq__answer"><p>${item.answer}</p></div>
</div>`;
  }).join('\n');

  return `<section class="${sectionClasses}" id="${sectionId}" ${aosAttr} ${backgroundStyle}>
  <div class="faq__overlay">
    <div class="faq__container">
      <h2 class="faq__title" ${titleAOS}>${title}</h2>
      <h5 class="faq__subtitle" ${subtitleAOS}>${subtitle}</h5>
      <div class="faq__accordion">${itemsHTML}</div>
    </div>
  </div>
</section>`.trim();
}

/**
 * Insert FAQ section into DOM and initialize accordion
 */
export function insertFAQ(
  container: HTMLElement | string,
  config: FAQConfig
): HTMLElement | null {
  const html = generateFAQHTML(config);
  const targetElement = typeof container === 'string' 
    ? document.querySelector<HTMLElement>(container)
    : container;

  if (!targetElement) {
    console.error('FAQ container not found');
    return null;
  }

  targetElement.innerHTML = html;
  const faqSection = targetElement.querySelector<HTMLElement>('.faq');
  if (faqSection) initFAQAccordion(faqSection);
  return faqSection;
}

/**
 * Update FAQ section content
 */
export function updateFAQ(
  faqElement: HTMLElement | string,
  config: Partial<FAQConfig>
): HTMLElement | null {
  const faqSection = typeof faqElement === 'string'
    ? document.querySelector<HTMLElement>(faqElement)
    : faqElement;

  if (!faqSection) {
    console.error('FAQ element not found');
    return null;
  }

  // Update title
  if (config.title) {
    const titleEl = faqSection.querySelector('.faq__title');
    if (titleEl) titleEl.textContent = config.title;
  }

  // Update subtitle
  if (config.subtitle) {
    const subtitleEl = faqSection.querySelector('.faq__subtitle');
    if (subtitleEl) subtitleEl.textContent = config.subtitle;
  }

  // Update background image
  if (config.backgroundImage) {
    faqSection.style.backgroundImage = `url('${config.backgroundImage}')`;
  }

  // Update items
  if (config.items) {
    const accordion = faqSection.querySelector('.faq__accordion');
    if (accordion) {
      // Check for AOS enablement from existing attributes
      const enableAOS = faqSection.hasAttribute('data-aos');
      
      const itemsHTML = config.items.map((item, index) => {
        const delay = item.aosDelay ?? (100 + index * 50);
        const itemAOS = enableAOS ? `data-aos="fade-up" data-aos-delay="${delay}"` : '';
        return `<div class="faq__item" ${itemAOS}>
      <div class="faq__question">${item.question}</div>
      <div class="faq__answer"><p>${item.answer}</p></div>
    </div>`;
      }).join('\n');
      
      accordion.innerHTML = itemsHTML;
      
      // Re-initialize accordion logic for new items
      // Note: This adds a new window resize listener. In a production app, we should clean up the old one.
      initFAQAccordion(faqSection);
    }
  }

  return faqSection;
}

/**
 * Initialize FAQ accordion functionality
 * Uses CSS transitions for animations (max-height, opacity, padding)
 */
function initFAQAccordion(faqSection: HTMLElement): void {
  const faqItems = faqSection.querySelectorAll<HTMLElement>('.faq__item');
  
  faqItems.forEach(item => {
    const question = item.querySelector<HTMLElement>('.faq__question');
    const answer = item.querySelector<HTMLElement>('.faq__answer');
    if (!question || !answer) return;
    
    // Protection from double binding
    if ((question as any).dataset?.bound) return;
    (question as any).dataset.bound = 'true';
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(i => {
        if (i !== item) {
          i.classList.remove('active');
          const a = i.querySelector<HTMLElement>('.faq__answer');
          if (a) a.style.maxHeight = '0';
        }
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = '0';
        requestAnimationFrame(() => {
          answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
        });
      } else {
        answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
        requestAnimationFrame(() => {
          answer.style.maxHeight = '0';
          item.classList.remove('active');
        });
      }
    });
  });
  
  // Cleanup old resize handler if present to avoid leaks
  if ((faqSection as any)._resizeHandler) {
      window.removeEventListener('resize', (faqSection as any)._resizeHandler);
  }

  // Update height on window resize
  const resizeHandler = () => {
    faqItems.forEach(item => {
      if (item.classList.contains('active')) {
        const answer = item.querySelector<HTMLElement>('.faq__answer');
        if (answer?.style.maxHeight && answer.style.maxHeight !== '0px') {
          answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
        }
      }
    });
  };

  window.addEventListener('resize', resizeHandler);
  (faqSection as any)._resizeHandler = resizeHandler;
}
