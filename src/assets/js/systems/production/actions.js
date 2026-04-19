'use strict';

window.productionSystem = window.productionSystem || {};

productionSystem.actions = (function(store) {
  /**
   * 新增生产计划。
   * @param {Object} payload 生产计划表单数据。
   * @returns {Object} 写入本地状态的新生产计划。
   */
  function createPlan(payload) {
    return store.mutate((state) => {
      const item = {
        id: EnterpriseState.nextId('PP', state.plans),
        name: payload.name,
        startDate: payload.startDate || '2026-04-19',
        endDate: payload.endDate || '2026-05-19',
        status: payload.status || '待启动',
        products: payload.products || ['新品']
      };

      state.plans.push(item);
      return item;
    });
  }

  /**
   * 删除生产计划。
   * @param {string} id 生产计划编号。
   * @returns {void}
   */
  function deletePlan(id) {
    store.mutate((state) => {
      state.plans = state.plans.filter((item) => item.id !== id);
    });
  }

  return {
    createPlan,
    deletePlan
  };
})(productionSystem.store);
