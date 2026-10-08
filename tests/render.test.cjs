const { test } = require('node:test');
const assert = require('node:assert/strict');
const { cover } = require('../src/render.js');
test('wide photo is cropped centrally without stretching', () => { assert.deepEqual(cover(1600,800,900,900), {x:400,y:0,width:800,height:800}); });
test('portrait photo is cropped centrally without stretching', () => { assert.deepEqual(cover(800,1600,900,900), {x:0,y:400,width:800,height:800}); });
