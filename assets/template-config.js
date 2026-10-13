// Built-in designs. Coordinates are in each background PNG native resolution.
window.templateConfigs = [
  {
    "id": "portal",
    "title": "Неоновый",
    "background": "../assets/portal-template.png",
    "width": 941,
    "height": 1672,
    "address": {
      "x": 350,
      "y": 1469,
      "maxWidth": 365,
      "maxHeight": 108,
      "fontSize": 34,
      "color": "#eee8ff",
      "fontWeight": 400,
      "firstLineWeight": 700
    },
    "photo": {
      "x": 150,
      "y": 428,
      "width": 644,
      "height": 644,
      "shape": "circle",
      "rotation": 0,
      "foreground": {
        "safeRadius": 280,
        "minChannel": 135,
        "chromaStart": 30,
        "chromaRange": 60
      }
    },
    "name": {
      "x": 472,
      "y": 173,
      "maxWidth": 640,
      "fontSize": 124,
      "fontWeight": 900,
      "color": "#c7f54b"
    },
    "date": {
      "x": 340,
      "y": 1305,
      "maxWidth": 265,
      "fontSize": 54,
      "fontWeight": 700,
      "color": "#ffffff"
    },
    "time": {
      "x": 774,
      "y": 1305,
      "maxWidth": 165,
      "fontSize": 58,
      "fontWeight": 700,
      "color": "#ffffff"
    },
    "captions": [
      {
        "text": "ДАТА",
        "x": 212,
        "y": 1362,
        "fontSize": 26,
        "color": "#c395ff",
        "align": "left"
      },
      {
        "text": "НАЧАЛО",
        "x": 699,
        "y": 1362,
        "fontSize": 26,
        "color": "#c395ff",
        "align": "left"
      }
    ]
  },
  {
    "id": "balloons",
    "title": "Шарики",
    "fonts": [
      "900 150px Rubik",
      "700 52px Rubik",
      "500 29px Rubik"
    ],
    "background": "../assets/balloons-template.png",
    "width": 941,
    "height": 1672,
    "photo": {
      "x": 232,
      "y": 493,
      "width": 478,
      "height": 712,
      "shape": "arch",
      "rotation": 0,
      "maskPath": "M 0 239 A 239 239 0 0 1 478 239 L 478 603 C 440 588 402 587 374 604 C 347 617 325 641 320 665 C 295 658 282 672 268 685 C 220 657 198 645 169 642 C 139 631 118 629 89 635 C 94 620 82 598 61 590 C 32 576 7 592 0 611 Z",
      "placeholder": "background"
    },
    "name": {
      "x": 472,
      "y": 218,
      "maxWidth": 704,
      "fontSize": 150,
      "fontFamily": "Rubik, sans-serif",
      "fontWeight": 900,
      "color": "#8842cc",
      "gradient": [
        "#bd85f5",
        "#7836be"
      ],
      "stroke": {
        "color": "#d1a7fb",
        "width": 2
      },
      "shadow": {
        "color": "#652998",
        "offsetX": 0,
        "offsetY": 4,
        "blur": 2
      }
    },
    "date": {
      "x": 338,
      "y": 1290,
      "maxWidth": 265,
      "fontSize": 52,
      "fontFamily": "Rubik, sans-serif",
      "fontWeight": 700,
      "color": "#06363e"
    },
    "time": {
      "x": 727,
      "y": 1290,
      "maxWidth": 164,
      "fontSize": 56,
      "fontFamily": "Rubik, sans-serif",
      "fontWeight": 700,
      "color": "#06363e"
    },
    "address": {
      "x": 350,
      "y": 1418,
      "maxWidth": 321,
      "maxHeight": 86,
      "fontSize": 29,
      "fontFamily": "Rubik, sans-serif",
      "color": "#07373d",
      "fontWeight": 500,
      "firstLineWeight": 500,
      "lineHeight": 1.3,
      "align": "left"
    },
    "captions": []
  },
  {
    "id": "stripes",
    "title": "Полосы",
    "width": 941,
    "height": 1672,
    "photo": {
      "x": 178,
      "y": 591,
      "width": 600,
      "height": 575,
      "shape": "polygon",
      "placeholder": "background",
      "maskPath": "M 0 41 L 561 0 L 596 501 L 552 544 L 37 575 Z"
    },
    "name": {
      "x": 471,
      "y": 250,
      "maxWidth": 760,
      "fontSize": 134,
      "fontFamily": "Segoe Print, cursive",
      "color": "#fffaf0",
      "fontWeight": 700,
      "rotation": -2
    },
    "date": {
      "x": 300,
      "y": 1312,
      "maxWidth": 370,
      "fontSize": 73,
      "fontFamily": "Segoe Print, cursive",
      "color": "#0b1419",
      "fontWeight": 700
    },
    "time": {
      "x": 694,
      "y": 1312,
      "maxWidth": 250,
      "fontSize": 88,
      "fontFamily": "Segoe Print, cursive",
      "color": "#0b1419",
      "fontWeight": 700
    },
    "address": {
      "x": 315,
      "y": 1491,
      "maxWidth": 470,
      "maxHeight": 108,
      "fontSize": 37,
      "fontFamily": "Comic Sans MS, sans-serif",
      "color": "#0b1419",
      "fontWeight": 400,
      "firstLineWeight": 700,
      "lineHeight": 1.35
    },
    "background": "../assets/designs/01_полосы_фон.png"
  },
  {
    "id": "arrows",
    "title": "Стрелки",
    "width": 941,
    "height": 1671,
    "photo": {
      "x": 260,
      "y": 570,
      "width": 421,
      "height": 556,
      "shape": "rect",
      "placeholder": "background"
    },
    "name": {
      "x": 470,
      "y": 309,
      "maxWidth": 570,
      "fontSize": 132,
      "fontFamily": "Impact, sans-serif",
      "color": "#d2f527",
      "fontWeight": 400
    },
    "date": {
      "x": 358,
      "y": 1327,
      "maxWidth": 188,
      "fontSize": 44,
      "fontFamily": "Impact, sans-serif",
      "color": "#ffffff",
      "fontWeight": 400
    },
    "time": {
      "x": 687,
      "y": 1327,
      "maxWidth": 159,
      "fontSize": 59,
      "fontFamily": "Impact, sans-serif",
      "color": "#ffffff",
      "fontWeight": 400
    },
    "address": {
      "x": 337,
      "y": 1460,
      "maxWidth": 363,
      "maxHeight": 79,
      "fontSize": 30,
      "fontFamily": "sans-serif",
      "color": "#eef3f7",
      "fontWeight": 400,
      "firstLineWeight": 700
    },
    "captions": [
      {
        "text": "ДАТА",
        "x": 358,
        "y": 1375,
        "fontSize": 23,
        "color": "#b9c2cf",
        "align": "center"
      },
      {
        "text": "НАЧАЛО",
        "x": 687,
        "y": 1375,
        "fontSize": 23,
        "color": "#b9c2cf",
        "align": "center"
      }
    ],
    "background": "../assets/designs/02_стрелки_фон.png"
  },
  {
    "id": "flashlight",
    "title": "Фонарь",
    "width": 940,
    "height": 1672,
    "photo": {
      "x": 243,
      "y": 581,
      "width": 486,
      "height": 491,
      "shape": "polygon",
      "placeholder": "background",
      "maskPath": "M 0 33 L 454 0 L 486 464 L 19 491 Z"
    },
    "name": {
      "x": 471,
      "y": 311,
      "maxWidth": 710,
      "fontSize": 130,
      "fontFamily": "Segoe Print, cursive",
      "color": "#ffce6e",
      "fontWeight": 700,
      "rotation": -2
    },
    "date": {
      "x": 421,
      "y": 1177,
      "maxWidth": 202,
      "fontSize": 50,
      "fontFamily": "Impact, sans-serif",
      "color": "#fff0d9",
      "fontWeight": 400
    },
    "time": {
      "x": 746,
      "y": 1178,
      "maxWidth": 167,
      "fontSize": 60,
      "fontFamily": "Impact, sans-serif",
      "color": "#fff0d9",
      "fontWeight": 400
    },
    "address": {
      "x": 467,
      "y": 1328,
      "maxWidth": 341,
      "maxHeight": 88,
      "fontSize": 30,
      "fontFamily": "Arial Narrow, sans-serif",
      "color": "#fff0d9",
      "fontWeight": 400,
      "firstLineWeight": 700
    },
    "background": "../assets/designs/03_фонарь_фон.png"
  },
  {
    "id": "maze",
    "title": "Лабиринт",
    "width": 941,
    "height": 1672,
    "photo": {
      "x": 237,
      "y": 544,
      "width": 466,
      "height": 632,
      "shape": "rect",
      "placeholder": "background",
      "radius": 43
    },
    "name": {
      "x": 471,
      "y": 343,
      "maxWidth": 560,
      "fontSize": 141,
      "fontFamily": "Impact, sans-serif",
      "color": "#c4f326",
      "fontWeight": 400
    },
    "date": {
      "x": 352,
      "y": 1341,
      "maxWidth": 235,
      "fontSize": 49,
      "fontFamily": "Impact, sans-serif",
      "color": "#ffffff",
      "fontWeight": 400
    },
    "time": {
      "x": 744,
      "y": 1341,
      "maxWidth": 180,
      "fontSize": 56,
      "fontFamily": "Impact, sans-serif",
      "color": "#ffffff",
      "fontWeight": 400
    },
    "address": {
      "x": 333,
      "y": 1469,
      "maxWidth": 382,
      "maxHeight": 76,
      "fontSize": 31,
      "fontFamily": "Arial Narrow, sans-serif",
      "color": "#e8eef9",
      "fontWeight": 400,
      "firstLineWeight": 700
    },
    "captions": [
      {
        "text": "ДАТА",
        "x": 352,
        "y": 1386,
        "fontSize": 23,
        "color": "#a8b7ca",
        "align": "center"
      },
      {
        "text": "НАЧАЛО",
        "x": 744,
        "y": 1386,
        "fontSize": 23,
        "color": "#a8b7ca",
        "align": "center"
      }
    ],
    "background": "../assets/designs/04_лабиринт_фон.png"
  },
  {
    "id": "case",
    "title": "Дело",
    "width": 941,
    "height": 1672,
    "photo": {
      "x": 139,
      "y": 590,
      "width": 626,
      "height": 630,
      "shape": "polygon",
      "placeholder": "background",
      "maskPath": "M 0 50 L 590 0 L 626 592 L 38 630 Z",
      "foreground": {
        "mode": "regions",
        "regions": [
          {
            "x": 665,
            "y": 609,
            "width": 182,
            "height": 235,
            "type": "green"
          },
          {
            "x": 160,
            "y": 620,
            "width": 63,
            "height": 93,
            "type": "contrast",
            "chroma": 35,
            "dark": 130,
            "light": 230
          }
        ]
      }
    },
    "name": {
      "x": 471,
      "y": 266,
      "maxWidth": 640,
      "fontSize": 146,
      "fontFamily": "Impact, sans-serif",
      "color": "#07152b",
      "fontWeight": 400,
      "rotation": -4.6
    },
    "date": {
      "x": 397,
      "y": 1299,
      "maxWidth": 234,
      "fontSize": 51,
      "fontFamily": "Impact, sans-serif",
      "color": "#08162e",
      "fontWeight": 400,
      "rotation": -3
    },
    "time": {
      "x": 739,
      "y": 1287,
      "maxWidth": 158,
      "fontSize": 62,
      "fontFamily": "Impact, sans-serif",
      "color": "#08162e",
      "fontWeight": 400,
      "rotation": -3
    },
    "address": {
      "x": 405,
      "y": 1471,
      "maxWidth": 380,
      "maxHeight": 84,
      "fontSize": 31,
      "fontFamily": "Arial Narrow, sans-serif",
      "color": "#08162e",
      "fontWeight": 700,
      "firstLineWeight": 700,
      "rotation": -2
    },
    "background": "../assets/designs/05_дело_фон.png"
  },
  {
    "id": "space",
    "title": "Космос",
    "width": 941,
    "height": 1672,
    "fonts": [
      "900 145px Rubik",
      "700 52px Rubik"
    ],
    "photo": {
      "x": 195,
      "y": 585,
      "width": 550,
      "height": 550,
      "shape": "circle",
      "placeholder": "background",
      "foreground": {
        "mode": "regions",
        "regions": [
          {
            "x": 194,
            "y": 612,
            "width": 114,
            "height": 152,
            "type": "contrast",
            "chroma": 18,
            "dark": 110,
            "light": 222
          }
        ]
      }
    },
    "name": {
      "x": 470,
      "y": 243,
      "maxWidth": 720,
      "fontSize": 145,
      "fontFamily": "Rubik, sans-serif",
      "color": "#fff4e8",
      "fontWeight": 900,
      "arc": {
        "rise": 55
      }
    },
    "date": {
      "x": 296,
      "y": 1297,
      "maxWidth": 315,
      "fontSize": 56,
      "fontFamily": "Rubik, sans-serif",
      "color": "#fff4e8",
      "fontWeight": 700
    },
    "time": {
      "x": 654,
      "y": 1297,
      "maxWidth": 205,
      "fontSize": 65,
      "fontFamily": "Rubik, sans-serif",
      "color": "#fff4e8",
      "fontWeight": 700
    },
    "address": {
      "x": 383,
      "y": 1427,
      "maxWidth": 324,
      "maxHeight": 83,
      "fontSize": 29,
      "fontFamily": "sans-serif",
      "color": "#fff4e8",
      "fontWeight": 400,
      "firstLineWeight": 700
    },
    "background": "../assets/designs/06_космос_фон.png"
  },
  {
    "id": "gift",
    "title": "Подарок",
    "width": 941,
    "height": 1672,
    "fonts": [
      "900 152px Rubik",
      "700 65px Rubik"
    ],
    "photo": {
      "x": 196,
      "y": 540,
      "width": 547,
      "height": 673,
      "shape": "rect",
      "placeholder": "background",
      "radius": 53
    },
    "name": {
      "x": 470,
      "y": 234,
      "maxWidth": 725,
      "fontSize": 152,
      "fontFamily": "Rubik, sans-serif",
      "color": "#f62521",
      "fontWeight": 900,
      "arc": {
        "rise": 30
      }
    },
    "date": {
      "x": 268,
      "y": 1320,
      "maxWidth": 359,
      "fontSize": 73,
      "fontFamily": "Rubik, sans-serif",
      "color": "#fff9eb",
      "fontWeight": 700
    },
    "time": {
      "x": 687,
      "y": 1320,
      "maxWidth": 280,
      "fontSize": 99,
      "fontFamily": "Rubik, sans-serif",
      "color": "#fff9eb",
      "fontWeight": 700
    },
    "address": {
      "x": 395,
      "y": 1489,
      "maxWidth": 337,
      "maxHeight": 104,
      "fontSize": 33,
      "fontFamily": "sans-serif",
      "color": "#034abe",
      "fontWeight": 400,
      "firstLineWeight": 700
    },
    "background": "../assets/designs/07_подарок_фон.png"
  },
  {
    "id": "ikea1",
    "title": "Икея1",
    "width": 941,
    "height": 1672,
    "fonts": [
      "900 135px Rubik",
      "700 42px Rubik"
    ],
    "photo": {
      "x": 307,
      "y": 537,
      "width": 370,
      "height": 542,
      "shape": "polygon",
      "placeholder": "background",
      "maskPath": "M 5 9 L 368 0 L 370 542 L 0 536 Z",
      "foreground": {
        "mode": "regions",
        "regions": [
          {
            "x": 303,
            "y": 1024,
            "width": 65,
            "height": 67,
            "type": "green"
          }
        ]
      }
    },
    "name": {
      "x": 478,
      "y": 187,
      "maxWidth": 580,
      "fontSize": 135,
      "fontFamily": "Rubik, sans-serif",
      "color": "#ffe336",
      "fontWeight": 900,
      "shadow": {
        "color": "#967e13",
        "offsetX": 0,
        "offsetY": 6,
        "blur": 1
      }
    },
    "date": {
      "x": 350,
      "y": 1352,
      "maxWidth": 305,
      "fontSize": 58,
      "fontFamily": "Impact, sans-serif",
      "color": "#eef5ff",
      "fontWeight": 400
    },
    "time": {
      "x": 793,
      "y": 1352,
      "maxWidth": 200,
      "fontSize": 72,
      "fontFamily": "Impact, sans-serif",
      "color": "#eef5ff",
      "fontWeight": 400
    },
    "address": {
      "x": 269,
      "y": 1502,
      "maxWidth": 560,
      "maxHeight": 105,
      "fontSize": 42,
      "fontFamily": "Rubik, sans-serif",
      "color": "#e0eeff",
      "fontWeight": 700,
      "firstLineWeight": 700
    },
    "captions": [
      {
        "text": "ДАТА",
        "x": 350,
        "y": 1410,
        "fontSize": 23,
        "color": "#c9e0ff",
        "align": "center"
      },
      {
        "text": "НАЧАЛО",
        "x": 793,
        "y": 1410,
        "fontSize": 23,
        "color": "#c9e0ff",
        "align": "center"
      }
    ],
    "background": "../assets/designs/08_икея1_фон.png"
  },
  {
    "id": "ikea2",
    "title": "Икея2",
    "width": 941,
    "height": 1672,
    "fonts": [
      "900 147px Rubik"
    ],
    "photo": {
      "x": 271,
      "y": 580,
      "width": 411,
      "height": 600,
      "shape": "rect",
      "placeholder": "background",
      "radius": 11
    },
    "name": {
      "x": 476,
      "y": 340,
      "maxWidth": 660,
      "fontSize": 147,
      "fontFamily": "Rubik, sans-serif",
      "color": "#ffffff",
      "fontWeight": 900,
      "stroke": {
        "color": "#082361",
        "width": 5
      },
      "shadow": {
        "color": "#051448",
        "offsetX": 0,
        "offsetY": 5,
        "blur": 1
      }
    },
    "date": {
      "x": 336,
      "y": 1348,
      "maxWidth": 258,
      "fontSize": 53,
      "fontFamily": "Impact, sans-serif",
      "color": "#ffffff",
      "fontWeight": 400
    },
    "time": {
      "x": 748,
      "y": 1348,
      "maxWidth": 197,
      "fontSize": 64,
      "fontFamily": "Impact, sans-serif",
      "color": "#ffffff",
      "fontWeight": 400
    },
    "address": {
      "x": 282,
      "y": 1464,
      "maxWidth": 522,
      "maxHeight": 95,
      "fontSize": 36,
      "fontFamily": "Arial Narrow, sans-serif",
      "color": "#ffffff",
      "fontWeight": 700,
      "firstLineWeight": 700
    },
    "captions": [
      {
        "text": "ДАТА",
        "x": 336,
        "y": 1396,
        "fontSize": 23,
        "color": "#fff231",
        "align": "center"
      },
      {
        "text": "НАЧАЛО",
        "x": 748,
        "y": 1396,
        "fontSize": 23,
        "color": "#fff231",
        "align": "center"
      }
    ],
    "background": "../assets/designs/09_икея2_фон.png"
  },
  {
    "id": "osd1",
    "title": "ОСД1",
    "width": 941,
    "height": 1672,
    "photo": {
      "x": 264,
      "y": 438,
      "width": 413,
      "height": 623,
      "shape": "rect",
      "placeholder": "background",
      "radius": 12
    },
    "name": {
      "x": 471,
      "y": 175,
      "maxWidth": 601,
      "fontSize": 123,
      "fontFamily": "Georgia, serif",
      "color": "#3e0805",
      "fontWeight": 700,
      "stroke": {
        "color": "#ff5a31",
        "width": 2
      },
      "shadow": {
        "color": "#ff2411",
        "offsetX": 0,
        "offsetY": 0,
        "blur": 14
      }
    },
    "date": {
      "x": 362,
      "y": 1287,
      "maxWidth": 211,
      "fontSize": 49,
      "fontFamily": "Georgia, serif",
      "color": "#dff4ff",
      "fontWeight": 700
    },
    "time": {
      "x": 724,
      "y": 1287,
      "maxWidth": 154,
      "fontSize": 60,
      "fontFamily": "Georgia, serif",
      "color": "#dff4ff",
      "fontWeight": 700
    },
    "address": {
      "x": 345,
      "y": 1441,
      "maxWidth": 378,
      "maxHeight": 76,
      "fontSize": 30,
      "fontFamily": "Georgia, serif",
      "color": "#dff4ff",
      "fontWeight": 400,
      "firstLineWeight": 700
    },
    "captions": [
      {
        "text": "ДАТА",
        "x": 362,
        "y": 1343,
        "fontSize": 23,
        "color": "#dff4ff",
        "align": "center"
      },
      {
        "text": "НАЧАЛО",
        "x": 724,
        "y": 1343,
        "fontSize": 23,
        "color": "#dff4ff",
        "align": "center"
      }
    ],
    "rules": [
      {
        "x1": 168,
        "x2": 775,
        "y": 103,
        "color": "#ff3b21",
        "width": 2,
        "glow": 8
      },
      {
        "x1": 168,
        "x2": 775,
        "y": 246,
        "color": "#ff3b21",
        "width": 2,
        "glow": 8
      }
    ],
    "background": "../assets/designs/10_ОСД1_фон.png"
  },
  {
    "id": "osd2",
    "title": "ОСД2",
    "background": "../assets/designs/11_ОСД2_фон.png",
    "width": 941,
    "height": 1672,
    "photo": {
      "x": 264,
      "y": 495,
      "width": 418,
      "height": 539,
      "shape": "rect",
      "placeholder": "background"
    },
    "name": {
      "x": 471,
      "y": 270,
      "maxWidth": 548,
      "fontSize": 124,
      "color": "#fff0d3",
      "fontFamily": "Georgia, serif",
      "fontWeight": 700,
      "shadow": {
        "color": "#f52113",
        "offsetX": 0,
        "offsetY": 0,
        "blur": 13
      }
    },
    "date": {
      "x": 367,
      "y": 1180,
      "maxWidth": 276,
      "fontSize": 54,
      "color": "#160d05",
      "fontFamily": "Georgia, serif",
      "fontWeight": 700
    },
    "time": {
      "x": 663,
      "y": 1180,
      "maxWidth": 180,
      "fontSize": 62,
      "color": "#160d05",
      "fontFamily": "Georgia, serif",
      "fontWeight": 700
    },
    "address": {
      "x": 471,
      "y": 1381,
      "maxWidth": 377,
      "maxHeight": 65,
      "fontSize": 30,
      "color": "#fff0d3",
      "fontFamily": "Georgia, serif",
      "fontWeight": 400,
      "firstLineWeight": 700,
      "align": "center",
      "lineHeight": 1.15
    },
    "captions": [
      {
        "text": "ДАТА",
        "x": 367,
        "y": 1239,
        "color": "#5e452d",
        "fontSize": 18,
        "align": "center"
      },
      {
        "text": "НАЧАЛО",
        "x": 663,
        "y": 1239,
        "color": "#5e452d",
        "fontSize": 18,
        "align": "center"
      }
    ]
  },
  {
    "id": "osd3",
    "title": "ОСД3",
    "background": "../assets/designs/12_ОСД3_фон.png",
    "width": 941,
    "height": 1672,
    "photo": {
      "x": 244,
      "y": 441,
      "width": 454,
      "height": 580,
      "shape": "rect",
      "placeholder": "background"
    },
    "name": {
      "x": 471,
      "y": 194,
      "maxWidth": 558,
      "fontSize": 120,
      "color": "#56110b",
      "fontFamily": "Georgia, serif",
      "fontWeight": 700,
      "stroke": {
        "color": "#ff7039",
        "width": 2
      },
      "shadow": {
        "color": "#ff2810",
        "offsetX": 0,
        "offsetY": 0,
        "blur": 13
      }
    },
    "date": {
      "x": 322,
      "y": 1366,
      "maxWidth": 239,
      "fontSize": 52,
      "color": "#fff0d3",
      "fontFamily": "Georgia, serif",
      "fontWeight": 700
    },
    "time": {
      "x": 730,
      "y": 1366,
      "maxWidth": 226,
      "fontSize": 63,
      "color": "#fff0d3",
      "fontFamily": "Georgia, serif",
      "fontWeight": 700
    },
    "address": {
      "x": 313,
      "y": 1490,
      "maxWidth": 404,
      "maxHeight": 65,
      "fontSize": 28,
      "color": "#fff0d3",
      "fontFamily": "Georgia, serif",
      "fontWeight": 400,
      "firstLineWeight": 700,
      "lineHeight": 1.15
    },
    "captions": [
      {
        "text": "ДАТА",
        "x": 322,
        "y": 1416,
        "color": "#fff0d3",
        "fontSize": 21,
        "align": "center"
      },
      {
        "text": "НАЧАЛО",
        "x": 730,
        "y": 1416,
        "color": "#fff0d3",
        "fontSize": 21,
        "align": "center"
      }
    ]
  },
  {
    "id": "doors",
    "title": "Doors",
    "background": "../assets/designs/13_Doors_фон.png",
    "width": 941,
    "height": 1672,
    "fonts": [
      "900 151px Rubik",
      "900 60px Rubik"
    ],
    "photo": {
      "x": 273,
      "y": 481,
      "width": 393,
      "height": 527,
      "shape": "rect",
      "placeholder": "background"
    },
    "name": {
      "x": 471,
      "y": 201,
      "maxWidth": 621,
      "fontSize": 151,
      "color": "#fff0d8",
      "fontFamily": "Rubik, sans-serif",
      "fontWeight": 900,
      "shadow": {
        "color": "#8b211a",
        "offsetX": 2,
        "offsetY": 8,
        "blur": 0
      }
    },
    "date": {
      "x": 356,
      "y": 1167,
      "maxWidth": 216,
      "fontSize": 53,
      "color": "#fff0d8",
      "fontFamily": "Rubik, sans-serif",
      "fontWeight": 900
    },
    "time": {
      "x": 726,
      "y": 1167,
      "maxWidth": 175,
      "fontSize": 65,
      "color": "#fff0d8",
      "fontFamily": "Rubik, sans-serif",
      "fontWeight": 900
    },
    "address": {
      "x": 357,
      "y": 1298,
      "maxWidth": 503,
      "maxHeight": 84,
      "fontSize": 35,
      "color": "#fff0d8",
      "fontFamily": "Rubik, sans-serif",
      "fontWeight": 700,
      "firstLineWeight": 700,
      "lineHeight": 1.15
    },
    "captions": [
      {
        "text": "ДАТА",
        "x": 356,
        "y": 1211,
        "color": "#a98765",
        "fontSize": 21,
        "align": "center"
      },
      {
        "text": "НАЧАЛО",
        "x": 726,
        "y": 1211,
        "color": "#a98765",
        "fontSize": 21,
        "align": "center"
      }
    ]
  }
];
