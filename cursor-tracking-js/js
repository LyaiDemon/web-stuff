const eyes = document.querySelectorAll('.eye');

function movePupils(e) {
  // Some drag events may not have clientX/Y, so guard against that
  if (!e.clientX || !e.clientY) return;

  eyes.forEach((eye) => {
    const pupil = eye.querySelector('.pupil');
    const eyeRect = eye.getBoundingClientRect();
    const pupilRect = pupil.getBoundingClientRect();

    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const dx = e.clientX - eyeCenterX;
    const dy = e.clientY - eyeCenterY;
    const angle = Math.atan2(dy, dx);

    const m = Math.sqrt(dx * dx + dy * dy);

    let p;
    if (m < 2) {
      p = 1.5 * m;
    } else {
      p = 3 * Math.sqrt(m - 1);
    }

    const pupilMaxSide = Math.max(pupilRect.width, pupilRect.height);
    const maxMove = 1.2 * pupilMaxSide;
    p = Math.min(p, maxMove);

    const pupilX = Math.cos(angle) * p;
    const pupilY = Math.sin(angle) * p;

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  });
}

function handleMove(x, y) {
  movePupils({ clientX: x, clientY: y });
}

// Throttle utility: ensures the function runs at most once per frame
function throttleRAF(fn) {
  let scheduled = false;
  let lastArgs;

  return function (...args) {
    lastArgs = args;
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(() => {
        fn(...lastArgs);
        scheduled = false;
      });
    }
  };
}

const throttledHandleMove = throttleRAF(handleMove);

// Normal tracking (desktop + modern browsers)
document.addEventListener('pointermove', (e) => {
  if (e.clientX && e.clientY) {
    throttledHandleMove(e.clientX, e.clientY);
  }
});

// Fallback tracking during native drag (text/image drag)
document.addEventListener('drag', (e) => {
  if (e.clientX && e.clientY) {
    throttledHandleMove(e.clientX, e.clientY);
  }
});

// Tracking during swipe/touch on mobile
document.addEventListener('touchmove', (e) => {
  if (e.touches.length === 0) return;

  let sumX = 0, sumY = 0;
  for (let i = 0; i < e.touches.length; i++) {
    sumX += e.touches[i].clientX;
    sumY += e.touches[i].clientY;
  }

  const avgX = sumX / e.touches.length;
  const avgY = sumY / e.touches.length;

  throttledHandleMove(avgX, avgY);
}, { passive: true });
