// element variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const scale = window.devicePixelRatio;
const aspectRatio = 4 / 3;

canvas.width = viewportWidth * scale;
canvas.height = (viewportWidth / aspectRatio) * scale;
canvas.style.width = viewportWidth + "px";
canvas.style.height = viewportWidth / aspectRatio + "px";
ctx.scale(scale, scale);

ctx.strokeStyle = "rgba(0, 0, 0)";
ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
ctx.lineWidth = "100";
ctx.lineCap = "round";
let [prev_x, prev_y] = [-1, -1];
let isDrawing = false;

//====== ALL FUNCTIONS  START ========
canvas.addEventListener("pointerdown", (e) => {
  isDrawing = true;
  setPosition(e);
});

canvas.addEventListener("pointermove", (e) => {
  if (isDrawing) {
    draw(e);
  }
});

canvas.addEventListener("pointerup", () => {
  isDrawing = false;
});

function setPosition(e) {
  const { x, y } = getMousePos(canvas, e);
  prev_x = x;
  prev_y = y;
}

function draw(e) {
  const { x, y } = getMousePos(canvas, e);
  ctx.beginPath();
  ctx.moveTo(prev_x, prev_y);
  ctx.lineTo(x, y);
  ctx.stroke();
  prev_x = x;
  prev_y = y;
}

// mouse function
function getMousePos(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

// Other functions

const navPanel = document.getElementById("left-panel");
const navBarChangeButtonSVG = document.querySelector("#change-sides svg ");
const navBarChangeButton = document.getElementById("change-sides");
navBarChangeButton.addEventListener("click", () => {
  if (navPanel.style.left === "0px") {
    navPanel.style.left = "auto";
    navPanel.style.right = "0px";
    navBarChangeButtonSVG.style.transform = "rotate(180deg)";
  } else {
    navPanel.style.right = "auto";
    navPanel.style.left = "0px";
    navBarChangeButtonSVG.style.transform = "rotate(0deg)";
  }
});

// block on color selection
const colorSelection = document.getElementById("color-selection");
colorSelection.addEventListener("mouseover", (e) => {
  console.log("Take events");
  e.preventDefault();
  isDrawing = false;
});

const isMouseInElement = (element, event) => {
  const { left, top, right, bottom } = element.getBoundingClientRect();
  if (
    event.clientX >= left &&
    event.clientY >= top &&
    event.clientX <= right &&
    event.clientY <= bottom
  ) {
    return true;
  }
  return false;
};

document.addEventListener("pointerdown", (e) => {
  if (!isMouseInElement(colorSelection, e)) {
    colorSelection.style.display = "none";
  }
  // colorSelection.style.display = "none";
});

// utils
// const colorPuck =

// // Color Picker logic
// const colorPicker = document.getElementById("color-picker");
// colorPicker.addEventListener("mousedown", (e) => {
//   isDraggingColorPicker = true;

//   // Calculate the initial offset from the mouse to the color picker
//   const offsetX = e.clientX - colorPicker.getBoundingClientRect().left;
//   const offsetY = e.clientY - colorPicker.getBoundingClientRect().top;

//   document.addEventListener("mousemove", moveColorPicker);

//   document.addEventListener("mouseup", () => {
//     isDraggingColorPicker = false;
//     document.removeEventListener("mousemove", moveColorPicker);
//   });

//   function moveColorPicker(e) {
//     if (isDraggingColorPicker) {
//       const x = e.clientX - offsetX;
//       const y = e.clientY - offsetY;

//       colorPicker.style.left = x + "px";
//       colorPicker.style.top = y + "px";
//     }
//   }
// });
