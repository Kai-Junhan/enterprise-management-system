/**
 * 本地存储工具库
 * 这个文件提供了对浏览器本地存储（localStorage和sessionStorage）的封装
 * 类比：就像浏览器的"记事本"，可以保存数据在页面关闭后依然存在
 * 
 * 两种存储方式的区别：
 * - localStorage：永久存储，关闭浏览器后数据还在，直到手动删除
 * - sessionStorage：临时存储，关闭标签页后数据就消失
 */

'use strict';

/**
 * storage对象 - 封装了localStorage和sessionStorage的操作
 * 使用对象的形式组织，让代码更清晰易用
 */
const storage = {
  /**
   * 保存数据到localStorage（永久存储）
   * 
   * 功能：将任意JavaScript数据保存到浏览器的本地存储中
   * 
   * @param {string} key - 数据的键名（标识符），相当于"文件名"
   * @param {any} value - 要保存的数据，可以是字符串、数字、对象、数组等
   * 
   * 使用示例：
   *   storage.set('username', '张三');
   *   storage.set('userInfo', { name: '张三', age: 20 });
   *   storage.set('shoppingCart', ['苹果', '香蕉']);
   * 
   * 实现原理：
   *   1. localStorage只能存储字符串
   *   2. 使用JSON.stringify()将任意数据转换为JSON字符串
   *   3. 例如：{name: '张三'} → '{"name":"张三"}'
   * 
   * 注意：
   *   - 如果key已存在，会覆盖旧值
   *   - 存储空间有限（通常5-10MB）
   */
  set(key, value) {
    // JSON.stringify将JavaScript值转换为JSON字符串
    // 这样对象、数组等复杂数据也能存储
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 从localStorage读取数据
   * 
   * 功能：根据键名获取之前保存的数据
   * 
   * @param {string} key - 要读取的数据的键名
   * @returns {any} 返回保存的数据，如果key不存在或解析失败返回null
   * 
   * 使用示例：
   *   const username = storage.get('username');  // '张三'
   *   const userInfo = storage.get('userInfo');  // { name: '张三', age: 20 }
   * 
   * 实现原理：
   *   1. 从localStorage获取JSON字符串
   *   2. 使用JSON.parse()将字符串转回JavaScript数据
   *   3. 例如：'{"name":"张三"}' → {name: '张三'}
   * 
   * 边界情况处理：
   *   - 如果key不存在，localStorage.getItem返回null
   *   - 如果JSON解析失败（数据损坏），catch块捕获错误返回null
   *   - 使用try-catch防止程序崩溃
   */
  get(key) {
    try {
      // 尝试获取并解析数据
      // JSON.parse将JSON字符串转回JavaScript对象/值
      return JSON.parse(localStorage.getItem(key));
    } catch {
      // 如果解析出错（如数据被手动修改损坏），返回null
      // 不抛出错误，让程序继续正常运行
      return null;
    }
  },

  /**
   * 删除localStorage中的指定数据
   * 
   * 功能：根据键名删除对应的数据
   * 
   * @param {string} key - 要删除的数据的键名
   * 
   * 使用示例：
   *   storage.remove('username');  // 删除username这个数据
   * 
   * 注意：
   *   - 如果key不存在，不会报错，什么都不做
   *   - 只删除指定的key，其他数据不受影响
   */
  remove(key) {
    localStorage.removeItem(key);
  },

  /**
   * 清空所有localStorage数据
   * 
   * 功能：删除当前网站在localStorage中的所有数据
   * 
   * 使用示例：
   *   storage.clear();  // 清空所有存储的数据
   * 
   * 警告：
   *   - 这会删除所有数据，无法恢复！
   *   - 使用时要非常小心
   *   - 通常用于"退出登录并清除所有缓存"的场景
   */
  clear() {
    localStorage.clear();
  },

  /**
   * sessionStorage子对象 - 临时存储
   * 
   * 功能与localStorage完全相同，但数据只在当前会话（标签页）有效
   * 关闭标签页后数据自动清除
   * 
   * 适用场景：
   *   - 临时表单数据
   *   - 页面间的临时传递数据
   *   - 不需要长期保存的信息
   */
  session: {
    /**
     * 保存数据到sessionStorage
     * 
     * @param {string} key - 数据的键名
     * @param {any} value - 要保存的数据
     * 
     * 使用示例：
     *   storage.session.set('tempData', { step: 1 });
     */
    set(key, value) {
      // 使用sessionStorage而不是localStorage
      sessionStorage.setItem(key, JSON.stringify(value));
    },

    /**
     * 从sessionStorage读取数据
     * 
     * @param {string} key - 要读取的数据的键名
     * @returns {any} 返回保存的数据，如果不存在返回null
     * 
     * 使用示例：
     *   const tempData = storage.session.get('tempData');
     */
    get(key) {
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch {
        return null;
      }
    },

    /**
     * 删除sessionStorage中的指定数据
     * 
     * @param {string} key - 要删除的数据的键名
     */
    remove(key) {
      sessionStorage.removeItem(key);
    },

    /**
     * 清空所有sessionStorage数据
     */
    clear() {
      sessionStorage.clear();
    }
  }
};
