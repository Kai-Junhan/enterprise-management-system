'use strict';

window.employeeSystem = window.employeeSystem || {};

/**
 * 员工管理本地状态：员工档案、考勤、招聘、绩效。
 * 输入来自 `employeeData` 种子数据和 `xm_employee_state` 本地存储。
 * 输出为 employeeSystem.store，供 actions 和 pages 读写同一份状态。
 */
employeeSystem.store = EnterpriseState.createStore({
  storageKey: 'xm_employee_state',
  fields: [
    { name: 'employees', type: 'array' },
    { name: 'attendance', type: 'array' },
    { name: 'recruitment', type: 'array' },
    { name: 'performance', type: 'array' }
  ],
  /**
   * 提供员工管理子系统的浏览器本地状态默认值。
   * @returns {{employees: Array, attendance: Array, recruitment: Array, performance: Array}} 默认业务状态。
   */
  getDefaults() {
    const source = typeof employeeData !== 'undefined' ? employeeData : {};
    return {
      employees: EnterpriseState.clone(source.employees || []),
      attendance: EnterpriseState.clone(source.attendance || []),
      recruitment: EnterpriseState.clone(source.recruitment || []),
      performance: EnterpriseState.clone(source.performance || [])
    };
  }
});
