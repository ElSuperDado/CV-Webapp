// authors: Damian Boquete, Ludovico Grabau & Dylan Peiry
const canvas = document.querySelector('#rotating-cube');

const ctx = canvas.getContext('2d');



// cube postions
const cube_center = [[-0.5, -0.5, -0.5, 1],//0
  [0.5, -0.5, -0.5, 1],//1
  [0.5, 0.5, -0.5, 1],//2
  [-0.5, 0.5, -0.5, 1],//3
  [-0.5, 0.5, 0.5, 1],//4
  [-0.5, -0.5, 0.5, 1],//5
  [0.5, -0.5, 0.5, 1],//6
  [0.5, 0.5, 0.5, 1]];//7

// triangles indexes
const indexes = [0, 1, 2,
  0, 2, 3,
  1, 2, 7,
  1, 6, 7,
  0, 1, 6,
  0, 5, 6,
  0, 3, 4,
  0, 4, 5,
  5, 6, 7,
  4, 5, 7,
  2, 3, 7,
  3, 4, 7];



// Multiply vertex by matrix
function matrixMult(vertex, matrix) {
  if (matrix.length != 4 && matrix[0].length != 4) {
    console.log("Matrix dimensions should be 4x4 !")
  }

  if (vertex.length != 4) {
    console.log("Vertex dimensions should be 4x1 !")
  }

  let new_vertex = [0, 0, 0, 0]

  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[i].length; j++) {
      new_vertex[i] += matrix[i][j] * vertex[j]
    }
  }

  return new_vertex;
}



// translates a triangle according to vertex
function translateTriangle(triangle, vertex) {
  const translateMat = [[1, 0, 0, vertex[0]],
    [0, 1, 0, vertex[1]],
    [0, 0, 1, vertex[2]],
  [0, 0, 0, 1]]

  return applyOnTriangle(triangle, translateMat)
}



// rotate triangle on X axis by an angle (degree)
function rotateTriangleOnX(triangle, degree_angle) {
  let a = degree_angle * Math.PI / 180

  cosA = Math.cos(a)
  sinA = Math.sin(a)

  const rotationMat = [[1, 0, 0, 0],
  [0, cosA, -sinA, 0],
  [0, sinA, cosA, 0],
  [0, 0, 0, 1]]

  return applyOnTriangle(triangle, rotationMat)
}



// rotate triangle on Y axis by an angle (degree)
function rotateTriangleOnY(triangle, degree_angle) {
  let a = degree_angle * Math.PI / 180

  cosA = Math.cos(a)
  sinA = Math.sin(a)

  const rotationMat = [[cosA, 0, -sinA, 0],
  [0, 1, 0, 0],
  [sinA, 0, cosA, 0],
  [0, 0, 0, 1]]

  return applyOnTriangle(triangle, rotationMat)
}



// rotate triangle on Z axis by an angle (degree)
function rotateTriangleOnZ(triangle, degree_angle) {
  let a = degree_angle * Math.PI / 180

  cosA = Math.cos(a)
  sinA = Math.sin(a)

  const rotationMat = [[cosA, -sinA, 0, 0],
  [sinA, cosA, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]]

  return applyOnTriangle(triangle, rotationMat)
}



// returns a copy of a triangle modified by matrixMult()
function applyOnTriangle(triangle, matrix) {
  let new_triangle = []

  //WTF this doesn't work in a for loop !?!?!?
  for (let i = 0; i < 3; i++) {
    new_triangle.push(matrixMult(triangle[i], matrix))
  }

  return new_triangle
}



// draws a triangle in console
function drawTriangle(vertexes) {
  let projectedVertexes = []

  for (let i = 0; i < 3; i++) {
    projectedVertexes.push(projectVertex(vertexes[i]))
  }

  scalingX_value = screen_width / 2
  scalingY_value = screen_height / 2

  ctx.moveTo((projectedVertexes[0][0] + 1) * scalingX_value, (projectedVertexes[0][1] + 1) * scalingY_value);
  ctx.lineTo((projectedVertexes[1][0] + 1) * scalingX_value, (projectedVertexes[1][1] + 1) * scalingY_value);
  ctx.lineTo((projectedVertexes[2][0] + 1) * scalingX_value, (projectedVertexes[2][1] + 1) * scalingY_value);
  ctx.lineTo((projectedVertexes[0][0] + 1) * scalingX_value, (projectedVertexes[0][1] + 1) * scalingY_value);
}



// computes projection on a vertex [x,y,z,w]
function projectVertex(vertex) {
  // this matrix came from javidx9 video (link below)
  projectionMatrix = [[ar * fov, 0, 0, 0],
  [0, fov, 0, 0],
  [0, 0, q, 1],
  [0, 0, -(zmin * q), 0]]

  return matrixMult(vertex, projectionMatrix)
}



// handles cube display on screen and rotation 
function drawCube(vertexes, indexes, angleX, angleY, angleZ) {
  for (let i = 0; i < 36; i += 3) {
    triangle = [vertexes[indexes[i]], vertexes[indexes[i + 1]], vertexes[indexes[i + 2]]]
    triangle = rotateTriangleOnX(triangle, angleX)
    triangle = rotateTriangleOnY(triangle, angleY)
    triangle = rotateTriangleOnZ(triangle, angleZ)
    drawTriangle(triangle)
  }
}



// a lot of our comprehesion came from this video:
// https://www.youtube.com/watch?v=ih20l3pJoeU&t=1880s

// PROJECTION CONSTANTS
const screen_height = canvas.height
const screen_width = canvas.width
const ar = screen_height / screen_width // aspect ratio

const tetha = 100.0 // degrees
const fov = 1 / Math.tan((tetha * (Math.PI / 180)) / 2) //field of view

const zmax = 1000.0 // farthest point in scene
const zmin = 0.1 // closest point in scene
const q = zmax / (zmax - zmin)


var x = 0;
var y = 0;
var z = 0;

// https://stackoverflow.com/questions/28870431/update-html-canvas-in-a-non-blocking-way
function run() {
  ctx.beginPath();
  drawCube(cube_center, indexes, x, y, z);
  ctx.clearRect(0, 0, screen_width, screen_height);
  ctx.stroke();

  x = ++x % 360;
  y = ++y % 360;
  z = ++z % 360;

  // mandatory for fluid frame behaviour 
  window.requestAnimationFrame(run);
}

ctx.lineWidth = 1;
ctx.strokeStyle = "white";
run();