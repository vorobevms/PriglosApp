// One source tree and one runtime resource list; only packaging differs.
const shared = require('../package.json').build;
module.exports = {
  ...shared,
  extends: null,
  productName: 'Конструктор приглашений',
  directories: {...shared.directories, output: 'release-mac'},
  mac: {
    target: 'dmg',
    icon: 'assets/balloon.icns',
    category: 'public.app-category.graphics-design',
    minimumSystemVersion: '12.0.0',
    // Local test signing, without Developer ID or a paid certificate.
    identity: '-',
    hardenedRuntime: false,
    notarize: false,
    artifactName: '${productName}-${version}-${arch}.${ext}'
  },
  dmg: {sign: false}
};
