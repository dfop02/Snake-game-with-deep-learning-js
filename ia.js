// snake, apple and score are in snake.js file

function NeuralNetwork() {
  // 4 Directions, 4 Neurons weights
  this.synaptic_weights = [0, 0, 0, 0, 0, 0, 0];
  this.max_score = 0;
  this.gen = 0;

  this.initNeurons = function() {
    for (var i = 0; i < this.synaptic_weights.length; i++) {
      this.synaptic_weights[i] = Math.random();
    }
  }

  // 1 Step Start Population
  this.initPopulation = function(num_games=100,score_objective=20) {
    this.population = []
    for (var i = 0; i < num_games; i++) {
      this.population[this.population.length] = initGame();
      while (snake.alive) {
        this.think(this.set_inputs());
        if (snake.score > this.max_score) {
          this.max_score = snake.score;
        }
        // Missing anything...
        // Where is the weights improve??
      }
    }
  }

  // Restart the game
  this.startGame = function() {
    resetGame();
  }

  // Get the inputs for current situation
  this.set_inputs = function() {
    return [this.observation(snake), snake.xspeed, snake.yspeed, apple.location.x, apple.location.y];
  }

  // Choose the next move based on input info
  this.think = function(inputs) {
    var front, left, right;
    // Set the sides for current direction
    if (createVector(snake.xspeed, snake.yspeed) == (0, -1)) {
      front = createVector(0, -1);
      left = createVector(-1, 0);
      right = createVector(1, 0);
    } else if (createVector(snake.xspeed, snake.yspeed) == (0, 1)) {
      front = createVector(0, 1);
      left = createVector(1, 0);
      right = createVector(-1, 0);
    } else if (createVector(snake.xspeed, snake.yspeed) == (1, 0)) {
      front = createVector(1, 0);
      left = createVector(0, -1);
      right = createVector(0, 1);
    } else if (createVector(snake.xspeed, snake.yspeed) == (-1, 0)) {
      front = createVector(-1, 0);
      left = createVector(0, 1);
      right = createVector(0, -1);
    }
    // Get the move that are not blocked
    if (inputs[0][0] == 0) {
      this.move_snake(left);
    } else if (inputs[0][1] == 0) {
      this.move_snake(front);
    } else if (inputs[0][2] == 0) {
      this.move_snake(right);
    }
  }

  // Set the next move to snake
  this.move_snake = function(direction) {
    snake.direction(direction.x, direction.y);
  }

  // Check the snake way if was blocked
  this.observation = function (snake) {
    direction = this.think();
    left = this.direction_blocked(snake, direction);
    front = this.direction_blocked(snake, direction);
    right = this.direction_blocked(snake, direction);
    return left, front, right;
  }

  this.direction_blocked = function(snake, direction) {
    nextSnakeXPosition = snake.x + direction[0] * 20;
    nextSnakeYPosition = snake.y + direction[1] * 20;

    for (var i = 0; i < snake.tail.length; i++) {
      var distance = dist(nextSnakeXPosition, nextSnakeYPosition, snake.tail[i].x, snake.tail[i].y);
      if (distance < 1) {
        return 1;
      }
    }
    if (nextSnakeXPosition < 20 || nextSnakeXPosition > 580 || nextSnakeYPosition < 20 || nextSnakeYPosition > 580) {
      return 1;
    }
    return 0;
  }

// Input Info:
// Is there an obstacle to the left of the snake (1 — yes, 0 — no)
// Is there an obstacle in front of the snake (1 — yes, 0 — no)
// Is there an obstacle to the right of the snake (1 — yes, 0 — no)
// Suggested direction (-1 — left, 0 — forward, 1 — right)
// Apple location (x, y)

}
