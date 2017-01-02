var angle = PI/4;
var sliderAngle;
var sliderR;
var sliderG;
var sliderB;
var r;
var g;
var b;

function setup() {
	createCanvas(750,400);

	var config = createDiv('Options');

	var angleP = createP('Angle:');
	config.child(angleP);
	// (min, max, default value, increment)
	sliderAngle = createSlider(PI/8, PI/4, PI/6, 0.01);
	config.child(sliderAngle);


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
	angle = sliderAngle.value();
	r = sliderR.value();
	g = sliderG.value();
	b = sliderB.value();
/*
	push();
	translate(width-200, height);
	stroke(117);
	branchStatic(180, 80, 80, 80);
	pop();

	push();
	translate(200, height);
	stroke(117);
	branchStatic(220, 80, 80, 80);
	pop();*/

	push();
	translate(width/2, height);
	branchDynamic(100, r, g, b);
	pop();

	push();
	translate(width-650, height);
	branchDynamic(50, r, g, b);
	pop();

	push();
	translate(width-100, height);
	branchDynamic(50, r, g, b);
	pop();

}

function branchDynamic(len, r, g, b) {
	stroke(r, g, b);
	line(0, 0, 0, -len);
	translate(0, -len);

	if (len * 0.67 < 4) {
		stroke(r, g, b);
		ellipse(0, 0, 1, 1);
	}
	
	if (len > 4) {
		push();
		rotate(angle);
		branchDynamic(len * 0.67);
		pop();
		push();
		rotate(-angle);
		branchDynamic(len * 0.67);
		pop();
	}

}