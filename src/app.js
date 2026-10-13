const $=id=>document.getElementById(id);
let designs=[],switchRevision=0;const designEdits=new Map(),designResources=new Map();
const initialEdit=()=>({zoom:1,x:0,y:0,angle:0});
let locations=[],processing=PhotoProcessing.neutral();
let config,background,cleanBackground,photo,busy=false,edit={zoom:1,x:0,y:0,angle:0},drag;
const loadImage=src=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('Не удалось открыть изображение'));img.src=src;});
const time=()=>Details.validTime($('hour').value,$('minute').value)?$('hour').value+':'+$('minute').value:'';
function fit(){if(!background)return;const box=$('canvas').parentElement.getBoundingClientRect();const height=Math.min(box.height,box.width*background.naturalHeight/background.naturalWidth);$('canvas').style.height=height+'px';$('canvas').style.width=height*background.naturalWidth/background.naturalHeight+'px';}
function refresh(){
$('save').disabled=true;$('photo').disabled=busy;$('design').disabled=busy||!designs.length;
for(const id of ['zoom-in','zoom-out','reset-photo','rotation','reset-angle','toggle-processing','auto-processing','reset-processing','brightness','contrast','saturation','sharpness'])$(id).disabled=busy||!photo;
if(!config||!background)return;
const date=$('date').value,t=time(),name=Details.normalizeName($('name').value);
Invitation.draw($('canvas'),config,background,photo?PhotoProcessing.process(photo,processing):null,{name:name||'Имя ребёнка',date:date?Details.dateText(date):'Дата',time:t||'ЧЧ:ММ',address:locations.find(v=>v.id===$('venue').value)?.text.replace(/\r\n?/g,'\n').split('\n')||[]},edit,cleanBackground);
$('save').disabled=busy||!photo||!name||!date||!t||!locations.some(v=>v.id===$('venue').value);
$('filename').textContent=name&&date&&t?Details.filename(name,date,t):'';
$('rotation').value=edit.angle;$('angle-value').textContent=(edit.angle>0?'+':'')+edit.angle+'°';
fit();
}
function minutes(){const current=$('minute').value;const list=+$('hour').value===23?['00']:Array.from({length:12},(_,i)=>String(i*5).padStart(2,'0'));$('minute').replaceChildren(...list.map(v=>new Option(v,v)));$('minute').value=list.includes(current)?current:'00';}
$('hour').replaceChildren(new Option('—',''),...Array.from({length:16},(_,i)=>{const v=String(i+8).padStart(2,'0');return new Option(v,v);}));
minutes();
$('hour').addEventListener('change',()=>{minutes();refresh();});
for(const id of ['venue','minute'])$(id).addEventListener('change',refresh);
for(const id of ['name','date'])$(id).addEventListener('input',refresh);
$('photo').addEventListener('change',async()=>{
const file=$('photo').files[0];if(!file)return;busy=true;refresh();const url=URL.createObjectURL(file);
try{if(file.size>25*1024*1024)throw new Error('Выберите фотографию размером до 25 МБ');const candidate=await loadImage(url);if(candidate.naturalWidth*candidate.naturalHeight>40000000)throw new Error('Фотография слишком большая (максимум 40 миллионов пикселей)');photo=candidate;designEdits.clear();processing=PhotoProcessing.neutral();syncProcessing();edit={zoom:1,x:0,y:0,angle:0};$('status').textContent='Перетащите фотографию или измените масштаб колёсиком.';}
catch(error){$('status').textContent=error.message;}finally{URL.revokeObjectURL(url);busy=false;refresh();}
});
function point(event){const r=$('canvas').getBoundingClientRect();return Invitation.photoPoint((event.clientX-r.left)/r.width*config.width,(event.clientY-r.top)/r.height*config.height,config.photo);}
function inside(p){return Invitation.photoContains(p,config.photo);}
function clamp(){const p=Invitation.photoPlacement(photo.naturalWidth,photo.naturalHeight,config.photo,edit);edit={zoom:p.zoom,x:p.x,y:p.y,angle:p.angle};}
function zoom(factor){if(!photo||busy)return;edit.zoom*=factor;clamp();refresh();}
$('zoom-in').onclick=()=>zoom(1.12);$('zoom-out').onclick=()=>zoom(1/1.12);
$('reset-photo').onclick=()=>{edit={zoom:1,x:0,y:0,angle:0};refresh();};
$('canvas').addEventListener('pointerdown',e=>{if(!photo||busy||!inside(point(e)))return;e.preventDefault();drag={id:e.pointerId,start:point(e),x:edit.x,y:edit.y};$('canvas').setPointerCapture(e.pointerId);});
$('canvas').addEventListener('pointermove',e=>{if(!config)return;const p=point(e);$('canvas').style.cursor=photo&&inside(p)?'grab':'default';if(!drag||drag.id!==e.pointerId)return;edit.x=drag.x+p.x-drag.start.x;edit.y=drag.y+p.y-drag.start.y;clamp();refresh();$('canvas').style.cursor='grabbing';});
for(const event of ['pointerup','pointercancel','lostpointercapture'])$('canvas').addEventListener(event,()=>{drag=null;});
$('canvas').addEventListener('wheel',e=>{if(!photo||busy||!inside(point(e)))return;e.preventDefault();zoom(Math.exp(-Math.sign(e.deltaY)*0.12));},{passive:false});
window.addEventListener('wheel',e=>{if(!e.target.closest('dialog'))e.preventDefault();},{passive:false});
new ResizeObserver(fit).observe($('canvas').parentElement);
$('form').addEventListener('submit',async e=>{e.preventDefault();if($('save').disabled)return;const filename=Details.filename($('name').value.trim(),$('date').value,time());busy=true;refresh();try{const saved=await window.desktop.saveImage($('canvas').toDataURL('image/jpeg',.97),filename);$('status').textContent=saved?'Готово! Приглашение сохранено на компьютер.':'Сохранение отменено.';}catch{$('status').textContent='Не удалось сохранить файл. Проверьте доступ к папке.';}finally{busy=false;refresh();}});
const script=document.createElement('script');script.src='../assets/template-config.js';
async function designAssets(design){
if(!designResources.has(design.id))designResources.set(design.id,Promise.all([loadImage(design.background),design.cleanBackground?loadImage(design.cleanBackground):Promise.resolve(null),design.fonts?.length?Promise.all(design.fonts.map(font=>document.fonts.load(font))):Promise.resolve()]));
try{const [image,clean]=await designResources.get(design.id);if(image.naturalWidth!==design.width||image.naturalHeight!==design.height)throw new Error("Размер встроенного фона не соответствует конфигурации");return {background:image,cleanBackground:clean};}catch(error){designResources.delete(design.id);throw error;}
}
async function selectDesign(id){
const candidate=designs.find(v=>v.id===id);if(!candidate)return;
const revision=++switchRevision;if(config)designEdits.set(config.id,{...edit});drag=null;busy=true;refresh();
try{const resources=await designAssets(candidate);if(revision!==switchRevision)return;config=candidate;background=resources.background;cleanBackground=resources.cleanBackground;edit={...(designEdits.get(id)||initialEdit())};$("design").value=id;$("resolution").textContent=background.naturalWidth+" × "+background.naturalHeight;$("status").textContent=photo?"Фото и данные сохранены. Настройте кадр для выбранного дизайна.":"Добавьте фотографию, имя, дату и время.";}catch(error){if(revision!==switchRevision)return;if(config)$("design").value=config.id;$("status").textContent="Не удалось загрузить встроенный дизайн. "+error.message;}finally{if(revision===switchRevision){busy=false;refresh();}}
}
$("design").addEventListener("change",()=>selectDesign($("design").value));
script.onload=async()=>{try{designs=window.templateConfigs;$("design").replaceChildren(...designs.map(v=>new Option(v.title,v.id)));const stored=await window.desktop.getSettings();locations=stored.settings.locations;updateVenues();await selectDesign(designs[0].id);}catch{$("status").textContent="Не удалось загрузить приглашение или локальные настройки. Сохранённые данные не перезаписаны.";}};
script.onerror=()=>{$('status').textContent='Не удалось загрузить настройки приглашения.';};document.head.append(script);

$("name").addEventListener("blur",()=>{$("name").value=Details.normalizeName($("name").value);refresh();});
$("rotation").addEventListener("input",()=>{if(!photo||busy)return;edit.angle=+$("rotation").value;clamp();refresh();});
$("reset-angle").onclick=()=>{if(!photo||busy)return;edit.angle=0;clamp();refresh();};

function updateVenues(){const selected=$("venue").value;$("venue").replaceChildren(...locations.map(v=>new Option(v.label,v.id)));if(locations.some(v=>v.id===selected))$("venue").value=selected;if(!locations.length)$("venue").replaceChildren(new Option("Добавьте локацию в настройках",""));}
function syncProcessing(){for(const key of Object.keys(processing)){$(key).value=processing[key];$(key+"-value").textContent=(processing[key]>0?"+":"")+processing[key];}}
$("toggle-processing").onclick=()=>{const panel=$("processing-panel");panel.hidden=!panel.hidden;$("toggle-processing").setAttribute("aria-expanded",String(!panel.hidden));fit();};
for(const key of Object.keys(processing))$(key).addEventListener("input",()=>{processing[key]=+$(key).value;syncProcessing();refresh();});
$("reset-processing").onclick=()=>{processing=PhotoProcessing.neutral();syncProcessing();refresh();};
$("auto-processing").onclick=()=>{if(!photo||busy)return;processing=PhotoProcessing.auto(photo);syncProcessing();refresh();};
