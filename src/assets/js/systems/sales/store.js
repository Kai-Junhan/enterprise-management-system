'use strict';

window.salesSystem = window.salesSystem || {};

/**
 * 销售管理本地状态：客户、订单、报表、定价、团队。
 * 输入来自 `salesData` 种子数据和 `xm_sales_state` 本地存储。
 * 输出为 salesSystem.store，供 actions 和 pages 读写同一份状态。
 */
salesSystem.store = EnterpriseState.createStore({
  storageKey: 'xm_sales_state',
  fields: [
    { name: 'customers', type: 'array' },
    { name: 'orders', type: 'array' },
    { name: 'report', type: 'object' },
    { name: 'pricing', type: 'array' },
    { name: 'team', type: 'array' }
  ],
  /**
   * 提供销售管理子系统的浏览器本地状态默认值。
   * @returns {{customers: Array, orders: Array, report: Object, pricing: Array, team: Array}} 默认业务状态。
   */
  getDefaults() {
    const source = typeof salesData !== 'undefined' ? salesData : {};
    return {
      customers: EnterpriseState.clone(source.customers || []),
      orders: EnterpriseState.clone(source.orders || []),
      report: EnterpriseState.clone(source.report || { monthly: [] }),
      pricing: EnterpriseState.clone(source.pricing || []),
      team: EnterpriseState.clone(source.team || [])
    };
  }
});
