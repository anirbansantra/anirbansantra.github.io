/* ============================================================
   ANIRBAN SANTRA — Portfolio JavaScript
   Blue Cobalt Identity — Premium interactions & functionality
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // THEME MANAGEMENT
  // ============================================================
  const ThemeManager = {
    STORAGE_KEY: 'as-portfolio-theme',

    init() {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = saved || (systemDark ? 'dark' : 'light');
      this.apply(theme);

      document.getElementById('themeToggle')?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        this.apply(current === 'dark' ? 'light' : 'dark');
      });

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.apply(e.matches ? 'dark' : 'light');
        }
      });
    },

    apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  };

  // ============================================================
  // NAVIGATION
  // ============================================================
  const Navigation = {
    nav: null,
    links: null,
    hamburger: null,
    mobileMenu: null,
    overlay: null,
    sections: [],

    init() {
      this.nav = document.querySelector('.nav');
      this.links = document.querySelectorAll('.nav__link');
      this.hamburger = document.querySelector('.nav__hamburger');
      this.mobileMenu = document.querySelector('.nav__links');
      this.overlay = document.querySelector('.nav__overlay');
      this.sections = document.querySelectorAll('section[id]');

      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

      this.hamburger?.addEventListener('click', () => this.toggleMobile());
      this.overlay?.addEventListener('click', () => this.closeMobile());

      this.links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            this.closeMobile();
          }
        });
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeMobile();
      });

      this.handleScroll();
    },

    handleScroll() {
      const scrolled = window.scrollY > 50;
      this.nav?.classList.toggle('scrolled', scrolled);
      this.updateActiveSection();
    },

    updateActiveSection() {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let currentSection = '';
      this.sections.forEach(section => {
        if (section.offsetTop <= scrollPos) {
          currentSection = section.id;
        }
      });

      this.links.forEach(link => {
        const href = link.getAttribute('href')?.substring(1);
        link.classList.toggle('active', href === currentSection);
      });
    },

    toggleMobile() {
      const isOpen = this.mobileMenu?.classList.contains('open');
      isOpen ? this.closeMobile() : this.openMobile();
    },

    openMobile() {
      this.mobileMenu?.classList.add('open');
      this.hamburger?.classList.add('active');
      this.overlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    closeMobile() {
      this.mobileMenu?.classList.remove('open');
      this.hamburger?.classList.remove('active');
      this.overlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // ============================================================
  // SCROLL PROGRESS
  // ============================================================
  const ScrollProgress = {
    bar: null,

    init() {
      this.bar = document.querySelector('.scroll-progress');
      window.addEventListener('scroll', () => this.update(), { passive: true });
    },

    update() {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      if (this.bar) this.bar.style.width = scrolled + '%';
    }
  };

  // ============================================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================================
  const ScrollReveal = {
    init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
  };

  // ============================================================
  // HERO BACKGROUND CANVAS — Subtle network animation
  // ============================================================
  const HeroCanvas = {
    canvas: null,
    ctx: null,
    particles: [],
    mouse: { x: -1000, y: -1000 },
    animationFrame: null,
    reducedMotion: false,

    init() {
      this.canvas = document.getElementById('heroCanvas');
      if (!this.canvas) return;

      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (this.reducedMotion) return;

      this.ctx = this.canvas.getContext('2d');
      this.resize();

      window.addEventListener('resize', () => this.resize());

      this.canvas.parentElement?.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      this.canvas.parentElement?.addEventListener('mouseleave', () => {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
      });

      this.createParticles();
      this.animate();
    },

    resize() {
      if (!this.canvas) return;
      const container = this.canvas.parentElement;
      this.canvas.width = container.offsetWidth;
      this.canvas.height = container.offsetHeight;
    },

    createParticles() {
      this.particles = [];
      const area = this.canvas.width * this.canvas.height;
      const count = Math.min(Math.floor(area / 18000), 55);

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.35 + 0.08
        });
      }
    },

    animate() {
      if (!this.ctx || !this.canvas) return;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      // Blue palette colors for the network
      const dotColor = isDark ? '100, 149, 237' : '0, 71, 171';
      const lineColor = isDark ? '100, 149, 237' : '0, 71, 171';

      // Update & draw particles
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${dotColor}, ${p.opacity})`;
        this.ctx.fill();
      });

      // Draw connections
      const maxDist = 110;
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }

        // Mouse interaction — very subtle
        const mdx = this.particles[i].x - this.mouse.x;
        const mdy = this.particles[i].y - this.mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 140) {
          const opacity = (1 - mDist / 140) * 0.12;
          this.ctx.beginPath();
          this.ctx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].radius + 1, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(${dotColor}, ${opacity + 0.15})`;
          this.ctx.fill();
        }
      }

      this.animationFrame = requestAnimationFrame(() => this.animate());
    },

    destroy() {
      if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    }
  };

  // ============================================================
  // PROJECT CARD EXPANDABLE DETAILS
  // ============================================================
  const ProjectCards = {
    init() {
      document.querySelectorAll('.project-card__expand').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('.project-card');
          const details = card?.querySelector('.project-card__details');
          if (!details) return;

          const isExpanded = btn.classList.contains('expanded');

          if (isExpanded) {
            details.style.maxHeight = '0';
            btn.classList.remove('expanded');
            btn.querySelector('.expand-text').textContent = 'View Details';
          } else {
            details.style.maxHeight = details.scrollHeight + 'px';
            btn.classList.add('expanded');
            btn.querySelector('.expand-text').textContent = 'Hide Details';
          }
        });
      });
    }
  };

  // ============================================================
  // CITATION MODAL
  // ============================================================
  const CitationModal = {
    modal: null,

    init() {
      this.modal = document.getElementById('citationModal');
      if (!this.modal) return;

      document.querySelectorAll('[data-action="cite"]').forEach(btn => {
        btn.addEventListener('click', () => this.open());
      });

      this.modal.querySelector('.citation-modal__close')?.addEventListener('click', () => this.close());
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.classList.contains('active')) this.close();
      });

      const copyBtn = this.modal.querySelector('.citation-modal__copy');
      copyBtn?.addEventListener('click', () => {
        const code = this.modal.querySelector('.citation-modal__code');
        if (!code) return;

        navigator.clipboard.writeText(code.textContent.trim()).then(() => {
          copyBtn.classList.add('copied');
          const original = copyBtn.innerHTML;
          copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = original;
          }, 2000);
        });
      });
    },

    open() {
      this.modal?.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        this.modal.querySelector('.citation-modal__close')?.focus();
      }, 100);
    },

    close() {
      this.modal?.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // ============================================================
  // CONTACT FORM (Frontend Only — No backend)
  // ============================================================
  const ContactForm = {
    init() {
      const form = document.getElementById('contactForm');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const submitBtn = form.querySelector('.form__submit');
        if (submitBtn) {
          const original = submitBtn.innerHTML;
          submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Message Noted!`;
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.7';

          setTimeout(() => {
            submitBtn.innerHTML = original;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            form.reset();
          }, 3000);
        }

        console.log('Contact form submission (no backend connected):', data);
      });
    }
  };

  // ============================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.classList.contains('nav__link')) return;
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }
  };

  // ============================================================
  // CERTIFICATE CAROUSEL
  // ============================================================
  const CertCarousel = {
    currentIndex: 0,
    totalSlides: 0,
    track: null,
    slides: [],
    autoplayTimer: null,
    isPaused: false,
    reducedMotion: false,
    touchStartX: 0,
    touchEndX: 0,

    // ── Editable certificate data ──────────────────────────────
    // To add a certificate: push one object with caption, issueDate, issuedBy, image.
    // Count, navigation, and dots update automatically.
    certificates: [
      { caption: 'Next Generation Communication Technologies Using MATLAB Tools', issueDate: '14 Feb, 2025', issuedBy: 'Indian Institute of Information Technology Una', image: 'assets/images/certificates/IIIT UNA Certificate.jpg' },
      { caption: 'Power of Python in Data Analytics', issueDate: '05 Nov, 2024', issuedBy: 'Ramakrishna Mission Vidyamandira', image: 'assets/images/certificates/Power of Python in Data Analytics.jpg' },
      { caption: 'XAVTECH International Talk', issueDate: '06 Sep, 2024', issuedBy: 'St. Xavier\'s University, Kolkata', image: 'assets/images/certificates/XAVTECH International Talk workshop.jpg' },
      { caption: 'NPTEL Awareness Webinar', issueDate: '03 Oct, 2024', issuedBy: 'Ramakrishna Mission Vidyamandira', image: 'assets/images/certificates/NPTEL Awareness Webinar.jpg' },
      { caption: 'Certificate in English Communication and Digital Literacy', issueDate: '01 Dec, 2021', issuedBy: 'Anudip Foundation', image: 'assets/images/certificates/Anudip_Foundation.jpg' },
      { caption: '2nd Position in Codathon — TECHTRIX 2025', issueDate: '08 Mar, 2025', issuedBy: 'RCC Institute of Information Technology', image: 'assets/images/certificates/techtrix certificate.jpg' },
      { caption: '1st Position in Syntax Showdown — Tech Kurukshetra', issueDate: '22 Feb, 2025', issuedBy: 'University of Engineering & Management, Kolkata', image: 'assets/images/certificates/uem_certificate.jpg' },
      { caption: 'Quiz Contest — IETE Eastern Zonal Seminar 2025', issueDate: '03 Aug, 2025', issuedBy: 'The Institution of Electronics and Telecommunication Engineers (IETE)', image: 'assets/images/certificates/IETE_quiz_certificate.jpg' },
      { caption: 'Research Paper Presentation — IETE Eastern Zonal Seminar 2025', issueDate: '03 Aug, 2025', issuedBy: 'The Institution of Electronics and Telecommunication Engineers (IETE)', image: 'assets/images/certificates/IETE_paper_certification.jpg' },
      { caption: 'DAS-STAT — Web-Based Data Repository Platform', issueDate: '13 Sep, 2024', issuedBy: 'Government General Degree College, Singur', image: 'assets/images/certificates/DAS-STAT_Certificate.png' }
    ],

    init() {
      this.track = document.getElementById('certTrack');
      if (!this.track) return;

      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Dynamically build slides from the certificates array
      this.buildSlides();

      this.slides = this.track.querySelectorAll('.cert-carousel__slide');
      this.totalSlides = this.slides.length;

      if (this.totalSlides === 0) return;

      // Build pagination dots
      this.buildDots();

      // Arrow buttons
      document.getElementById('certPrev')?.addEventListener('click', () => {
        this.prev();
        this.resetAutoplay();
      });
      document.getElementById('certNext')?.addEventListener('click', () => {
        this.next();
        this.resetAutoplay();
      });

      // Keyboard navigation
      const carousel = document.getElementById('certCarousel');
      carousel?.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); this.resetAutoplay(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); this.next(); this.resetAutoplay(); }
      });

      // Touch/swipe support
      const viewport = this.track.parentElement;
      viewport?.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport?.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, { passive: true });

      // Pause autoplay on hover/focus
      carousel?.addEventListener('mouseenter', () => { this.isPaused = true; });
      carousel?.addEventListener('mouseleave', () => { this.isPaused = false; });
      carousel?.addEventListener('focusin', () => { this.isPaused = true; });
      carousel?.addEventListener('focusout', () => { this.isPaused = false; });

      // Set initial state
      this.goTo(0);

      // Optional slow autoplay (8 seconds), skip if reduced motion
      if (!this.reducedMotion) {
        this.startAutoplay();
      }

      // Disable transition for reduced-motion users
      if (this.reducedMotion) {
        this.track.style.transition = 'none';
      }
    },

    buildSlides() {
      this.track.innerHTML = '';
      const total = this.certificates.length;
      this.certificates.forEach((cert, i) => {
        const slide = document.createElement('div');
        slide.className = 'cert-carousel__slide';
        slide.setAttribute('role', 'tabpanel');
        slide.setAttribute('aria-label', `Certificate ${i + 1} of ${total}`);

        const img = document.createElement('img');
        img.className = 'cert-carousel__img';
        img.src = cert.image;
        img.alt = 'Certificate — ' + cert.caption;
        img.loading = 'lazy';
        img.onerror = function () {
          this.style.display = 'none';
          this.nextElementSibling.style.display = 'flex';
        };

        const placeholder = document.createElement('div');
        placeholder.className = 'cert-carousel__placeholder';
        placeholder.style.display = 'none';
        placeholder.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg><span>Certificate image not yet added</span>';

        slide.appendChild(img);
        slide.appendChild(placeholder);
        this.track.appendChild(slide);
      });
    },

    buildDots() {
      const dotsContainer = document.getElementById('certDots');
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < this.totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'cert-carousel__dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to certificate ${i + 1}`);
        dot.addEventListener('click', () => {
          this.goTo(i);
          this.resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      }
    },

    goTo(index) {
      if (index < 0) index = this.totalSlides - 1;
      if (index >= this.totalSlides) index = 0;
      this.currentIndex = index;

      // Move track
      this.track.style.transform = `translateX(-${index * 100}%)`;

      // Update info panel
      const cert = this.certificates[index];
      const titleEl = document.getElementById('certTitle');
      const orgEl = document.getElementById('certOrg');
      const metaEl = document.getElementById('certMeta');
      if (titleEl) titleEl.textContent = cert.caption;
      if (orgEl) orgEl.textContent = 'Issued by: ' + cert.issuedBy;
      if (metaEl) metaEl.textContent = cert.issueDate;

      // Update counter
      const counter = document.getElementById('certCounter');
      if (counter) counter.textContent = `${index + 1} / ${this.totalSlides}`;

      // Update dots
      document.querySelectorAll('.cert-carousel__dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      // Update arrow disabled state (optional wrap-around, so just visual cue)
      const prevBtn = document.getElementById('certPrev');
      const nextBtn = document.getElementById('certNext');
      if (prevBtn) prevBtn.removeAttribute('disabled');
      if (nextBtn) nextBtn.removeAttribute('disabled');
    },

    next() { this.goTo(this.currentIndex + 1); },
    prev() { this.goTo(this.currentIndex - 1); },

    handleSwipe() {
      const threshold = 50;
      const diff = this.touchStartX - this.touchEndX;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) this.next();
        else this.prev();
        this.resetAutoplay();
      }
    },

    startAutoplay() {
      this.autoplayTimer = setInterval(() => {
        if (!this.isPaused) this.next();
      }, 8000);
    },

    resetAutoplay() {
      if (this.autoplayTimer) clearInterval(this.autoplayTimer);
      if (!this.reducedMotion) this.startAutoplay();
    }
  };

  // ============================================================
  // PHOTO LIGHTBOX
  // ============================================================
  const PhotoLightbox = {
    lightbox: null,
    imgEl: null,
    captionEl: null,

    init() {
      this.lightbox = document.getElementById('photoLightbox');
      this.imgEl = document.getElementById('lightboxImg');
      this.captionEl = document.getElementById('lightboxCaption');
      if (!this.lightbox) return;

      // Click on each photo-item to open lightbox
      document.querySelectorAll('.photo-item').forEach(item => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.photo-item__caption');
        if (!img) return;

        item.addEventListener('click', () => {
          this.open(img.src, img.alt, caption ? caption.textContent : '');
        });

        // Keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', caption ? caption.textContent : 'View photo');
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.open(img.src, img.alt, caption ? caption.textContent : '');
          }
        });
      });

      // Close button
      this.lightbox.querySelector('.photo-lightbox__close')?.addEventListener('click', () => this.close());

      // Click outside content to close
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) this.close();
      });

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.lightbox.classList.contains('active')) this.close();
      });
    },

    open(src, alt, caption) {
      if (this.imgEl) {
        this.imgEl.src = src;
        this.imgEl.alt = alt || '';
      }
      if (this.captionEl) {
        this.captionEl.textContent = caption || '';
        this.captionEl.style.display = caption ? '' : 'none';
      }
      this.lightbox?.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Focus close button for accessibility
      setTimeout(() => {
        this.lightbox.querySelector('.photo-lightbox__close')?.focus();
      }, 100);
    },

    close() {
      this.lightbox?.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // ============================================================
  // INITIALIZE EVERYTHING
  // ============================================================
  function init() {
    ThemeManager.init();
    Navigation.init();
    ScrollProgress.init();
    ScrollReveal.init();
    HeroCanvas.init();
    ProjectCards.init();
    CitationModal.init();
    ContactForm.init();
    SmoothScroll.init();
    CertCarousel.init();
    PhotoLightbox.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
