window.onload = function() {
  makeGrid();
  drawLucas(26,10);
  drawFiggy(40,40);
  drawKim(5,5);
}

const makeGrid = (cols=64, rows=64) => {
  const grid = document.querySelector('.grid');

  for (let i=0; i<rows; i++) {
    for (let j=0; j<cols; j++) {
      const pix = document.createElement('div');
      pix.classList.add('pixel');
      pix.id = `x${j}y${i}`;
      grid.appendChild(pix);
    }
  }

  grid.style.width = `${rows*.75}rem`;
}

const resetGrid = () => {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach(pixel => {
    pixel.classList.remove(...pixel.classList);
    pixel.classList.add('pixel');
  });
}

const fill = (x, y, fillMap, fillClass) => {
  // fills pixels indicated in map by attaching the indicated class
  for (row in fillMap) {
    fillMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add(fillClass);
    })
  }
}

const drawLucasHead = (x=0, y=0) => {
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
  fill(x,y,brownMap,'brown')

  const lightBrownMap = {
    2: [10],
    8: [4,5,6,7],
    9: [3,8],
    10: [2,3,8,9],
    11: [2,3,4,5,6,7,8,9],
  }
  fill(x,y,lightBrownMap,'light-brown');

  const stubbleMap = {
    7: [1,10],
    8: [1,3,8,10],
    9: [1,2,9,10],
    10: [4,7],
  }
  fill(x,y,stubbleMap,'stubble');

  const darkBrownMap = {
    11: [1,10],
    12: [1,10],
    13: [2,3,4,5,6,7,8,9],
    14: [4,5,6,7],
  }
  fill(x,y,darkBrownMap,'dark-brown');

  const darkestBrownMap = {
    13: [1,10],
    14: [2,3,8,9],
    15: [3,4,5,6,7,8],
  }
  fill(x,y,darkestBrownMap,'darkest-brown');

  const skinMap = {
    3: [4,5,6,7,8,9,10],
    4: [2,3,4,5,6,7,8,9,10],
    5: [0,1,2,4,5,6,7,9,10,11],
    6: [0,1,2,4,5,6,7,9,10,11],
    7: [2,3,4,5,6,7,8,9],
    8: [2,9],
  }
  fill(x,y,skinMap,'skin');

  const blackMap = {
    5: [3,8],
    6: [3,8],
  }
  fill(x,y,blackMap,'black');

  const whiteMap = {
    9: [4,5,6,7],
    10: [5,6],
  }
  fill(x,y,whiteMap,'white');

}

const drawLucasShirt = (x=0, y=0, color='blue') => {
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
  fill(x,y,shirtMap,color);

}

const drawLucasLegs = (x=0, y=0, color='gray') => {
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
  fill(x,y,pantsMap,color);

  const leatherMap = {
    12: [0,1,2,3,4,7,8,9,10,11],
  }
  fill(x,y,leatherMap,'leather');

  const darkLeatherMap = {
    13: [0,1,2,3,4,7,8,9,10,11],
  }
  fill(x,y,darkLeatherMap,'dark-leather');
}

const drawLucasArms = (x=0, y=0, position='thumbsUp') => {
  // Arms! Should fit in sleeves (duh)
  // Offest from head origin should be x+0,y+18
  // Depending on position, some X values may be negative

  thumbsUpMap = {
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
  // Pick the correct map for the position
  let selectedMap = {}
  switch (position) {
    case 'thumbsUp':
      selectedMap = thumbsUpMap;
      break;
    default:
      selectedMap = thumbsUpMap;
  }

  fill(x,y,selectedMap,'skin');
}

const drawLucas = (x=0, y=0, shirt='blue', legs='gray', arms='thumbsUp') => {
  drawLucasHead(x,y);
  drawLucasShirt(x,y+15,shirt);
  drawLucasLegs(x,y+25,legs);
  drawLucasArms(x,y+18,arms);
}

const drawFiggy = (x=0, y=0) => {
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
  fill(x,y,grayMap,'gray');

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
  fill(x,y,lightGrayMap,'light-gray');

  const blackMap = {
    1: [2,4],
    3: [3],
  };
  fill(x,y,blackMap,'black');

  fill(x,y,{4:[2,3,4]},'blue');
}

const drawKimMain = (x=0, y=0) => {
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
  fill(x,y,lightBrownMap,'light-brown');

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
  fill(x,y,skinMap,'skin');

  const blackMap = {
    5: [5,10],
    6: [5,10],
  }
  fill(x,y,blackMap,'black');

  const whiteMap = {
    8: [6,7,8,9],
    9: [7,8],
  }
  fill(x,y,whiteMap,'white');

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
  fill(x,y,purpleMap,'purple');

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
  fill(x,y,grayMap,'gray');

  fill(x,y,{31:[4,5,6,9,10,11]},'leather');
  fill(x,y,{32:[4,5,6,9,10,11]},'dark-leather');
}

const drawKimArms = (x=0, y=0, position='down') => {
  downMap = {
    0: [1,2,9,10],
    1: [1,2,9,10],
    2: [1,2,9,10],
    3: [1,2,9,10],
    4: [1,2,9,10],
    5: [0,1,2,9,10,11],
    6: [1,2,9,10],
  }
  let selectedMap = {}
  switch (position) {
    case 'down':
      selectedMap = downMap;
      break;
    default:
      selectedMap = downMap;
  }

  fill(x,y,selectedMap,'skin');
}

const drawKim = (x=0, y=0, arms='down') => {
  drawKimMain(x,y);
  drawKimArms(x+2,y+16,arms);
}
