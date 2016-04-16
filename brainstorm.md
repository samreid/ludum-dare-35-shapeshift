Rendering:
  Use Canvas comparison to tell if they reached the goal shape
  Possibly custom WebGL for fast rendering
    Potentially patch in Polygon

Arbitrary starting shape - complex polygons like an eagle or someone's face.

General implementation from source to target shapes.


animate the eyes, scare the character.  Look around, etc. => emotion + drama

Color changes, texture + pattern, etc.

potentially animate motion / shifting of poses


Operations:

  adds a vertex in the middle of each edge, and moves it in our out

  catmull rom subdivision

  mirror right side to left

  reflect all vertices about the origin

  rotate

  shear

  divide - cutting along a line or path

  delete every other vertex

  round corners "bevel"

  remix, swap quadrants with two others.

  "make spiky", if a vertex angle is acute, it gets acuter.   insert vertex in edges, and "tug"
    Insert a vertex between two "inner" facing angles, or two "outer" facing angles

  cut a hole in the middle: copy each vertex and move it toward the center a bit, reverse direction.
    get stroked shape?

  split button, duplicates all vertices to the side, copies eyes, etc.

  swap hole shape with outer boundary shape

  add a single vertex

  fractal operations:
  adds a triangle on every edge.

  add a copy of the shape at every vertex "mega fractal duplicate"

  swap edges and vertices --- polygon duals

  "3d effect" "union" so it looks like a 3D extrusion

  CAG http://polyk.ivank.net/?p=demos&d=closestedge
    Intersect your shape with another shape.
    Intersect with a flipped copy of your shape.

  Convex hull operation

  Triangulate and separate triangles
    As long as it's deterministic.

  Radial doubling



