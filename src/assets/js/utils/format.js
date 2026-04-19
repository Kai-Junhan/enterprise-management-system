'use strict';

/**
 * 格式化企业管理系统中的日期字段。
 * @param {Date|string|number} date 可被 Date 解析的日期值。
 * @param {string} [pattern='YYYY-MM-DD'] 输出模板，支持 YYYY、MM、DD、HH、mm、ss。
 * @returns {string} 格式化后的日期；无效日期返回空字符串。
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
 * 格式化后台统计数字。
 * @param {number|string} num 数值或数字字符串。
 * @param {number} [decimals=0] 小数位数。
 * @returns {string} 使用 zh-CN 千分位规则的数字文本。
 */
function formatNumber(num, decimals = 0) {
  return Number(num).toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * 格式化企业管理系统中的金额字段。
 * @param {number|string} amount 金额数值。
 * @param {string} [currency='¥'] 货币符号。
 * @returns {string} 带货币符号和两位小数的金额文本。
 */
function formatMoney(amount, currency = '¥') {
  return currency + formatNumber(amount, 2);
}

/**
 * 格式化企业管理系统中的百分比字段。
 * @param {number|string} value 小数形式的比例值。
 * @param {number} [decimals=1] 百分比小数位数。
 * @returns {string} 百分比文本。
 */
function formatPercent(value, decimals = 1) {
  return (Number(value) * 100).toFixed(decimals) + '%';
}
