'use strict';

const productionModule = (function(system) {
  /**
   * 初始化生产管理兼容门面。
   * @returns {void}
   *
   * 原因：页面加载器仍调用 window.productionModule.init，真实实现已下沉到 productionSystem。
   */
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState(),
    createPlan: (...args) => system.actions.createPlan(...args),
    deletePlan: (...args) => system.actions.deletePlan(...args)
  };
})(window.productionSystem);

window.productionModule = productionModule;
