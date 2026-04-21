/**
 * 格式化工具库
 * 提供日期、数字、金额、百分比等数据的格式化功能
 */

'use strict';

/**
 * 日期格式化
 * @param {Date|string|number} date - 日期对象、字符串或时间戳
 * @param {string} [pattern='YYYY-MM-DD'] - 格式模板
 *   - YYYY: 4位年份
 *   - MM: 2位月份
 *   - DD: 2位日期
 *   - HH: 2位小时（24小时制）
 *   - mm: 2位分钟
 *   - ss: 2位秒数
 * @returns {string} - 格式化后的日期字符串，无效日期返回空字符串
 */
function formatDate(date, pattern = 'YYYY-MM-DD') {
  const d = date instanceof Date ? date : new Date(date);

  if (isNaN(d)) return '';

  const map = {
    YYYY: d.getFullYear(),
    MM: String(d.getMonth() + 1).padStart(2, '0'),
    DD: String(d.getDate()).padStart(2, '0'),
    HH: String(d.getHours()).padStart(2, '0'),
    mm: String(d.getMinutes()).padStart(2, '0'),
    ss: String(d.getSeconds()).padStart(2, '0'),
  };

  return pattern.replace(/YYYY|MM|DD|HH|mm|ss/g, m => map[m]);
}

/**
 * 数字格式化（千分位分隔）
 * @param {number|string} num - 要格式化的数字
 * @param {number} [decimals=0] - 小数位数
 * @returns {string} - 格式化后的数字字符串
 */
function formatNumber(num, decimals = 0) {
  return Number(num).toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * 金额格式化（带货币符号）
 * @param {number|string} amount - 金额数值
 * @param {string} [currency='¥'] - 货币符号
 * @returns {string} - 格式化后的金额字符串
 */
function formatMoney(amount, currency = '¥') {
  return currency + formatNumber(amount, 2);
}

/**
 * 百分比格式化
 * @param {number|string} value - 数值（如 0.25 表示 25%）
 * @param {number} [decimals=1] - 小数位数
 * @returns {string} - 格式化后的百分比字符串
 */
function formatPercent(value, decimals = 1) {
  return (Number(value) * 100).toFixed(decimals) + '%';
}
