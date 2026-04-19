'use strict';
const landing = (function() {
  /**
   * 绑定落地页锚点平滑滚动。
   * @returns {void}
   *
   * 原因：前台展示页使用单页锚点导航，阻止默认跳转可以保留平滑滚动体验。
   */
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

  /**
   * 根据滚动位置切换落地页导航栏状态。
   * @returns {void}
   *
   * 原因：首屏背景图较暗，滚动离开首屏后需要半透明背景提升导航可读性。
   */
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

  /**
   * 控制落地页移动端菜单展开与收起。
   * @returns {void}
   */
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
    
    // 链接点击后收起菜单，避免移动端菜单遮挡滚动到的目标区块。
    document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    });
  }

  /**
   * 为落地页展示元素绑定进入视口动画。
   * @returns {void}
   *
   * 原因：IntersectionObserver 能让动画只在元素接近视口时触发，减少首屏加载时的动画压力。
   */
  function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 不同展示块使用不同动画节奏，保持统计、技术、产品和伙伴区的视觉层次。
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
          
          // 动画只触发一次，避免用户来回滚动时重复闪烁。
          observer.unobserve(element);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // 只观察落地页核心展示模块，避免把导航和页脚普通元素纳入动画队列。
    document.querySelectorAll('.hero-container, .stat-card, .tech-card, .product-card, .founder-card, .partner-logo, #cta').forEach(el => {
      observer.observe(el);
    });
  }

  return {
    /**
     * 初始化落地页专属交互。
     * @returns {void}
     *
     * 原因：落地页不进入后台业务模块加载链路，脚本在页面底部直接运行。
     */
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
