/**
 * DOM工具函数库
 * 这个文件提供了一系列简化DOM操作的辅助函数
 * 类比：就像一套"装修工具箱"，让操作网页元素变得更简单
 */

'use strict';

/**
 * 查询单个 DOM 元素。
 * @param {string} selector CSS 选择器。
 * @param {ParentNode} [context=document] 查询上下文。
 * @returns {Element|null} 匹配到的第一个元素。
 */
function $(selector, context) {
  // (context || document) 表示：如果传了context就用context，否则用document
  // querySelector是浏览器内置方法，返回第一个匹配的元素
  return (context || document).querySelector(selector);
}

/**
 * 查询多个 DOM 元素并转为数组。
 * @param {string} selector CSS 选择器。
 * @param {ParentNode} [context=document] 查询上下文。
 * @returns {Element[]} 匹配元素数组。
 */
function $$(selector, context) {
  // querySelectorAll返回NodeList（类似数组但不是真正的数组）
  // Array.from()将其转换为真正的JavaScript数组
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
  // 第一步：使用document.createElement创建指定类型的元素
  const el = document.createElement(tag);

  // 第二步：如果传了className，就设置元素的className属性
  // 注意：这里用if判断，只有参数存在时才执行
  if (className) el.className = className;

  // 第三步：如果传了innerHTML，就设置元素的内容
  // innerHTML可以包含HTML标签，比如 '<strong>加粗</strong>'
  if (innerHTML) el.innerHTML = innerHTML;

  // 返回创建好的元素，可以接着用其他方法操作它
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
  // 先检查element是否存在，避免对null调用方法导致错误
  // addEventListener是标准的事件绑定方法
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

    // 检查：1. 找到了目标元素  2. 目标元素确实在父元素内
    if (target && parent.contains(target)) {
      // handler.call(target, e) 将handler函数中的this指向target元素
      // 这样在handler里可以用this访问被点击的元素
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
  // classList是元素的类名集合，add方法添加新类名
  // 如果类名已存在，不会重复添加（不会报错）
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
  // 使用三元运算符简化返回逻辑
  // 如果element存在，调用contains检查；否则返回false
  return element ? element.classList.contains(className) : false;
}

/**
 * 切换CSS类名
 * 
 * 功能：如果元素有该类名就移除，没有就添加（开关效果）
 * 
 * @param {Element} element - 目标元素
 * @param {string} className - 要切换的类名
 * 
 * 使用示例：
 *   toggleClass(menu, 'open')  // 菜单的显示/隐藏切换
 * 
 * 常见应用场景：
 *   - 下拉菜单的展开/收起
 *   - 选项卡的选中状态切换
 *   - 模态框的显示/隐藏
 */
function toggleClass(element, className) {
  if (element) element.classList.toggle(className);
}

/**
 * 显示元素
 * 
 * 功能：将元素的display样式设为空（恢复默认显示）
 * 
 * @param {Element} element - 要显示的元素
 * 
 * 原理：
 *   display: '' 表示移除内联的display样式，
 *   元素会按照CSS规则或默认行为显示
 * 
 * 使用示例：
 *   show(loadingSpinner)  // 显示加载动画
 */
function show(element) {
  if (element) element.style.display = '';
}

/**
 * 隐藏元素
 * 
 * 功能：将元素的display样式设为'none'（完全隐藏，不占用空间）
 * 
 * @param {Element} element - 要隐藏的元素
 * 
 * 注意：
 *   - display: 'none' 会让元素完全消失，不占用页面空间
 *   - 与 visibility: 'hidden' 不同，后者隐藏但保留空间
 * 
 * 使用示例：
 *   hide(errorMessage)  // 隐藏错误提示
 */
function hide(element) {
  if (element) element.style.display = 'none';
}

/**
 * 切换元素的显示/隐藏状态
 * 
 * 功能：如果元素当前显示则隐藏，如果隐藏则显示
 * 
 * @param {Element} element - 要切换的元素
 * 
 * 实现逻辑：
 *   1. 检查当前display是否为'none'
 *   2. 如果是，设为空（显示）；否则设为'none'（隐藏）
 * 
 * 使用示例：
 *   toggle(detailsPanel)  // 展开/收起详情面板
 */
function toggle(element) {
  if (element) {
    // 三元运算符：条件 ? 条件为真时的值 : 条件为假时的值
    element.style.display = element.style.display === 'none' ? '' : 'none';
  }
}
