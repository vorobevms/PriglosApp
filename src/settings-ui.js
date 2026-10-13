let locationDraft=[],settingsSaving=false;
const settingsDialog=document.getElementById('settings-dialog'),locationList=document.getElementById('location-list');
function locationCard(location,index){
const card=document.createElement('section');card.className='location-card';
const row=document.createElement('div');row.className='location-actions';
const number=document.createElement('strong');number.textContent='Локация '+(index+1);row.append(number);
for(const [text,label,action,disabled]of [
['↑','Переместить вверх',()=>{[locationDraft[index-1],locationDraft[index]]=[locationDraft[index],locationDraft[index-1]];drawLocations();},index===0],
['↓','Переместить вниз',()=>{[locationDraft[index+1],locationDraft[index]]=[locationDraft[index],locationDraft[index+1]];drawLocations();},index===locationDraft.length-1],
['Удалить','Удалить локацию',async()=>{if(await window.desktop.confirmLocationDelete(location.label)){locationDraft.splice(index,1);drawLocations();}},false]
]){const button=document.createElement('button');button.type='button';button.textContent=text;button.setAttribute('aria-label',label);button.disabled=disabled;button.onclick=action;row.append(button);}
card.append(row);
for(const [key,title,multiline,max]of [['label','Короткое название',false,100],['text','Текст на приглашении',true,2000]]){
const label=document.createElement('label');label.textContent=title;const input=document.createElement(multiline?'textarea':'input');input.value=location[key];input.maxLength=max;input.required=true;input.dataset.field=key;
if(multiline)input.rows=3;input.oninput=()=>{location[key]=input.value;};label.append(input);card.append(label);
}
return card;
}
function drawLocations(){locationList.replaceChildren(...locationDraft.map(locationCard));document.getElementById('add-location').disabled=locationDraft.length>=100;if(!locationDraft.length){const hint=document.createElement('p');hint.textContent='Добавьте локацию, чтобы создавать приглашения.';locationList.append(hint);}}
function settingsLock(locked){settingsSaving=locked;settingsDialog.querySelectorAll('button,input,textarea').forEach(input=>{input.disabled=locked;});if(!locked)drawLocations();}
document.getElementById('open-settings').onclick=()=>{locationDraft=locations.map(v=>({...v}));document.getElementById('settings-status').textContent='';drawLocations();settingsDialog.showModal();};
document.getElementById('close-settings').onclick=()=>{if(!settingsSaving)settingsDialog.close();};
settingsDialog.addEventListener('cancel',e=>{if(settingsSaving)e.preventDefault();});
document.getElementById('add-location').onclick=()=>{locationDraft.push({id:crypto.randomUUID(),label:'',text:''});drawLocations();locationList.lastElementChild.querySelector('input').focus();};
document.getElementById('settings-form').onsubmit=async e=>{
e.preventDefault();if(settingsSaving)return;
if(locationDraft.some(v=>!v.label.trim()||!v.text.trim())){document.getElementById('settings-status').textContent='Заполните название и текст каждой локации.';return;}
settingsLock(true);
try{const saved=await window.desktop.saveLocations(locationDraft);locations=saved.locations;updateVenues();refresh();settingsDialog.close();}
catch{document.getElementById('settings-status').textContent='Не удалось сохранить настройки. Изменения остаются в открытой панели.';}
finally{settingsLock(false);}
};
