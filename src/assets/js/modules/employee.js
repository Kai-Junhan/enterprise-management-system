'use strict';

const employeeModule = (function(system) {
  /**
   * 初始化员工管理兼容门面。
   * @returns {void}
   *
   * 原因：页面加载器仍调用 window.employeeModule.init，真实实现已下沉到 employeeSystem。
   */
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState(),
    createEmployee: (...args) => system.actions.createEmployee(...args),
    updateEmployee: (...args) => system.actions.updateEmployee(...args),
    deleteEmployee: (...args) => system.actions.deleteEmployee(...args),
    createRecruitment: (...args) => system.actions.createRecruitment(...args),
    deleteRecruitment: (...args) => system.actions.deleteRecruitment(...args)
  };
})(window.employeeSystem);

window.employeeModule = employeeModule;
