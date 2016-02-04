
window.onload = function() {

  // Initialise an empty canvas and place it on the page
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  var particles = {},
    particleIndex = -1,
    size = 20;
  settings = {
    density: 20,
    particleSize: 10,
    gravity: 0
  };
  
  //number of particles
   var N = 500;
  //velocity constants
  var M1 = 5,M2 = 10;
  
  var colors = ["#A0B7DA","#D76C88","#ED1C4D","#890B00","#CEFC00","#82E580"];
  

  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random()-0.5) * M1;
    this.vy = (Math.random()-0.5) * M2;
	this.color = 0;

    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
  }

  Particle.prototype.draw = function() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < size) {
      this.x = size;
      this.vx = -this.vx;
	  this.color++;
    }
    if (this.x > canvas.width - size) {
      this.x = canvas.width - size;
      this.vx = -this.vx;
	  this.color++;
    }
    if (this.y < size) {
      this.y = size;
      this.vy = -this.vy;
	  this.color++;
    }
    if (this.y > canvas.height - size) {
      this.y = canvas.height - size;
      this.vy = -this.vy;
	  this.color++;
    }

    
    context.beginPath();
    context.fillStyle = colors[this.color % 6]
    context.arc(this.x, this.y, settings.particleSize, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }
  
  Particle.prototype.collide = function(){
	  this.color++;
	  this.vx = -this.vx;
	  this.vy = -this.vy;
	  //console.log("collide");
  }
  
   function distance(a,b){
	  var d = Math.sqrt(Math.pow(a.x-b.x,2) + Math.pow(a.y - b.y,2));
	  return d;
  }
  function dotProduct(a,b){
	  var p;
	  p = a[0]*b[0] + a[1]*b[1];
	  return p;
  }
  function collision(a,b){
/* 	  # relative location & velocity vectors
            r_rel = r1 - r2
            v_rel = v1 - v2 */
	  var r_rel = [0,0];
	  var u_rel = [0,0];
	  r_rel[0] = (b.x - a.x);
	  r_rel[1] = (b.y - a.y);
	  
	  //unit vector of relative location vector
	  u_rel[0] = r_rel[0]/(Math.sqrt(dotProduct(r_rel,r_rel)));
	  u_rel[1] = r_rel[1]/(Math.sqrt(dotProduct(r_rel,r_rel)));
	  	  
	  //initial velocity vectors
	  var v1 = [a.vx, a.vy];
	  var v2 = [b.vx, b.vy];
	  //reflection
	  var f = 0.8;
	  a.vx = a.vx - f*dotProduct(v1,u_rel) * u_rel[0];
	  a.vy = a.vx - f*dotProduct(v1,u_rel) * u_rel[1];
	  b.vx = b.vx + f*dotProduct(v1,u_rel) * u_rel[0];
	  b.vy = b.vx + f*dotProduct(v1,u_rel) * u_rel[1];
	  
 	  //update positions
	  var f2 = 0.1;
	  a.x += (a.x - b.x)*f2;
	  a.y += (a.y - b.y)*f2;
	  b.x += (b.x - a.x)*f2;
	  b.y += (b.y - a.y)*f2; 
  }

  for (var i = 0; i < N; i++) {
    new Particle();
  }

  setInterval(function() {
    // Erase canvas
    context.fillStyle = "rgba(10,10,10,0.8)";
    context.fillRect(0, 0, canvas.width, canvas.height);

		  //collision test
	  for (var i = 0 ; i < N-1; i++){
		  for (var j = i+1; j < N; j++){
			  var d = distance(particles[i],particles[j]);
			  //console.log(d);	
			  if (d <= 20){
				  //execute collision
				   //collision(particles[i],particles[j]);
				}
			}
		}
		
	for (var i in particles) {
      particles[i].draw();
	}		

  }, 30);

};