'use strict';

window.productionSystem = window.productionSystem || {};

/**
 * 生产管理本地状态：计划、任务、物料、订单、质检。
 * 输入来自 `productionData` 种子数据和 `xm_production_state` 本地存储。
 * 输出为 productionSystem.store，供 actions 和 pages 读写同一份状态。
 */
productionSystem.store = EnterpriseState.createStore({
  storageKey: 'xm_production_state',
  fields: [
    { name: 'plans', type: 'array' },
    { name: 'tasks', type: 'array' },
    { name: 'materials', type: 'array' },
    { name: 'orders', type: 'array' },
    { name: 'qualityRecords', type: 'array' }
  ],
  /**
   * 提供生产管理子系统的浏览器本地状态默认值。
   * @returns {{plans: Array, tasks: Array, materials: Array, orders: Array, qualityRecords: Array}} 默认业务状态。
   */
  getDefaults() {
    const source = typeof productionData !== 'undefined' ? productionData : {};
    return {
      plans: EnterpriseState.clone(source.plans || []),
      tasks: EnterpriseState.clone(source.tasks || []),
      materials: EnterpriseState.clone(source.materials || []),
      orders: EnterpriseState.clone(source.orders || []),
      qualityRecords: EnterpriseState.clone(source.qualityRecords || [])
    };
  }
});
