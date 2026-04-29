'use strict';

/**
 * 采购管理种子数据。
 * 输入：由普通 script 标签在采购页面加载到全局作用域。
 * 输出：purchaseSystem.store 在 localStorage 为空时复制供应商、订单和分析记录。
 *
 * 原因：项目没有后端接口，种子数据负责保证清空浏览器数据后仍能展示完整业务闭环。
 */
const purchaseData = {
  suppliers: [
    { id: 'S001', name: '南京新华三信息技术', contact: '刘总', phone: '13700001001', category: '网络设备', rating: 5, status: '合作中' },
    { id: 'S002', name: '苏州联想授权经销商', contact: '陈经理', phone: '13700001002', category: '服务器/工作站', rating: 4, status: '合作中' },
    { id: 'S003', name: '杭州海康威视', contact: '黄总', phone: '13700001003', category: '安防监控', rating: 3, status: '合作中' },
    { id: 'S004', name: '深圳华为技术', contact: '周总', phone: '13700001004', category: '服务器/网络', rating: 5, status: '合作中' },
    { id: 'S005', name: '上海甲骨文软件', contact: '吴经理', phone: '13700001005', category: '软件授权', rating: 4, status: '合作中' },
  ],

  orders: [
    { id: 'PUR001', supplierId: 'S001', supplierName: '南京新华三信息技术', item: 'CloudEngine交换机', quantity: 5, unit: '台', unitPrice: 18000, amount: 90000, status: '已到货', createDate: '2026-03-01', deliveryDate: '2026-03-15' },
    { id: 'PUR002', supplierId: 'S002', supplierName: '苏州联想授权经销商', item: 'ThinkStation P920', quantity: 3, unit: '台', unitPrice: 22000, amount: 66000, status: '运输中', createDate: '2026-03-05', deliveryDate: '2026-03-22' },
    { id: 'PUR003', supplierId: 'S004', supplierName: '深圳华为技术', item: 'UPS不间断电源', quantity: 4, unit: '台', unitPrice: 8500, amount: 34000, status: '待发货', createDate: '2026-03-10', deliveryDate: '2026-03-28' },
    { id: 'PUR004', supplierId: 'S005', supplierName: '上海甲骨文软件', item: '数据库企业版授权', quantity: 10, unit: '个', unitPrice: 5600, amount: 56000, status: '待审核', createDate: '2026-03-15', deliveryDate: '2026-04-05' },
  ],

  analysis: {
    monthly: [
      { month: '2025-10', amount: 320000, orders: 8 },
      { month: '2025-11', amount: 280000, orders: 7 },
      { month: '2025-12', amount: 450000, orders: 12 },
      { month: '2026-01', amount: 190000, orders: 5 },
      { month: '2026-02', amount: 360000, orders: 9 },
      { month: '2026-03', amount: 246000, orders: 6 },
    ]
  }
};
