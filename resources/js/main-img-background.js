let r, s;
let hexagons;
let timer = 0;
let randomIndex;
let randomHighlights = [];
let highlightTimer = 300;

function setup() {
	//Setup canvas
	var canvasDiv = document.getElementById('header');
    var width = canvasDiv.offsetWidth;
    var height = canvasDiv.offsetHeight;
    var canvas = createCanvas(width, height);
    canvas.parent("header");
	
	//textAlign(CENTER, CENTER);
	
	//Radius
	r = 125;
	s = sqrt(3 * pow(r, 2) / 4);
	hexagons = [];
	
	let counter = 0;
	for (let y = 0; y < height + s; y += 2*s) {
		for (let x = 0; x < width + r; x += 3*r) {
			hexagons.push(new Hexagon(x, y, r));
			hexagons.push(new Hexagon(x + 1.5 * r, y + s, r));
		}
	}	

	for (i = 0; i < 10; i++) {
		randomIndex = Math.floor(Math.random() * hexagons.length);
		randomHighlights.push(randomIndex);
	}
}

function draw() {
	//Set background color to dark grey
	background(color(27, 27, 27));

	//Draw inner Hexagons 
	hexagons.forEach(h => {
		h.render();
		noFill();
		strokeWeight(1);
		//stroke('rgba(212,175,55, 0.2)');
		stroke('rgba(249,196,66, 0.1)');
		hexagon(h.x, h.y, 110);
		hexagon(h.x, h.y, 95);
	});

	/*if(timer <= highlightTimer) {
		if(timer == highlightTimer) {
			randomHighlights = [];
			for (i = 0; i < 10; i++) {
				randomIndex = Math.floor(Math.random() * hexagons.length);
				randomHighlights.push(randomIndex);
			}
		}

		randomHighlights.forEach(h => {
		highlight = hexagons[h];
		noFill();
		stroke('rgba(212,175,55, 1)');
		hexagon(highlight.x, highlight.y, 110);
		});

		if(timer == highlightTimer) {
			timer = 0;
		}
	}

	timer += 1;
	*/

	/*
	//Find nearest hexagon
	let nearestHexagon;
	hexagons.forEach(h => {
		h.render();
		if (nearestHexagon === undefined || h.distanceToMouse < nearestHexagon.distanceToMouse) {
			nearestHexagon = h;
		}
	});

	//Highlight hovered hexagon
	noFill();
	stroke('rgba(212,175,55, 0.4)');
	hexagon(nearestHexagon.x, nearestHexagon.y, 100);
	*/
}

function hexagon(x, y, r) {
	beginShape();
	for (let a = 0; a < 2 * PI; a += 2 * PI / 6) {
		let x2 = cos(a) * r;
		let y2 = sin(a) * r;
		vertex(x + x2, y + y2);
	}
	endShape(CLOSE);
}

class Hexagon {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
	}
	
	render() {
		noFill();
		strokeWeight(2);
		stroke('rgba(249,196,66, 0.2)');
		//stroke('rgba(212,175,55, 0.3)');
		hexagon(this.x, this.y, this.r);
	}
	
	get distanceToMouse() {
		return dist(mouseX, mouseY, this.x, this.y);
	}
}