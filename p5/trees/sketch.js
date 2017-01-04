var sliderAngle;
var sliderTrunkMin;
var sliderTrunkMax;
var sliderR;
var sliderG;
var sliderB;
var sliderNumTrees;
var treeArray;
var buttonGrowForest;
var buttonClearForest;

function setup() {
	frameRate(0.5);
	createCanvas(window.innerWidth, window.innerHeight);

	var config = createDiv('Customise Forest');

	var angleP = createP('Angle:');
	config.child(angleP);
	// (min, max, default value, increment)
	sliderAngle = createSlider(PI/8, PI/4, PI/8, 0.01);
	config.child(sliderAngle);

	var numTreesP = createP('Trees in Forest:');
	config.child(numTreesP);
	sliderNumTrees = createSlider(1, 10, 1, 1);
	config.child(sliderNumTrees);

	var minTrunkP = createP('Min. Trunk Length:');
	config.child(minTrunkP);
	sliderTrunkMin = createSlider(50, 300, 50, 1);
	config.child(sliderTrunkMin);

	var maxTrunkP = createP('Max Trunk Length:');
	config.child(maxTrunkP);
	sliderTrunkMax = createSlider(50, 300, 300, 1);
	config.child(sliderTrunkMax);

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

	var buttons = createDiv('');
	config.child(buttons);

	buttonGrowForest = createButton('Add Trees');
	buttons.child(buttonGrowForest);

	buttonClearForest = createButton('Clear All');
	buttons.child(buttonClearForest);

	config.addClass('config');
	config.position(0, 0);

	buttons.addClass('buttons');

	treeArray = [];

	// reference to the function otherwise it will be mousePressed(null)
	buttonGrowForest.mousePressed(populateTreeArrayFromSlider);
	buttonClearForest.mousePressed(clearForest);
}

function draw() {
	background(51);

	var r = sliderR.value();
	var g = sliderG.value();
	var b = sliderB.value();

	drawPreviewSwatch(r, g, b);
	drawForest();
}

function branch(len, r, g, b, angle) {
	if (len <= 6) {
		ellipse(0, 0, 1, 1);
		return;
	}
	
	stroke(r, g, b);
	line(0, 0, 0, -len);
	translate(0, -len);
	push();
	rotate(angle);
	branch(len * 0.67, r, g, b, angle);
	pop();
	push();
	rotate(-angle);
	branch(len * 0.67, r, g, b, angle);
	pop();
}

function drawTree(r, g, b, trunkLength, x, y, angle) {
	push();
	translate(x, y);
	branch(trunkLength, r, g, b, angle);
	pop();
}

function drawForest() {
	for (var i = 0; i < treeArray.length; i++) {
		var tree = treeArray[i];
		drawTree(tree[0], tree[1], tree[2], tree[3], tree[4], tree[5], tree[6]);
	}
}

function populateTreeArrayFromSlider() {
	var angle = sliderAngle.value();
	var numTrees = sliderNumTrees.value();
	var minTrunkLength = sliderTrunkMin.value();
	var maxTrunkLength = sliderTrunkMax.value();
	var r = sliderR.value();
	var g = sliderG.value();
	var b = sliderB.value();

	for (var j = 0; j < numTrees; j++) {
		treeArray.push([r, g, b, random(minTrunkLength, maxTrunkLength), random(10, width-10), height, angle]);
	}
}

function clearForest () {
	treeArray.length = 0;
}

function drawPreviewSwatch (r, g, b) {
	stroke(r, g, b);
	fill(r, g, b);

	ellipse(50, 50, 50, 50);

}

/*
add a preview swatch for the rgb
add randomise forest button
*/