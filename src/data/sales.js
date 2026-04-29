'use strict';

/**
 * 销售管理种子数据。
 * 输入：由普通 script 标签在销售页面加载到全局作用域。
 * 输出：salesSystem.store 在 localStorage 为空时复制客户、订单、报表、定价和团队记录。
 *
 * 原因：项目没有后端接口，种子数据负责保证清空浏览器数据后仍能展示完整业务闭环。
 */
const salesData = {
  customers: [
    { id: 'C001', name: '南京大学继续教育学院', contact: '张主任', phone: '13900001001', email: 'zhang@nju.edu.cn', city: '南京', level: 'VIP', totalAmount: 580000 },
    { id: 'C002', name: '苏州工业园区科创中心', contact: '李经理', phone: '13900001002', email: 'li@sip-tech.com', city: '苏州', level: '普通', totalAmount: 230000 },
    { id: 'C003', name: '杭州数字经济研究院', contact: '王院长', phone: '13900001003', email: 'wang@hzde.com', city: '杭州', level: 'VIP', totalAmount: 920000 },
    { id: 'C004', name: '合肥高新技术企业联盟', contact: '赵秘书长', phone: '13900001004', email: 'zhao@hf-hi.com', city: '合肥', level: '重要', totalAmount: 450000 },
    { id: 'C005', name: '上海浦东创业孵化器', contact: '陈经理', phone: '13900001005', email: 'chen@pdp-hub.com', city: '上海', level: '普通', totalAmount: 120000 },
  ],

  orders: [
    { id: 'SO001', customerId: 'C001', customerName: '南京大学继续教育学院', product: '智能ERP系统', quantity: 3, unitPrice: 12000, amount: 36000, status: '已完成', createDate: '2026-03-01', deliveryDate: '2026-03-20' },
    { id: 'SO002', customerId: 'C003', customerName: '杭州数字经济研究院', product: '企业协同平台', quantity: 5, unitPrice: 8500, amount: 42500, status: '配送中', createDate: '2026-03-05', deliveryDate: '2026-03-25' },
    { id: 'SO003', customerId: 'C004', customerName: '合肥高新技术企业联盟', product: '智能ERP系统', quantity: 8, unitPrice: 12000, amount: 96000, status: '待发货', createDate: '2026-03-10', deliveryDate: '2026-04-05' },
    { id: 'SO004', customerId: 'C002', customerName: '苏州工业园区科创中心', product: '数据分析套件', quantity: 2, unitPrice: 18000, amount: 36000, status: '待审核', createDate: '2026-03-15', deliveryDate: '2026-04-10' },
    { id: 'SO005', customerId: 'C005', customerName: '上海浦东创业孵化器', product: '企业协同平台', quantity: 4, unitPrice: 8500, amount: 34000, status: '已完成', createDate: '2026-02-20', deliveryDate: '2026-03-10' },
  ],

  report: {
    monthly: [
      { month: '2025-10', revenue: 680000, orders: 12, newCustomers: 2 },
      { month: '2025-11', revenue: 750000, orders: 15, newCustomers: 3 },
      { month: '2025-12', revenue: 920000, orders: 18, newCustomers: 4 },
      { month: '2026-01', revenue: 560000, orders: 10, newCustomers: 1 },
      { month: '2026-02', revenue: 830000, orders: 16, newCustomers: 3 },
      { month: '2026-03', revenue: 1055400, orders: 22, newCustomers: 5 },
    ]
  },

  pricing: [
    { id: 'PR001', product: '智能ERP系统', standardPrice: 15000, currentPrice: 12000, discount: 0.8, validFrom: '2026-01-01', validTo: '2026-06-30', status: '生效中' },
    { id: 'PR002', product: '企业协同平台', standardPrice: 10000, currentPrice: 8500, discount: 0.85, validFrom: '2026-01-01', validTo: '2026-06-30', status: '生效中' },
    { id: 'PR003', product: '数据分析套件', standardPrice: 18000, currentPrice: 18000, discount: 1.0, validFrom: '2026-03-01', validTo: '2026-12-31', status: '生效中' },
  ],

  team: [
    { id: 'T001', name: '李娜', role: '销售经理', region: '华东', target: 2000000, achieved: 1580000, rate: 0.79 },
    { id: 'T002', name: '吴静', role: '销售专员', region: '长三角', target: 800000, achieved: 455400, rate: 0.57 },
    { id: 'T003', name: '刘洋', role: '市场专员', region: '全国', target: 1000000, achieved: 920000, rate: 0.92 },
  ]
};
