'use strict';

const salesModule = (function(system) {
  /**
   * 初始化销售管理兼容门面。
   * @returns {void}
   *
   * 原因：页面加载器仍调用 window.salesModule.init，真实实现已下沉到 salesSystem。
   */
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState(),
    createCustomer: (...args) => system.actions.createCustomer(...args),
    deleteCustomer: (...args) => system.actions.deleteCustomer(...args),
    createOrder: (...args) => system.actions.createOrder(...args),
    createPricing: (...args) => system.actions.createPricing(...args)
  };
})(window.salesSystem);

window.salesModule = salesModule;
