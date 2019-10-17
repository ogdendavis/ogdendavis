window.onload = function() {
  drawGrid();
  drawLucas();
}

const drawGrid = (cols=64, rows=64) => {
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

const drawLucas = (x=0,y=0) => {
  // From drawing made on pixilart.com
  // x and y are points of origin (top left) of image
  // image is 18px wide by 39px tall

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
    0: [8,9,10,11,12,13],
    1: [7,8,9,10,11,12,13,14],
    2: [6,7,8,9,10,11,12,13,14],
    3: [6,7,8],
    4: [6],
    10: [6,15],
    12: [7,8,9,10,11,12,13,14],
  }
  for (row in brownMap) {
    brownMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('brown-hair');
    })
  }

  const lightBrownMap = {
    2: [15],
    8: [9,10,11,12],
    9: [8,13],
    10: [7,8,13,14],
    11: [7,8,9,10,11,12,13,14],
  }
  for (row in lightBrownMap) {
    lightBrownMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('light-brown-hair');
    })
  }

  const stubbleMap = {
    7: [6,15],
    8: [6,8,13,15],
    9: [6,7,14,15],
    10: [9,12],
  }
  for (row in stubbleMap) {
    stubbleMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('stubble');
    })
  }

  const darkBrownMap = {
    11: [6,15],
    12: [6,15],
    13: [7,8,9,10,11,12,13,14],
    14: [9,10,11,12],
  }
  for (row in darkBrownMap) {
    darkBrownMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('dark-brown-hair');
    })
  }

  const darkestBrownMap = {
    13: [6,15],
    14: [7,8,13,14],
    15: [8,9,10,11,12,13],
  }
  for (row in darkestBrownMap) {
    darkestBrownMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('darkest-brown-hair');
    })
  }

  const skinMap = {
    3: [9,10,11,12,13,14,15],
    4: [7,8,9,10,11,12,13,14,15],
    5: [5,6,7,9,10,11,12,14,15,16],
    6: [5,6,7,9,10,11,12,14,15,16],
    7: [7,8,9,10,11,12,13,14],
    8: [7,14],
  }
  for (row in skinMap) {
    skinMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('skin');
    })
  }

  const blackMap = {
    5: [8,13],
    6: [8,13],
  }
  for (row in blackMap) {
    blackMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('black');
    })
  }

  const whiteMap = {
    9: [9,10,11,12],
    10: [10,11],
  }
  for (row in whiteMap) {
    whiteMap[row].forEach(col => {
      const target = document.querySelector(`#x${x + col}y${y + Number(row)}`);
      target.classList.add('white');
    })
  }

}
