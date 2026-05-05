'use strict';

/**
 * emoji → Tabler Icons 名称映射。
 * 用于将项目中硬编码的 emoji 替换为图标字体类名。
 */
var ICON_MAP = {
  '📊': 'chart-bar',
  '🏭': 'building-factory',
  '📈': 'chart-line',
  '⚙️': 'settings',
  '🛒': 'shopping-cart',
  '🏬': 'building-warehouse',
  '👥': 'users',
  '👋': 'wave-sine',
  '📋': 'clipboard-list',
  '📦': 'package',
  '💰': 'currency-dollar',
  '🔧': 'tool',
  '🚚': 'truck',
  '🤝': 'heart-handshake',
  '👤': 'user',
  '📅': 'calendar',
  '🏆': 'trophy',
  '📡': 'radar',
  '📥': 'inbox',
  '📤': 'transfer-out',
  '🗺️': 'map',
  '⚠️': 'alert-triangle',
  '✅': 'circle-check',
  '📌': 'pin',
  '🕐': 'clock',
  '🏢': 'building',
  '🟢': 'circle-dot',
  '📨': 'mail',
  '🔴': 'circle-dot',
  '🚨': 'bell-ringing',
  '🛑': 'player-stop',
  '🎯': 'target',
  '🗓️': 'calendar-event',
  '🔍': 'search',
  '⭐': 'star',
  '⏰': 'alarm',
  '❌': 'x',
  '⚡': 'bolt',
  '⏸️': 'player-pause'
};

var ICON_ALIASES = {
  'circle-filled': 'circle-dot',
  outbox: 'transfer-out',
  'star-filled': 'star',
  'user-handshake': 'heart-handshake',
  'wave-sawtooth': 'wave-sine',
  wrench: 'tool',
  zap: 'bolt'
};

/**
 * 将 emoji 或 Tabler 图标名渲染为图标 HTML。
 * @param {string} name emoji 字符串或 Tabler 图标名。
 * @returns {string} 图标 HTML。
 */
function renderIcon(name) {
  var key = ICON_MAP[name] || name;
  key = ICON_ALIASES[key] || key;
  return '<i class="ti ti-' + key + '"></i>';
}

window.renderIcon = renderIcon;
