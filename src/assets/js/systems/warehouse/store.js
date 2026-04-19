'use strict';

window.warehouseSystem = window.warehouseSystem || {};

/**
 * 仓储管理本地状态：库存、入库、出库、货位。
 * 输入来自 `warehouseData` 种子数据和 `xm_warehouse_state` 本地存储。
 * 输出为 warehouseSystem.store，供 pages 读取同一份状态。
 */
warehouseSystem.store = EnterpriseState.createStore({
  storageKey: 'xm_warehouse_state',
  fields: [
    { name: 'inventory', type: 'array' },
    { name: 'inbound', type: 'array' },
    { name: 'outbound', type: 'array' },
    { name: 'locations', type: 'array' }
  ],
  /**
   * 提供仓储管理子系统的浏览器本地状态默认值。
   * @returns {{inventory: Array, inbound: Array, outbound: Array, locations: Array}} 默认业务状态。
   */
  getDefaults() {
    const source = typeof warehouseData !== 'undefined' ? warehouseData : {};
    return {
      inventory: EnterpriseState.clone(source.inventory || []),
      inbound: EnterpriseState.clone(source.inbound || []),
      outbound: EnterpriseState.clone(source.outbound || []),
      locations: EnterpriseState.clone(source.locations || [])
    };
  }
});
