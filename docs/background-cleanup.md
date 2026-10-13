# Очистка демонстрационного имени

Пользователь разрешил удалить только демонстрационное имя. Использован встроенный ImageGen, по одному запросу для 11_ОСД2_фон.png, 12_ОСД3_фон.png и 13_Doors_фон.png. Исходные файлы на рабочем столе не изменялись.

Полный одинаковый запрос для каждого файла:

> Use case: precise-object-edit. Edit target: the supplied invitation background. Remove ONLY the large demonstration name МИХАИЛ in the upper part of this image, including its letter-shaped shadows/glow. Reconstruct the original background texture under those letters so this space is empty for dynamically rendered names. Keep ALL other pixels/composition as faithful as possible: logo МЕСТО ПРЯТОК, the existing red horizontal rules where present, strings of lights or forest or wooden walls, permanent phrases приглашает тебя and на свой день рождения!, photo placeholder and frame, bottom cards, icons, decoration, lighting, color and positions. Do not remove horizontal red rules, do not add any new text. Do not redesign anything. Same full portrait composition and aspect ratio as input, ideally 941x1672. Clean seamless textured backdrop, no traces of old letters.

Финальные файлы: assets/designs/11_ОСД2_фон.png, assets/designs/12_ОСД3_фон.png, assets/designs/13_Doors_фон.png.

scripts/clean-backgrounds.cjs ограничивает перенос восстановленной текстуры следующими прямоугольниками (x, y, ширина, высота), с переходом в 3 пикселя по границе:

- ОСД2: 175, 209, 585, 127.
- ОСД3: 176, 137, 586, 122.
- Doors: 149, 113, 647, 173; дополнительно 155, 277, 69, 20 для нижнего края тени первой буквы.

Во всех трёх файлах проверено: вне указанных областей изменено ровно 0 каналов пикселей. Промежуточные изображения и метаданные: output/imagegen. Они не включаются в Windows-пакет.
