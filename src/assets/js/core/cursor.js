'use strict';

const appCursor = (function() {
  /**
   * 初始化桌面端品牌光标。
   * 输入：读取当前视口宽度和页面内可交互元素；无显式参数。
   * 输出：向 body 注入 `.custom-cursor` 并绑定鼠标跟随与 hover 反馈。
   * 原因：触屏设备不需要鼠标光标，重复注入会造成多个光标节点叠加。
   */
  function init() {
    if (window.innerWidth <= 768 || document.querySelector('.custom-cursor')) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    /**
     * 按动画帧平滑追踪鼠标坐标。
     * 输入：闭包中的 mouseX/mouseY；输出：更新光标 transform。
     * 原因：requestAnimationFrame 与 translate3d 能降低跟随动画的抖动和重排成本。
     */
    function updateCursor() {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.2;
      cursorY += dy * 0.2;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(updateCursor);
    }

    requestAnimationFrame(updateCursor);

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    // 可交互元素进入时扩大光标，给按钮、卡片和链接提供一致 hover 反馈。
    const addHover = () => cursor.classList.add('hover');
    // 离开可交互元素时恢复默认光标状态。
    const removeHover = () => cursor.classList.remove('hover');
    const interactives = document.querySelectorAll('a, button, input, .module-card, .founder-card, .product-card, .tech-card, .btn');
    interactives.forEach((element) => {
      element.addEventListener('mouseenter', addHover);
      element.addEventListener('mouseleave', removeHover);
    });
  }

  return {
    init
  };
})();

window.appCursor = appCursor;
