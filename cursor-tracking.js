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

// Normal tracking
document.addEventListener('pointermove', movePupils);

// Fallback tracking during native drag (text/image drag)
document.addEventListener('drag', movePupils);
