// Copyright 2015

/**
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var shapeshift = require( 'SHAPESHIFT/shapeshift' );
  var Body = require( 'SHAPESHIFT/model/Body' );
  var Operation = require( 'SHAPESHIFT/model/operations/Operation' );
  var Vector2 = require( 'DOT/Vector2' );

  function RadialDoubling() {
    Operation.call( this, 'remap' );
  }

  shapeshift.register( 'RadialDoubling', RadialDoubling );

  return inherit( Operation, RadialDoubling, {

    apply: function( body ) {

      // closest to 0, in -pi,pi range
      function mapTheta( angle ) {
        angle = angle % ( Math.PI * 2 );
        if ( angle < -Math.PI ) {
          angle += Math.PI * 2;
        }
        if ( angle > Math.PI ) {
          angle -= Math.PI * 2;
        }
        return angle;
      }

      var radialDoubling = function( points ) {
        var result = [];
        var i;

        var initialTheta = points[ 0 ].angle();
        var theta = initialTheta;
        var mappedTheta = initialTheta;

        var firstPoint = points[ 0 ].copy();
        firstPoint.old = points[ 0 ];
        result.push( firstPoint );
        for ( i = 1; i < points.length; i++ ) {
          var p1Angle = points[ i ].angle();
          var thetaDelta1 = mapTheta( p1Angle - theta );
          mappedTheta += thetaDelta1 / 2;
          theta = p1Angle;
          var newPoint1 = Vector2.createPolar( points[ i ].magnitude(), mappedTheta );
          newPoint1.old = points[ i ];
          result.push( newPoint1 );
        }

        for ( i = 0; i < points.length; i++ ) {
          var p2Angle = points[ i ].angle();
          var thetaDelta2 = mapTheta( p2Angle - theta );
          mappedTheta += thetaDelta2 / 2;
          theta = p2Angle;
          var newPoint2 = Vector2.createPolar( points[ i ].magnitude(), mappedTheta );
          // no 'old'
          result.push( newPoint2 );
        }

        return result;
      };

      return [
        new Body(
          radialDoubling( body.boundaryCurve ),
          body.holeCurves.map( function( curve ) { return radialDoubling( curve ); } )
        )
      ];
    }
  } );

} );