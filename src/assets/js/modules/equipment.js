'use strict';

const equipmentModule = (function(system) {
  /**
   * 初始化设备管理兼容门面。
   * @returns {void}
   *
   * 原因：页面加载器仍调用 window.equipmentModule.init，真实实现已下沉到 equipmentSystem。
   */
  function init() {
    if (system && typeof system.init === 'function') {
      system.init();
    }
  }

  return {
    init,
    getState: () => system.getState(),
    createEquipment: (...args) => system.actions.createEquipment(...args),
    deleteEquipment: (...args) => system.actions.deleteEquipment(...args),
    createMaintenance: (...args) => system.actions.createMaintenance(...args),
    deleteMaintenance: (...args) => system.actions.deleteMaintenance(...args),
    createFault: (...args) => system.actions.createFault(...args),
    deleteFault: (...args) => system.actions.deleteFault(...args)
  };
})(window.equipmentSystem);

window.equipmentModule = equipmentModule;
