let system_h;
let system_m;
let system_s;

let current_h;
let current_m;
let current_s;

function setup() {
  createCanvas(720, 400);
  system_h = new ParticleSystem(createVector(1 * width / 6, 50));
  system_m = new ParticleSystem(createVector(3 * width / 6, 50));
  system_s = new ParticleSystem(createVector(5 * width / 6, 50));

  current_h = hour();
  current_m = minute();
  current_s = second();
}

function draw() {
  background(51);
  if(second() != current_s){
	system_h.addParticle();

	current_s = second();
  }
  if(minute() != current_m){
	system_m.addParticle();

	current_m = minute();
	console.log(minute())
  }
  if(hour() != current_h){
	system_h.addParticle();

	current_h = hour();
  }
  system_h.run();

  var h = height - 100;

  fill(204);
  rect(1 * width / 6 - 40, 100, 80, h);
  rect(3 * width / 6 - 40, 100, 80, h);
  rect(5 * width / 6 - 40, 100, 80, h);

  fill(255);
  rect(1 * width / 6 - 40, 100, 80, h * current_s / 60);
  rect(3 * width / 6 - 40, 100, 80, h * current_m / 60);
  rect(5 * width / 6 - 40, 100, 80, h * current_h / 24);
}

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, 0.5);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 400;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
