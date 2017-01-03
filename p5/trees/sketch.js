var sliderAngle;
var sliderTrunk;
var sliderR;
var sliderG;
var sliderB;
var numTrees;

function setup() {
	frameRate(3);
	createCanvas(750,400);

	var config = createDiv('Options');

	var angleP = createP('Angle:');
	config.child(angleP);
	// (min, max, default value, increment)
	sliderAngle = createSlider(PI/8, PI/4, PI/6, 0.01);
	config.child(sliderAngle);
	var trunkP = createP('Trunk Length:');
	config.child(trunkP);
	sliderTrunk = createSlider(50, 300, 150, 1);
	config.child(sliderTrunk);

	var rP = createP('Red Value:');
	config.child(rP);
	sliderR = createSlider(0, 255, 255, 1);
	config.child(sliderR);

	var gP = createP('Green Value:');
	config.child(gP);
	sliderG = createSlider(0, 255, 255, 1);
	config.child(sliderG);

	var bP = createP('Blue Value:');
	config.child(bP);
	sliderB = createSlider(0, 255, 255, 1);
	config.child(sliderB);

	config.addClass('config');
	config.position(0, 0);
	createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
	background(51);
	var angle = sliderAngle.value();
	var trunkLength = sliderTrunk.value();
	var r = sliderR.value();
	var g = sliderG.value();
	var b = sliderB.value();

	/*drawTree(110, 110, 110, 200, 200, height, PI/8);

	drawTree(110, 110, 110, 200, width-200, height, PI/8);

	drawTree(r, g, b, trunkLength, width/2, height, angle);*/

	drawForest(5);
}

function branchDynamic(len, r, g, b, angle) {
	if (len <= 4) {
		stroke(r, g, b);
		ellipse(0, 0, 1, 1);
		return;
	}
	
	stroke(r, g, b);
	line(0, 0, 0, -len);
	translate(0, -len);
	push();
	rotate(angle);
	branchDynamic(len * 0.67, r, g, b, angle);
	pop();
	push();
	rotate(-angle);
	branchDynamic(len * 0.67, r, g, b, angle);
	pop();
}

function drawTree(r, g, b, trunkLength, x, y, angle) {
	push();
	translate(x, y);
	branchDynamic(trunkLength, r, g, b, angle);
	pop();
}

function drawForest(numTrees) {
	for (var i = 0; i < numTrees; i++) {
		drawTree(110, 110, 110, random(50,300), random(10, width-10), height, random(PI/8, PI/4));
	}
}