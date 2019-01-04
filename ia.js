//import * as lib from './snake.js';

export function NeuralNetwork() {
  // 4 Directions, 4 Neurons weights
  this.synaptic_weights = [0, 0, 0, 0];
  this.max_score = 0;
  this.gen = 0;
  this.initNeurons();

  this.initNeurons = function() {
    for (var i = 0; i < this.synaptic_weights.length; i++) {
      this.synaptic_weights[i] = Math.random();
    }
  }

  this.sigmoid = function(x) {
    // applying the sigmoid function
    return 1 / (1 + Math.exp(x));
  }

  this.sigmoid_derivative = function(x) {
    // computing derivative to the Sigmoid function
    return x * (1 - x);
  }

  this.think = function(inputs) {
    // passing the inputs via the neuron to get output   
    inputs = inputs.astype(float);
    return this.sigmoid(sum(inputs * this.synaptic_weights));
  }
}
