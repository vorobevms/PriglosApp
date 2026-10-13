window.templateConfigs = [{
  id: 'portal', title: 'Дизайн 1',
  background: '../assets/portal-template.png',
  width: 941, height: 1672,
  address: { x: 350, y: 1469, maxWidth: 365, maxHeight: 108, fontSize: 34, color: '#eee8ff', fontWeight: 400, firstLineWeight: 700 },
  photo: { x: 150, y: 428, width: 644, height: 644, shape: 'circle', rotation: 0, foreground: { safeRadius: 280, minChannel: 135, chromaStart: 30, chromaRange: 60 } },
  name: { x: 472, y: 173, maxWidth: 640, fontSize: 124, fontWeight: 900, color: '#c7f54b' },
  date: { x: 340, y: 1305, maxWidth: 265, fontSize: 54, fontWeight: 700, color: '#ffffff' },
  time: { x: 774, y: 1305, maxWidth: 165, fontSize: 58, fontWeight: 700, color: '#ffffff' },
  captions: [
    { text: 'ДАТА', x: 212, y: 1362, fontSize: 26, color: '#c395ff', align: 'left' },
    { text: 'НАЧАЛО', x: 699, y: 1362, fontSize: 26, color: '#c395ff', align: 'left' }
  ]
}, {
  id: 'balloons', title: 'Дизайн 2',
  fonts: ['900 150px Rubik', '700 52px Rubik', '500 29px Rubik'],
  background: '../assets/balloons-template.png',
  width: 941, height: 1672,
  photo: {
    x: 232, y: 493, width: 478, height: 712, shape: 'arch', rotation: 0,
    // Inner arch boundary with the foreground balloons/clouds excluded.
    maskPath: 'M 0 239 A 239 239 0 0 1 478 239 L 478 603 C 440 588 402 587 374 604 C 347 617 325 641 320 665 C 295 658 282 672 268 685 C 220 657 198 645 169 642 C 139 631 118 629 89 635 C 94 620 82 598 61 590 C 32 576 7 592 0 611 Z',
    placeholder: 'background'
  },
  name: {
    x: 472, y: 218, maxWidth: 704, fontSize: 150, fontFamily: 'Rubik, sans-serif', fontWeight: 900,
    color: '#8842cc', gradient: ['#bd85f5', '#7836be'],
    stroke: { color: '#d1a7fb', width: 2 }, shadow: { color: '#652998', offsetX: 0, offsetY: 4, blur: 2 }
  },
  date: { x: 338, y: 1290, maxWidth: 265, fontSize: 52, fontFamily: 'Rubik, sans-serif', fontWeight: 700, color: '#06363e' },
  time: { x: 727, y: 1290, maxWidth: 164, fontSize: 56, fontFamily: 'Rubik, sans-serif', fontWeight: 700, color: '#06363e' },
  address: { x: 350, y: 1418, maxWidth: 321, maxHeight: 86, fontSize: 29, fontFamily: 'Rubik, sans-serif', color: '#07373d', fontWeight: 500, firstLineWeight: 500, lineHeight: 1.3, align: 'left' },
  captions: []
}];
