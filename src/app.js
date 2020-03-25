/*
 * CONTENTS
 * 1. Onload
 * 2. App control
 * 3. Animations
 * 4. SVG functions
 *
 */

/*
 * 1. Onload
 *
 * Makes it go!
 */

window.onload = async function() {
  await setup();
  introAnimate();
}

/*
 * 2. App control
 *
 * These control functionality and user interaction with content
 */

// Create object that holds all app elements for use in app functions
const app = {
  viewportWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  breakpoints: [1075, 760, 460],
  activePortrait: false,
  app: document.querySelector('.app'),
  frames: document.querySelectorAll('.frame'),
  buttons: document.querySelectorAll('.button'),
  portrait: document.querySelector('.frame--portrait'),
  contentBox: document.querySelector('.content__box'),
  footer: document.querySelector('.footer'),
  content: {}, // Loaded in setup
  svg: {} // loaded in setup
};

const setup = async () => {
  // Get content from local JSON file -- switch to CMS at some point?
  app.content = JSON.parse(contentData);

  // Load SVGs now for future use
  const lucas = await getSVG('lucas');
  const kim = await getSVG('kim');
  const sylvie = await getSVG('sylvie');
  const figgy = await getSVG('figgy');
  const reg = await getSVG('reg');
  const buttonWork = await getSVG('button--work');
  const buttonPlay = await getSVG('button--play');
  const buttonAtme = await getSVG('button--atme');
  const desk = await getSVG('desk');
  const barbell = await getSVG('barbell');
  const bookshelf = await getSVG('bookshelf');
  const contact = await getSVG('contact');

  app.svg = {
    lucas: lucas,
    kim: kim,
    sylvie: sylvie,
    figgy: figgy,
    reg: reg,
    buttons: {
      work: buttonWork,
      play: buttonPlay,
      atme: buttonAtme,
    },
    desk: desk,
    barbell: barbell,
    bookshelf: bookshelf,
    contact: contact,
  }

  // If there's footer content, load it in!
  // The rest of the content is loaded in on button click, by handleClick
  if (app.content.footer) {
    if (app.content.footer.left) {
      populateFooter(app.content.footer.left, 'left');
    }
    if (app.content.footer.right) {
      populateFooter(app.content.footer.right, 'right');
    }
  }
}

const startApp = () => {
  // Add initial event handlers to buttons. Have to wait until buttons are animated in
  app.buttons.forEach(button => {
    button.addEventListener('click', handleInitialClick);
  });
}

const handleInitialClick = (ev) => {
  // Convert app to open state
  app.app.classList.add('app--open');

  // To fix portrait flashes on mobile Safari
  if (app.viewportWidth < app.breakpoints[2]) {
    app.portrait.style.transform = 'translateY(1500%)';
  }

  // Remove this handler, since it should only fire once
  // Add handler for subsequent clicks
  app.buttons.forEach(button => {
    button.removeEventListener('click', handleInitialClick);
    button.addEventListener('click', handleClick);
  });
  // Content box width animation handled by CSS

  // In tablet view, need to slide lucas left before opening content
  if (app.viewportWidth <= app.breakpoints[0] && app.viewportWidth > app.breakpoints[2]) {
    document.querySelector('#svg--lucas').style.right = '9rem';
  }

  // To make content animation timing work on this initial click, triggering handleClick on a delay
  window.setTimeout(() => handleClick(ev), 500);
}

const handleClick = (e) => {
  // Get info for switchPortrait, and switch!
  const oldPortrait = app.activePortrait ? app.activePortrait : 'lucas';
  const newPortrait = e.target.id.slice(13);

  switchPortrait(oldPortrait,newPortrait);
  // Set active portrait in app object
  app.activePortrait = newPortrait;

  // Update button classes
  app.buttons.forEach(button => {
    button.id === e.target.id ? button.classList.add('button--selected') : button.classList.remove('button--selected');
  });

  // Add appropriate content to content area
  switchContent(oldPortrait, newPortrait);
}

const populateFooter = (content, side) => {
  const container = document.createElement('div');
  container.classList.add(`footer__inner`, `footer__inner--${side}`);
  container.innerHTML = content;
  app.footer.appendChild(container);
}


/*
 * 3. Animations
 *
 * These make things move around the page, by moving a whole frame and/or
 * moving elements within their frames
 */

const introAnimate = () => {
  // Draw Lucas!
  app.portrait.innerHTML = app.svg.lucas;
  const lucas = document.querySelector('#svg--lucas');
  lucas.style.position = 'absolute';
  lucas.style.bottom = 0;
  // horizontal position of lucas depends on viewport width
  lucas.style.right = app.viewportWidth <= app.breakpoints[2] ? '3rem' : app.viewportWidth <= app.breakpoints[0] ? '2rem' : '-2.5rem';
  lucas.style.transition = 'right .25s linear';

  // Stage timing variables, for reference and consistency
  const sOneStart = 250;
  const sOneEnd = sOneStart + 2100;
  const sTwoStart = sOneEnd + 750;

  // Stage 0: Add and then remove hello element;
  const sayHi = document.createElement('div');
  sayHi.innerText = 'Hi, I\'m Lucas';
  sayHi.classList.add('hello');
  app.app.appendChild(sayHi);
  window.setTimeout(() => {
    sayHi.style.opacity = '0';
  },500);
  window.setTimeout(() => {
    app.app.removeChild(sayHi);
    // Fade footer in as sayHi fades out
    app.footer.style.opacity = 1;
  },1500);

  // Stage 1: Slide the portrait grid down and into view
  window.setTimeout(() => {
    app.portrait.classList.add('frame--in');
  }, sOneStart);
  window.setTimeout(() => {
    modSVG('lucas','wave');
  }, sOneEnd);

  // Stage 2: Slide Lucas left, buttons appear, start app
  window.setTimeout(() => {
    modSVG('lucas','defaultArms');
    if (app.viewportWidth > app.breakpoints[0]) {
      // Lucas only slides left for buttons if we're on laptop or bigger
      lucas.style.right = '6rem';
    }
    app.buttons[0].innerHTML = app.svg.buttons.work;
    app.buttons[1].innerHTML = app.svg.buttons.play;
    app.buttons[2].innerHTML = app.svg.buttons.atme;
    app.buttons.forEach(button => button.style.opacity = 1);
    startApp();
  }, sTwoStart);
}

const switchContent = (oldContent, newContent) => {
  // Early return to avoid animation on button re-click
  if (oldContent === newContent) {
    return;
  }
  // Opacity animates at .25s
  app.contentBox.style.opacity = '0'
  // Change content and switch opacity back!
  window.setTimeout(() => {
    // Get container to put actual content in
    const contentContainer = app.contentBox.firstElementChild;
    // Add the content
    contentContainer.innerHTML = app.content[newContent];

    // If loading atme content, insert contact info svg
    if (newContent === 'atme') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = app.svg.contact;
      contentContainer.appendChild(tempDiv.firstElementChild);
    }

    // Make the box visible
    app.contentBox.style.opacity = '1'

    // Toggle scroll bar and content alignment depending on if content is larger than containing content__box
    if (contentContainer.offsetHeight >= app.contentBox.offsetHeight) {
      app.contentBox.style.overflowY = 'scroll'
      app.contentBox.style.alignItems = 'flex-start';
    }
    else {
      app.contentBox.style.overflowY = 'auto'
      app.contentBox.style.alignItems = 'center';
    }
  },250);
}

const switchPortrait = (oldPortrait, newPortrait) => {
  // Early return to cancel animation on button re-click
  if (oldPortrait === newPortrait) {
    return;
  }

  /* First, animate the frame off screen */
  app.portrait.style.transform = 'translateY(1500%)';

  /* Next, remove SVG(s) from the frame while it's off screen */
  window.setTimeout(() => {
    document.querySelectorAll('#portrait > svg').forEach(s => { s.parentNode.removeChild(s); })
  }, 400);

  /* Now add new SVG(s) to the frame */
  window.setTimeout(() => {
    // Vars to hold selected SVGs, and styles needed for portrait to display properly
    let newSVGs;
    let styleMap = {};
    const breakpoint = app.viewportWidth <= app.breakpoints[2] ? 2 : app.viewportWidth <= app.breakpoints[1] ? 1 : app.viewportWidth <= app.breakpoints[0] ? 0 : false;
    // Append SVGs to frame, and add needed styles to style object
    switch (newPortrait) {
      case 'atme':
        newSVGs = app.svg.reg + app.svg.lucas + app.svg.figgy + app.svg.kim + app.svg.sylvie;
        styleMap = {
          reg: {
            position: 'absolute',
            bottom: 0,
            left: 0,
          },
          lucas: {
            position: 'absolute',
            bottom: 0,
            left: breakpoint == 2 ? '15px' : '18px',
          },
          figgy: {
            position: 'absolute',
            bottom: 0,
            left: breakpoint == 2 ? '98px' : '174px',
          },
          kim: {
            position: 'absolute',
            bottom: 0,
            left: breakpoint == 2 ? '115px' : '200px',
          },
          sylvie: {
            position: 'absolute',
            bottom: 0,
            right: 0,
          },
        }
        break;
      case 'work':
        newSVGs = app.svg.lucas + app.svg.desk;
        styleMap = {
          lucas: {
            position: 'absolute',
            bottom: 0,
            left: breakpoint == 2 ? '34px' : '95px',
          },
          desk: {
            position: 'absolute',
            bottom: 0,
            left: breakpoint == 2 ? '32px' : '90px',
          }
        }
        break;
      case 'play':
        newSVGs = app.svg.lucas + app.svg.barbell + app.svg.bookshelf;
        styleMap = {
          lucas: {
            position: 'absolute',
            bottom: 0,
            left: breakpoint == 2 ? '16px' : '32px',
          },
          barbell: {
            position: 'absolute',
            bottom: 0,
            left: breakpoint == 2 ? '12px' : '24px'
          },
          bookshelf: {
            position: 'absolute',
            bottom: 0,
            right: breakpoint == 2 ? '8px' : '16px',
          },
        }
        break;
      default:
        newSVGs = app.svg.lucas;
        styleMap.lucas = {
          position: 'absolute',
          bottom: 0,
          right: breakpoint == 2 ? '47.5px' : '95px',
        }
    }
    app.portrait.innerHTML = newSVGs;

    // Special case to switch Lucas to workout mode if on the play portrait
    if (newPortrait === 'play') {
      modSVG('lucas','workout');
      modSVG('lucas','thumbsUp');
    }

    // After appending SVGs, but before moving frame back into view, update styles
    document.querySelectorAll('#portrait > svg').forEach(s => {
      const id = s.id.slice(5);
      if (styleMap[id]) {
        for (const [rule, val] of Object.entries(styleMap[id])) {
          s.style[rule] = val;
        }
      }
    });
  }, 450);

  /* Finally, animate frame back in */
  window.setTimeout(() => {
    // Animate in by removing inline styles, so class-based CSS transforms still apply
    app.portrait.removeAttribute('style');
  }, 500)

}


/*
 * 4. SVG functions
 *
 * These get SVGs (to populate the app object), and modify or reset them
 * when needed
 */

const getSVG = async (id) => {
  // Gets an SVG from a file, and passes it back. For use inserting SVGs into contaienrs on the page.
  return fetch(`./assets/${id}.svg`)
    .then(r => r.text())
    .then(t => {return t});
}

const modSVG = (id, mod=false) => {
  // Reaches into the DOM to modify an svg which has already been placed
  // Assumes starting from base SVG -- if not, reset the svg first!
  // const svg = document.querySelector(`#svg--${id}`);
  switch (id) {
    case 'lucas':
      switch(mod) {
        case 'thumbsUp':
        case 'wave':
        case 'defaultArms':
          const rightArm = document.querySelector('.lucas__arm--right');
          const newPoints =
            mod === 'thumbsUp' ? '60,190 80,190 80,240 10,240 10,210 20,210 20,200 30,200 30,220 60,220' :
            mod === 'wave' ? '60,190 20,190 20,100 40,100 40,110 50,110 50,130 40,130 40,170 60,170' :
            '60,190 80,190 80,290 60,290 60,280 50,280 50,260 60,260';
          rightArm.removeAttribute('points');
          rightArm.setAttribute('points', newPoints);
          break;
        case 'workout':
          // Add headband
          const headband = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
          headband.classList.add('pixel--red');
          headband.setAttribute('points', '70,30 170,30 170,50 70,50');
          document.querySelector('.lucas__head').appendChild(headband);
          // Change shirt color
          const shirt = document.querySelector('.lucas__torso polygon');
          shirt.classList.forEach(cls => shirt.classList.remove(cls));
          shirt.classList.add('pixel--red');
          // Put on shorts by shortening pants and drawing shins
          const legs = document.querySelector('.lucas__legs');
          const pants = document.querySelector('.lucas__legs polygon');
          pants.setAttribute('points', '80,260 160,260 160,320 130,320 130,290 110,290 110,320 80,320');
          const leftShin = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
          leftShin.classList.add('pixel--skin');
          leftShin.setAttribute('points', '160,320 160,380 140,380 140,320');
          legs.appendChild(leftShin);
          const rightShin = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
          rightShin.classList.add('pixel--skin');
          rightShin.setAttribute('points', '100,320 100,380 80,380 80,320');
          legs.appendChild(rightShin);
          // Change shoe size to match new leg width
          const shoes = document.querySelectorAll('.lucas__shoes polygon');
          const shoeDownsize = {
            '110':'100',
            '130':'140'
          }
          shoes.forEach(shoe => {
            let points = shoe.getAttribute('points');
            shoe.setAttribute('points', points.replace(/110|130/g, (match) => {
              return shoeDownsize[match]
            }));
          });
          break;
      }
  }
}

const resetSVG = (id) => {
  // Get initial, unmodified SVG from app object, and get info about the current svg and its container
  const initialSVG = id.slice(0,8) === 'button--' ? app.svg.buttons[id.slice(8)] : app.svg[id];
  const currentSVG = document.querySelector(`#svg--${id}`);
  const currentParent = currentSVG.parentNode;

  // If there are multiple SVGs in the container, just remove the one we want to
  // reset, and insert the reset version back in the same spot
  if (currentParent.childElementCount > 1) {
    const currentNextSibling = currentSVG.nextElementSibling;
    currentParent.removeChild(currentSVG);
    const newContainer = document.createElement('div');
    newContainer.innerHTML = initialSVG;
    currentParent.insertBefore(newContainer.firstElementChild, currentNextSibling);
  }
  else {
    // If it's the only SVG in the container, we can just rewrite the container contents
    currentParent.innerHTML = initialSVG;
  }
}
