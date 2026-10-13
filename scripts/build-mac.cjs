const {spawnSync} = require('node:child_process');
const path = require('node:path');
const arch = process.argv[2] || 'arm64';
if (!['arm64', 'x64'].includes(arch)) {
  console.error('Supported Mac architectures: arm64, x64.');
  process.exit(1);
}
if (process.platform !== 'darwin') {
  console.error('Сборка macOS .app/.dmg выполняется на Mac: нужны hdiutil и codesign. Перенесите исходники, выполните npm ci и npm run build:mac.');
  process.exit(1);
}
const root = path.resolve(__dirname, '..');
const result = spawnSync(process.execPath, [
  require.resolve('electron-builder/out/cli/cli.js'),
  '--config', path.join(__dirname, 'electron-builder.mac.cjs'),
  '--mac', '--' + arch, '--publish', 'never'
], {cwd: root, stdio: 'inherit', env: {...process.env, CSC_IDENTITY_AUTO_DISCOVERY: 'false'}});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
