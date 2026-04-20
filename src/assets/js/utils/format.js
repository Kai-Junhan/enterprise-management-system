/**
 * 格式化工具函数库
 * 这个文件提供了数据格式化的辅助函数，用于将原始数据转换为易读的显示格式
 * 类比：就像"翻译官"，把计算机的数据格式转换成人类习惯的阅读格式
 */

'use strict';

/**
 * 日期格式化函数
 * 
 * 功能：将Date对象或日期字符串转换成指定格式的字符串
 * 
 * @param {Date|string|number} date - 要格式化的日期
 *   - Date对象：new Date()
 *   - 字符串：'2024-01-15' 或 '2024/01/15'
 *   - 数字：时间戳（毫秒数）
 * @param {string} pattern - 格式模板，默认'YYYY-MM-DD'
 *   - YYYY：4位年份，如2024
 *   - MM：2位月份，如01、12
 *   - DD：2位日期，如05、31
 *   - HH：2位小时（24小时制）
 *   - mm：2位分钟
 *   - ss：2位秒数
 * @returns {string} 格式化后的日期字符串，如果日期无效返回空字符串
 * 
 * 使用示例：
 *   formatDate(new Date())                    // "2024-01-15"
 *   formatDate('2024-01-15', 'YYYY年MM月DD日') // "2024年01月15日"
 *   formatDate(new Date(), 'YYYY/MM/DD HH:mm') // "2024/01/15 14:30"
 * 
 * 边界情况处理：
 *   - 如果传入无效日期（如'invalid'），返回空字符串''
 *   - 使用isNaN()检测日期是否有效
 */
function formatDate(date, pattern = 'YYYY-MM-DD') {
  // 第一步：确保date是一个Date对象
  // instanceof检查date是否已经是Date类型
  // 如果不是，用new Date()将其转换
  const d = date instanceof Date ? date : new Date(date);

  // 第二步：检查日期是否有效
  // isNaN(d)会检查日期对象是否代表一个有效的时间
  // 如果日期无效（如new Date('invalid')），返回空字符串
  if (isNaN(d)) return '';

  // 第三步：创建格式映射表
  // 这是一个对象，键是格式占位符，值是对应的日期数据
  const map = {
    // getFullYear()返回4位年份，如2024
    YYYY: d.getFullYear(),

    // getMonth()返回0-11（0表示1月），所以加1
    // String(...).padStart(2, '0')确保是2位数，不足前面补0
    // 例如：1变成'01'，12保持'12'
    MM: String(d.getMonth() + 1).padStart(2, '0'),

    // getDate()返回1-31的日期
    DD: String(d.getDate()).padStart(2, '0'),

    // getHours()返回0-23的小时
    HH: String(d.getHours()).padStart(2, '0'),

    // getMinutes()返回0-59的分钟
    mm: String(d.getMinutes()).padStart(2, '0'),

    // getSeconds()返回0-59的秒数
    ss: String(d.getSeconds()).padStart(2, '0'),
  };

  // 第四步：替换格式模板中的占位符
  // /YYYY|MM|DD|HH|mm|ss/g 是一个正则表达式
  // - YYYY|MM|DD... 表示匹配其中任意一个
  // - g标志表示全局匹配（替换所有，不只是第一个）
  // replace的第二个参数是一个函数，m代表匹配到的占位符，返回map中对应的值
  return pattern.replace(/YYYY|MM|DD|HH|mm|ss/g, m => map[m]);
}

/**
 * 数字格式化函数
 * 
 * 功能：将数字格式化为带千分位分隔符的字符串，可指定小数位数
 * 
 * @param {number|string} num - 要格式化的数字
 * @param {number} decimals - 小数位数，默认0（整数）
 * @returns {string} 格式化后的数字字符串
 * 
 * 使用示例：
 *   formatNumber(1234567)           // "1,234,567"
 *   formatNumber(1234567.89, 2)     // "1,234,567.89"
 *   formatNumber(1234.5, 2)         // "1,234.50"（不足位数补0）
 * 
 * 原理说明：
 *   toLocaleString('zh-CN')使用中文地区的数字格式
 *   中文地区使用逗号作为千分位分隔符
 *   例如：1000000 → "1,000,000"
 * 
 * 边界情况：
 *   - 如果传入字符串，会先转换为数字
 *   - 如果转换失败，可能返回"NaN"
 */
function formatNumber(num, decimals = 0) {
  // Number(num)确保num是数字类型
  // toLocaleString根据地区格式化数字
  // 'zh-CN'表示中文（中国）格式
  // minimumFractionDigits和maximumFractionDigits控制小数位数
  return Number(num).toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,  // 最少小数位数
    maximumFractionDigits: decimals,  // 最多小数位数
  });
}

/**
 * 金额格式化函数
 * 
 * 功能：将数字格式化为货币金额格式（带货币符号和2位小数）
 * 
 * @param {number|string} amount - 金额数值
 * @param {string} currency - 货币符号，默认'¥'（人民币）
 * @returns {string} 格式化后的金额字符串
 * 
 * 使用示例：
 *   formatMoney(1234.5)         // "¥1,234.50"
 *   formatMoney(1234.5, '$')    // "$1,234.50"
 *   formatMoney(1000000)        // "¥1,000,000.00"
 * 
 * 实现原理：
 *   调用formatNumber(amount, 2)格式化为带2位小数的数字
 *   然后在前面加上货币符号
 * 
 * 注意：
 *   金额通常保留2位小数（分）
 *   如果传入整数，会自动补.00
 */
function formatMoney(amount, currency = '¥') {
  // 复用formatNumber函数，固定2位小数
  // 然后拼接货币符号
  return currency + formatNumber(amount, 2);
}

/**
 * 百分比格式化函数
 * 
 * 功能：将小数转换为百分比字符串
 * 
 * @param {number|string} value - 要转换的数值（通常是小数，如0.25表示25%）
 * @param {number} decimals - 小数位数，默认1位
 * @returns {string} 格式化后的百分比字符串
 * 
 * 使用示例：
 *   formatPercent(0.25)         // "25.0%"
 *   formatPercent(0.25, 0)      // "25%"
 *   formatPercent(0.1234, 2)    // "12.34%"
 *   formatPercent(1)            // "100.0%"
 * 
 * 计算原理：
 *   百分比 = 数值 × 100
 *   例如：0.25 × 100 = 25%
 * 
 * 边界情况：
 *   - 如果传入大于1的数（如2），会返回"200%"
 *   - 如果传入负数（如-0.5），会返回"-50%"
 */
function formatPercent(value, decimals = 1) {
  // Number(value)将输入转换为数字
  // * 100 将小数转换为百分数（如0.25 → 25）
  // toFixed(decimals)保留指定小数位数，返回字符串
  // + '%' 拼接百分号
  return (Number(value) * 100).toFixed(decimals) + '%';
}
