'use strict';

const EnterpriseState = (function () {
  /**
   * 深拷贝模拟业务数据。
   * @param {*} value 需要复制的数据。
   * @returns {*} 与输入结构一致的新对象。
   *
   * 原因：页面渲染和本地存储写入会修改对象，复制后可避免污染 src/data 中的种子数据。
   */
  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  /**
   * 为新增业务记录生成连续编号。
   * @param {string} prefix 编号前缀。
   * @param {Array<{id: string}>} list 当前业务记录列表。
   * @returns {string} 带前缀和三位序号的新编号。
   */
  function nextId(prefix, list) {
    const maxId = list.reduce((max, item) => {
      const match = String(item.id || '').match(/(\d+)$/);
      return Math.max(max, match ? Number(match[1]) : 0);
    }, 0);

    return prefix + String(maxId + 1).padStart(3, '0');
  }

  /**
   * 创建无后端业务状态容器。
   * @param {{storageKey: string, fields: Array<{name: string, type: string}>, getDefaults: Function}} options 状态配置。
   * 原因：所有业务域都要遵守“localStorage 优先，种子数据兜底”的闭环规则。
   */
  function createStore(options) {
    let current = load();

    /**
     * 按字段规则合并本地状态和默认种子数据。
     * @param {Object|null} raw localStorage 读取到的状态。
     * @param {Object} defaults 当前业务域种子数据。
     * @returns {Object} 可安全用于页面渲染的完整状态。
     * 原因：旧版本地数据缺字段时不能覆盖整个业务域，否则用户演示数据会丢失。
     */
    function normalize(raw, defaults) {
      const result = {};

      options.fields.forEach((field) => {
        const fieldName = field.name;

        // 1. 取值
        const storedValue = raw ? raw[fieldName] : undefined;
        const defaultValue = defaults[fieldName];

        let finalValue;

        // 2. 根据类型处理
        if (field.type === 'array') {
          if (Array.isArray(storedValue)) {
            finalValue = storedValue;
          } else {
            finalValue = defaultValue;
          }
        } else {
          finalValue = storedValue || defaultValue;
        }

        // 3. 写入结果
        result[fieldName] = finalValue;
      });

      return result;
    }

    /**
     * 读取当前业务域状态。
     * @returns {Object} localStorage 状态与默认数据合并后的结果。
     */
    function load() {
      // 1. 获取存储对象
      const defaults = options.getDefaults();

      // 2. 判断 storage 是否可用
      const hasStorage =
        typeof storage !== 'undefined' &&
        typeof storage.get === 'function';

      // 3. 获取存储的数据
      let stored = null;
      if (hasStorage) {
        stored = storage.get(options.storageKey);
      }

      // 4. 统一处理数据
      return normalize(stored, defaults);
    }

    /**
     * 重新同步业务状态。
     */
    function sync() {
      current = load();
      return current;
    }

    /**
     * 将当前业务域状态持久化到浏览器本地。
     * @returns {void}
     */
    function persist() {
      if (typeof storage !== 'undefined' && typeof storage.set === 'function') {
        storage.set(options.storageKey, current);
      }
    }

    /**
     * 执行业务状态变更并持久化。
     * @param {Function} callback 接收当前状态并完成新增、编辑或删除的回调。
     * @returns {*} 回调返回值。
     * 原因：多页面共享同一个 localStorage key 时，写入前同步可减少覆盖旧数据的风险。
     */
    function mutate(callback) {
      current = sync();
      const result = callback(current);
      persist();
      return result;
    }

    /**
     * 获取当前业务状态快照。
     * @returns {Object} 深拷贝后的最新业务状态。
     */
    function snapshot() {
      return clone(sync());
    }

    return {
      sync,
      persist,
      mutate,
      snapshot
    };
  }

  return {
    clone,
    nextId,
    createStore
  };
})();

window.EnterpriseState = EnterpriseState;
