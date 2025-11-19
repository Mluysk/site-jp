const WHATS_NUMBER = '5541991434003';
const DEFAULT_MESSAGE = 'Olá! Gostaria de fazer uma encomenda.';
const APP_VERSION = document.documentElement?.dataset?.assetVersion || '20240524bg';

const modal = document.querySelector('[data-modal]');
const modalText = modal?.querySelector('[data-modal-text]');
const modalWhats = modal?.querySelector('[data-modal-whatsapp]');
const scrollTopButton = document.querySelector('[data-scroll-top]');
const heroSlider = document.querySelector('[data-hero-slider]');
const header = document.querySelector('header');
const navToggle = document.querySelector('[data-nav-toggle]');
const SCROLL_TOP_THRESHOLD = 320;
const HERO_SLIDE_INTERVAL = 5000;
const HERO_SWIPE_THRESHOLD = 45;

function openWhats(message = DEFAULT_MESSAGE) {
  const text = encodeURIComponent(message);
  const url = `https://wa.me/${WHATS_NUMBER}?text=${text}`;
  window.open(url, '_blank');
}

function openModal(message = DEFAULT_MESSAGE) {
  if (!modal || !modalText || !modalWhats) return;

  modalText.textContent = message;
  modalWhats.dataset.message = message;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  modalWhats.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

function bindWhatsButtons() {
  document.querySelectorAll('[data-whatsapp]').forEach((button) => {
    const message = button.dataset.message || DEFAULT_MESSAGE;
    button.addEventListener('click', () => openWhats(message));
  });
}

function bindPedidoButtons() {
  document.querySelectorAll('[data-pedido]').forEach((button) => {
    const message = button.dataset.message || DEFAULT_MESSAGE;
    button.addEventListener('click', () => openModal(message));
  });
}

function bindModalControls() {
  if (!modal) return;

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modalWhats?.addEventListener('click', (event) => {
    const message = event.currentTarget.dataset.message || DEFAULT_MESSAGE;
    openWhats(message);
    closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('show')) {
      closeModal();
    }
  });
}

function bindContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = form.querySelector('#nome')?.value.trim();
    const telefone = form.querySelector('#telefone')?.value.trim();
    const pedido = form.querySelector('#pedido')?.value.trim();
    const mensagem = form.querySelector('#msg')?.value.trim();

    if (!nome || !telefone) {
      alert('Preencha nome e telefone.');
      return;
    }

    let texto = `Olá, meu nome é ${nome}. Gostaria de fazer uma encomenda.`;
    if (pedido) texto += ` Pedido: ${pedido}.`;
    if (mensagem) texto += ` Observações: ${mensagem}.`;
    texto += ` (telefone: ${telefone})`;

    openWhats(texto);
  });
}

function setupScrollTopButton() {
  if (!scrollTopButton) return;

  const toggleVisibility = () => {
    if (window.scrollY > SCROLL_TOP_THRESHOLD) {
      scrollTopButton.classList.add('show');
    } else {
      scrollTopButton.classList.remove('show');
    }
  };

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();
}

function ensureStylesheetVersion() {
  if (!APP_VERSION) return;
  const links = document.querySelectorAll('link[data-cache-bust]');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const url = new URL(href, window.location.href);
    const currentVersion = url.searchParams.get('v');
    if (currentVersion !== APP_VERSION) {
      url.searchParams.set('v', APP_VERSION);
      link.href = url.toString();
    }
  });
}

function forceFreshView() {
  ensureStylesheetVersion();

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      ensureStylesheetVersion();
      window.location.reload();
    }
  });

  if ('caches' in window) {
    caches
      .keys()
      .then((keys) => keys.forEach((key) => caches.delete(key)))
      .catch(() => {});
  }
}

function initHeroSlider() {
  if (!heroSlider) return;

  const slides = Array.from(heroSlider.querySelectorAll('[data-hero-slide]'));
  if (!slides.length) return;

  const prevButton = heroSlider.querySelector('[data-hero-prev]');
  const nextButton = heroSlider.querySelector('[data-hero-next]');
  const dotsContainer = heroSlider.querySelector('[data-hero-dots]');
  let currentIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
  let intervalId = null;
  let touchStartX = null;
  let touchDeltaX = 0;
  const reduceMotionQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  let allowAutoAdvance = reduceMotionQuery ? !reduceMotionQuery.matches : true;

  const handleMotionPreference = (event) => {
    allowAutoAdvance = !event.matches;
    if (!allowAutoAdvance) {
      stopAutoAdvance();
    } else {
      startAutoAdvance();
    }
  };

  if (reduceMotionQuery) {
    if (typeof reduceMotionQuery.addEventListener === 'function') {
      reduceMotionQuery.addEventListener('change', handleMotionPreference);
    } else if (typeof reduceMotionQuery.addListener === 'function') {
      reduceMotionQuery.addListener(handleMotionPreference);
    }
  }

  if (currentIndex < 0) {
    currentIndex = 0;
    slides[0].classList.add('is-active');
  }

  slides.forEach((slide, index) => {
    slide.setAttribute('aria-hidden', index === currentIndex ? 'false' : 'true');
  });

  const dots = [];

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-slider__dot';
      dot.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
      dot.addEventListener('click', () => {
        stopAutoAdvance();
        goToSlide(index);
        startAutoAdvance();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  function updateDots(index) {
    if (!dots.length) return;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
      dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
    });
  }

  function goToSlide(index) {
    if (!slides.length) return;
    const targetIndex = (index + slides.length) % slides.length;
    slides[currentIndex]?.classList.remove('is-active');
    slides[currentIndex]?.setAttribute('aria-hidden', 'true');
    slides[targetIndex]?.classList.add('is-active');
    slides[targetIndex]?.setAttribute('aria-hidden', 'false');
    currentIndex = targetIndex;
    updateDots(currentIndex);
  }

  function showNextSlide() {
    goToSlide(currentIndex + 1);
  }

  function showPreviousSlide() {
    goToSlide(currentIndex - 1);
  }

  function stopAutoAdvance() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function startAutoAdvance() {
    if (slides.length <= 1 || !allowAutoAdvance) return;
    stopAutoAdvance();
    intervalId = setInterval(showNextSlide, HERO_SLIDE_INTERVAL);
  }

  function handleTouchStart(event) {
    if (!event.touches?.length) return;
    touchStartX = event.touches[0].clientX;
    touchDeltaX = 0;
    stopAutoAdvance();
  }

  function handleTouchMove(event) {
    if (touchStartX === null || !event.touches?.length) return;
    touchDeltaX = event.touches[0].clientX - touchStartX;
  }

  function handleTouchEnd() {
    if (touchStartX === null) return;

    if (Math.abs(touchDeltaX) > HERO_SWIPE_THRESHOLD) {
      if (touchDeltaX < 0) {
        showNextSlide();
      } else {
        showPreviousSlide();
      }
    }

    touchStartX = null;
    touchDeltaX = 0;
    startAutoAdvance();
  }

  prevButton?.addEventListener('click', () => {
    stopAutoAdvance();
    showPreviousSlide();
    startAutoAdvance();
  });

  nextButton?.addEventListener('click', () => {
    stopAutoAdvance();
    showNextSlide();
    startAutoAdvance();
  });

  heroSlider.addEventListener('mouseenter', stopAutoAdvance);
  heroSlider.addEventListener('mouseleave', startAutoAdvance);
  heroSlider.addEventListener('focusin', stopAutoAdvance);
  heroSlider.addEventListener('focusout', (event) => {
    if (!heroSlider.contains(event.relatedTarget)) {
      startAutoAdvance();
    }
  });

  heroSlider.addEventListener('touchstart', handleTouchStart, { passive: true });
  heroSlider.addEventListener('touchmove', handleTouchMove, { passive: true });
  heroSlider.addEventListener('touchend', handleTouchEnd);
  heroSlider.addEventListener('touchcancel', handleTouchEnd);

  updateDots(currentIndex);
  startAutoAdvance();
}

function initMobileNav() {
  if (!header || !navToggle) return;

  const menuLinks = document.querySelectorAll('.primary-nav a, .secondary-nav a');

  const closeMenu = () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 820) {
        closeMenu();
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });

  closeMenu();
}

function init() {
  forceFreshView();
  bindWhatsButtons();
  bindPedidoButtons();
  bindModalControls();
  bindContactForm();
  setupScrollTopButton();
  initHeroSlider();
  initMobileNav();
}

document.addEventListener('DOMContentLoaded', init);
