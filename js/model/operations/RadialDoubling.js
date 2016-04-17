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

      var radialDoubling = function( points ) {
        var initialTheta = points[ 0 ].angle();
        var mapFunction = function( angle ) {
          return function( v ) {
            var r = v.magnitude();
            var theta = v.angle();

            var thetaNew = (theta - initialTheta) / 2 + angle + initialTheta;
            return Vector2.createPolar( r, thetaNew );
          };
        };
        return points.map( mapFunction( 0 ) ).concat( points.map( mapFunction( Math.PI ) ) );
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