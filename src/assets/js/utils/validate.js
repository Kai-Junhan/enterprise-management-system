/**
 * 表单验证工具库
 * 提供常用的表单字段验证函数
 * 验证通过返回 null，验证失败返回错误消息字符串
 */

'use strict';

/**
 * 轻量校验器集合
 * 输出约定：校验通过返回 null，校验失败返回可直接显示的错误文案
 */
const validators = {
  /**
   * 必填项验证
   * @param {*} value - 字段值
   * @param {string} [message='此项为必填项'] - 自定义错误消息
   * @returns {string|null} - 验证失败返回错误消息，通过返回 null
   */
  required(value, message = '此项为必填项') {
    return value !== null && value !== undefined && String(value).trim() !== ''
      ? null : message;
  },

  /**
   * 邮箱格式验证
   * @param {string} value - 邮箱文本
   * @param {string} [message='请输入有效的邮箱地址'] - 自定义错误消息
   * @returns {string|null} - 验证失败返回错误消息，通过返回 null
   */
  email(value, message = '请输入有效的邮箱地址') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : message;
  },

  /**
   * 手机号格式验证（中国大陆）
   * @param {string} value - 手机号文本
   * @param {string} [message='请输入有效的手机号'] - 自定义错误消息
   * @returns {string|null} - 验证失败返回错误消息，通过返回 null
   */
  phone(value, message = '请输入有效的手机号') {
    return /^1[3-9]\d{9}$/.test(value) ? null : message;
  },

  /**
   * 长度范围验证
   * @param {*} value - 字段值
   * @param {number} min - 最小长度
   * @param {number} max - 最大长度
   * @param {string} [message] - 自定义错误消息
   * @returns {string|null} - 验证失败返回错误消息，通过返回 null
   */
  length(value, min, max, message) {
    const len = String(value).length;
    const msg = message || `长度须在 ${min} 到 ${max} 个字符之间`;
    return len >= min && len <= max ? null : msg;
  },

  /**
   * 数值范围验证
   * @param {*} value - 字段值
   * @param {number} min - 最小值
   * @param {number} max - 最大值
   * @param {string} [message] - 自定义错误消息
   * @returns {string|null} - 验证失败返回错误消息，通过返回 null
   */
  range(value, min, max, message) {
    const num = Number(value);
    const msg = message || `数值须在 ${min} 到 ${max} 之间`;
    return num >= min && num <= max ? null : msg;
  }
};

/**
 * 批量验证表单数据
 * @param {Object<string, *>} formData - 表单字段值对象
 * @param {Object<string, Function[]>} rules - 字段验证规则映射
 * @returns {Object<string, string>|null} - 返回字段错误对象，全部通过返回 null
 */
function validateForm(formData, rules) {
  const errors = {};

  for (const field in rules) {
    const fieldRules = rules[field];

    for (const rule of fieldRules) {
      const error = rule(formData[field]);

      if (error) {
        errors[field] = error;
        break;
      }
    }
  }

  return Object.keys(errors).length === 0 ? null : errors;
}
