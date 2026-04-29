'use strict';

/**
 * 生产管理种子数据。
 * 输入：由普通 script 标签在生产页面加载到全局作用域。
 * 输出：productionSystem.store 在 localStorage 为空时复制计划、任务、物料、订单和质检记录。
 *
 * 原因：项目没有后端接口，种子数据负责保证清空浏览器数据后仍能展示完整业务闭环。
 */
const productionData = {
  plans: [
    { id: 'PP001', name: '2026年Q1平台迭代计划', startDate: '2026-01-01', endDate: '2026-03-31', status: '进行中', products: ['智能ERP系统', '企业协同平台'], progress: 75 },
    { id: 'PP002', name: '2026年Q2新版本开发计划', startDate: '2026-04-01', endDate: '2026-06-30', status: '待启动', products: ['数据分析套件', '智能ERP系统'], progress: 0 },
    { id: 'PP003', name: '南京大学定制交付计划', startDate: '2026-03-10', endDate: '2026-03-25', status: '已完成', products: ['智能ERP系统'], progress: 100 },
  ],

  tasks: [
    { id: 'PT001', planId: 'PP001', productName: '智能ERP系统', quantity: 1, progress: 80, assignee: '张伟', deadline: '2026-03-20' },
    { id: 'PT002', planId: 'PP001', productName: '企业协同平台', quantity: 1, progress: 60, assignee: '陈浩', deadline: '2026-03-25' },
    { id: 'PT003', planId: 'PP001', productName: '数据分析套件', quantity: 1, progress: 100, assignee: '郑凯', deadline: '2026-03-10' },
    { id: 'PT004', planId: 'PP002', productName: '智能ERP系统', quantity: 1, progress: 0, assignee: '周强', deadline: '2026-05-15' },
  ],

  materials: [
    { id: 'PM001', name: '服务器机架', spec: 'R42U 标准', unit: '台', required: 5, stock: 3, shortage: 2 },
    { id: 'PM002', name: 'SSD固态硬盘', spec: '1TB NVMe', unit: '块', required: 20, stock: 22, shortage: 0 },
    { id: 'PM003', name: 'CAT6网络线缆', spec: '305米/箱', unit: '箱', required: 15, stock: 8, shortage: 7 },
    { id: 'PM004', name: '软件授权许可', spec: '企业版/年', unit: '个', required: 50, stock: 35, shortage: 15 },
    { id: 'PM005', name: 'UPS不间断电源', spec: '3kVA 在线式', unit: '台', required: 6, stock: 2, shortage: 4 },
  ],

  orders: [
    { id: 'PO001', customer: '南京大学继续教育学院', product: '智能ERP系统', quantity: 3, status: '生产中', createDate: '2026-03-01', deliveryDate: '2026-03-25' },
    { id: 'PO002', customer: '苏州工业园区科创中心', product: '企业协同平台', quantity: 5, status: '待生产', createDate: '2026-03-05', deliveryDate: '2026-04-10' },
    { id: 'PO003', customer: '杭州数字经济研究院', product: '数据分析套件', quantity: 2, status: '已完成', createDate: '2026-02-20', deliveryDate: '2026-03-10' },
    { id: 'PO004', customer: '合肥高新技术企业联盟', product: '智能ERP系统', quantity: 8, status: '待审核', createDate: '2026-03-15', deliveryDate: '2026-04-20' },
  ],

  qualityRecords: [
    { id: 'PQ001', orderId: 'PO001', inspector: '周强', date: '2026-03-18', result: '合格', defects: 0 },
    { id: 'PQ002', orderId: 'PO003', inspector: '周强', date: '2026-03-10', result: '合格', defects: 1 },
    { id: 'PQ003', orderId: 'PO002', inspector: '周强', date: '2026-03-12', result: '不合格', defects: 5 },
  ]
};
