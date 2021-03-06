// snake, apple and score are in snake.js file

var qTable = {};
var learningRate = 0.85; // Learning Rate
var discountFactor = 0.9; // Discount Factor of Future Rewards
var randomize = 0.05; // Randomization Rate on Action

var actions = ["UP", "RIGHT", "DOWN", "LEFT"]
var moves = {
  "UP"   : [0, -1],
  "RIGHT": [1,  0],
  "DOWN" : [0,  1],
  "LEFT" : [-1, 0]
}

function NeuralNetwork() {
  // 4 Directions, 4 Neurons weights
  this.synaptic_weights = {
    'UP'   :0,
    'DOWN' :0,
    'LEFT' :0,
    'RIGHT':0
  };
  this.plays = 0;
  this.gen = 0;

  this.initNeurons = function() {
    for (var i = 0; i < this.synaptic_weights.length; i++) {
      this.synaptic_weights[i] = Math.random();
    }
  }

  // 1 Step Start Population
  this.initPopulation = function(score_objective=20) {
    this.population = []
    while (highScore < score_objective) {
      startGame();
      while (snake.alive) {
        this.move_snake(this.bestAction(this.get_states()));
      }
      this.plays += 1;
    }
  }

  // Restart the game
  this.startGame = function() {
    resetGame();
  }

  // Choose the next move based on input info
  this.think = function() {
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
    return [front, left, right];
  }

  // Set the next move to snake
  this.move_snake = function(action) {
    direction = this.select_direction(action);
    snake.direction(direction[0], direction[1]);
  }

  this.select_direction = function(action) {
    for (var key in moves) {
      if (action == key) {
        return moves[key]
      }
    }
  }

  this.get_states = function() {
    states = [];
    states.push(createVector(snake.x, snake.y));
    states.push(createVector(apple.location.x, apple.location.y));
    states.push(availableActions = [this.observation(snake)]);
    return states;
  }

  this.rewards = function() {
    var distance = dist(snake.x, snake.y, apple.location.x, apple.location.y);
    if (distance < 1) {
      return +1;
    } else if (!snake.alive) {
      return -1
    } else {
      return -0.1
    }
  }

  this.bestAction = function (current_states) {
    if(Math.random() < randomize){
      var random = Math.floor(Math.random() * moves.length);
      for (var key in moves) {
        return moves[key];
      }
    }

    var maxValue = current_states[availableActions[0]];
    var choseAction = moves[0];
    var actionsZero = [];
    for (var i = 0; i < moves.length; i++) {
      if (this.synaptic_weights[actions[i]] == 0) {
        actionsZero.push(actions[i]);
      }
      if (this.synaptic_weights[actions[i]] > maxValue) {
        maxValue = this.synaptic_weights[actions[i]];
        choseAction = actions[i];
      }
    }

    if(maxValue == 0){
      var random = Math.floor(Math.random() * actionsZero.length);
      choseAction = actionsZero[random];
    }

    return choseAction;
  }

  // Check the snake way if was blocked
  this.observation = function (snake) {
    direction = this.think();
    front = this.direction_blocked(snake, direction[0]);
    left = this.direction_blocked(snake, direction[1]);
    right = this.direction_blocked(snake, direction[2]);
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
