'use strict';

/**
 * 设备管理种子数据。
 * 输入：由普通 script 标签在设备页面加载到全局作用域。
 * 输出：equipmentSystem.store 在 localStorage 为空时复制设备、维护和故障记录。
 *
 * 原因：项目没有后端接口，种子数据负责保证清空浏览器数据后仍能展示完整业务闭环。
 */
const equipmentData = {
  equipment: [
    { id: 'EQ001', name: 'Dell PowerEdge R750 服务器', model: 'R750-2U', location: '机房A', status: '运行中', purchaseDate: '2022-05-10', lastMaintain: '2026-02-15', nextMaintain: '2026-05-15' },
    { id: 'EQ002', name: '华为 CloudEngine 交换机', model: 'CE6860-48S6CQ', location: '机房A', status: '运行中', purchaseDate: '2021-08-20', lastMaintain: '2026-01-10', nextMaintain: '2026-04-10' },
    { id: 'EQ003', name: '联想 ThinkStation 工作站', model: 'P920', location: '开发区', status: '维修中', purchaseDate: '2023-03-15', lastMaintain: '2026-03-01', nextMaintain: '2026-06-01' },
    { id: 'EQ004', name: 'H3C UniStor 存储设备', model: 'CF8860', location: '机房B', status: '停机', purchaseDate: '2020-11-05', lastMaintain: '2025-11-05', nextMaintain: '2026-02-05' },
    { id: 'EQ005', name: 'Fluke 网络测试仪', model: 'DSX-5000', location: '运维室', status: '运行中', purchaseDate: '2024-01-20', lastMaintain: '2026-03-10', nextMaintain: '2026-06-10' },
  ],

  maintenance: [
    { id: 'MT001', equipId: 'EQ001', equipName: 'Dell PowerEdge R750 服务器', type: '定期保养', planDate: '2026-05-15', status: '待执行', technician: '张伟', cost: 2000 },
    { id: 'MT002', equipId: 'EQ002', equipName: '华为 CloudEngine 交换机', type: '固件升级', planDate: '2026-04-10', status: '待执行', technician: '陈浩', cost: 1500 },
    { id: 'MT003', equipId: 'EQ003', equipName: '联想 ThinkStation 工作站', type: '故障维修', planDate: '2026-03-18', status: '进行中', technician: '张伟', cost: 3500 },
    { id: 'MT004', equipId: 'EQ004', equipName: 'H3C UniStor 存储设备', type: '硬盘更换', planDate: '2026-03-20', status: '待执行', technician: '外包运维', cost: 12000 },
  ],

  faults: [
    { id: 'FT001', equipId: 'EQ003', equipName: '联想 ThinkStation 工作站', faultDate: '2026-03-01', description: '显卡驱动异常，渲染性能下降', severity: '严重', status: '维修中', handler: '张伟' },
    { id: 'FT002', equipId: 'EQ004', equipName: 'H3C UniStor 存储设备', faultDate: '2026-02-20', description: 'RAID阵列降级，需更换故障硬盘', severity: '一般', status: '待处理', handler: '外包运维' },
    { id: 'FT003', equipId: 'EQ001', equipName: 'Dell PowerEdge R750 服务器', faultDate: '2026-01-15', description: '内存ECC错误告警，已更换内存条', severity: '一般', status: '已解决', handler: '陈浩' },
  ]
};
