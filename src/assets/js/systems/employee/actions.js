'use strict';

window.employeeSystem = window.employeeSystem || {};

employeeSystem.actions = (function(store) {
  /**
   * 新增员工档案。
   * @param {Object} payload 员工表单数据。
   * @returns {Object} 写入本地状态的新员工记录。
   */
  function createEmployee(payload) {
    return store.mutate((state) => {
      const employee = {
        id: EnterpriseState.nextId('E', state.employees),
        name: payload.name,
        gender: payload.gender || '男',
        dept: payload.dept || '未分配',
        position: payload.position || '待定',
        phone: payload.phone || '',
        email: payload.email || '',
        entryDate: payload.entryDate || '',
        salary: Number(payload.salary) || 0,
        status: payload.status || '试用期'
      };

      state.employees.push(employee);
      return employee;
    });
  }

  /**
   * 更新员工档案基础字段。
   * @param {string} id 员工编号。
   * @param {Object} payload 员工表单数据。
   * @returns {Object|null} 更新后的员工记录；未找到员工时返回 null。
   */
  function updateEmployee(id, payload) {
    return store.mutate((state) => {
      const employee = state.employees.find((item) => item.id === id);
      if (!employee) return null;

      Object.assign(employee, {
        name: payload.name,
        gender: payload.gender,
        dept: payload.dept,
        position: payload.position,
        phone: payload.phone,
        email: payload.email,
        entryDate: payload.entryDate,
        salary: Number(payload.salary) || 0
      });
      return employee;
    });
  }

  /**
   * 删除员工档案。
   * @param {string} id 员工编号。
   * @returns {void}
   */
  function deleteEmployee(id) {
    store.mutate((state) => {
      state.employees = state.employees.filter((item) => item.id !== id);
    });
  }

  /**
   * 新增招聘计划。
   * @param {Object} payload 招聘计划表单数据。
   * @returns {Object} 写入本地状态的新招聘计划。
   */
  function createRecruitment(payload) {
    return store.mutate((state) => {
      const item = {
        id: EnterpriseState.nextId('R', state.recruitment),
        position: payload.position,
        dept: payload.dept || '人事部',
        headcount: Number(payload.headcount) || 1,
        status: payload.status || '待发布',
        publishDate: payload.publishDate || '2026-04-19',
        deadline: payload.deadline || '2026-05-19',
        applicants: Number(payload.applicants) || 0
      };

      state.recruitment.push(item);
      return item;
    });
  }

  /**
   * 删除招聘计划。
   * @param {string} id 招聘计划编号。
   * @returns {void}
   */
  function deleteRecruitment(id) {
    store.mutate((state) => {
      state.recruitment = state.recruitment.filter((item) => item.id !== id);
    });
  }

  return {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    createRecruitment,
    deleteRecruitment
  };
})(employeeSystem.store);
