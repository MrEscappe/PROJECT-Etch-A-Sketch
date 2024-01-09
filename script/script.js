const GRID_CLASS = "grid";
const COLOR_STATE = "color";

const containerBox = document.querySelector(".container-box");
const color = document.querySelector("#color");
const slider = document.querySelector("#slider");
const reset = document.querySelector(".btn-reset");
const rainbow = document.querySelector(".btn-rainbow");
const colorBtn = document.querySelector(".btn-color");
const rangeText = document.querySelector(".range-text");

let defaultSize = 16;
let defaultColor = "black";
let draw = false;
let currentState = COLOR_STATE;

reset.addEventListener("click", resetGrid);
rainbow.addEventListener("click", () => setState(rainbow));
colorBtn.addEventListener("click", () => {
	defaultColor = "black";
	setState(COLOR_STATE);
	resetGrid();
});

slider.addEventListener("input", () => updateGridSize(slider.value));
slider.addEventListener("change", () => updateGridSize(slider.value));

containerBox.addEventListener("mousedown", () => {
	draw = true;
	document.querySelectorAll(`.${GRID_CLASS}`).forEach((grid) => {
		grid.addEventListener("mouseover", () => {
			if (currentState === rainbow && draw) {
				grid.style.backgroundColor = randomColor();
			} else if (draw) {
				grid.style.backgroundColor = color.value;
			}
		});
	});
});

containerBox.addEventListener("mouseup", () => (draw = false));
containerBox.addEventListener("mouseleave", () => (draw = false));

function createGrid(size) {
	containerBox.style.setProperty("--grid-size", size);
	for (let i = 0; i < size * size; i++) {
		const grid = document.createElement("div");
		containerBox.appendChild(grid);
		grid.classList.add(GRID_CLASS);
		setBorderRadius(grid, i, size);
	}
}

function setBorderRadius(grid, i, size) {
	if (i === 0) grid.style.borderTopLeftRadius = "10px";
	if (i === size - 1) grid.style.borderTopRightRadius = "10px";
	if (i === size * size - 1) grid.style.borderBottomRightRadius = "10px";
	if (i === size * size - size) grid.style.borderBottomLeftRadius = "10px";
}

function updateGridSize(size) {
	defaultSize = size;
	containerBox.innerHTML = "";
	rangeText.textContent = `${size} x ${size}`;
	createGrid(defaultSize);
}

function resetGrid() {
	updateGridSize(16);
	defaultColor = "black";
	color.value = "#000000";
	slider.value = defaultSize;
}

function randomColor() {
	const hex = "0123456789ABCDEF";
	let colorNew = "#";
	for (let i = 0; i < 6; i++) {
		colorNew += hex[Math.floor(Math.random() * 16)];
	}
	color.value = colorNew;
	return colorNew;
}

function setState(string) {
	currentState = string;
	resetGrid();
}

createGrid(defaultSize);
