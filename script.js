let namespace = joint.shapes;
let btnAddEntity = document.getElementById("btnAddEntity");
let btnAddAtribute = document.getElementById("btnAddAttribute");

//event listeners
btnAddEntity.addEventListener("click", function () {
  let rect = new joint.shapes.basic.Rect({
    position: { x: 100, y: 100 },
    size: { width: 100, height: 50 },
    attrs: {
      rect: { fill: "Red" },
      text: { text: "Entity", fill: "white" },
    },
  });
  rect.addTo(graph);
});

btnAddAtribute.addEventListener("click", function () {
  let rect = new joint.shapes.basic.Ellipse({
    position: { x: 100, y: 100 },
    size: { width: 100, height: 50 },
    attrs: {
      ellipse: { fill: "black" },
      text: { text: "Attribute", fill: "white" },
    },
  });
  rect.addTo(graph);
});
//graph
let graph = new joint.dia.Graph({}, { cellNamespace: namespace });

//paper
let paper = new joint.dia.Paper({
  el: document.getElementById("paper-container"),
  model: graph,
  width: "100%",
  height: 968,
  gridSize: 10,
  drawGrid: true,
  background: {
    color: "rgba(0, 255, 0, 0.3)",
  },
  cellViewNamespace: namespace,
});

paper.on("cell:pointerdown", function (cellView, evt, x, y) {
  console.log("cellView:", cellView);
  console.log("evt:", evt);
  console.log("x:", x);
  console.log("y:", y);
  if (!this.selectedElement) {
    this.selectedElement = cellView.model;
    return;
  }
  let link = new joint.dia.Link({
    source: { id: this.selectedElement.id },
    target: { id: cellView.model.id },
    attrs: { ".marker-target": { d: "M 10 0 L 0 5 L 10 10 z" } },
  });
  graph.addCells([link]);
  this.selectedElement = null;
});
//element
let rect = new joint.shapes.standard.Rectangle();
rect.position(100, 30);
rect.resize(100, 40);
rect.attr({
  body: {
    fill: "blue",
  },
  label: {
    text: "Hello",
    fill: "white",
  },
});
rect.addTo(graph);

let rect2 = rect.clone();
rect2.translate(300, 0);
rect2.attr("label/text", "World!");
rect2.addTo(graph);

let link = new joint.shapes.standard.Link();
link.source(rect);
link.target(rect2);
link.addTo(graph);

let newLink = new joint.shapes.standard.Link();
newLink.source(rect2);
newLink.target(rect);
newLink.addTo(graph);

let rect3 = rect.clone();
rect3.translate(0, 100);
rect3.addTo(graph);
