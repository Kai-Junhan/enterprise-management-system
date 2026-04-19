'use strict';

const purchaseModule = (function(system) {
  /**
   * 初始化采购管理兼容门面。
   * @returns {void}
   *
   * 原因：页面加载器仍调用 window.purchaseModule.init，真实实现已下沉到 purchaseSystem。
   */
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState(),
    createSupplier: (...args) => system.actions.createSupplier(...args),
    deleteSupplier: (...args) => system.actions.deleteSupplier(...args),
    createOrder: (...args) => system.actions.createOrder(...args)
  };
})(window.purchaseSystem);

window.purchaseModule = purchaseModule;
