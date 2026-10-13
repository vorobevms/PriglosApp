(function(root){
function validTime(hour,minute){return /^\d{2}$/.test(hour)&&/^\d{2}$/.test(minute)&&+hour>=8&&+hour<=23&&+minute>=0&&+minute<=55&&+minute%5===0&&(+hour<23||+minute===0);}
function normalizeName(name){return name.trim().toLocaleLowerCase('ru-RU').replace(/(^|\s)(\p{L})/gu,(_,space,letter)=>space+letter.toLocaleUpperCase('ru-RU'));}
function dateText(date){
const months=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const [,month,day]=date.split('-').map(Number);
return `${day} ${months[month-1]}`;
}
function filename(name,date,time){
const clean=s=>s.normalize('NFC').replace(/[<>:"/\\|?*\u0000-\u001f]/g,'-').replace(/[. ]+$/g,'').trim();
return `ДР_${clean(normalizeName(name)).slice(0,80)||'Приглашение'}_${dateText(date)}_${clean(time)}.jpg`;
}
const api={validTime,filename,normalizeName,dateText};if(typeof module!=='undefined')module.exports=api;else root.Details=api;
})(globalThis);
