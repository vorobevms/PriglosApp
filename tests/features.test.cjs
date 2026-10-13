const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {SettingsStore,validateLocations,DEFAULT_LOCATIONS}=require('../src/settings-store.cjs');
const {adjustPixels,autoPixels,neutral}=require('../src/photo-processing.js');
const {normalizeName,filename}=require('../src/details.js');
test('every space separated name starts uppercase without declension',()=>{for(const name of ['воробьев михаил','ВОРОБЬЕВ МИХАИЛ','Воробьев михаил','воробьев МИХАИЛ'])assert.equal(normalizeName(name),'Воробьев Михаил');assert.equal(normalizeName('АННА МАРИЯ'),'Анна Мария');assert.equal(normalizeName('Воробьева МИХАИЛА олеговича'),'Воробьева Михаила Олеговича');assert.equal(normalizeName('анна  мария'),'Анна  Мария');assert.equal(filename('воробьев михаил','2026-10-22','19:40'),'ДР_Воробьев Михаил_22 октября_19-40.jpg');});
test('neutral processing preserves RGBA pixels exactly',()=>{const pixels=new Uint8ClampedArray([50,100,160,255,200,20,100,128]);assert.deepEqual(adjustPixels(pixels,2,1,neutral()),pixels);});
test('processing is bounded, alpha stays intact, sharpening increases edge contrast',()=>{
const pixels=new Uint8ClampedArray([80,80,80,255,120,120,120,255,160,160,160,255]);
const sharp=adjustPixels(pixels,3,1,{...neutral(),sharpness:100});assert.ok(sharp[0]<80&&sharp[8]>160);assert.equal(sharp[3],255);
const bright=adjustPixels(pixels,3,1,{...neutral(),brightness:20});assert.ok(bright[4]>pixels[4]);
const contrast=adjustPixels(pixels,3,1,{...neutral(),contrast:20});assert.ok(contrast[0]<pixels[0]&&contrast[8]>pixels[8]);
const color=new Uint8ClampedArray([40,100,180,120]),desat=adjustPixels(color,1,1,{...neutral(),saturation:-60});assert.ok(desat[2]-desat[0]<color[2]-color[0]);assert.equal(desat[3],120);
});
test('auto corrections are moderate and respond to dark/light photos',()=>{const dark=autoPixels(new Uint8ClampedArray([30,30,30,255])),light=autoPixels(new Uint8ClampedArray([230,230,230,255]));assert.ok(dark.brightness>0&&dark.brightness<=22);assert.ok(light.brightness<0&&light.brightness>=-18);assert.ok(dark.contrast<=15&&dark.saturation<=8&&dark.sharpness<=12);});
test('settings persist ordered multiline locations and never reseed saved empty list',async()=>{
const dir=await fs.mkdtemp(path.resolve('dist/settings-unit-'));const file=path.join(dir,'settings.json');const store=new SettingsStore(file);
assert.deepEqual((await store.read()).locations,DEFAULT_LOCATIONS);
const locations=[{id:'a',label:'Малышева',text:'ул. Малышева, 51\n\nТРЦ «Название», 3 этаж'},{id:'b',label:'Площадка',text:'Одна строка'}];
await store.saveLocations(locations);assert.deepEqual((await new SettingsStore(file).read()).locations,locations);
const value=await store.read();value.futureOption={enabled:true};await store.write(value);
await store.saveLocations([locations[1],locations[0]]);const after=await new SettingsStore(file).read();assert.equal(after.locations[0].id,'b');assert.deepEqual(after.futureOption,{enabled:true});
assert.throws(()=>validateLocations([{id:'x',label:'',text:''}]));
await store.saveLocations([]);assert.deepEqual((await new SettingsStore(file).read()).locations,[]);
await fs.writeFile(file,'corrupt saved settings');await assert.rejects(()=>new SettingsStore(file).read());assert.equal(await fs.readFile(file,'utf8'),'corrupt saved settings');
});

