class Node {
  constructor(word,tfidf, nodes) {
    this.nodes = nodes;
    this.word = word;
    this.tfidf = tfidf;
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1,1), random(-1,1));
    this.acc = createVector();
    this.target = createVector(width/2,height/2);
    this.maxSpeed = 1;
    this.maxForce = 1;
    this.cycles = 0;
    this.neighborDist = 25;
    this.maxIdf = 0;
    this.gotMax = false;
  }
  behavior() {
    let steering = this.stear(this.target);
    let separate = this.separate(this.nodes);
    let align = this.align(this.nodes);
    separate.mult(2);
    //steering.mult(0.5);
    align.mult(1);
    this.addForce(separate);
    //this.addForce(steering);
    this.addForce(align);

  }
  collision(node) {
    return this.r() + node.r();
  }
  calcMaxTfidf() {
    if(!this.gotMax)
      this.maxIdf = this.nodes.reduce(function(a, d) {a = Math.max(a,d.tfidf.tfidf()); return a;},0);
    this.gotMax = true;
    return this.maxIdf;
  }
  r() {
    return map(this.tfidf.tfidf()/2, 0, this.calcMaxTfidf(), 10, 125);
  }
  separate(nodes) {
    let sum = createVector(0,0);
    let force = createVector(0,0);
    let count = 0;
    for(let node of nodes) {
      if(node.word !== this.word) {
        let distVec = p5.Vector.sub(this.pos, node.pos);
        let d = distVec.mag();

        if(d > 0 && d < this.collision(node)) {

          distVec.normalize();
          distVec.div(d);
          sum.add(distVec);
          count++;
          // this.cycles++;
        }
      }
    }
    if(count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      force = p5.Vector.sub(sum, this.vel);
      force.limit(this.maxForce);
    }
    return force;
  }
  stear(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    desired.normalize();
    // let speed = this.maxSpeed;
    // if(d < 100) {
    //   speed = map(d, 0, 100, 0, this.maxSpeed);
    // }
    desired.mult(this.maxSpeed);
    let force = p5.Vector.sub(desired, this.vel);
    force.limit(this.maxForce);
    return (force);
  }
  align(nodes) {
    let sum = createVector(0,0);
    let count = 0;
    for(let i = 0; i < nodes.length; i++) {
      let d = p5.Vector.sub(nodes[i].pos, this.pos).mag();
      if(d > 0 && d < this.collision(nodes[i]) + this.neighborDist*2) {
        sum.add(nodes[i].vel);
        count++;
        if(count > 5)
          break;
      }
    }
    if(count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.vel);
      steer.limit(this.maxForce);
      return steer;
    }
    return createVector(0,0);
  }
  addForce(force) {
    if(this.cycles <= 1000) {
      this.acc.add(force);
    } else {
      this.vel.mult(0);
    }
  }
  update() {
    this.vel.add(this.acc);
    if(this.pos.x > width)
      this.pos.x = 0;
    else if (this.pos.x < 0)
      this.pos.x = width;
    if(this.pos.y < 0)
      this.pos.y = height;
    else if(this.pos.y > height)
      this.pos.y = 0;
    this.pos.add(this.vel);

    this.acc.mult(0);
  }
  show() {
      stroke(255);
      noFill();
      ellipse(this.pos.x, this.pos.y, this.r()*2);
      textAlign(CENTER);
      text(this.word, this.pos.x, this.pos.y);
  }
}
