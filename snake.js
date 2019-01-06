var snakeSize = 20;
var snake;
var apple;
var score;

function setup() {
  createCanvas(600, 600);
  resetGame();
  frameRate(10);
}

function resetGame() {
  snake = new Snake();
  apple = new Apple();
  score = new Score(snake);
  apple.generateApple();
}

function draw() {
  background(51);

  if (snake.alive) {
    snake.move();
    snake.death();
  }

  if (snake.eat(apple.location)) {
    apple.generateApple();
  }

  snake.render();
  apple.render();
  score.render();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.direction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.direction(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.direction(-1, 0);
  }
}

function Score(Snake) {
  this.points = 0;

  this.getScore = function() {
    this.points = Snake.total - 1;
  }

  this.render = function() {
    this.getScore()
    textSize(20);
    fill (255);
    textAlign(LEFT);
    text("SCORE: " + this.points, 20, 40);
  }
}

function Apple() {
  this.location;

  this.generateApple = function() {
    var rows = height/snakeSize;
    var cols = width/snakeSize;
    this.location = createVector(floor(random(cols)), floor(random(rows)));
    this.location.mult(snakeSize);
  }

  this.render = function() {
    fill(255, 0, 100);
    rect(this.location.x, this.location.y, snakeSize, snakeSize);
  }
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 1;
  this.alive = true;
  this.tail = [];

  this.direction = function(x, y) {
    // Block Snake to go behind
    if ((this.xspeed != 0 && x != 0) && (x > this.xspeed || x < this.xspeed)) {
      this.xspeed;
      this.yspeed;
    } else if ((this.yspeed != 0 && y != 0) && (y > this.yspeed || y < this.yspeed)) {
      this.xspeed;
      this.yspeed;
    } else {
      this.xspeed = x;
      this.yspeed = y;
    }
  }

  this.move = function() {
    this.x += this.xspeed * snakeSize;
    this.y += this.yspeed * snakeSize;
    // Block Snake in area
    this.x = constrain(this.x, 0, width - snakeSize);
    this.y = constrain(this.y, 0, height - snakeSize);
  }

  this.eat = function(apple_position) {
    var distance = dist(this.x, this.y, apple_position.x, apple_position.y);
    if (distance < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.death = function(reset=true) {
    for (var i = 0; i < this.tail.length; i++) {
      var distance = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
      if (distance < 1) {
        this.alive = false;
        if (reset) {
          setTimeout(resetGame, 2000);
        }
      }
    }
  }

  this.updateTail = function() {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total > 0) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }
  }

  this.render = function() {
    this.updateTail();
    fill(0, 255, 70);
    // Snake Body
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, snakeSize, snakeSize);
    }
    // Snake Head
    rect(this.x, this.y, snakeSize, snakeSize);
    // Snake Eyes
    fill(255);
    rect(this.x+5, this.y+10, 2, 2);
    rect(this.x+15, this.y+10, 2, 2);

    if (!this.alive) {
      textSize(20);
      fill (255);
      textAlign(CENTER);
      text("GAME OVER", 300, 300);
    }
  }
}
