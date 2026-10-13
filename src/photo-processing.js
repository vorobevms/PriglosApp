(function(root){
const neutral=()=>({brightness:0,contrast:0,saturation:0,sharpness:0});
function adjustPixels(source,width,height,settings){
const result=new Uint8ClampedArray(source.length);
const brightness=1+settings.brightness/100,contrast=1+settings.contrast/100,saturation=1+settings.saturation/100;
for(let i=0;i<source.length;i+=4){
const r=source[i],g=source[i+1],b=source[i+2],l=.2126*r+.7152*g+.0722*b;
for(let k=0;k<3;k++)result[i+k]=((l+(source[i+k]-l)*saturation)*brightness-128)*contrast+128;
result[i+3]=source[i+3];
}
if(settings.sharpness>0){
const original=new Uint8ClampedArray(result),amount=settings.sharpness/100*.8;
for(let y=0;y<height;y++)for(let x=0;x<width;x++)for(let c=0;c<3;c++){
const i=(y*width+x)*4+c;
const left=(y*width+Math.max(0,x-1))*4+c,right=(y*width+Math.min(width-1,x+1))*4+c;
const up=(Math.max(0,y-1)*width+x)*4+c,down=(Math.min(height-1,y+1)*width+x)*4+c;
const blurred=(original[i]*4+original[left]+original[right]+original[up]+original[down])/8;
result[i]=original[i]+amount*(original[i]-blurred);
}
}
return result;
}
function autoPixels(pixels){
let count=0,total=0,total2=0,saturation=0;
for(let i=0;i<pixels.length;i+=4){if(pixels[i+3]<128)continue;const r=pixels[i],g=pixels[i+1],b=pixels[i+2],l=.2126*r+.7152*g+.0722*b;total+=l;total2+=l*l;saturation+=Math.max(r,g,b)-Math.min(r,g,b);count++;}
if(!count)return neutral();const mean=total/count,std=Math.sqrt(Math.max(0,total2/count-mean*mean)),sat=saturation/count;
return {brightness:Math.round(Math.max(-18,Math.min(22,(125-mean)/4))),contrast:Math.round(Math.max(-8,Math.min(15,(52-std)/3))),saturation:sat<35?8:0,sharpness:12};
}
let cachedPhoto,cachedSource,cachedCanvas,cachedKey;
function source(photo){if(cachedPhoto!==photo){const c=document.createElement('canvas');c.width=photo.naturalWidth;c.height=photo.naturalHeight;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(photo,0,0);cachedSource=ctx.getImageData(0,0,c.width,c.height);cachedPhoto=photo;cachedKey=null;cachedCanvas=null;}return cachedSource;}
function process(photo,settings){
if(Object.values(settings).every(v=>v===0))return photo;
const key=JSON.stringify(settings);const image=source(photo);if(cachedKey===key)return cachedCanvas;
const c=document.createElement('canvas');c.width=image.width;c.height=image.height;c.naturalWidth=c.width;c.naturalHeight=c.height;
c.getContext('2d').putImageData(new ImageData(adjustPixels(image.data,image.width,image.height,settings),image.width,image.height),0,0);
cachedKey=key;cachedCanvas=c;return c;
}
function auto(photo){const c=document.createElement('canvas');const scale=Math.min(1,256/Math.max(photo.naturalWidth,photo.naturalHeight));c.width=Math.max(1,Math.round(photo.naturalWidth*scale));c.height=Math.max(1,Math.round(photo.naturalHeight*scale));const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(photo,0,0,c.width,c.height);return autoPixels(ctx.getImageData(0,0,c.width,c.height).data);}
const api={neutral,adjustPixels,autoPixels,process,auto};if(typeof module!=='undefined')module.exports=api;else root.PhotoProcessing=api;
})(globalThis);
