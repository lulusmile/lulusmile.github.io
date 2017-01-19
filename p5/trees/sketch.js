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
var buttonRandomiseForest;
var randomAngleCheckbox;

function setup() {
	frameRate(0.5);
	createCanvas(window.innerWidth, window.innerHeight);

	var config = createDiv('Customise Forest');

	var angleP = createP('Angle:');
	config.child(angleP);
	// (min, max, default value, increment)
	sliderAngle = createSlider(PI/8, PI/6, PI/s, 0.01);
	config.child(sliderAngle);

	var numTreesP = createP('Trees in Forest:');
	config.child(numTreesP);
	sliderNumTrees = createSlider(1, 10, 1, 1);
	config.child(sliderNumTrees);

	var minTrunkP = createP('Min. Trunk Length:');
	config.child(minTrunkP);
	sliderTrunkMin = createSlider(50, 250, 50, 1);
	config.child(sliderTrunkMin);

	var maxTrunkP = createP('Max Trunk Length:');
	config.child(maxTrunkP);
	sliderTrunkMax = createSlider(50, 250, 250, 1);
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

	var randomiseButton = createDiv('');
	config.child(randomiseButton);
	buttonRandomiseForest = createButton('Randomise Forest');
	randomiseButton.child(buttonRandomiseForest);

	config.addClass('config');
	config.position(0, 0);

	buttons.addClass('adjacentButtons');

	randomiseButton.addClass('singleButton');

	var checkboxHolder = createDiv('');
	config.child(checkboxHolder);
	randomAngleCheckbox = createCheckbox('Randomise Branches');
	checkboxHolder.child(randomAngleCheckbox);

	treeArray = [];

	// reference to the function otherwise it will be mousePressed(null)
	buttonGrowForest.mousePressed(populateTreeArrayFromSlider);
	buttonClearForest.mousePressed(clearForest);
	buttonRandomiseForest.mousePressed(drawRandomForest);
}

function draw() {
	background(51);

	var r = sliderR.value();
	var g = sliderG.value();
	var b = sliderB.value();

	drawPreviewSwatch(r, g, b);
	drawForest();
}

function branch(len, r, g, b, angle, trunkThickness) {
	// console.log('entered branch function');
	if (len <= 6) {
		// ellipse(0, 0, 1, 1);
		return;
	}

	var rightBranchModifier = 0.67;
	var leftBranchModifier = 0.67;

	if (randomAngleCheckbox.checked()) {
		console.log('entered random angle checkbox checked');
		rightBranchModifier = random(0.5, 0.66);
		leftBranchModifier = random(0.5, 0.66);
	}
	
	strokeWeight(trunkThickness);
	trunkThickness *= 0.75;

	stroke(r, g, b);
	line(0, 0, 0, -len);
	translate(0, -len);
	push();
	rotate(angle);
	branch(len * rightBranchModifier, r, g, b, angle, trunkThickness);
	pop();
	push();
	rotate(-angle);
	branch(len * leftBranchModifier, r, g, b, angle, trunkThickness);
	pop();
}

function drawTree(r, g, b, trunkLength, x, y, angle) {
	var trunkThickness;
	if (trunkLength <= 100) {
		trunkThickness = 4;
	} else if (trunkLength <= 200) {
		trunkThickness = 5;
	} else {
		trunkThickness = 6;
	}

	push();
	translate(x, y);
	branch(trunkLength, r, g, b, angle, trunkThickness);
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

	ellipse(width - 50, 50, 50, 50);

}

function drawRandomForest () {
	clearForest();
	var numTrees = random(5, 12);
	 for (var j = 0; j < numTrees; j++) {
			treeArray.push([random(0, 255), random(0, 255), random(0, 255), random(50, 300), random(10, width-10), height, random(PI/8, PI/4)]);
	}
}

/*
how to move preview swatch dynamicly under sliders
add randomise forest button
check box to randomise angles
check box to have variable width dependent on length vs static width of 1
random branch length not just previous length * 0.67
*/