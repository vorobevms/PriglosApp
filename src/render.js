(function (root) {
  function cover(sw, sh, dw, dh) {
    const scale = Math.max(dw / sw, dh / sh);
    return { x: (sw - dw / scale) / 2, y: (sh - dh / scale) / 2, width: dw / scale, height: dh / scale };
  }
  function photoPlacement(sw, sh, p, edit = {}) {
    const zoom = Math.max(1, Math.min(5, edit.zoom || 1));
    const angle = Math.max(-30,Math.min(30,edit.angle || 0));
    const a=angle*Math.PI/180,c=Math.cos(a),s=Math.sin(a);
    const extentX=p.shape==='circle'?p.width/2:(p.width*Math.abs(c)+p.height*Math.abs(s))/2;
    const extentY=p.shape==='circle'?p.height/2:(p.width*Math.abs(s)+p.height*Math.abs(c))/2;
    const scale = Math.max(2*extentX/sw,2*extentY/sh) * zoom;
    const width = sw * scale, height = sh * scale;
    const u=(edit.x||0)*c+(edit.y||0)*s,v=-(edit.x||0)*s+(edit.y||0)*c;
    const boundX=Math.max(0,width/2-extentX),boundY=Math.max(0,height/2-extentY);
    const cu=Math.max(-boundX,Math.min(boundX,u)),cv=Math.max(-boundY,Math.min(boundY,v));
    const x=cu*c-cv*s,y=cu*s+cv*c;
    return { zoom, angle, x, y, left: (p.width-width)/2+x, top: (p.height-height)/2+y, width, height };
  }
  function photoPoint(x, y, p) {
    const a = -(p.rotation || 0) * Math.PI / 180, dx = x-p.x, dy = y-p.y;
    return { x: dx*Math.cos(a)-dy*Math.sin(a), y: dx*Math.sin(a)+dy*Math.cos(a) };
  }
  const hitTestCache=new WeakMap();
  function photoContains(point,p){
    if(p.maskPath){if(!hitTestCache.has(p))hitTestCache.set(p,{ctx:document.createElement('canvas').getContext('2d'),path:new Path2D(p.maskPath)});const hit=hitTestCache.get(p);return hit.ctx.isPointInPath(hit.path,point.x,point.y);}
    if(p.shape==='circle')return ((point.x-p.width/2)/(p.width/2))**2+((point.y-p.height/2)/(p.height/2))**2<=1;
    if(p.shape==='arch'){const r=p.width/2;return point.x>=0&&point.x<=p.width&&point.y>=0&&point.y<=p.height&&(point.y>=r||(point.x-r)**2+(point.y-r)**2<=r*r);}
    if(point.x<0||point.x>p.width||point.y<0||point.y>p.height)return false;
    const radius=Math.min(p.radius||0,p.width/2,p.height/2),dx=Math.max(radius-point.x,0,point.x-(p.width-radius)),dy=Math.max(radius-point.y,0,point.y-(p.height-radius));
    return !radius||dx*dx+dy*dy<=radius*radius;
  }
  const foregroundCache=new WeakMap();
  function photoForeground(background,config){
    if(foregroundCache.has(background))return foregroundCache.get(background);
    const layer=document.createElement('canvas');layer.width=background.naturalWidth;layer.height=background.naturalHeight;
    const ctx=layer.getContext('2d');ctx.drawImage(background,0,0);
    const pixels=ctx.getImageData(0,0,layer.width,layer.height),p=config.photo;
    // Keep the original foliage, rim and stage in front of the photo. Only the
    // light grey portal interior is cleared, including its central placeholder.
    for(let y=0;y<layer.height;y++)for(let x=0;x<layer.width;x++){
      const local={x:x/layer.width*config.width-p.x,y:y/layer.height*config.height-p.y};
      if(!photoContains(local,p))continue;
      const distance=Math.hypot(local.x-p.width/2,local.y-p.height/2);
      const i=(y*layer.width+x)*4,r=pixels.data[i],g=pixels.data[i+1],b=pixels.data[i+2];
      if(p.foreground.mode==='regions'){
        const keep=p.foreground.regions.some(region=>x>=region.x&&x<region.x+region.width&&y>=region.y&&y<region.y+region.height&&(
          region.type==='green'?g>r*1.18&&g>b*1.12:
          Math.max(r,g,b)-Math.min(r,g,b)>(region.chroma||18)||Math.max(r,g,b)<(region.dark||110)||Math.min(r,g,b)>(region.light||228)
        ));pixels.data[i+3]=keep?255:0;
      }else if(distance<p.foreground.safeRadius)pixels.data[i+3]=0;
      else if(Math.min(r,g,b)>p.foreground.minChannel){
        const chroma=Math.max(r,g,b)-Math.min(r,g,b);
        pixels.data[i+3]=Math.round(255*Math.max(0,Math.min(1,(chroma-p.foreground.chromaStart)/p.foreground.chromaRange)));
      }
    }
    ctx.putImageData(pixels,0,0);foregroundCache.set(background,layer);return layer;
  }
  function wrap(ctx, text, maxWidth) {
    if(!text)return [''];
    const lines=[];let line='';
    for(const word of text.match(/\S+\s*|\s+/g)||[]){const next=line+word;if(line&&ctx.measureText(next).width>maxWidth){lines.push(line);line=word;}else line=next;}
    if(line)lines.push(line);return lines;
  }
  function draw(canvas, config, background, photo, values, edit, cleanBackground) {
    canvas.width = background.naturalWidth; canvas.height = background.naturalHeight;
    const ctx = canvas.getContext('2d',{willReadFrequently:true});
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    ctx.scale(canvas.width / config.width, canvas.height / config.height);
    // Only the baked address pixels are restored; all other original pixels remain intact.
    if(cleanBackground){const r=config.addressRestore;ctx.drawImage(cleanBackground,r.x/config.width*cleanBackground.naturalWidth,r.y/config.height*cleanBackground.naturalHeight,r.width/config.width*cleanBackground.naturalWidth,r.height/config.height*cleanBackground.naturalHeight,r.x,r.y,r.width,r.height);}
    const p = config.photo;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((p.rotation || 0) * Math.PI / 180);
    ctx.beginPath();
    if(p.maskPath)ctx.clip(new Path2D(p.maskPath));
    else {
      if(p.shape==='circle')ctx.ellipse(p.width/2,p.height/2,p.width/2,p.height/2,0,0,Math.PI*2);
      else if(p.shape==='arch'){const r=p.width/2;ctx.moveTo(0,p.height);ctx.lineTo(0,r);ctx.arc(r,r,r,Math.PI,Math.PI*2);ctx.lineTo(p.width,p.height);ctx.closePath();}
      else ctx.roundRect(0,0,p.width,p.height,p.radius||0);
      ctx.clip();
    }
    if (photo) {
      const pos = photoPlacement(photo.naturalWidth, photo.naturalHeight, p, edit);
      ctx.translate(p.width/2+pos.x,p.height/2+pos.y);
      ctx.rotate(pos.angle*Math.PI/180);
      ctx.drawImage(photo,-pos.width/2,-pos.height/2,pos.width,pos.height);
    } else if(p.shape!=='circle'&&p.placeholder!=='background') {
      ctx.fillStyle = '#e8e1f5'; ctx.fillRect(0, 0, p.width, p.height);
      ctx.fillStyle = '#807491'; ctx.font = '48px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Фотография ребёнка', p.width / 2, p.height / 2);
    }
    ctx.restore();
    if(photo&&p.foreground)ctx.drawImage(photoForeground(background,config),0,0,config.width,config.height);
    if (config.address && values.address?.length) {
      const t = config.address;
      ctx.save();
      if(t.rotation){ctx.translate(t.x,t.y);ctx.rotate(t.rotation*Math.PI/180);ctx.translate(-t.x,-t.y);}
      ctx.textAlign = t.align||'left'; ctx.textBaseline = 'top'; ctx.fillStyle = t.color;
      let size = t.fontSize;
      const setFont = () => { ctx.font = `${Math.max(t.firstLineWeight||0,t.fontWeight||400)} ${size}px ${t.fontFamily||'sans-serif'}`; };
      setFont();
      const addressLines=()=>Array.isArray(values.address)?values.address.flatMap(line=>wrap(ctx,line,t.maxWidth)):wrap(ctx,values.address,t.maxWidth);
      let lines=addressLines();
      while((lines.length*size*(t.lineHeight||1.3)>t.maxHeight||lines.some(line=>ctx.measureText(line).width>t.maxWidth))&&size>1){size--;setFont();lines=addressLines();}
      lines.forEach((line,i)=>{ctx.font=`${i===0?(t.firstLineWeight||t.fontWeight):t.fontWeight} ${size}px ${t.fontFamily||'sans-serif'}`;ctx.fillText(line,t.x,t.y+i*size*(t.lineHeight||1.3));});
      ctx.restore();
    }
    for (const key of ['name','date','time']) {
      const t = config[key]; const value = t.uppercase ? values[key].toLocaleUpperCase('ru-RU') : values[key]; let size = t.fontSize;
      ctx.save();
      if(t.rotation){ctx.translate(t.x,t.y);ctx.rotate(t.rotation*Math.PI/180);ctx.translate(-t.x,-t.y);}
      ctx.textAlign = t.align || 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = t.color;
      ctx.font = `${t.fontWeight||400} ${size}px ${t.fontFamily||'sans-serif'}`;
      const width=()=>t.arc?Array.from(value).reduce((sum,char)=>sum+ctx.measureText(char).width,0):ctx.measureText(value).width;
      while (width() > t.maxWidth && size > 12) ctx.font = `${t.fontWeight||400} ${--size}px ${t.fontFamily||'sans-serif'}`;
      if(t.gradient){const gradient=ctx.createLinearGradient(0,t.y-size/2,0,t.y+size/2);gradient.addColorStop(0,t.gradient[0]);gradient.addColorStop(1,t.gradient[1]);ctx.fillStyle=gradient;}
      if(t.shadow){ctx.shadowColor=t.shadow.color;ctx.shadowBlur=t.shadow.blur;ctx.shadowOffsetX=t.shadow.offsetX;ctx.shadowOffsetY=t.shadow.offsetY;}
      if(t.stroke){ctx.strokeStyle=t.stroke.color;ctx.lineWidth=t.stroke.width;}
      if(t.arc){
        let offset=-width()/2;const radius=t.maxWidth/2;ctx.textAlign='center';
        for(const char of value){const w=ctx.measureText(char).width,x=offset+w/2;ctx.save();ctx.translate(t.x+x,t.y+t.arc.rise*(x/radius)**2);ctx.rotate(Math.atan(2*t.arc.rise*x/(radius*radius)));if(t.stroke)ctx.strokeText(char,0,0);ctx.fillText(char,0,0);ctx.restore();offset+=w;}
      }else {if(t.stroke)ctx.strokeText(value,t.x,t.y);ctx.fillText(value, t.x, t.y);}
      ctx.restore();
    }
    for(const t of config.captions||[]){ctx.textAlign=t.align||'left';ctx.textBaseline='middle';ctx.fillStyle=t.color;ctx.font=`${t.fontWeight||400} ${t.fontSize}px ${t.fontFamily||'sans-serif'}`;ctx.fillText(t.text,t.x,t.y);}
    for(const line of config.rules||[]){ctx.save();ctx.strokeStyle=line.color;ctx.lineWidth=line.width||1;if(line.glow){ctx.shadowColor=line.color;ctx.shadowBlur=line.glow;}ctx.beginPath();ctx.moveTo(line.x1,line.y);ctx.lineTo(line.x2,line.y);ctx.stroke();ctx.restore();}
  }
  const api = { cover, draw, photoPlacement, photoPoint, photoContains, wrap };
  if (typeof module !== 'undefined') module.exports = api;
  else root.Invitation = api;
})(globalThis);
