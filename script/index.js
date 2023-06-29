const containerGrid = document.querySelector(".container-grid");
const color = document.querySelector(".color-pick");
const btnColor = document.querySelector(".btn-color");
const btnClear = document.querySelector(".btn-clear");
const btnRainbow = document.querySelector(".btn-rainbow");
const gridSlide = document.querySelector(".grid-size");
const gridSlideText = document.querySelector(".grid-size-value");

let defaultSize = 16;
let currentState = "color";
let draw = false;

btnClear.addEventListener("click", clearGrid);
btnColor.addEventListener("click", () => setState("color"));
btnRainbow.addEventListener("click", () => setState("rainbow"));

gridSlide.addEventListener("input", () => updateGridSize(gridSlide.value));
gridSlide.addEventListener("change", () => updateGridSize(gridSlide.value));

containerGrid.addEventListener("mousedown", () => (draw = true));
containerGrid.addEventListener("mouseup", () => (draw = false));
containerGrid.addEventListener("mouseleave", () => (draw = false));

function createGrid(size) {
	containerGrid.style.setProperty("--size", size);
	for (let i = 0; i < size * size; i++) {
		const grid = document.createElement("div");
		containerGrid.appendChild(grid);
		grid.classList.add("grid");
		if (i == 0) grid.style.borderTopLeftRadius = "10px";
		else if (i == size - 1) grid.style.borderTopRightRadius = "10px";
		else if (i == size * size - size) grid.style.borderBottomLeftRadius = "10px";
		else if (i == size * size - 1) grid.style.borderBottomRightRadius = "10px";
		grid.addEventListener("mouseover", () => {
			if (draw) {
				if (currentState == "color") grid.style.backgroundColor = color.value;
				else if (currentState == "rainbow") {
					grid.style.backgroundColor = randomColor();
					color.value = randomColor();
				}
			}
		});
	}
}

function clearGrid() {
	updateGridSize(16);
	color.value = "#000000";
	setState("color");
}

function setState(state) {
	currentState = state;
	reloadGrid();
}

function updateGridSize(size) {
	defaultSize = size;
	gridSlideText.textContent = `${size} x ${size}`;
	reloadGrid();
}

function randomColor() {
	const hex = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += hex[Math.floor(Math.random() * 16)];
	}
	return color;
}

function reloadGrid() {
	containerGrid.innerHTML = "";
	createGrid(defaultSize);
}

createGrid(defaultSize);
