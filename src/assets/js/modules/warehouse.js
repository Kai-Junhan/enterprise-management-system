'use strict';

const warehouseModule = (function(system) {
  /**
   * 初始化仓储管理兼容门面。
   * @returns {void}
   *
   * 原因：页面加载器仍调用 window.warehouseModule.init，真实实现已下沉到 warehouseSystem。
   */
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState()
  };
})(window.warehouseSystem);

window.warehouseModule = warehouseModule;
