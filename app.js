docReady(function () {
  // here we are creating eyes

  // first we get how many space we have
  let main = document.getElementById("main").getBoundingClientRect();
  let width = main.width;
  let howMany = width / 50; // 50 is our eye width

  var src = document.getElementById("eyes");
  for (let i = 0; i < howMany; i++) {
    const img = document.createElement("img");
    const left = Math.random() * width;
    img.src = "eye.png";
    img.className = "eye";
    img.style.top = `${50*i}px`;
    img.style.left = `${left}px`;
    src.appendChild(img);
  }

  const eyes = document.querySelectorAll(".eye");
  eyes.forEach((eye) => {
    const rekt = eye.getBoundingClientRect();
    eye.dataset.anchorX = rekt.left + rekt.width / 2;
    eye.dataset.anchorY = rekt.top + rekt.height / 2;
  });
});

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const eyes = document.querySelectorAll(".eye");
  eyes.forEach((eye) => {
    console.log(eye.dataset.anchorX);
    const angleDeg = angle(
      mouseX,
      mouseY,
      eye.dataset.anchorX,
      eye.dataset.anchorY
    );

    eye.style.transform = `rotate(${90 + angleDeg}deg)`;
  });
});

function angle(cx, cy, ex, ey) {
  const dx = ex - cx;
  const dy = ey - cy;
  const rad = Math.atan2(dy, dx);
  const deg = (rad * 180) / Math.PI + 75;

  return deg;
}

function docReady(fn) {
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
