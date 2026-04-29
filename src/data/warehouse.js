'use strict';

/**
 * 仓储管理种子数据。
 * 输入：由普通 script 标签在仓储页面加载到全局作用域。
 * 输出：warehouseSystem.store 在 localStorage 为空时复制库存、入库、出库和货位记录。
 *
 * 原因：项目没有后端接口，种子数据负责保证清空浏览器数据后仍能展示完整业务闭环。
 */
const warehouseData = {
  inventory: [
    { id: 'W001', name: '智能ERP系统授权', category: '成品', spec: '企业版', unit: '套', stock: 32, minStock: 10, location: 'A-01-01', lastUpdate: '2026-03-18' },
    { id: 'W002', name: '企业协同平台授权', category: '成品', spec: '标准版', unit: '套', stock: 8, minStock: 10, location: 'A-01-02', lastUpdate: '2026-03-17' },
    { id: 'W003', name: '服务器机架', category: '设备', spec: 'R42U标准', unit: '台', stock: 3, minStock: 2, location: 'B-02-01', lastUpdate: '2026-03-15' },
    { id: 'W004', name: 'SSD固态硬盘', category: '零部件', spec: '1TB NVMe', unit: '块', stock: 22, minStock: 10, location: 'C-03-02', lastUpdate: '2026-03-10' },
    { id: 'W005', name: 'CloudEngine交换机', category: '零部件', spec: 'CE6860', unit: '台', stock: 5, minStock: 3, location: 'B-02-03', lastUpdate: '2026-03-05' },
    { id: 'W006', name: '数据分析套件授权', category: '成品', spec: '高级版', unit: '套', stock: 15, minStock: 5, location: 'A-02-01', lastUpdate: '2026-03-12' },
  ],

  inbound: [
    { id: 'IN001', item: 'CloudEngine交换机', quantity: 5, unit: '台', supplier: '南京新华三信息技术', date: '2026-03-15', operator: '仓管员小张' },
    { id: 'IN002', item: 'SSD固态硬盘', quantity: 10, unit: '块', supplier: '苏州联想授权经销商', date: '2026-03-10', operator: '仓管员小李' },
    { id: 'IN003', item: '智能ERP系统授权', quantity: 10, unit: '套', supplier: '技术部', date: '2026-03-18', operator: '仓管员小张' },
  ],

  outbound: [
    { id: 'OUT001', item: '智能ERP系统授权', quantity: 3, unit: '套', customer: '南京大学继续教育学院', date: '2026-03-20', operator: '仓管员小李' },
    { id: 'OUT002', item: '数据分析套件授权', quantity: 2, unit: '套', customer: '杭州数字经济研究院', date: '2026-03-10', operator: '仓管员小张' },
    { id: 'OUT003', item: 'SSD固态硬盘', quantity: 5, unit: '块', customer: '技术部', date: '2026-03-16', operator: '仓管员小李' },
  ],

  locations: [
    { id: 'LOC001', code: 'A-01', zone: 'A区', type: '成品区', capacity: 500, used: 45, status: '正常' },
    { id: 'LOC002', code: 'A-02', zone: 'A区', type: '成品区', capacity: 300, used: 15, status: '正常' },
    { id: 'LOC003', code: 'B-02', zone: 'B区', type: '设备区', capacity: 50, used: 8, status: '正常' },
    { id: 'LOC004', code: 'C-03', zone: 'C区', type: '配件区', capacity: 200, used: 27, status: '正常' },
  ]
};
