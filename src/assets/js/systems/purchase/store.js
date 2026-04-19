'use strict';

window.purchaseSystem = window.purchaseSystem || {};

/**
 * 采购管理本地状态：供应商、采购订单、采购分析。
 * 输入来自 `purchaseData` 种子数据和 `xm_purchase_state` 本地存储。
 * 输出为 purchaseSystem.store，供 actions 和 pages 读写同一份状态。
 */
purchaseSystem.store = EnterpriseState.createStore({
  storageKey: 'xm_purchase_state',
  fields: [
    { name: 'suppliers', type: 'array' },
    { name: 'orders', type: 'array' },
    { name: 'analysis', type: 'object' }
  ],
  /**
   * 提供采购管理子系统的浏览器本地状态默认值。
   * @returns {{suppliers: Array, orders: Array, analysis: Object}} 默认业务状态。
   */
  getDefaults() {
    const source = typeof purchaseData !== 'undefined' ? purchaseData : {};
    return {
      suppliers: EnterpriseState.clone(source.suppliers || []),
      orders: EnterpriseState.clone(source.orders || []),
      analysis: EnterpriseState.clone(source.analysis || { monthly: [] })
    };
  }
});
