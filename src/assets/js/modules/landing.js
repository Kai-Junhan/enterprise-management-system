'use strict';
const landing = (function() {
  // 平滑滚动
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // 导航栏滚动效果
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // 移动端菜单
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
    
    // 点击菜单链接后关闭菜单
    document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // 滚动动画
  function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 根据元素类型应用不同的动画
          const element = entry.target;
          
          if (element.classList.contains('hero-container')) {
            element.classList.add('fade-in');
          } else if (element.classList.contains('stat-card')) {
            element.classList.add('slide-up');
            element.classList.add(`delay-${(index % 3) * 100}`);
          } else if (element.classList.contains('tech-card')) {
            element.classList.add('scale-in');
            element.classList.add(`delay-${(index % 3) * 100}`);
          } else if (element.classList.contains('product-card')) {
            element.classList.add('slide-up');
            element.classList.add(`delay-${(index % 6) * 100}`);
          } else if (element.classList.contains('founder-card')) {
            element.classList.add('fade-in');
            element.classList.add(`delay-${(index % 4) * 100}`);
          } else if (element.classList.contains('partner-logo')) {
            element.classList.add('scale-in');
            element.classList.add(`delay-${(index % 9) * 100}`);
          } else if (element.classList.contains('cta')) {
            element.classList.add('slide-up');
          }
          
          // 停止观察已动画的元素
          observer.unobserve(element);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // 观察需要动画的元素
    document.querySelectorAll('.hero-container, .stat-card, .tech-card, .product-card, .founder-card, .partner-logo, #cta').forEach(el => {
      observer.observe(el);
    });
  }

  return {
    init: function() {
      initSmoothScroll();
      initNavbarScroll();
      initMobileMenu();
      initAnimations();
    }
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  landing.init();
});
