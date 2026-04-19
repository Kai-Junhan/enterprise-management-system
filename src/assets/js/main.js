'use strict';

/**
 * 企业管理系统统一启动入口。
 * 输入：当前页面路径、页面已有 script 标签和公共组件占位符。
 * 输出：完成运行时加载、登录守卫、公共组件注入、导航初始化和当前业务域初始化。
 *
 * 原因：项目没有构建工具，每个 HTML 只负责引入基础脚本，剩余运行时能力由 main.js 按页面动态装配。
 */
document.addEventListener('DOMContentLoaded', async () => {
  const initialMeta = getInitialPageMeta();

  try {
    await loadCoreRuntime(initialMeta.rootPath);

    const pageMeta = appRouter.getPageMeta();
    if (!appRouter.isPublicPage(pageMeta) && typeof auth !== 'undefined' && !auth.isLoggedIn()) {
      auth.guard();
      return;
    }

    appCursor.init();
    appRouter.initPathObserver();

    await appShell.loadPageShell(pageMeta);
    await appShell.ensureMobileNav(pageMeta);
    appShell.initSharedNavigation();
    await appScriptLoader.initBusinessModule(pageMeta);
  } catch (error) {
    console.error('App bootstrap failed:', error);
  }
});

/**
 * 在 router 加载前计算基础资源路径。
 * @returns {{pageName: string, rootPath: string}} 当前页面名和回到 src 根目录的路径。
 *
 * 原因：core/router.js 自身也需要通过正确路径加载，bootstrap 阶段不能依赖尚未加载的 router。
 */
function getInitialPageMeta() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const pagesIndex = pathParts.indexOf('pages');
  const pageName = pathParts[pathParts.length - 1] || '';

  if (pagesIndex === -1) {
    return {
      pageName,
      rootPath: ''
    };
  }

  const depth = Math.max(0, pathParts.length - pagesIndex - 2);
  const pagesPath = depth > 0 ? '../'.repeat(depth) : '';

  return {
    pageName,
    rootPath: pagesPath + '../'
  };
}

/**
 * 按启动依赖顺序加载 core 运行时。
 * @param {string} rootPath 当前页面回到 src 根目录的相对路径。
 * @returns {Promise<void>} module-loader、router、shell、cursor 依次加载后 resolve。
 *
 * 原因：后续步骤依赖 appRouter/appShell/appScriptLoader，全局对象必须先注册。
 */
async function loadCoreRuntime(rootPath) {
  const coreScripts = ['module-loader', 'router', 'shell', 'cursor'];

  for (const name of coreScripts) {
    await loadRuntimeScript(rootPath + 'assets/js/core/' + name + '.js', 'core-' + name);
  }
}

/**
 * 加载启动阶段需要的运行时脚本。
 * @param {string} src 脚本路径。
 * @param {string} key data-runtime-script 去重标识。
 * @returns {Promise<void>} 脚本加载完成后 resolve，失败时 reject。
 *
 * 原因：经典脚本重复加载会重复注册全局对象和事件监听，key 用于保证多次调用仍只注入一次。
 */
function loadRuntimeScript(src, key) {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[data-runtime-script="' + key + '"]')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.dataset.runtimeScript = key;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Failed to load script: ' + src));
    document.body.appendChild(script);
  });
}
