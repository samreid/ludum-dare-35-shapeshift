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
    this.time = 0;
    this.path = new Path( this.getShape( 0.5, 0.5 ), { fill: 'gray' } );
    Node.call( this, {
      children: [
        this.path
      ]
    } );
    this.centerPointY = 0.4;
  }

  return inherit( Node, Eyebrow, {
    getShape: function( leftPointY, centerPointY ) {
      var outerRadius = 30;
      var left = new Vector2( -outerRadius, -leftPointY * 20 );
      var c1 = new Vector2( -30, -10 + 2 );
      var c2 = new Vector2( -15, -10 + 2 );

      var h = centerPointY * 30;
      var center = new Vector2( 0, -h );

      var right = new Vector2( outerRadius, 0 );
      var r1 = right.plusXY( -10, -10 );
      var r2 = right.plusXY( -5, -5 );

      var center2 = new Vector2( 0, -h + 15 );
      return new Shape()
        .moveToPoint( left )
        .cubicCurveToPoint( c1, c2, center )
        .cubicCurveToPoint( r1, r2, right )
        .lineToPoint( right.plusXY( -5, 5 ) )
        .lineToPoint( center2 )
        .lineToPoint( left.plusXY( 0, 5 ) )
        .close();
    },
    step: function( dt ) {
      this.time = this.time + dt;
      // var seconds = Math.round( this.time );
      if ( Math.random() < 0.01 ) {
        this.targetCenterPoint = Math.random() * 0.6 + 0.2;
        this.speed = (this.targetCenterPoint - this.centerPointY) / 80;
      }
      if ( this.centerPointY !== this.targetCenterPoint ) {
        if ( this.centerPointY < this.targetCenterPoint ) {
          this.centerPointY = this.centerPointY + this.speed;
          if ( this.centerPointY > this.targetCenterPoint ) {
            this.centerPointY = this.targetCenterPoint;
          }
        }
        if ( this.centerPointY > this.targetCenterPoint ) {
          this.centerPointY = this.centerPointY + this.speed;
          if ( this.centerPointY < this.targetCenterPoint ) {
            this.centerPointY = this.targetCenterPoint;
          }
        }
        // console.log( this.centerPointY );
        // var centerPointY = Math.abs( Math.sin( this.time * 6 ) ) / 2;
        var centerPointY = this.centerPointY;
        this.lastCenterPointY = centerPointY;
        this.path.shape = this.getShape( centerPointY, centerPointY + 0.3 );
      }
    }
  } );
} );