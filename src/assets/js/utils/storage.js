/**
 * 本地存储工具库
 * 封装浏览器 localStorage 和 sessionStorage，提供统一的读写 API
 * 支持降级到 Cookie 存储（当 Storage 不可用时）
 */

'use strict';

const storageMemory = {
  local: {},
  session: {}
};

/**
 * 序列化数据为 JSON 字符串
 * @param {*} value - 要序列化的值
 * @returns {string} - JSON 字符串
 */
function serialize(value) {
  return JSON.stringify(value);
}

/**
 * 解析 JSON 字符串
 * @param {string} value - JSON 字符串
 * @returns {*|null} - 解析后的值，失败返回 null
 */
function parse(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * 获取存储区域对象
 * @param {string} name - 存储类型名称 ('localStorage' | 'sessionStorage')
 * @returns {Storage|null} - 存储对象或 null
 */
function getStorageArea(name) {
  try {
    return window[name];
  } catch {
    return null;
  }
}

/**
 * 检测存储是否可用
 * @param {Storage} area - 存储对象
 * @returns {boolean} - 可用返回 true
 */
function canUseStorage(area) {
  try {
    if (!area) return false;
    const key = '__xm_storage_test__';
    area.setItem(key, '1');
    area.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * 获取 Cookie 值
 * @param {string} key - Cookie 名称
 * @returns {string|null} - Cookie 值或 null
 */
function getCookie(key) {
  const encodedKey = encodeURIComponent(key) + '=';
  const item = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(encodedKey));
  return item ? decodeURIComponent(item.slice(encodedKey.length)) : null;
}

/**
 * 设置 Cookie
 * @param {string} key - Cookie 名称
 * @param {string} value - Cookie 值
 * @returns {void}
 */
function setCookie(key, value) {
  document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + '; path=/; SameSite=Lax';
}

/**
 * 删除 Cookie
 * @param {string} key - Cookie 名称
 * @returns {void}
 */
function removeCookie(key) {
  document.cookie = encodeURIComponent(key) + '=; path=/; max-age=0; SameSite=Lax';
}

/**
 * 浏览器存储封装
 * 提供 localStorage 持久存储和 sessionStorage 会话存储的统一 API
 */
const storage = {
  /**
   * 设置持久存储数据
   * @param {string} key - 存储键名
   * @param {*} value - 存储值（可 JSON 序列化）
   * @returns {void}
   */
  set(key, value) {
    const serialized = serialize(value);
    storageMemory.local[key] = serialized;
    const area = getStorageArea('localStorage');
    if (canUseStorage(area)) {
      area.setItem(key, serialized);
      return;
    }
    setCookie('local_' + key, serialized);
  },

  /**
   * 获取持久存储数据
   * @param {string} key - 存储键名
   * @returns {*|null} - 解析后的数据，失败返回 null
   */
  get(key) {
    const area = getStorageArea('localStorage');
    if (canUseStorage(area)) {
      return parse(area.getItem(key));
    }
    return parse(storageMemory.local[key]) || parse(getCookie('local_' + key));
  },

  /**
   * 删除持久存储数据
   * @param {string} key - 存储键名
   * @returns {void}
   */
  remove(key) {
    delete storageMemory.local[key];
    const area = getStorageArea('localStorage');
    if (canUseStorage(area)) {
      area.removeItem(key);
    }
    removeCookie('local_' + key);
  },

  /**
   * 清空所有持久存储数据
   * @returns {void}
   */
  clear() {
    document.cookie.split(';').forEach((part) => {
      const key = decodeURIComponent(part.split('=')[0].trim());
      if (key.startsWith('local_')) {
        removeCookie(key);
      }
    });
    storageMemory.local = {};
    const area = getStorageArea('localStorage');
    if (canUseStorage(area)) {
      area.clear();
    }
  },

  /**
   * 会话存储（sessionStorage）
   * 数据仅在当前会话有效，关闭标签页后自动清除
   */
  session: {
    /**
     * 设置会话存储数据
     * @param {string} key - 存储键名
     * @param {*} value - 存储值（可 JSON 序列化）
     * @returns {void}
     */
    set(key, value) {
      const serialized = serialize(value);
      storageMemory.session[key] = serialized;
      const area = getStorageArea('sessionStorage');
      if (canUseStorage(area)) {
        area.setItem(key, serialized);
        return;
      }
      setCookie(key, serialized);
    },

    /**
     * 获取会话存储数据
     * @param {string} key - 存储键名
     * @returns {*|null} - 解析后的数据，失败返回 null
     */
    get(key) {
      const area = getStorageArea('sessionStorage');
      if (canUseStorage(area)) {
        return parse(area.getItem(key));
      }
      return parse(storageMemory.session[key]) || parse(getCookie(key));
    },

    /**
     * 删除会话存储数据
     * @param {string} key - 存储键名
     * @returns {void}
     */
    remove(key) {
      delete storageMemory.session[key];
      const area = getStorageArea('sessionStorage');
      if (canUseStorage(area)) {
        area.removeItem(key);
      }
      removeCookie(key);
    },

    /**
     * 清空所有会话存储数据
     * @returns {void}
     */
    clear() {
      Object.keys(storageMemory.session).forEach((key) => removeCookie(key));
      storageMemory.session = {};
      const area = getStorageArea('sessionStorage');
      if (canUseStorage(area)) {
        area.clear();
      }
    }
  }
};
