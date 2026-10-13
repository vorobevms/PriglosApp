const fs=require('node:fs/promises');
const path=require('node:path');
const DEFAULT_LOCATIONS=[
{id:'konkovo',label:'м. Коньково',text:'м. Коньково\nПрофсоюзная, 109, к. 2'},
{id:'markos',label:'м. Алтуфьево',text:'ТЦ „Маркос Молл“\nАлтуфьевское шоссе, дом 70,\nкорпус 1, второй этаж'}
];
function validateLocations(locations){
if(!Array.isArray(locations)||locations.length>100)throw new Error('Допустимо до 100 локаций.');
const ids=new Set();
return locations.map(location=>{
if(!location||typeof location.id!=='string'||!/^[-\w]{1,80}$/.test(location.id)||ids.has(location.id)||typeof location.label!=='string'||!location.label.trim()||location.label.length>100||typeof location.text!=='string'||!location.text.trim()||location.text.length>2000)throw new Error('Заполните короткое название и текст каждой локации (до 100 и 2000 символов).');
ids.add(location.id);return {id:location.id,label:location.label,text:location.text};
});
}
class SettingsStore{
constructor(filename){this.filename=filename;this.pending=Promise.resolve();}
async read(){
try{const value=JSON.parse(await fs.readFile(this.filename,'utf8'));if(value.schemaVersion!==1)throw new Error('Неизвестная версия настроек.');validateLocations(value.locations);return value;}
catch(error){if(error.code!=='ENOENT')throw error;const value={schemaVersion:1,locations:DEFAULT_LOCATIONS.map(v=>({...v}))};await this.write(value);return value;}
}
async write(value){await fs.mkdir(path.dirname(this.filename),{recursive:true});const tmp=this.filename+'.tmp';await fs.writeFile(tmp,JSON.stringify(value,null,2),'utf8');await fs.rename(tmp,this.filename);}
saveLocations(locations){const valid=validateLocations(locations);const result=this.pending.catch(()=>{}).then(async()=>{const current=await this.read();const updated={...current,locations:valid};await this.write(updated);return updated;});this.pending=result;return result;}
}
module.exports={SettingsStore,validateLocations,DEFAULT_LOCATIONS};

