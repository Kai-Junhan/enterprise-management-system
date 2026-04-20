/**
 * 表单验证工具库
 * 这个文件提供了常用的表单验证函数
 * 类比：就像"安检员"，检查用户输入的数据是否符合要求
 * 
 * 验证逻辑说明：
 * - 所有验证函数遵循"错误优先"原则
 * - 验证通过返回null（表示没有错误）
 * - 验证失败返回错误消息字符串
 * - 这样设计便于在表单验证时收集所有错误
 */

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
    // 三元运算符：条件 ? 通过时返回 : 失败时返回
    // 所有条件都满足返回null（无错误），否则返回错误消息
    return value !== null && value !== undefined && String(value).trim() !== ''
      ? null : message;
  },
  /** @param {string} value 邮箱文本。@param {string} [message] 错误文案。@returns {string|null} */
  email(value, message = '请输入有效的邮箱地址') {
    // test()方法测试字符串是否匹配正则表达式
    // 匹配返回true，验证通过返回null
    // 不匹配返回false，验证失败返回错误消息
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : message;
  },
  /** @param {string} value 手机号文本。@param {string} [message] 错误文案。@returns {string|null} */
  phone(value, message = '请输入有效的手机号') {
    return /^1[3-9]\d{9}$/.test(value) ? null : message;
  },
  /** @param {*} value 字段值。@param {number} min 最小长度。@param {number} max 最大长度。@param {string} [message] 错误文案。@returns {string|null} */
  length(value, min, max, message) {
    // 将值转换为字符串并获取长度
    const len = String(value).length;
    
    // 如果没有提供自定义消息，使用默认模板
    // || 是逻辑或运算符：如果message为假值（undefined、空字符串等），使用后面的默认值
    const msg = message || `长度须在 ${min} 到 ${max} 个字符之间`;
    
    // 检查长度是否在范围内（包含边界值）
    // >= 大于等于，<= 小于等于
    return len >= min && len <= max ? null : msg;
  },
  /** @param {*} value 字段值。@param {number} min 最小值。@param {number} max 最大值。@param {string} [message] 错误文案。@returns {string|null} */
  range(value, min, max, message) {
    // 将值转换为数字
    const num = Number(value);
    
    // 生成错误消息（使用默认值或自定义消息）
    const msg = message || `数值须在 ${min} 到 ${max} 之间`;
    
    // 检查数值是否在范围内
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
  // 创建一个空对象来存储错误信息
  const errors = {};
  
  // 遍历规则对象中的每个字段
  // for...in循环遍历对象的所有可枚举属性
  for (const field in rules) {
    // 获取该字段的所有验证规则（是一个数组）
    const fieldRules = rules[field];
    
    // 遍历该字段的所有验证规则
    for (const rule of fieldRules) {
      // 执行验证规则，传入表单中对应字段的值
      // rule是一个函数，如：value => validators.required(value)
      const error = rule(formData[field]);
      
      // 如果返回了错误消息（不是null）
      if (error) {
        // 将错误信息记录到errors对象中
        // 键是字段名，值是错误消息
        errors[field] = error;
        
        // break跳出当前字段的验证循环
        // 一个字段只记录第一个错误，不继续检查其他规则
        break;
      }
    }
  }
  
  // 检查errors对象是否有任何属性
  // Object.keys()返回对象所有键的数组
  // .length === 0 表示没有错误
  // 如果没有错误返回null，否则返回errors对象
  return Object.keys(errors).length === 0 ? null : errors;
}
