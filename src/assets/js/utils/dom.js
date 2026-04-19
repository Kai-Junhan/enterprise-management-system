'use strict';

/**
 * 查询单个 DOM 元素。
 * @param {string} selector CSS 选择器。
 * @param {ParentNode} [context=document] 查询上下文。
 * @returns {Element|null} 匹配到的第一个元素。
 */
function $(selector, context) {
  return (context || document).querySelector(selector);
}

/**
 * 查询多个 DOM 元素并转为数组。
 * @param {string} selector CSS 选择器。
 * @param {ParentNode} [context=document] 查询上下文。
 * @returns {Element[]} 匹配元素数组。
 */
function $$(selector, context) {
  return Array.from((context || document).querySelectorAll(selector));
}

/**
 * 创建运行时需要的 DOM 节点。
 * @param {string} tag 标签名。
 * @param {string} [className] 初始类名。
 * @param {string} [innerHTML] 初始 HTML 内容。
 * @returns {HTMLElement} 新建元素。
 *
 * 原因：公共组件和业务弹窗会在运行时创建节点，统一入口便于后续替换为安全渲染策略。
 */
function createElement(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}

/**
 * 为存在的元素绑定事件。
 * @param {Element|null} element 目标元素。
 * @param {string} event 事件名。
 * @param {EventListener} handler 事件处理函数。
 * @returns {void}
 *
 * 原因：不同业务子页面 DOM 不完全一致，缺失按钮不应导致初始化报错。
 */
function on(element, event, handler) {
  if (element) element.addEventListener(event, handler);
}

/**
 * 在父元素上委托处理后代元素事件。
 * @param {Element|null} parent 事件委托父节点。
 * @param {string} selector 需要匹配的子元素选择器。
 * @param {string} event 事件名。
 * @param {Function} handler 处理函数，this 指向匹配到的子元素。
 * @returns {void}
 *
 * 原因：业务表格会整表重渲染，委托能让新增行和刷新后的按钮继续响应。
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
 * 添加 UI 状态类。
 * @param {Element|null} element 目标元素。
 * @param {string} className 状态类名。
 * @returns {void}
 */
function addClass(element, className) {
  if (element) element.classList.add(className);
}

/**
 * 移除 UI 状态类。
 * @param {Element|null} element 目标元素。
 * @param {string} className 状态类名。
 * @returns {void}
 */
function removeClass(element, className) {
  if (element) element.classList.remove(className);
}

/**
 * 判断元素是否拥有指定状态类。
 * @param {Element|null} element 目标元素。
 * @param {string} className 状态类名。
 * @returns {boolean} 存在元素且拥有类名时返回 true。
 */
function hasClass(element, className) {
  return element ? element.classList.contains(className) : false;
}

/**
 * 切换 UI 状态类。
 * @param {Element|null} element 目标元素。
 * @param {string} className 状态类名。
 * @returns {void}
 */
function toggleClass(element, className) {
  if (element) element.classList.toggle(className);
}

/**
 * 清除内联 display，让元素回到 CSS 定义的显示状态。
 * @param {HTMLElement|null} element 目标元素。
 * @returns {void}
 */
function show(element) {
  if (element) element.style.display = '';
}

/**
 * 通过内联 display 隐藏元素并保留其 DOM 状态。
 * @param {HTMLElement|null} element 目标元素。
 * @returns {void}
 */
function hide(element) {
  if (element) element.style.display = 'none';
}

/**
 * 在显示和隐藏之间切换简单组件。
 * @param {HTMLElement|null} element 目标元素。
 * @returns {void}
 */
function toggle(element) {
  if (element) {
    element.style.display = element.style.display === 'none' ? '' : 'none';
  }
}
