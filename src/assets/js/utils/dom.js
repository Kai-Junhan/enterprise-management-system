/**
 * DOM 操作工具库
 * 提供简化的 DOM 查询、元素创建、事件绑定和类名操作等常用功能
 */

'use strict';

/**
 * 查询单个 DOM 元素
 * @param {string} selector - CSS 选择器
 * @param {ParentNode} [context=document] - 查询上下文
 * @returns {Element|null} - 匹配的第一个元素或 null
 */
function $(selector, context) {
  return (context || document).querySelector(selector);
}

/**
 * 查询多个 DOM 元素并转为数组
 * @param {string} selector - CSS 选择器
 * @param {ParentNode} [context=document] - 查询上下文
 * @returns {Element[]} - 匹配元素数组
 */
function $$(selector, context) {
  return Array.from((context || document).querySelectorAll(selector));
}

/**
 * 创建 DOM 元素
 * @param {string} tag - 标签名
 * @param {string} [className] - 初始类名
 * @param {string} [innerHTML] - 初始 HTML 内容
 * @returns {HTMLElement} - 新建元素
 */
function createElement(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}

/**
 * 绑定事件监听器
 * @param {Element|null} element - 目标元素
 * @param {string} event - 事件名称
 * @param {EventListener} handler - 事件处理函数
 * @returns {void}
 */
function on(element, event, handler) {
  if (element) element.addEventListener(event, handler);
}

/**
 * 事件委托
 * @param {Element|null} parent - 委托父节点
 * @param {string} selector - 目标子元素选择器
 * @param {string} event - 事件名称
 * @param {Function} handler - 处理函数（this 指向匹配元素）
 * @returns {void}
 */
function delegate(parent, selector, event, handler) {
  on(parent, event, (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  });
}

/**
 * 添加 CSS 类名
 * @param {Element|null} element - 目标元素
 * @param {string} className - 类名
 * @returns {void}
 */
function addClass(element, className) {
  if (element) element.classList.add(className);
}

/**
 * 移除 CSS 类名
 * @param {Element|null} element - 目标元素
 * @param {string} className - 类名
 * @returns {void}
 */
function removeClass(element, className) {
  if (element) element.classList.remove(className);
}

/**
 * 判断是否包含 CSS 类名
 * @param {Element|null} element - 目标元素
 * @param {string} className - 类名
 * @returns {boolean} - 包含返回 true
 */
function hasClass(element, className) {
  return element ? element.classList.contains(className) : false;
}

/**
 * 切换 CSS 类名
 * @param {Element|null} element - 目标元素
 * @param {string} className - 类名
 * @returns {void}
 */
function toggleClass(element, className) {
  if (element) element.classList.toggle(className);
}

/**
 * 显示元素（移除 display: none）
 * @param {Element|null} element - 目标元素
 * @returns {void}
 */
function show(element) {
  if (element) element.style.display = '';
}

/**
 * 隐藏元素（设置 display: none）
 * @param {Element|null} element - 目标元素
 * @returns {void}
 */
function hide(element) {
  if (element) element.style.display = 'none';
}

/**
 * 切换元素显示/隐藏状态
 * @param {Element|null} element - 目标元素
 * @returns {void}
 */
function toggle(element) {
  if (element) {
    element.style.display = element.style.display === 'none' ? '' : 'none';
  }
}
