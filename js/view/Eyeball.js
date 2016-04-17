// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );
  var Line = require( 'SCENERY/nodes/Line' );

  function Eyeball() {
    var outerRadius = 30;
    var outerScale = new Vector2( 1, 0.8 );
    var children = [];
    var MAX = 27;
    var pupil = new Circle( 7.5, { fill: 'black' } );
    var glimmer = new Circle( 2.5, { fill: 'white', x: -4, y: -3 } );
    for ( var i = 0; i < MAX; i++ ) {
      var p = Vector2.createPolar( 15, i / MAX * 2 * Math.PI );
      children.push( new Line( 0, 0, p.x, p.y, { stroke: 'black' } ) );
    }
    children.push( pupil );
    children.push( glimmer );
    var lines = new Node( {
      children: children
    } );

    var bluePart = new Circle( 15, {
      fill: 'blue',
      stroke: 'black',
      lineWidth: 2,
      children: [ lines ]
    } );

    Node.call( this, {
      children: [
        // new Path( new Shape()
        //   .moveTo( 0, outerRadius )
        //   .lineTo( outerRadius + 3, 0 )
        //   .lineTo( outerRadius + 5, 8 )
        //   .lineTo( 0, outerRadius )
        //   .close(), { fill: 'white' } ),
        new Circle( outerRadius, { fill: 'white', scale: outerScale } ),
        bluePart,
        // lines,
        // pupil,
        // glimmer
      ]
    } );
    this.lookAt = function( globalPoint ) {
      var local = this.globalToLocalPoint( globalPoint );
      var angle = local.angle();
      var magnitude = local.magnitude();
      bluePart.translation = Vector2.createPolar( Math.min( 10, magnitude ), angle );
    };
  }

  return inherit( Node, Eyeball, {} );
} );