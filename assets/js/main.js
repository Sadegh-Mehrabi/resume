/**
* Template Name: Craftivo
* Template URL: https://bootstrapmade.com/craftivo-bootstrap-portfolio-template/
* Updated: Oct 04 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Project image galleries — one independent Swiper per project, driven by
   * whatever <img> tags the author places inside .project-gallery.
   */
  function buildProjectGallery(gallery, images) {
    // ── Main (large) swiper ──────────────────────────────────────────────────
    const mainEl = document.createElement('div');
    mainEl.className = 'swiper project-swiper-main';
    const mainWrapper = document.createElement('div');
    mainWrapper.className = 'swiper-wrapper';

    images.forEach(function(img) {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.appendChild(img.cloneNode(true));
      mainWrapper.appendChild(slide);
    });
    mainEl.appendChild(mainWrapper);

    gallery.innerHTML = '';
    gallery.appendChild(mainEl);

    // ── Thumbnail swiper (only when > 1 image) ───────────────────────────────
    let thumbsInstance = null;
    if (images.length > 1) {
      const thumbsEl = document.createElement('div');
      thumbsEl.className = 'swiper project-swiper-thumbs';
      const thumbsWrapper = document.createElement('div');
      thumbsWrapper.className = 'swiper-wrapper';

      images.forEach(function(img) {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        const thumb = new Image();
        thumb.src = img.src;
        thumb.setAttribute('aria-hidden', 'true');
        slide.appendChild(thumb);
        thumbsWrapper.appendChild(slide);
      });

      thumbsEl.appendChild(thumbsWrapper);
      gallery.appendChild(thumbsEl);

      // Must be visible before Swiper measures container dimensions
      gallery.style.display = 'block';

      thumbsInstance = new Swiper(thumbsEl, {
        spaceBetween: 8,
        slidesPerView: 'auto',
        freeMode: { enabled: true },
        watchSlidesProgress: true,
      });
    } else {
      gallery.style.display = 'block';
    }

    // ── Init main swiper ─────────────────────────────────────────────────────
    const mainCfg = {
      spaceBetween: 10,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      keyboard: { enabled: true, onlyInViewport: true },
    };
    if (thumbsInstance) mainCfg.thumbs = { swiper: thumbsInstance };
    new Swiper(mainEl, mainCfg);
  }

  function initProjectGalleries() {
    document.querySelectorAll('.project-gallery').forEach(function(gallery) {
      const imgs = Array.from(gallery.querySelectorAll('img'));
      if (!imgs.length) return;

      let pending = imgs.length;
      const valid = [];

      function onSettled() {
        if (--pending > 0) return;
        if (valid.length) buildProjectGallery(gallery, valid);
      }

      imgs.forEach(function(img) {
        if (img.complete) {
          if (img.naturalWidth) valid.push(img);
          onSettled();
        } else {
          img.addEventListener('load', function() { valid.push(img); onSettled(); });
          img.addEventListener('error', onSettled);
        }
      });
    });
  }

  window.addEventListener('load', initProjectGalleries);

})();