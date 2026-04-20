/**
 * DOM工具函数库
 * 这个文件提供了一系列简化DOM操作的辅助函数
 * 类比：就像一套"装修工具箱"，让操作网页元素变得更简单
 */

'use strict';

/**
 * 获取单个DOM元素（类似于jQuery的$函数）
 * 
 * 功能：通过CSS选择器查找页面中的第一个匹配元素
 * 
 * @param {string} selector - CSS选择器字符串，比如 '#id'、'.class'、'div'
 * @param {Element} context - 可选，指定在哪个父元素内查找（默认在整个文档document中查找）
 * @returns {Element|null} 返回找到的第一个DOM元素，如果没找到返回null
 * 
 * 使用示例：
 *   $('#header')           // 查找id为header的元素
 *   $('.btn', container)   // 在container元素内查找class为btn的元素
 */
function $(selector, context) {
  // (context || document) 表示：如果传了context就用context，否则用document
  // querySelector是浏览器内置方法，返回第一个匹配的元素
  return (context || document).querySelector(selector);
}

/**
 * 获取多个DOM元素
 * 
 * 功能：通过CSS选择器查找页面中所有匹配的元素，返回数组形式
 * 
 * @param {string} selector - CSS选择器字符串
 * @param {Element} context - 可选，指定在哪个父元素内查找
 * @returns {Array} 返回包含所有匹配元素的数组（空数组表示没找到）
 * 
 * 使用示例：
 *   $$('.item')           // 查找所有class为item的元素
 *   $$('li', navList)     // 在navList内查找所有li元素
 * 
 * 注意：Array.from()将NodeList（节点列表）转换为真正的数组，
 *      这样就可以使用数组的方法如forEach、map等
 */
function $$(selector, context) {
  // querySelectorAll返回NodeList（类似数组但不是真正的数组）
  // Array.from()将其转换为真正的JavaScript数组
  return Array.from((context || document).querySelectorAll(selector));
}

/**
 * 创建DOM元素
 * 
 * 功能：快速创建一个新的HTML元素，并可同时设置class和内部内容
 * 
 * @param {string} tag - HTML标签名，比如 'div'、'span'、'button'
 * @param {string} className - 可选，要添加到元素上的CSS类名
 * @param {string} innerHTML - 可选，元素的内部HTML内容
 * @returns {Element} 返回创建好的新元素
 * 
 * 使用示例：
 *   createElement('div', 'card', '<p>内容</p>')  // 创建一个带card类的div
 *   createElement('button', 'btn-primary')       // 创建一个按钮，无内容
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
 * 绑定事件监听器
 * 
 * 功能：给指定元素添加事件监听（如点击、鼠标移动等）
 * 
 * @param {Element} element - 要绑定事件的DOM元素
 * @param {string} event - 事件类型，比如 'click'、'mouseover'、'input'
 * @param {Function} handler - 事件触发时要执行的函数（回调函数）
 * 
 * 使用示例：
 *   on(button, 'click', function() { alert('被点击了'); })
 * 
 * 边界情况处理：
 *   - 如果element为null或undefined，不会报错，直接返回
 *   - 这样防止因为元素不存在导致程序崩溃
 */
function on(element, event, handler) {
  // 先检查element是否存在，避免对null调用方法导致错误
  // addEventListener是标准的事件绑定方法
  if (element) element.addEventListener(event, handler);
}

/**
 * 事件委托（Event Delegation）
 * 
 * 功能：将子元素的事件处理委托给父元素，提高性能，特别适合动态添加的元素
 * 
 * 原理说明：
 *   想象一个班级，老师（父元素）代替学生（子元素）接收消息。
 *   当有新生（动态添加的元素）加入时，不需要单独通知他们规则，
 *   因为老师统一处理。
 * 
 * @param {Element} parent - 父元素，负责监听事件
 * @param {string} selector - 子元素的选择器（指定哪些子元素触发）
 * @param {string} event - 事件类型
 * @param {Function} handler - 事件处理函数
 * 
 * 使用示例：
 *   delegate(list, 'li', 'click', function(e) {
 *     console.log('点击了列表项：', this.textContent);
 *   });
 * 
 * 优点：
 *   1. 减少事件监听器的数量，提高性能
 *   2. 对动态添加的元素也有效（不需要重新绑定）
 */
function delegate(parent, selector, event, handler) {
  // 在父元素上绑定事件
  on(parent, event, function (e) {
    // e.target是实际被点击的元素
    // closest(selector)从被点击的元素向上查找，找到最近的匹配selector的祖先元素
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
 * 添加CSS类名
 * 
 * @param {Element} element - 目标元素
 * @param {string} className - 要添加的类名
 * 
 * 使用示例：
 *   addClass(box, 'active')  // 给box元素添加active类
 * 
 * 边界情况：如果element为null，不执行任何操作
 */
function addClass(element, className) {
  // classList是元素的类名集合，add方法添加新类名
  // 如果类名已存在，不会重复添加（不会报错）
  if (element) element.classList.add(className);
}

/**
 * 移除CSS类名
 * 
 * @param {Element} element - 目标元素
 * @param {string} className - 要移除的类名
 * 
 * 使用示例：
 *   removeClass(box, 'active')  // 从box元素移除active类
 * 
 * 边界情况：如果类名不存在，不会报错
 */
function removeClass(element, className) {
  if (element) element.classList.remove(className);
}

/**
 * 检查元素是否包含某个CSS类名
 * 
 * @param {Element} element - 目标元素
 * @param {string} className - 要检查的类名
 * @returns {boolean} 如果元素包含该类名返回true，否则返回false
 * 
 * 使用示例：
 *   if (hasClass(box, 'active')) { ... }
 * 
 * 边界情况：如果element为null，返回false（安全处理）
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
