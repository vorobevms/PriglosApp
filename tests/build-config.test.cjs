const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {spawnSync} = require('node:child_process');
const pkg = require('../package.json');
const mac = require('../scripts/electron-builder.mac.cjs');
test('Mac packaging reuses all runtime resources and preserves Windows identifiers/target', async () => {
  assert.equal(pkg.build.appId, 'ru.priglos.app');
  assert.equal(pkg.name, 'priglos-app');
  assert.equal(pkg.build.productName, 'Приглашения');
  assert.equal(pkg.build.win.target, 'portable');
  assert.equal(pkg.build.win.icon, 'assets/balloon.ico');
  assert.equal(pkg.build.portable.artifactName, 'Конструктор приглашений.exe');
  assert.equal(mac.files, pkg.build.files);
  assert.equal(mac.productName, 'Конструктор приглашений');
  assert.equal(mac.mac.target, 'dmg');
  assert.equal(mac.mac.identity, '-');
  assert.equal(mac.mac.notarize, false);
  await require('app-builder-lib/out/util/config/config').validateConfiguration(mac, {isEnabled: false});
});
test('Mac ICNS contains the unchanged Windows icon pixels and a valid ic08 PNG chunk', () => {
  const icon = fs.readFileSync('assets/balloon.icns');
  assert.equal(icon.toString('ascii', 0, 4), 'icns');
  assert.equal(icon.readUInt32BE(4), icon.length);
  assert.equal(icon.toString('ascii', 8, 12), 'ic08');
  assert.equal(icon.readUInt32BE(12), icon.length - 8);
  assert.deepEqual(icon.subarray(16), fs.readFileSync('assets/balloon.png'));
});
test('Mac command fails clearly on other hosts without starting a fake Mac build', {skip: process.platform === 'darwin'}, () => {
  const result = spawnSync(process.execPath, ['scripts/build-mac.cjs', 'arm64'], {encoding: 'utf8'});
  assert.equal(result.status, 1);
  assert.match(result.stderr, /hdiutil.*codesign/);
});
