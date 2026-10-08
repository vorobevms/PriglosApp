const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const http = require('node:http');
const fs = require('node:fs/promises');
(async () => {
 const root = path.resolve(__dirname, '..');
 const server = http.createServer(async(req,res)=>{try{const file=path.join(root,decodeURIComponent(req.url));const body=await fs.readFile(file);res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.svg')?'image/svg+xml':'text/html');res.end(body);}catch{res.statusCode=404;res.end();}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 try {
 browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || undefined,headless:true,args:['--no-sandbox']});
 const page = await browser.newPage({viewport:{width:1200,height:900}}); const errors=[]; page.on('pageerror', e=>errors.push(e.message));
 await page.addInitScript(() => { window.desktop = {getTemplate:async()=>localStorage.getItem('template'),saveTemplate:async data=>localStorage.setItem('template',data),saveImage:async (data,format) => { window.saved={data,format}; return true; }}; });
 await page.goto(`http://127.0.0.1:${server.address().port}/src/index.html`);
 await page.waitForFunction(()=>document.getElementById('status').textContent.includes('Выберите'));
 const template = await page.evaluate(()=>{const c=document.createElement('canvas');c.width=1080;c.height=1920;const ctx=c.getContext('2d');ctx.fillStyle='#100b20';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#ff00ff';ctx.fillRect(178,1670,480,190);return c.toDataURL().split(',')[1];});
 await page.locator('#template').setInputFiles({name:'template.png',mimeType:'image/png',buffer:Buffer.from(template,'base64')});
 await page.waitForFunction(()=>document.getElementById('status').textContent.includes('Шаблон сохранён'));
 const png = await page.evaluate(()=>{const c=document.createElement('canvas');c.width=600;c.height=1000;const x=c.getContext('2d');x.fillStyle='#dd8877';x.fillRect(0,0,600,1000);return c.toDataURL().split(',')[1];});
 await page.locator('#photo').setInputFiles({name:'photo.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});
 await page.locator('#name').fill('София'); await page.locator('#date').fill('2026-12-15'); await page.locator('#time').fill('14:30');
 await page.waitForFunction(()=>!document.getElementById('save').disabled);
 assert.equal(await page.locator('#venue option').count(),2);
 const addressImages=[];
 for (const venue of ['markos','konkovo']) {
   await page.locator('#venue').selectOption(venue);
   const crop=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=480;c.height=190;c.getContext('2d').drawImage(document.getElementById('canvas'),178,1670,480,190,0,0,480,190);return c.toDataURL().split(',')[1];});
   addressImages.push(crop);
   await fs.mkdir(path.join(root,'dist'),{recursive:true});
   await fs.writeFile(path.join(root,'dist',`address-${venue}.png`),Buffer.from(crop,'base64'));
   for(const format of ['png','jpg']) {
 await page.evaluate(()=>{window.saved=null;});
 await page.locator('#format').selectOption(format); await page.locator('#save').click();
 await page.waitForFunction(()=>document.getElementById('status').textContent.includes('сохранено'));
 const result=await page.evaluate(async()=>{const img=new Image();img.src=window.saved.data;await img.decode();return {width:img.width,height:img.height,format:window.saved.format,prefix:window.saved.data.slice(0,23)};});
 assert.equal(result.width,1080);assert.equal(result.height,1920);assert.equal(result.format,format);
 assert.ok(result.prefix.startsWith(format==='png'?'data:image/png':'data:image/jpeg'));
 }
 }
 assert.notEqual(addressImages[0],addressImages[1],'Changing venue must change the rendered address');
 const cover=await page.evaluate(()=>Array.from(document.getElementById('canvas').getContext('2d').getImageData(200,1680,1,1).data));
 assert.notDeepEqual(cover,[255,0,255,255],'Original baked address must be covered');
 const pixels=await page.evaluate(()=>{const ctx=document.getElementById('canvas').getContext('2d');return {inside:Array.from(ctx.getImageData(850,1500,1,1).data),outside:Array.from(ctx.getImageData(490,1230,1,1).data)};});
 assert.deepEqual(pixels.inside,[221,136,119,255]);assert.deepEqual(pixels.outside,[16,11,32,255]);
 await page.reload();await page.waitForFunction(()=>document.getElementById('canvas').width===1080);
 assert.equal(await page.locator('#resolution').textContent(),'1080 × 1920');
 const smallTemplate=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=540;c.height=960;const ctx=c.getContext('2d');ctx.fillStyle='#100b20';ctx.fillRect(0,0,c.width,c.height);return c.toDataURL().split(',')[1];});
 await page.locator('#template').setInputFiles({name:'small.png',mimeType:'image/png',buffer:Buffer.from(smallTemplate,'base64')});
 await page.waitForFunction(()=>document.getElementById('canvas').width===540);
 await page.locator('#photo').setInputFiles({name:'photo.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});
 await page.locator('#name').fill('Всеволода');await page.locator('#date').fill('2026-10-21');await page.locator('#time').fill('16:00');
 await page.waitForFunction(()=>!document.getElementById('save').disabled);await page.locator('#save').click();
 await page.waitForFunction(()=>document.getElementById('status').textContent.includes('сохранено'));
 const scaled=await page.evaluate(async()=>{const img=new Image();img.src=window.saved.data;await img.decode();return {width:img.width,height:img.height,pixel:Array.from(document.getElementById('canvas').getContext('2d').getImageData(425,750,1,1).data)};});
 assert.equal(scaled.width,540);assert.equal(scaled.height,960);assert.deepEqual(scaled.pixel,[221,136,119,255]);
 await fs.mkdir(path.join(root,'dist'),{recursive:true});
 await page.screenshot({path:path.join(root,'dist','preview.png')});
 assert.deepEqual(errors,[]); console.log('PASS: both selectable addresses, address replacement, local template persistence, tilted photo clipping, PNG/JPG at original 1080 × 1920 and scaled 540 × 960');
 } finally {if(browser) await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
