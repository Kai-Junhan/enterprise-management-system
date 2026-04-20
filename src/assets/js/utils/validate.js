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
 * validators对象 - 包含各种常用的验证规则
 * 每个验证器都是一个函数，接收要验证的值，返回null（通过）或错误消息（失败）
 */
const validators = {
  /**
   * 必填项验证
   * 
   * 功能：检查值是否为空（null、undefined、空字符串、纯空格字符串）
   * 
   * @param {any} value - 要验证的值
   * @param {string} message - 可选，验证失败时的错误提示，默认'此项为必填项'
   * @returns {null|string} 验证通过返回null，失败返回错误消息
   * 
   * 使用示例：
   *   validators.required('')           // '此项为必填项'
   *   validators.required('  ')         // '此项为必填项'（纯空格也算空）
   *   validators.required('张三')       // null（通过）
   *   validators.required(null)         // '此项为必填项'
   *   validators.required(0)            // null（0不算空）
   * 
   * 验证逻辑分解：
   *   1. value !== null           - 不是null
   *   2. value !== undefined      - 不是undefined
   *   3. String(value).trim() !== '' - 转成字符串并去掉首尾空格后不是空字符串
   * 
   * 注意：
   *   - 0、false、[]（空数组）这些会被认为是有效值（不为空）
   *   - 只有null、undefined、空字符串、纯空格字符串会被认为为空
   */
  required(value, message = '此项为必填项') {
    // 三元运算符：条件 ? 通过时返回 : 失败时返回
    // 所有条件都满足返回null（无错误），否则返回错误消息
    return value !== null && value !== undefined && String(value).trim() !== ''
      ? null : message;
  },

  /**
   * 邮箱格式验证
   * 
   * 功能：检查字符串是否符合电子邮箱格式
   * 
   * @param {string} value - 要验证的邮箱地址
   * @param {string} message - 可选，验证失败时的错误提示
   * @returns {null|string} 验证通过返回null，失败返回错误消息
   * 
   * 使用示例：
   *   validators.email('test@example.com')   // null（通过）
   *   validators.email('invalid-email')      // '请输入有效的邮箱地址'
   *   validators.email('test@.com')          // '请输入有效的邮箱地址'
   * 
   * 正则表达式解释：
   *   ^           - 字符串开头
   *   [^\s@]+     - @前面：一个或多个非空格、非@的字符
   *   @           - @符号
   *   [^\s@]+     - @后面域名部分：一个或多个非空格、非@的字符
   *   \.          - 点号（需要转义）
   *   [^\s@]+     - 顶级域名：一个或多个非空格、非@的字符
   *   $           - 字符串结尾
   * 
   * 例如：test@example.com
   *   - test 匹配 [^\s@]+
   *   - @ 匹配 @
   *   - example 匹配 [^\s@]+
   *   - . 匹配 \.
   *   - com 匹配 [^\s@]+
   */
  email(value, message = '请输入有效的邮箱地址') {
    // test()方法测试字符串是否匹配正则表达式
    // 匹配返回true，验证通过返回null
    // 不匹配返回false，验证失败返回错误消息
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : message;
  },

  /**
   * 手机号格式验证（中国大陆）
   * 
   * 功能：检查字符串是否符合中国大陆手机号格式
   * 
   * @param {string} value - 要验证的手机号
   * @param {string} message - 可选，验证失败时的错误提示
   * @returns {null|string} 验证通过返回null，失败返回错误消息
   * 
   * 使用示例：
   *   validators.phone('13800138000')   // null（通过）
   *   validators.phone('1380013800')    // '请输入有效的手机号'（11位）
   *   validators.phone('23800138000')   // '请输入有效的手机号'（必须以1开头）
   *   validators.phone('11800138000')   // '请输入有效的手机号'（第二位必须是3-9）
   * 
   * 正则表达式解释：
   *   ^        - 字符串开头
   *   1        - 必须以1开头
   *   [3-9]    - 第二位必须是3到9之间的数字
   *   \d{9}    - 后面跟着9位数字（\d表示数字，{9}表示9个）
   *   $        - 字符串结尾
   *   总共11位数字：1 + [3-9] + 9位 = 11位
   * 
   * 中国大陆手机号规则：
   *   - 总共11位数字
   *   - 以1开头
   *   - 第二位是3-9（运营商号段）
   *   - 后面9位任意数字
   */
  phone(value, message = '请输入有效的手机号') {
    return /^1[3-9]\d{9}$/.test(value) ? null : message;
  },

  /**
   * 字符串长度验证
   * 
   * 功能：检查字符串长度是否在指定范围内
   * 
   * @param {string} value - 要验证的字符串
   * @param {number} min - 最小长度（包含）
   * @param {number} max - 最大长度（包含）
   * @param {string} message - 可选，自定义错误消息
   * @returns {null|string} 验证通过返回null，失败返回错误消息
   * 
   * 使用示例：
   *   validators.length('abc', 2, 10)     // null（通过，长度3在2-10之间）
   *   validators.length('a', 2, 10)       // '长度须在 2 到 10 个字符之间'
   *   validators.length('abcdefghijk', 2, 10)  // '长度须在 2 到 10 个字符之间'（11个字符）
   * 
   * 边界情况：
   *   - 会将value转换为字符串再计算长度
   *   - 数字123的长度是3（转成字符串"123"）
   *   - 中文字符每个算1个长度（与Java的length()一致）
   */
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

  /**
   * 数值范围验证
   * 
   * 功能：检查数值是否在指定范围内
   * 
   * @param {number} value - 要验证的数值
   * @param {number} min - 最小值（包含）
   * @param {number} max - 最大值（包含）
   * @param {string} message - 可选，自定义错误消息
   * @returns {null|string} 验证通过返回null，失败返回错误消息
   * 
   * 使用示例：
   *   validators.range(50, 0, 100)        // null（通过）
   *   validators.range(0, 0, 100)         // null（边界值通过）
   *   validators.range(100, 0, 100)       // null（边界值通过）
   *   validators.range(-1, 0, 100)        // '数值须在 0 到 100 之间'
   *   validators.range(101, 0, 100)       // '数值须在 0 到 100 之间'
   *   validators.range('50', 0, 100)      // null（字符串会自动转数字）
   * 
   * 注意：
   *   - 使用Number()将value转换为数字
   *   - 可以验证字符串形式的数字，如'50'
   *   - 如果转换失败（如'abc'），会变成NaN，验证会失败
   */
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
 * 表单验证函数
 * 
 * 功能：根据验证规则批量验证表单数据
 * 
 * @param {Object} formData - 表单数据对象，如 { username: '张三', age: 20 }
 * @param {Object} rules - 验证规则对象，指定每个字段的验证规则
 * @returns {null|Object} 验证通过返回null，失败返回包含错误信息的对象
 * 
 * 使用示例：
 *   const formData = {
 *     username: '张三',
 *     email: 'test@example.com',
 *     age: 25
 *   };
 *   
 *   const rules = {
 *     username: [
 *       value => validators.required(value),
 *       value => validators.length(value, 2, 20)
 *     ],
 *     email: [
 *       value => validators.required(value),
 *       value => validators.email(value)
 *     ],
 *     age: [
 *       value => validators.range(value, 18, 100)
 *     ]
 *   };
 *   
 *   const errors = validateForm(formData, rules);
 *   // 如果有错误：{ username: '长度须在 2 到 20 个字符之间' }
 *   // 如果无错误：null
 * 
 * 实现原理：
 *   1. 遍历rules中的每个字段（field）
 *   2. 对每个字段，依次执行其验证规则数组
 *   3. 如果某个规则返回错误消息，记录该错误并停止该字段的后续验证
 *   4. 最后检查是否有任何错误，没有则返回null
 * 
 * 设计优点：
 *   - 可以为一个字段设置多个验证规则（如：必填 + 邮箱格式）
 *   - 返回所有字段的错误，不是遇到第一个错误就停止
 *   - 便于在UI上显示所有错误提示
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
