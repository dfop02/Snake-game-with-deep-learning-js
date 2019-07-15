var myGraphics;

var graph = function(g) {
  g.setup = function() {
    myGraphics = g.createCanvas(600, 600);
    myGraphics.show();
  }
  g.draw = function() {
    g.background(150);
    g.textSize(20);
    g.fill (255);
    g.textAlign(LEFT);
    g.text("SCORE: ", 20, 40);
    g.text("HIGHSCORE: ", 430, 40);
  }
}

// Show graph
var game_graph = new p5(graph, 'graph-game');
