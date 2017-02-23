
//  cd /Users/alexheselton/Documents/p5-zip/empty-example 
// hiiii

var pitches1 = [69, 67, 64, 62, 60, 57, 55, 52, 50, 48, 45, 43, 40, 38, 36];
var pitches2 = [81, 79, 76, 74, 72, 69, 67, 64, 62, 60, 57, 55, 52, 50, 48];
var pitches3 = [93, 91, 88, 86, 84, 81, 79, 76, 74, 72, 69, 67, 64, 62, 60];

var redBubbles = [];
var blueBubbles = [];
var yellowBubbles = [];
var greenBubbles = [];

var drone;
var maxBubbles = 20;

function preload() {
	///drone = loadSound('https://raw.githubusercontent.com/alexheselton/bubbles_p5/blob/master/assets/DRONEINCHESSISB.mp3');
	//drone = loadSound('https://raw.githubusercontent.com/alexheselton/bubbles_p5/assets/DRONEINCHESSISB.mp3');
	drone = loadSound('https://cdn.rawgit.com/AlexHeselton/bubbles_p5/4e130617/assets/DRONEINCHESSISB.mp3');
}

function setup() {
  drone.loop();
  createCanvas(windowWidth, windowHeight);
  ellipseMode(RADIUS);


  //Blue sine bubble
  var blueStroke = color(255, 135, 120);          
  var blueFill = color(160, 240, 250);   
  var bluePressFill = color(160, 255, 255);    
  var blueOsc = new p5.SinOsc();
  blueOsc.start();
  blueOsc.amp(0);
  var blueEnvelope = new p5.Env();
  blueEnvelope.setADSR(0.001, 0.5, 0.8, 2);
  blueEnvelope.setRange(1, 0);
  var blue = [blueStroke, blueFill, bluePressFill, blueOsc, blueEnvelope, pitches3];

  //Red triangle bubble
  var redStroke = color(60, 240, 250);       
  var redFill = color(235, 125, 120);
  var redPressFill = color(255, 135, 120);
  var redOsc = new p5.TriOsc();
  redOsc.start();
  redOsc.amp(0);
  var redEnvelope = new p5.Env();
  redEnvelope.setADSR(0.1, 0.5, 0.6, 1.5);
  redEnvelope.setRange(1, 0);
  var red = [redStroke, redFill, redPressFill, redOsc, redEnvelope, pitches2];

  //yellow saw bubble
  var yellowStroke = color(110, 225, 90);
  var yellowFill = color(225, 220, 90);
  var yellowPressFill = color(235, 235, 95);
  var yellowOsc = new p5.SawOsc();
  yellowOsc.start();
  yellowOsc.amp(0);
  var yellowEnvelope = new p5.Env();
  yellowEnvelope.setADSR(0.001, 0.5, 0.1, 0.5);
  yellowEnvelope.setRange(1, 0);
  var yellow = [yellowStroke, yellowFill, yellowPressFill, yellowOsc, yellowEnvelope, pitches1];

  //Green square bubble 
  var greenStroke = color(255, 130, 40);
  var greenFill = color(110, 225, 90);
  var greenPressFill = color(115, 255, 95);
  var greenOsc = new p5.SqrOsc();
  greenOsc.start();
  greenOsc.amp(0);
  var greenEnvelope = new p5.Env();
  greenEnvelope.setADSR(0.001, 0.5, 0.3, 0.8);
  greenEnvelope.setRange(1, 0);
  var green = [greenStroke, greenFill, greenPressFill, greenOsc, greenEnvelope, pitches1]; 
  
  //Generate arrays of colored bubbles
  for (var i = 0; redBubbles.length < maxBubbles; i++) {
	redBubbles[i] = new Bubble(red[0], red[1], red[2], red[3], red[4], red[5]); 
  }
  for (var i = 0; blueBubbles.length < maxBubbles; i++) {
  	blueBubbles[i] = new Bubble(blue[0], blue[1], blue[2], blue[3], blue[4], blue[5]); 
  }
  for (var i = 0; yellowBubbles.length < maxBubbles; i++) {
  	yellowBubbles[i] = new Bubble(yellow[0], yellow[1], yellow[2], yellow[3], yellow[4], yellow[5]); 
  }
  for (var i = 0; greenBubbles.length < maxBubbles; i++) {
  	greenBubbles[i] = new Bubble(green[0], green[1], green[2], green[3], green[4], green[5]); 
  }

}

function draw() {

  background(255);
  time = millis();

  

 
  // for (var i = -20; i < width+20; i +=20) {
  // 	MovingLine(i);
  // }
  
  //stagger the display and activation of the bubbles 
  for (i = 0; i < redBubbles.length; i++) {
  	if (i * 1000 < time) {
  		redBubbles[i].display();
  		redBubbles[i].activate();
    }
  }
  for (i = 0; i < blueBubbles.length; i++) {
  	if (i * 2000 < time) {
  		blueBubbles[i].display();
  		blueBubbles[i].activate();
  	}
  }
  for (i = 0; i < yellowBubbles.length; i++) {
  	if (i * 3000 < time) {
  		yellowBubbles[i].display();
  		yellowBubbles[i].activate();
  	}
  }
  for (i = 0; i < greenBubbles.length; i++) {
  	if (i * 4000 < time) {
  		greenBubbles[i].display();
  		greenBubbles[i].activate();
  	}
  }

}
  
//Bubble constructor function
function Bubble(tempStroke, tempFill, tempPressFill, tempOsc, tempEnvelope, tempPitches) {

	this.x = random(width);
	this.angleVel = 0.2;
	this.angle = 0;
	this.amplitude = 60;

	this.startRadius = random(15, 30);
	this.radius = this.startRadius;
	this.maxRadius = this.startRadius*2;
	this.grow = true;
	this.growthSpeed = 0.25;

	this.y = height+this.radius;
	this.ySpeed = random(0.2, 0.8);

	this.stroke = tempStroke;
	this.startFill = tempFill;
	this.pressFill = tempPressFill;
	this.fill = tempFill;

	this.osc = tempOsc;
	this.envelope = tempEnvelope;
	this.pitches = tempPitches; 
	this.midiValue = this.note;
	this.freqValue = midiToFreq(this.midiValue);
	
	this.display = function() {
		stroke(this.stroke);
  		fill(this.fill);
  		if (this.y < 0 - this.radius) {
  			this.y = height+this.radius;
  			this.x = random(width);
  		}
  		ellipse(this.x, this.y, this.radius, this.radius);
	};

	this.activate = function() {
		//Circle gets bigger when mouse presses bubble
		this.d = dist(mouseX, mouseY, this.x, this.y);
		if ((this.d < this.radius) && mouseIsPressed) {
			//Bubbles sticks to mouse
		  	this.x = mouseX;
		  	this.y = mouseY;
		  	//Bubble changes color
		  	this.fill = this.pressFill;
			//Grows bigger and smaller
			if (this.radius <= this.startRadius) {
				this.radius += this.growthSpeed;
				this.grow = true;
			}
			else if ((this.radius > this.startRadius) && (this.radius < this.maxRadius)) {
				if (this.grow == true) {
					this.radius += this.growthSpeed;
				}
				else {
					this.radius -= this.growthSpeed;
				}
			}
			else {
				this.radius -= this.growthSpeed;
				this.grow = false;
			}
		    //Plays the note
		    this.midi = floor(map(mouseY, 0, height, 0, this.pitches.length));
		    this.osc.freq(midiToFreq(this.pitches[this.midi]));
		    this.volume = map(this.x, 0, width, 0, 4);
		    this.osc.amp(this.volume);
		    this.envelope.play(this.osc); 
		}	
		else {
			//oscillator stops 
			this.osc.amp(0);
			//Color changes back
			this.fill = this.startFill;
		  	//Circle slowly rises to the top of the screen
		  	this.y -= this.ySpeed;
		  	//Circle moves left and right randomly
		  	//this.x = this.amplitude*sin(this.angle);
		  	//this.angle += this.angleVel;
		 	//this.noiseScale += 0.01;
		 	//this.x = noise(this.noiseScale)*100;
		 	//Circle remains small or shrinks back to original size
		    if (this.radius <= this.startRadius) {
		    	this.radius = this.startRadius;
		    }
		    else {
		    	this.radius -= this.growthSpeed;
			}
		}
	};
}











// function MovingLine(x) {
// 	noStroke();
// 	randomSeed(0);
// 	fill(random(200, 240));

// 	var angle = 0.0;
// 	var offset = 60;
// 	var scalar = 40;
// 	var speed = 0.05;

// 	var lineY = [];
// 	var lineX = [];

// 	var ellipseCount = 0;

// 	for (var i = 0; i <= height; i += 10) {
// 		lineY[i/10] = i;
// 	}
// 	for (var i = 0; i <= height; i+= 10) {
// 		lineX[i/10] = x + sin(angle + ((i/10) / 100)) * scalar;
// 		angle += speed;
// 	}

// 	for (var i = 0; i <= height; i++) {
// 		ellipse(lineX[i], lineY[i], 3, 3);
// 	}
// }


