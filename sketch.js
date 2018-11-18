let files = [
  'e',
  'a',
  'c',
  'd',
  'b',
  'f'];
let strings = [];
let nodes = [];

function preload() {
  console.log("loading files");
  for(let file of files) {
    strings.push(loadStrings('files/'+file+'.txt'));
  }
}

function setup() {
  createCanvas(1600,800);
  let t = new TFIDF(strings);
  let origin = t.getDocument(5);
  let keys = Object.keys(origin);
  keys.sort(function(a,b) {
    return origin[b].tfidf() - origin[a].tfidf();
  });
  console.log('making nodes');
  for(let key = 0; key < 100; key++) {
    nodes.push(new Node(keys[key], origin[keys[key]], nodes));
  }
  console.log('finished setup');
}

function draw() {
  background(0);
  for(let node of nodes) {
    node.behavior();
    node.update();
    node.show();
  }
}
