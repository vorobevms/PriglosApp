const $ = id => document.getElementById(id);
let config, background, photo, busy = false;
const loadImage = src => new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = () => reject(new Error('Не удалось открыть изображение')); img.src = src; });
function refresh() {
  $('photo').disabled = busy;
  $('template').disabled = busy;
  $('save').disabled = true;
  if (!config || !background) return;
  const date = $('date').value;
  Invitation.draw($('canvas'), config, background, photo, {
    name: $('name').value.trim() || 'Имя ребёнка',
    date: date ? date.slice(8,10) + '.' + date.slice(5,7) : 'ДД.ММ',
    time: $('time').value ? $('time').value : 'ЧЧ:ММ',
    address: config.venues.find(venue => venue.id === $('venue').value)?.lines || []
  });
  $('photo').disabled = busy;
  $('save').disabled = busy || !photo || !$('name').value.trim() || !date || !$('time').value;
}
$('venue').addEventListener('change', refresh);
for (const id of ['name','date','time']) $(id).addEventListener('input', refresh);
$('photo').addEventListener('change', async () => {
  const file = $('photo').files[0]; if (!file) return;
  busy = true; refresh();
  const url = URL.createObjectURL(file);
  try {
    if (file.size > 25 * 1024 * 1024) throw new Error('Выберите фотографию размером до 25 МБ');
    const candidate = await loadImage(url);
    photo = candidate; $('status').textContent = 'Фотография добавлена. Заполните детали праздника.';
  } catch (error) { $('status').textContent = error.message; }
  finally { URL.revokeObjectURL(url); busy = false; refresh(); }
});
$('form').addEventListener('submit', async event => {
  event.preventDefault(); if ($('save').disabled) return;
  busy = true; refresh();
  try {
    const format = $('format').value;
    const data = $('canvas').toDataURL(format === 'png' ? 'image/png' : 'image/jpeg', .95);
    const saved = await window.desktop.saveImage(data, format);
    $('status').textContent = saved ? 'Готово! Приглашение сохранено на компьютер.' : 'Сохранение отменено.';
  } catch { $('status').textContent = 'Не удалось сохранить файл. Проверьте доступ к выбранной папке.'; }
  finally { busy = false; refresh(); }
});
// Local configuration is loaded by a script, without network requests or a server.
const script = document.createElement('script'); script.src = '../assets/template-config.js';
async function setBackground(data) {
  const candidate = await loadImage(data);
  if (candidate.naturalWidth * candidate.naturalHeight > 40000000) throw new Error('Шаблон слишком большой (максимум 40 миллионов пикселей)');
  if (Math.abs(candidate.naturalWidth / candidate.naturalHeight - 1080 / 1920) > .005) throw new Error('Для этих координат нужен вертикальный шаблон с пропорциями 9:16');
  background = candidate;
  $('resolution').textContent = `${background.naturalWidth} × ${background.naturalHeight}`;
  refresh();
}
$('template').addEventListener('change', async () => {
  const file = $('template').files[0]; if (!file) return;
  busy = true; refresh();
  try {
    if (!['image/png','image/jpeg'].includes(file.type) || file.size > 25 * 1024 * 1024) throw new Error('Выберите PNG/JPG до 25 МБ');
    const data = await new Promise((resolve,reject)=>{ const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Не удалось прочитать шаблон'));reader.readAsDataURL(file); });
    await setBackground(data);
    await window.desktop.saveTemplate(data);
    $('status').textContent = 'Шаблон сохранён на этом компьютере. Добавьте фотографию и детали.';
  } catch (error) { $('status').textContent = error.message; }
  finally { busy=false;refresh(); }
});
script.onload = async () => {
  try {
    config = window.templateConfig;
    $('venue').replaceChildren(...config.venues.map(venue => new Option(venue.label, venue.id)));
    const stored = await window.desktop.getTemplate();
    if (stored || config.background) await setBackground(stored || config.background);
    $('status').textContent = background ? 'Добавьте фотографию, имя, дату и время.' : 'Выберите пустой шаблон приглашения с компьютера.';
    refresh();
  } catch { $('status').textContent = 'Выберите шаблон заново: сохранённый файл не удалось открыть.'; }
};
script.onerror = () => { $('status').textContent = 'Не удалось загрузить настройки шаблона.'; };
document.head.append(script);
