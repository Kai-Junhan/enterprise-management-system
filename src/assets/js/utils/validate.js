'use strict';

/**
 * 登录、注册和业务表单共用的轻量校验器集合。
 * 输出约定：校验通过返回 null，校验失败返回可直接显示给用户的错误文案。
 *
 * 原因：纯前端原型没有后端校验接口，页面需要在提交前给出一致的字段级反馈。
 */
const validators = {
  /** @param {*} value 字段值。@param {string} [message] 错误文案。@returns {string|null} */
  required(value, message = '此项为必填项') {
    return value !== null && value !== undefined && String(value).trim() !== ''
      ? null : message;
  },
  /** @param {string} value 邮箱文本。@param {string} [message] 错误文案。@returns {string|null} */
  email(value, message = '请输入有效的邮箱地址') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : message;
  },
  /** @param {string} value 手机号文本。@param {string} [message] 错误文案。@returns {string|null} */
  phone(value, message = '请输入有效的手机号') {
    return /^1[3-9]\d{9}$/.test(value) ? null : message;
  },
  /** @param {*} value 字段值。@param {number} min 最小长度。@param {number} max 最大长度。@param {string} [message] 错误文案。@returns {string|null} */
  length(value, min, max, message) {
    const len = String(value).length;
    const msg = message || `长度须在 ${min} 到 ${max} 个字符之间`;
    return len >= min && len <= max ? null : msg;
  },
  /** @param {*} value 字段值。@param {number} min 最小值。@param {number} max 最大值。@param {string} [message] 错误文案。@returns {string|null} */
  range(value, min, max, message) {
    const num = Number(value);
    const msg = message || `数值须在 ${min} 到 ${max} 之间`;
    return num >= min && num <= max ? null : msg;
  }
};

/**
 * 按字段规则批量校验表单。
 * @param {Object<string, *>} formData 表单字段值。
 * @param {Object<string, Function[]>} rules 字段到校验函数列表的映射。
 * @returns {Object<string, string>|null} 字段级错误对象；全部通过返回 null。
 */
function validateForm(formData, rules) {
  const errors = {};
  for (const field in rules) {
    for (const rule of rules[field]) {
      const error = rule(formData[field]);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }
  return Object.keys(errors).length === 0 ? null : errors;
}
