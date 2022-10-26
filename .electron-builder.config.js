if (process.env.VITE_APP_VERSION === undefined) {
  /**
   * @param {Date} date
   * @return {number} the ordinal number of the day of the year
   */
  const dayOfYear = date =>
    Math.floor((date - new Date(date.getUTCFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

  /**
   *
   * @param date
   * @return {number} the ordinal number of the minute of the day
   */
  const minuteOfDay = date => date.getUTCHours() * 60 + date.getUTCMinutes();

  const now = new Date();
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${dayOfYear(now)}.${minuteOfDay(
    now,
  )}`;
}

const PRODUCT_NAME = '优职教2';

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  productName: PRODUCT_NAME,
  appId: 'com.easyschool.app',
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: ['packages/**/dist/**'],
  extraMetadata: {
    // 注入到 `package.json` 中的属性
    version: process.env.VITE_APP_VERSION,
  },
  asar: false,
  dmg: {
    sign: false,
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications',
      },
      {
        x: 130,
        y: 150,
        type: 'file',
      },
    ],
    window: {
      height: 380,
      width: 540,
    },
  },
  mac: {
    // 应用程序图标
    icon: 'buildResources/icon.icns',
    // 应用程序包名
    artifactName: '${productName}_${platform}_${arch}_${version}.${ext}',
    target: [
      // 要打的包的格式类型设置
      'dmg',
      'zip', // 这里注意更新的时候，mac只认zip格式的包
    ],
  },
  win: {
    icon: 'buildResources/256.png',
    artifactName: '${productName}_${platform}_${arch}_${version}.${ext}',
    target: [
      {
        // 打包成一个独立的 exe 安装程序
        target: 'nsis',
        // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
        arch: [
          // 'x64',
          'ia32',
        ],
      },
    ],
    // 打出来的包，自动获取管理员权限，不建议打开
    // requestedExecutionLevel: 'highestAvailable',
  },
  nsis: {
    // NSIS的路径包括自定义安装程序的脚本。默认为build/installer.nsh
    include: 'buildResources/installer.nsh',
    // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
    oneClick: false,
    // 是否开启安装时权限限制（此电脑或当前用户）
    perMachine: true,
    // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
    allowElevation: false,
    // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
    allowToChangeInstallationDirectory: true,
    // 卸载时删除用户数据
    deleteAppDataOnUninstall: true,
    // 安装图标
    // installerIcon: 'build/installerIcon_120.ico',
    // 卸载图标
    // uninstallerIcon: 'build/uninstallerIcon_120.ico',
    // 安装时头部图标
    // installerHeaderIcon: 'build/installerHeaderIcon_120.ico',
    // 创建桌面图标
    createDesktopShortcut: true,
    // 创建开始菜单图标
    createStartMenuShortcut: true,
  },
};

module.exports = config;
