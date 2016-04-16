Rendering:
  Use Canvas comparison to tell if they reached the goal shape
  Possibly custom WebGL for fast rendering
    Potentially patch in Polygon

Arbitrary starting shape - complex polygons like an eagle or someone's face.

General implementation from source to target shapes.


animate the eyes, scare the character.  Look around, etc. => emotion + drama

Color changes, texture + pattern, etc.

potentially animate motion / shifting of poses

Model
  Body
    boundaryCurve
    holeCurve

Operations:
  Body => {
    newBoundaryCurve, with vectors tagged with newVector.old = oldVector
    newHoleCurve, with vectors tagged with v.old
    newBodies: Array.<Body>,
    animationType:
      'remap',
      'rotate',
      'duplicate'
  }

  adds a vertex in the middle of each edge, and moves it in our out <-- remap between "mapped" vertices

  catmull rom subdivision <--- remap between "mapped" vertices

  mirror right side to left <--- remap changed half

  reflect all vertices about the origin <-- full remap

  rotate <-- we actually want this rotate, instead of animating through itself.

  shear <-- map all vertices

  divide - cutting along a line or path <-- remap changed section

  delete every other vertex <-- remap between "mapped" vertices

  round corners "bevel" <-- remap between "mapped" vertices

  remix, swap quadrants with two others. <-- remap areas

  "make spiky", if a vertex angle is acute, it gets acuter.   insert vertex in edges, and "tug"
    Insert a vertex between two "inner" facing angles, or two "outer" facing angles <-- remap where necessary

  cut a hole in the middle: copy each vertex and move it toward the center a bit, reverse direction.
    get stroked shape?
    <-- NO map, just add hole or create new shape (and modify hole instantly?)
    ***** How to handle holes appearing?

  split button, duplicates all vertices to the side, copies eyes, etc.
    <-- NO map, separate "duplicate" animation

  swap hole shape with outer boundary shape
    <-- full remap both

  add a single vertex (presumably rotate other vertices around somehow?) - how does this work with multiple bodies?
    <-- remap around added vertex

  fractal operations:
  adds a triangle on every edge.

  add a copy of the shape at every vertex "mega fractal duplicate"
    <-- NO map, separate "duplicate" animation

  swap edges and vertices --- polygon duals
    <-- full remap

  "3d effect" "union" so it looks like a 3D extrusion
    <-- full remap?

  CAG http://polyk.ivank.net/?p=demos&d=closestedge
    Intersect your shape with another shape.
    Intersect with a flipped copy of your shape.
    <-- full remap

  Convex hull operation
    <-- remap any changed locations

  Triangulate and separate triangles
    As long as it's deterministic.

  Radial doubling
    <-- full remap



