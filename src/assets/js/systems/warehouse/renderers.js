'use strict';

window.warehouseSystem = window.warehouseSystem || {};

warehouseSystem.renderers = (function(view) {
  /**
   * 渲染仓储管理页面顶部统计卡片。
   * @param {Array<{icon: string, value: string|number, label: string}>} items 指标配置。
   * @returns {void}
   */
  function stats(items) {
    view.setHtml('stats-grid', view.renderStats(items));
  }

  return {
    stats
  };
})(EnterpriseView);
