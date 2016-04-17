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

  function Eyebrow() {
    var outerRadius = 30;
    var left = new Vector2( -outerRadius, 0 );
    var c1 = new Vector2( -20, -10 );
    var c2 = new Vector2( -10, -10 );

    var center = new Vector2( 0, -30 );

    var right = new Vector2( outerRadius, 0 );
    var r1 = right.plusXY( -10, -10 );
    var r2 = right.plusXY( -5, -5 );

    var center2 = new Vector2( 0, -16 );

    Node.call( this, {
      children: [
        new Path( new Shape()
          .moveToPoint( left )
          .cubicCurveToPoint( c1, c2, center )
          .cubicCurveToPoint( r1, r2, right )
          .lineToPoint( right.plusXY( -5, 5 ) )
          .lineToPoint( center2 )
          .lineToPoint( left.plusXY( 0, 3 ) )
          .close(), { fill: 'gray' } )
      ]
    } );
  }

  return inherit( Node, Eyebrow, {} );
} );