// Export a source-only snapshot of this same project, never a separate app fork.
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {
  const root = path.resolve(__dirname, '..');
  const out = path.join(root, 'transfer-mac', 'PriglosApp');
  try {await fs.access(out); throw Error('transfer-mac/PriglosApp already exists. Move the previous snapshot before exporting again.');}
  catch (e) {if (e.code !== 'ENOENT') throw e;}
  await fs.mkdir(out, {recursive: true});
  const items = ['package.json', 'package-lock.json', '.gitignore', 'README.md',
    'src', 'tests', 'docs', 'assets/template-config.js', 'assets/portal-template.png',
    'assets/balloons-template.png', 'assets/designs', 'assets/fonts',
    'assets/balloon.png', 'assets/balloon.ico', 'assets/balloon.icns',
    'scripts/build-mac.cjs', 'scripts/electron-builder.mac.cjs',
    'scripts/create-mac-icon.cjs', 'scripts/prepare-mac.cjs'];
  for (const item of items) await fs.cp(path.join(root, item), path.join(out, item), {recursive: true});
  console.log('Source-only Mac transfer folder: ' + out);
})().catch(e => {console.error(e.message); process.exitCode = 1;});
