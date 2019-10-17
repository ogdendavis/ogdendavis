window.onload = function() {
  makeGrid();
  drawLucasHead(26,10);
  drawLucasShirt(26,25,'blue')
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

const drawLucasHead = (x=0,y=0) => {
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
  for (row in brownMap) {
    brownMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('brown-hair');
    })
  }

  const lightBrownMap = {
    2: [10],
    8: [4,5,6,7],
    9: [3,8],
    10: [2,3,8,9],
    11: [2,3,4,5,6,7,8,9],
  }
  for (row in lightBrownMap) {
    lightBrownMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('light-brown-hair');
    })
  }

  const stubbleMap = {
    7: [1,10],
    8: [1,3,8,10],
    9: [1,2,9,10],
    10: [4,7],
  }
  for (row in stubbleMap) {
    stubbleMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('stubble');
    })
  }

  const darkBrownMap = {
    11: [1,10],
    12: [1,10],
    13: [2,3,4,5,6,7,8,9],
    14: [4,5,6,7],
  }
  for (row in darkBrownMap) {
    darkBrownMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('dark-brown-hair');
    })
  }

  const darkestBrownMap = {
    13: [1,10],
    14: [2,3,8,9],
    15: [3,4,5,6,7,8],
  }
  for (row in darkestBrownMap) {
    darkestBrownMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('darkest-brown-hair');
    })
  }

  const skinMap = {
    3: [4,5,6,7,8,9,10],
    4: [2,3,4,5,6,7,8,9,10],
    5: [0,1,2,4,5,6,7,9,10,11],
    6: [0,1,2,4,5,6,7,9,10,11],
    7: [2,3,4,5,6,7,8,9],
    8: [2,9],
  }
  for (row in skinMap) {
    skinMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('skin');
    })
  }

  const blackMap = {
    5: [3,8],
    6: [3,8],
  }
  for (row in blackMap) {
    blackMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('black');
    })
  }

  const whiteMap = {
    9: [4,5,6,7],
    10: [5,6],
  }
  for (row in whiteMap) {
    whiteMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('white');
    })
  }

}

const drawLucasShirt = (x=0,y=0,color='blue') => {
  // t-shirt! Designed to fit immediately under my head
  // Offset from head origin should be x+0, y+15

  // y0: 1,2
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
  for (row in shirtMap) {
    shirtMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add(color);
    })
  }
}
