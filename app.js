/*
 * CONTENTS
 * 1. Onload
 * 2. App control
 * 3. Animations
 * 4. Grid functions
 * 5. Fill & toggle functions
 * 6. Portrait functions
 * 7. Draw functions
 *
 */

/*
 * 1. Onload
 *
 * Makes it go!
 */

window.onload = function() {
  makeGrid('portrait',45);
  // familyPortrait();
  // playPortrait();
  // workPortrait();
  introAnimate();
}

/*
 * 2. App control
 *
 * These control functionality and user interaction with content
 */

const startApp = () => {
  /*
  To do:
  1. Add event listeners for hover effects on buttons
  2. Add bottom text change on button hover (e.g. 'Hi, I'm Lucas' -> 'Learn about me')
  3. Add click events to display appropriate portrait and text area
  */
  console.log('Starting!');
}

/*
 * 3. Animations
 *
 * These make things move around the page, by moving a whole grid and/or
 * moving an element within its grid
 */

const introAnimate = (x=25,y=25,tick=30) => {
  drawLucas('portrait',x,y);

  const container = document.querySelector('.container');
  const undergrid = document.querySelector('.undergrid');
  // width offset to make sure he doesn't go off screen left in stage 2
  offsetX = 7
  // Stage timing variables, for reference and consistency
  const sOneEnd = 2100;
  const sTwoStart = sOneEnd + 500;
  const sTwoEnd = sTwoStart + (x - offsetX) * tick;
  const sThreeStart = sTwoEnd + 200;

  // Stage 1: Slide the grid down and into view
  container.style.transform = 'translate(-50%,-60%)';
  window.setTimeout(() => {
    resetGrid('portrait');
    drawLucas('portrait',x,y,{lucasArmPos:'wave'});
    undergrid.innerText = 'Hi, I\'m Lucas';
  }, sOneEnd);

  // Stage 2: Slide Lucas left
  // Modified from first draft animate function
  for (let j = x; j >= offsetX; j--) {
    window.setTimeout(() => {
      resetGrid('portrait');
      drawLucas('portrait',j,y,{lucasArmPos:'wave'});
    }, sTwoStart + (x-j) * tick);
  }
  window.setTimeout(() => {
    resetGrid('portrait');
    drawLucas('portrait',offsetX,y)
    undergrid.style.minWidth = '0';
  }, sThreeStart);

  // Stage 3: Add nav buttons
  window.setTimeout(() => {
    // drawButtons(,29,19)
    // Also start the app from here, since it's our last step
    startApp();
  }, sThreeStart);
}

/*
 * 4. Grid functions
 *
 * These create or clear entire grids
 */

const makeGrid = (name, size=45) => {
  const grid = document.querySelector(`.grid.grid--${name}`);

  for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
      const pix = document.createElement('div');
      pix.classList.add('pixel');
      pix.id = `${name}-x${j}y${i}`;
      grid.appendChild(pix);
    }
  }

  grid.style.width = `${size*.75}rem`;
}

const resetGrid = (name='all') => {
  const pixels = document.querySelectorAll(name == 'all' ? '.pixel' : `.grid--${name} .pixel`);
  pixels.forEach(pixel => {
    pixel.className = 'pixel';
  });
}

/*
 * 5. Fill & toggle functions
 *
 * These fill in pixels on a grid with a color, and/or toggle class values
 */

const addButtonClass = (gridName, x, y, range, classes) => {
  // Take a range defining a rectangle, and add a class to all pixels inside the rectangle
  let rows = []
  for (let i = range.rowStart; i <= range.rowEnd; i++) {
    rows.push(i);
  }
  rows.forEach(row => {
    for (let j = range.colStart; j <= range.colEnd; j++) {
        const target = document.querySelector(`#${gridName}-x${x + j}y${y + Number(row)}`);
        if (target) {
          target.classList.add(...classes);
        }
      }
  });
}

const fill = (gridName, x, y, fillMap, fillClass) => {
  // fills pixels indicated in map by attaching the indicated class
  for (row in fillMap) {
    fillMap[row].forEach(col => {
      const target = document.querySelector(`#${gridName}-x${x + col}y${y + Number(row)}`);
      // target.classList.add(fillClass);
      // Using className to let later drawings override earlier, as opposed to letting CSS order control which one displays
      if (target) {
        target.className = 'pixel ' + fillClass;
      }
    })
  }
}

/*
 * 6. Portrait functions
 *
 * These combine elements from draw functions into portraits/scenes
 */

const familyPortrait = (x=0, y=0, opt={}) => {
  // Family portrait is 45px wide and 39px tall
  opt.kimArmPos = opt.kimArmPos || 'wave';
  opt.headband = opt.headband || false,
  opt.shirtColor = opt.shirtColor || 'blue',
  opt.pantsColor = opt.pantsColor || 'gray',
  opt.shorts = opt.shorts || false,
  opt.lucasArmPos = opt.lucasArmPos || 'wave',

  drawLucas('portrait',x+4,y,opt);
  drawFiggy('portrait',x+18,y+30);
  drawKim('portrait',x+23,y+6,opt);
  drawSylvie('portrait',x+37,y+29);
}

const playPortrait = (x=0, y=0, opt={}) => {
  // Play portrait is 42px wide and 39px tall
  opt.headband = opt.headband || 'red',
  opt.shirtColor = opt.shirtColor || 'red',
  opt.pantsColor = opt.pantsColor || 'gray',
  opt.shorts = opt.shorts || true,
  opt.lucasArmPos = opt.lucasArmPos || 'thumbsUp',

  drawLucas('portrait',x+7,y,opt);
  drawBar('portrait',x,y+30);
  drawBookshelf('portrait',x+28,y+14);
}

const workPortrait = (x=0, y=0, opt={}) => {
  // Work portrait is 32px wide and 39px tall
  opt.headband = opt.headband || false,
  opt.shirtColor = opt.shirtColor || 'blue',
  opt.pantsColor = opt.pantsColor || 'gray',
  opt.shorts = opt.shorts || false,
  opt.lucasArmPos = opt.lucasArmPos || 'down',

  drawLucas('portrait',x+7,y,opt);
  drawDesk('portrait',x,y+13);
}

/*
 * 7. Draw functions
 *
 * These draw individual elements
 */

// Default options object for all drawing functions
const defaultOpt = {
  headband: false,
  shirtColor: 'blue',
  pantsColor: 'gray',
  shorts: false,
  lucasArmPos: 'down',
  kimArmPos: 'down',
}

// Now the draw functions!
const drawBar = (gridName, x=0, y=0) => {
  // bar is 9px tall and 26px wide
  const blackMap = {
    0: [2,3,22,23],
    1: [2,3,22,23],
    2: [1,2,3,22,23,24],
    3: [0,1,2,3,22,23,24,25],
    4: [0,1,2,3,22,23,24,25],
    5: [0,1,2,3,22,23,24,25],
    6: [1,2,3,22,23,24],
    7: [2,3,22,23],
    8: [2,3,22,23],
  }
  fill(gridName,x,y,blackMap,'black');

  fill(gridName,x,y,{4:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},'gray')
}

const drawBookshelf = (gridName, x=0, y=0) => {
  // bookshelf is 14px wide and 25px tall
  const darkLeatherMap = {
    0: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
    1: [0,13],
    2: [0,13],
    3: [0,13],
    4: [0,13],
    5: [0,13],
    6: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
    7: [0,13],
    8: [0,13],
    9: [0,13],
    10: [0,13],
    11: [0,13],
    12: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
    13: [0,13],
    14: [0,13],
    15: [0,13],
    16: [0,13],
    17: [0,13],
    18: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
    19: [0,13],
    20: [0,13],
    21: [0,13],
    22: [0,13],
    23: [0,13],
    24: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
  }
  fill(gridName,x,y,darkLeatherMap,'dark-leather');

  const bookshelfBackMap = {
    1: [1,2,3,4,5,6,7,8,9,10,11,12],
    2: [2,7,8,9],
    7: [1,2,3,4,5,6,7,8,9,10,11,12],
    8: [2,3,5,6,10,11,12],
    13: [1,2,3,4,5,6,7,8,9,10,11,12],
    14: [4,7,9,12],
    19: [1,2,3,4,5,6,7,8,9,10,11,12],
    20: [4,5,9,10],
  }
  fill(gridName,x,y,bookshelfBackMap,'bookshelf-back');

  const darkGreenMap = {
    2: [1],
    3: [1],
    4: [1],
    5: [1],
    8: [7,8],
    9: [7,8],
    10: [7,8],
    11: [7,8],
    14: [10,11],
    15: [10,11],
    16: [10,11],
    17: [10,11],
    20: [3],
    21: [3],
    22: [3],
    23: [3],
  }
  fill(gridName,x,y,darkGreenMap,'dark-green');

  const tealMap = {
    2: [12],
    3: [2,12],
    4: [2,12],
    5: [2,12],
    8: [9],
    9: [9],
    10: [9],
    11: [9],
    14: [5,6],
    15: [5,6],
    16: [5,6],
    17: [5,6],
    20: [8],
    21: [8],
    22: [8],
    23: [8],
  }
  fill(gridName,x,y,tealMap,'teal');

  const denimMap = {
    2: [3,4,11],
    3: [3,4,11],
    4: [3,4,11],
    5: [3,4,11],
    9: [5,6],
    10: [5,6],
    11: [5,6],
    14: [2,3,8],
    15: [2,3,8],
    16: [2,3,8],
    17: [2,3,8],
    20: [12],
    21: [12],
    22: [12],
    23: [12],
  }
  fill(gridName,x,y,denimMap,'denim');

  const violetMap = {
    2: [5],
    3: [5],
    4: [5],
    5: [5],
    8: [1],
    9: [1],
    10: [1],
    11: [1],
    15: [7],
    16: [7],
    17: [7],
    21: [9,10],
    22: [9,10],
    23: [9,10],
  }
  fill(gridName,x,y,violetMap,'violet');

  const grayMap = {
    2: [6],
    3: [6],
    4: [6],
    5: [6],
    9: [10,11],
    10: [10,11],
    11: [10,11],
    15: [4,12],
    16: [4,12],
    17: [4,12],
    20: [6,7],
    21: [6,7],
    22: [6,7],
    23: [6,7],
  }
  fill(gridName,x,y,grayMap,'gray');

  const orangeMap = {
    3: [7],
    4: [7],
    5: [7],
    9: [2,3],
    10: [2,3],
    11: [2,3],
    20: [11],
    21: [11],
    22: [11],
    23: [11],
  }
  fill(gridName,x,y,orangeMap,'orange');

  const creamMap = {
    3: [8,9],
    4: [8,9],
    5: [8,9],
    8: [4],
    9: [4],
    10: [4],
    11: [4],
    15: [9],
    16: [9],
    17: [9],
    20: [1,2],
    21: [1,2],
    22: [1,2],
    23: [1,2],
  }
  fill(gridName,x,y,creamMap,'cream');

  const darkRedMap = {
    2: [10],
    3: [10],
    4: [10],
    5: [10],
    9: [12],
    10: [12],
    11: [12],
    14: [1],
    15: [1],
    16: [1],
    17: [1],
    21: [4,5],
    22: [4,5],
    23: [4,5],
  }
  fill(gridName,x,y,darkRedMap,'dark-red');
}

const drawButtons = (gridName, x=0, y=0) => {
  // all buttons together are 35px wide and 45px tall
  const buttonsTextMap = {
    0: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],
    1: [1,33],
    2: [0,34],
    3: [0,4,5,6,9,10,11,12,16,17,18,21,25,27,28,29,30,31,34],
    4: [0,3,7,9,13,15,19,21,25,29,34],
    5: [0,3,7,9,13,15,19,21,25,29,34],
    6: [0,3,4,5,6,7,9,10,11,12,15,19,21,25,29,34],
    7: [0,3,7,9,13,15,19,21,25,29,34],
    8: [0,3,7,9,13,15,19,21,25,29,34],
    9: [0,3,7,9,10,11,12,16,17,18,22,23,24,29,34],
    10: [0,34],
    11: [1,33],
    12: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],
    16: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
    17: [1,27],
    18: [0,28],
    19: [0,3,7,10,11,12,15,16,17,18,21,25,28],
    20: [0,3,7,9,13,15,19,21,24,28],
    21: [0,3,7,9,13,15,19,21,23,28],
    22: [0,3,5,7,9,13,15,16,17,18,21,22,28],
    23: [0,3,5,7,9,13,15,17,21,23,28],
    24: [0,3,5,7,9,13,15,18,21,24,28],
    25: [0,4,6,10,11,12,15,19,21,25,28],
    26: [0,28],
    27: [1,27],
    28: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
    32: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
    33: [1,27],
    34: [0,28],
    35: [0,3,4,5,6,9,16,17,18,21,25,28],
    36: [0,3,7,9,15,19,21,25,28],
    37: [0,3,7,9,15,19,22,24,28],
    38: [0,3,4,5,6,9,15,16,17,18,19,23,28],
    39: [0,3,9,15,19,23,28],
    40: [0,3,9,15,19,23,28],
    41: [0,3,9,10,11,12,13,15,19,23,28],
    42: [0,28],
    43: [1,27],
    44: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
  }
  fill(gridName,x,y,buttonsTextMap,'button__text');


  const aboutButtonRange = {
    rowStart: 0,
    rowEnd: 12,
    colStart: 0,
    colEnd: 34
  }
  addButtonClass(x,y,aboutButtonRange,['button','button--about']);

  const workButtonRange = {
    rowStart: 32,
    rowEnd: 44,
    colStart: 0,
    colEnd: 28
  }
  addButtonClass(x,y,workButtonRange,['button','button--work']);

  const playButtonRange = {
    rowStart: 16,
    rowEnd: 28,
    colStart: 0,
    colEnd: 28
  }
  addButtonClass(x,y,playButtonRange,['button','button--play']);

}

const drawDesk = (gridName, x=0, y=0) => {
  // Desk and stuff are 32px wide and 26px tall

  const lightGrayMap = {
    0: [20,21,22,23,24,25,26,27,28,29,30,31],
    1: [20,21,22,23,24,25,26,27,28,29,30,31],
    2: [20,21,22,23,24,25,27,28,29,30,31],
    3: [20,21,22,23,24,26,27,28,29,30,31],
    4: [20,21,22,23,24,27,28,29,30,31],
    5: [20,21,22,23,24,25,26,27,28,29,30,31],
    6: [20,21,22,23,24,25,26,27,28,29,30,31],
    7: [20,21,22,23,24,25,26,27,28,29,30,31],
    10: [24,25,26,27],
  }
  fill(gridName,x,y,lightGrayMap,'light-gray');

  const grayMap = {
    2: [26],
    3: [25],
    4: [25,26],
  }
  fill(gridName,x,y,grayMap,'gray');

  const shadowMap = {
    8: [25,26],
    9: [25,26],
  }
  fill(gridName,x,y,shadowMap,'shadow-gray');

  const darkLeatherMap = {
    11: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    12: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    13: [0,31],
    14: [0,31],
    15: [0,31],
    16: [0,31],
    17: [0,31],
    18: [0,31],
    19: [0,31],
    20: [0,31],
    21: [0,31],
    22: [0,31],
    23: [0,31],
    24: [0,31],
    25: [0,31],
  }
  fill(gridName,x,y,darkLeatherMap,'dark-leather');

  const blackMap = {
    8: [15,16,17],
    9: [14,15,16,17],
    10: [15,16,17],
  }
  fill(gridName,x,y,blackMap,'black');

  const stubbleMap = {
    8: [1,2,3],
    9: [1,2,3],
    10: [1,2,3],
  }
  fill(gridName,x,y,stubbleMap,'stubble');

  fill(gridName,x,y,{7: [2]},'light-brown');

  const greenMap = {
    4: [1,2,3],
    5: [0,1,2,3,4],
    6: [0,1,2,3,4],
  }
  fill(gridName,x,y,greenMap,'green');
}

const drawFiggy = (gridName, x=0, y=0) => {
  // Figgy is 7px wide and 9px tall

  // row y0: gray x0-1, light-gray x2-4, gray x5-6
  // row y1: gray x0-1, black x2, light-gray x3, black x4, gray x5-6
  // row y2: gray x1, light-gray x2-4, gray x5
  // row y3: light-gray x2, black x3, light-gray x4
  // row y4: blue x2-4
  // row y5: light-gray x2-4
  // row y6: light-gray x1-5
  // row y7: light gray x1, gray x2, light gray x3, gray x4, light gray x5
  // row y8: gray x0, light gray x1, gray x2, light gray x3, gray x4, light gray x5, gray x6

  const grayMap = {
    0: [0,1,5,6],
    1: [0,1,5,6],
    2: [1,5],
    7: [2,4],
    8: [0,2,4,6],
  };
  fill(gridName,x,y,grayMap,'gray');

  const lightGrayMap = {
    0: [2,3,4],
    1: [3],
    2: [2,3,4],
    3: [2,4],
    5: [2,3,4],
    6: [1,2,3,4,5],
    7: [1,3,5],
    8: [1,3,5],
  };
  fill(gridName,x,y,lightGrayMap,'light-gray');

  const blackMap = {
    1: [2,4],
    3: [3],
  };
  fill(gridName,x,y,blackMap,'black');

  fill(gridName,x,y,{4:[2,3,4]},'blue');
}

const drawKim = (gridName, x=0, y=0, opt={kimArmPos:'down'}) => {
  drawKimMain(gridName,x,y,opt);
  drawKimArms(gridName,x+2,y+16,opt);
}

const drawKimArms = (gridName, x=0, y=0, opt={}) => {
  const downMap = {
    0: [1,2,9,10],
    1: [1,2,9,10],
    2: [1,2,9,10],
    3: [1,2,9,10],
    4: [1,2,9,10],
    5: [0,1,2,9,10,11],
    6: [1,2,9,10],
  }
  const waveMap = {
    '-6': [13,14],
    '-5': [12,13,14],
    '-4': [13,14],
    '-3': [13,14],
    '-2': [11,12,13,14],
    '-1': [11,12,13,14],
    0: [1,2],
    1: [1,2],
    2: [1,2],
    3: [1,2],
    4: [1,2],
    5: [0,1,2],
    6: [1,2],
  }
  let selectedMap = {}
  switch (opt.kimArmPos) {
    case 'down':
      selectedMap = downMap;
      break;
    case 'wave':
      selectedMap = waveMap;
      break;
    default:
      selectedMap = downMap;
  }

  fill(gridName,x,y,selectedMap,'skin');
}

const drawKimMain = (gridName, x=0, y=0, opt={}) => {
  // Kim is 14px wide and 33px tall

  // row y0: light brown x4-10
  // row y1: light brown x3-11
  // row y2: light brown x2-8, skin x9-10, light brown x11-12
  // row y3: light brown x2-5, skin x6-11, light brown x12-13
  // row y4: light brown x1-3, skin x4-12, light brown x13
  // row y5: light brown x1, skin x2, light brown x3, skin x4, black x5, skin x6-9, black x10, skin x11-13
  // row y6: light brown x1, skin x2-4, black x5, skin x6-9, black x10, skin x11-13
  // row y7: light brown x1-2, skin x3-12, light brown x13
  // row y8: light brown x1-2, skin x3-5, white x6-9, skin x10-12, light brown x13
  // row y9: light brown x1-2, skin x3-6, white x7-8, skin x9-12, light brown x13
  // row y10: light brown x0-3, skin x4-11, light brown x12-13
  // row y11: light brown x0-4, skin x5-10, light brown x11-12
  // row y12: light brown x0-6, skin x7-8, light brown x9-11
  // row y13: light brown x1-4, purple x5-10
  // rows y14-15: purple x3-12
  // rows y16-20: purple x5-10
  // rows y21-23: gray x5-10
  // rows y24-30: gray x5-6, gray x9-10
  // row y31: leather x4-6, leather x9-11
  // row y32: dark leather x4-6, dark leather x9-11

  const lightBrownMap = {
    0: [4,5,6,7,8,9,10],
    1: [3,4,5,6,7,8,9,10,11],
    2: [2,3,4,5,6,7,8,11,12],
    3: [2,3,4,5,12,13],
    4: [1,2,3,13],
    5: [1,3],
    6: [1],
    7: [1,2,13],
    8: [1,2,13],
    9: [1,2,13],
    10: [0,1,2,3,12,13],
    11: [0,1,2,3,4,11,12],
    12: [0,1,2,3,4,5,6,9,10,11],
    13: [1,2,3,4],
  }
  fill(gridName,x,y,lightBrownMap,'light-brown');

  const skinMap = {
    2: [9,10],
    3: [6,7,8,9,10,11],
    4: [4,5,6,7,8,9,10,11,12],
    5: [2,4,6,7,8,9,11,12,13],
    6: [2,3,4,6,7,8,9,11,12,13],
    7: [3,4,5,6,7,8,9,10,11,12],
    8: [3,4,5,10,11,12],
    9: [3,4,5,6,9,10,11,12],
    10: [4,5,6,7,8,9,10,11],
    11: [5,6,7,8,9,10],
    12: [7,8],
  }
  fill(gridName,x,y,skinMap,'skin');

  const blackMap = {
    5: [5,10],
    6: [5,10],
  }
  fill(gridName,x,y,blackMap,'black');

  const whiteMap = {
    8: [6,7,8,9],
    9: [7,8],
  }
  fill(gridName,x,y,whiteMap,'white');

  const purpleMap = {
    13: [5,6,7,8,9,10],
    14: [3,4,5,6,7,8,9,10,11,12],
    15: [3,4,5,6,7,8,9,10,11,12],
    16: [5,6,7,8,9,10],
    17: [5,6,7,8,9,10],
    18: [5,6,7,8,9,10],
    19: [5,6,7,8,9,10],
    20: [5,6,7,8,9,10],
  }
  fill(gridName,x,y,purpleMap,'purple');

  const grayMap = {
    21: [5,6,7,8,9,10],
    22: [5,6,7,8,9,10],
    23: [5,6,7,8,9,10],
    24: [5,6,9,10],
    25: [5,6,9,10],
    26: [5,6,9,10],
    27: [5,6,9,10],
    28: [5,6,9,10],
    29: [5,6,9,10],
    30: [5,6,9,10],
  }
  fill(gridName,x,y,grayMap,'gray');

  fill(gridName,x,y,{31:[4,5,6,9,10,11]},'leather');
  fill(gridName,x,y,{32:[4,5,6,9,10,11]},'dark-leather');
}

const drawLucas = (gridName, x=0, y=0, opt=defaultOpt) => {
  drawLucasHead(gridName,x,y,opt);
  drawLucasShirt(gridName,x,y+15,opt);
  drawLucasLegs(gridName,x,y+25,opt);
  drawLucasArms(gridName,x,y+18,opt);
}

const drawLucasArms = (gridName, x=0, y=0, opt={}) => {
  // Arms! Should fit in sleeves (duh)
  // Offest from head origin should be x+0,y+18
  // Depending on position, some X values may be negative

  const thumbsUpMap = {
    0: [0,1,10,11],
    1: [-4,0,1,10,11],
    2: [-5,-4,0,1,10,11],
    3: [-5,-4,-3,-2,-1,0,1,10,11],
    4: [-5,-4,-3,-2,-1,0,1,10,11],
    5: [10,11],
    6: [10,11],
    7: [10,11,12],
    8: [10,11,12],
    9: [10,11],
  }
  const downMap = {
    0: [0,1,10,11],
    1: [0,1,10,11],
    2: [0,1,10,11],
    3: [0,1,10,11],
    4: [0,1,10,11],
    5: [0,1,10,11],
    6: [0,1,10,11],
    7: [-1,0,1,10,11,12],
    8: [-1,0,1,10,11,12],
    9: [0,1,10,11],
  }
  const waveMap = {
    '-9': [-4,-3],
    '-8': [-4,-3,-2],
    '-7': [-4,-3,-2],
    '-6': [-4,-3],
    '-5': [-4,-3],
    '-4': [-4,-3],
    '-3': [-4,-3],
    '-2': [-4,-3,-2,-1],
    '-1': [-4,-3,-2,-1],
    0: [10,11],
    1: [10,11],
    2: [10,11],
    3: [10,11],
    4: [10,11],
    5: [10,11],
    6: [10,11],
    7: [10,11,12],
    8: [10,11,12],
    9: [10,11],
  }
  // Pick the correct map for the arm position
  let selectedMap = {}
  switch (opt.lucasArmPos) {
    case 'thumbsUp':
      selectedMap = thumbsUpMap;
      break;
    case 'down':
      selectedMap = downMap;
      break;
    case 'wave':
      selectedMap = waveMap;
      break;
    default:
      selectedMap = downMap;
  }

  fill(gridName,x,y,selectedMap,'skin');
}

const drawLucasHead = (gridName, x=0, y=0, opt={}) => {
  // From drawing made on pixilart.com
  // x and y are points of origin (top left) of image

  // All x coordinates in comments below were written when this
  // was a part of drawLucas, so they've been adjusted in the
  // actual code to be 5 less than they are in the comments

  // Upper face: hair, forehead, eyes, ears
  // row y0. brown hair: x8-x13
  // row y1. brown hair: x7-x14
  // row y2. brown hair: x6-x14. light brown hair: x15
  // row y3. brown hair: x6-x8. skin: x9-x15
  // row y4. brown hair: x6. skin: x7-x15
  // row y5. skin: x5-7. black eye x8. skin x9-12. eye x13. skin x14-16
  // row y6. Same as row y5

  // Lower face: cheeks, mouth, beard
  // row y7: stubble x6, skin x7-14, stubble x15
  // row y8: stubble x6, skin x7, stubble x8, light brown hair x9-12, stubble x13, skin x14, stubble x15
  // row y9: stubble x6-7, light brown hair x8, white x9-12, light brown hair x13, stubble x14-15
  // row y10: brown hair x6, light brown hair x7-8, stubble x9, white x10-11, stubble x12, light brown hair x13-14, brown hair x15
  // row y11: dark brown hair x6, light brown hair x7-14, dark brown hair x15
  // row y12: dark brown hair x6, brown hair x7-14, dark brown hair x15
  // row y13: darkest brown hair x6, dark brown hair x7-14, darkest brown hair x15
  // row y14: darkest brown hair x7-8, dark brown hair x9-12, darkest brown hair x13-14
  // row y15: darkest brown hair x8-13

  // Maps hold coordinates for all pixels of a specific color,
  // relative to the object's origin. Object keys are rows (y-
  // values), and arrays are all x-values on that row of that color
  const brownMap = {
    0: [3,4,5,6,7,8],
    1: [2,3,4,5,6,7,8,9],
    2: [1,2,3,4,5,6,7,8,9],
    3: [1,2,3],
    4: [1],
    10: [1,10],
    12: [2,3,4,5,6,7,8,9],
  }
  fill(gridName,x,y,brownMap,'brown')

  const lightBrownMap = {
    2: [10],
    8: [4,5,6,7],
    9: [3,8],
    10: [2,3,8,9],
    11: [2,3,4,5,6,7,8,9],
  }
  fill(gridName,x,y,lightBrownMap,'light-brown');

  const stubbleMap = {
    7: [1,10],
    8: [1,3,8,10],
    9: [1,2,9,10],
    10: [4,7],
  }
  fill(gridName,x,y,stubbleMap,'stubble');

  const darkBrownMap = {
    11: [1,10],
    12: [1,10],
    13: [2,3,4,5,6,7,8,9],
    14: [4,5,6,7],
  }
  fill(gridName,x,y,darkBrownMap,'dark-brown');

  const darkestBrownMap = {
    13: [1,10],
    14: [2,3,8,9],
    15: [3,4,5,6,7,8],
  }
  fill(gridName,x,y,darkestBrownMap,'darkest-brown');

  const skinMap = {
    3: [4,5,6,7,8,9,10],
    4: [2,3,4,5,6,7,8,9,10],
    5: [0,1,2,4,5,6,7,9,10,11],
    6: [0,1,2,4,5,6,7,9,10,11],
    7: [2,3,4,5,6,7,8,9],
    8: [2,9],
  }
  fill(gridName,x,y,skinMap,'skin');

  const blackMap = {
    5: [3,8],
    6: [3,8],
  }
  fill(gridName,x,y,blackMap,'black');

  const whiteMap = {
    9: [4,5,6,7],
    10: [5,6],
  }
  fill(gridName,x,y,whiteMap,'white');

  // Add a headband!
  if (opt.headband) {
    const headbandMap = {
      2: [1,2,3,4,5,6,7,8,9,10],
      3: [1,2,3,4,5,6,7,8,9,10],
    }
    fill(gridName,x,y,headbandMap,opt.headband);
  }

}

const drawLucasLegs = (gridName, x=0, y=0, opt={}) => {
  // Pants and shoes! Designed to sit immediately under shirt
  // Offset from head origin should be x+0, y+25;
  const pantsMap = {
    0: [2,3,4,5,6,7,8,9],
    1: [2,3,4,5,6,7,8,9],
    2: [2,3,4,7,8,9],
    3: [2,3,4,7,8,9],
    4: [2,3,4,7,8,9],
    5: [2,3,4,7,8,9],
    6: [2,3,4,7,8,9],
    7: [2,3,4,7,8,9],
    8: [2,3,4,7,8,9],
    9: [2,3,4,7,8,9],
    10: [2,3,4,7,8,9],
    11: [2,3,4,7,8,9],
  }
  fill(gridName,x,y,pantsMap,opt.pantsColor || 'gray');

  const leatherMap = {
    12: [0,1,2,3,4,7,8,9,10,11],
  }
  fill(gridName,x,y,leatherMap,'leather');

  const darkLeatherMap = {
    13: [0,1,2,3,4,7,8,9,10,11],
  }
  fill(gridName,x,y,darkLeatherMap,'dark-leather');

  // If wearing shorts, erase some of what is done above!
  if (opt.shorts) {
    const backgroundMap = {
      6: [4,7],
      7: [4,7],
      8: [4,7],
      9: [4,7],
      10: [4,7],
      11: [4,7],
      12: [4,7],
      13: [4,7],
    }
    fill(gridName,x,y,backgroundMap,'');

    const legsMap = {
      6: [2,3,8,9],
      7: [2,3,8,9],
      8: [2,3,8,9],
      9: [2,3,8,9],
      10: [2,3,8,9],
      11: [2,3,8,9],
    }
    fill(gridName,x,y,legsMap,'skin');
  }
}

const drawLucasShirt = (gridName, x=0, y=0, opt={}) => {
  // t-shirt! Designed to fit immediately under my head
  // Offset from head origin should be x+0, y+15

  shirtMap = {
    0: [1,2,9,10],
    1: [0,1,2,3,4,5,6,7,8,9,10,11],
    2: [0,1,2,3,4,5,6,7,8,9,10,11],
    3: [2,3,4,5,6,7,8,9],
    4: [2,3,4,5,6,7,8,9],
    5: [2,3,4,5,6,7,8,9],
    6: [2,3,4,5,6,7,8,9],
    7: [2,3,4,5,6,7,8,9],
    8: [2,3,4,5,6,7,8,9],
    9: [2,3,4,5,6,7,8,9],
  }
  fill(gridName,x,y,shirtMap,opt.shirtColor || 'blue');

}

const drawSylvie = (gridName, x=0, y=0) => {
  // Sylvie is 8px wide and 10px tall

  // row y0: gold x0, gold x4
  // row y1: gold x0-1, gold x3-4
  // row y2: yellow x0-4
  // row y3: yellow x0, black x1, yellow x2, black x3, yellow x4
  // row y4: yellow x0-1, black x2, yellow x3-4
  // row y5: yellow x1-3
  // row y6: yellow x0-4, gold x6-7
  // row y7: yellow x0-4, gold x7
  // row y8: yellow x0, gold x1, yellow x2, gold x3, yellow x4, gold x7
  // row y9: yellow x0, gold x1, yellow x2, gold x3, yellow x4, gold x5-7

  const goldMap = {
    0: [0,4],
    1: [0,1,3,4],
    6: [6,7],
    7: [7],
    8: [1,3,7],
    9: [1,3,5,6,7],
  }
  fill(gridName,x,y,goldMap,'gold');

  const yellowMap = {
    2: [0,1,2,3,4],
    3: [0,2,4],
    4: [0,1,3,4],
    5: [1,2,3],
    6: [0,1,2,3,4],
    7: [0,1,2,3,4],
    8: [0,2,4],
    9: [0,2,4],
  }
  fill(gridName,x,y,yellowMap,'yellow');

  const blackMap = {
    3: [1,3],
    4: [2],
  }
  fill(gridName,x,y,blackMap,'black');
}
