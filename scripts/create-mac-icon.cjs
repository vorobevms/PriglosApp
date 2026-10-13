// ICNS ic08 is the standard 256x256 PNG representation. Preserve the original
// icon pixels and alpha exactly; do not redraw or upscale the Windows artwork.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const png = fs.readFileSync(path.join(root, 'assets/balloon.png'));
if (png.readUInt32BE(16) !== 256 || png.readUInt32BE(20) !== 256) throw Error('Expected the existing 256x256 icon');
const header = Buffer.alloc(16);
header.write('icns', 0); header.writeUInt32BE(png.length + 16, 4);
header.write('ic08', 8); header.writeUInt32BE(png.length + 8, 12);
fs.writeFileSync(path.join(root, 'assets/balloon.icns'), Buffer.concat([header, png]));
console.log('Created assets/balloon.icns from unchanged balloon.png');
