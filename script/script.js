const containerBox = document.querySelector(".container-box");
const color = document.querySelector("#color");
const slider = document.querySelector("#slider");
const reset = document.querySelector(".btn-reset");
const rainbow = document.querySelector(".btn-rainbow");
const colorBtn = document.querySelector(".btn-color");

let defaultSize = 16;
let defaultColor = "black";
let draw = false;
let currentState = "color";

reset.addEventListener("click", resetGrid);
rainbow.addEventListener("click", () => {
	setState(rainbow);
});

colorBtn.addEventListener("click", () => {
	defaultColor = "black";
	currentState = "color";
	resetGrid();
});

slider.addEventListener("input", () => updateGridSize(slider.value));
slider.addEventListener("change", () => updateGridSize(slider.value));

containerBox.addEventListener("mousedown", () => {
	draw = true;
	const grids = document.querySelectorAll(".grid");
	grids.forEach((grid) => {
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

containerBox.addEventListener;
function createGrid(size) {
	containerBox.style.setProperty("--grid-size", size);
	for (let i = 0; i < size * size; i++) {
		const grid = document.createElement("div");
		containerBox.appendChild(grid);
		grid.classList.add("grid");
		if (i === 0) grid.style.borderTopLeftRadius = "10px";
		if (i === size - 1) grid.style.borderTopRightRadius = "10px";
		if (i === size * size - 1) grid.style.borderBottomRightRadius = "10px";
		if (i === size * size - size) grid.style.borderBottomLeftRadius = "10px";
	}
}

function updateGridSize(size) {
	defaultSize = size;
	containerBox.innerHTML = "";
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
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += hex[Math.floor(Math.random() * 16)];
	}
	return color;
}

function setState(string) {
	currentState = string;
	resetGrid();
}

createGrid(defaultSize);
