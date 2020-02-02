window.onload = function() {
  makeGrid();
  drawLucasHead(26,10);
  drawLucasShirt(26,25,'blue');
  drawLucasLegs(26,35,'gray');
  drawLucasArms(26,28);
  drawFiggy(40,40);
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
