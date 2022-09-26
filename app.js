documentReady(function () {
  // first we get how many space we have
  const main = document.getElementById("main").getBoundingClientRect();
  const howMany = main.width / 50; // 50 is our eye width

  // now we are adding eyes images
  var src = document.getElementById("eyes");
  for (let i = 0; i < howMany; i++) {
    const img = document.createElement("img");
    const left = Math.random() * main.width;
    img.src = "eye.png";
    img.className = "eye";
    img.style.top = `${50*i}px`;
    img.style.left = `${left}px`;
    src.appendChild(img);
  }

  // now we are adding some precalulated data to each img
  const eyes = document.querySelectorAll(".eye");
  eyes.forEach((eye) => {
    const rekt = eye.getBoundingClientRect();
    eye.dataset.anchorX = rekt.left + rekt.width / 2;
    eye.dataset.anchorY = rekt.top + rekt.height / 2;
  });

  // we are using throttle to reduce number of mousemove events
  document.addEventListener("mousemove", throttle(20, (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // for each eye we calculate angle between eye and cursor
    // and then we rotate eye image
    const eyes = document.querySelectorAll(".eye");
    eyes.forEach((eye) => {
      const angleDeg = angle(
        mouseX,
        mouseY,
        eye.dataset.anchorX,
        eye.dataset.anchorY
      );

      // 135 because out image is rotated initially
      eye.style.transform = `rotate(${angleDeg + 135}deg)`;
    });
  }));
});

// here we are calculating angle between mouse and eye
function angle(cx, cy, ex, ey) {
  const dx = ex - cx;
  const dy = ey - cy;
  const rad = Math.atan2(dy, dx);
  const deg = (rad * 180) / Math.PI + 75;
  return deg;
}

// we want some code to be executed after document is ready
function documentReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function throttle(wait, callback) {
  var timeout
  return function(e) {
    if (timeout) return;
    timeout = setTimeout(() => (callback(e), timeout=undefined), wait)
  }
}