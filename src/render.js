(function (root) {
  function cover(sw, sh, dw, dh) {
    const scale = Math.max(dw / sw, dh / sh);
    return { x: (sw - dw / scale) / 2, y: (sh - dh / scale) / 2, width: dw / scale, height: dh / scale };
  }
  function draw(canvas, config, background, photo, values) {
    canvas.width = background.naturalWidth; canvas.height = background.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    ctx.scale(canvas.width / config.width, canvas.height / config.height);
    const p = config.photo;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((p.rotation || 0) * Math.PI / 180);
    ctx.beginPath(); ctx.roundRect(0, 0, p.width, p.height, p.radius || 0); ctx.clip();
    if (photo) {
      const crop = cover(photo.naturalWidth, photo.naturalHeight, p.width, p.height);
      ctx.drawImage(photo, crop.x, crop.y, crop.width, crop.height, 0, 0, p.width, p.height);
    } else {
      ctx.fillStyle = '#e8e1f5'; ctx.fillRect(0, 0, p.width, p.height);
      ctx.fillStyle = '#807491'; ctx.font = '48px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Фотография ребёнка', p.width / 2, p.height / 2);
    }
    ctx.restore();
    if (config.address && values.address?.length) {
      const t = config.address;
      // The supplied background already contains an address. Cover only its text,
      // keeping the map pin and photo frame visible.
      ctx.save();
      const c = t.cover;
      if (c) { ctx.fillStyle = c.color; ctx.beginPath(); ctx.roundRect(c.x, c.y, c.width, c.height, c.radius || 0); ctx.fill(); }
      ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillStyle = t.color;
      let size = t.fontSize;
      const setFont = () => { ctx.font = `${t.fontWeight || 400} ${size}px sans-serif`; };
      setFont();
      while (values.address.some(line => ctx.measureText(line).width > t.maxWidth) && size > 12) { size--; setFont(); }
      values.address.forEach((line, i) => ctx.fillText(line, t.x, t.y + i * t.lineHeight));
      ctx.restore();
    }
    for (const key of ['name','date','time']) {
      const t = config[key]; const value = t.uppercase ? values[key].toLocaleUpperCase('ru-RU') : values[key]; let size = t.fontSize;
      ctx.textAlign = t.align || 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = t.color;
      ctx.font = `${size}px sans-serif`;
      while (ctx.measureText(value).width > t.maxWidth && size > 12) ctx.font = `${--size}px sans-serif`;
      ctx.fillText(value, t.x, t.y);
    }
  }
  const api = { cover, draw };
  if (typeof module !== 'undefined') module.exports = api;
  else root.Invitation = api;
})(globalThis);
