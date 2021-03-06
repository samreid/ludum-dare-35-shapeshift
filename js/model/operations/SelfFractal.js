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

  function SelfFractal() {
    Operation.call( this, 'remap', '#0c6', '', 'Fractal' );
  }

  shapeshift.register( 'SelfFractal', SelfFractal );

  return inherit( Operation, SelfFractal, {
    apply: function( body ) {
      if ( body.boundaryCurve.length > 10 ) {
        return [ new Body( [], [] ) ];
        // return [ new Body( body.boundaryCurve.slice(), body.holeCurves.map( function( curve ) { return curve.slice(); } ) ) ];
      }
      var centroid = body.getBoundaryCentroid();

      return body.boundaryCurve.map( function( curvePoint ) {
        var offset = curvePoint.minus( centroid );
        return body.transformedWithOld( function( vector ) {
          return vector.timesScalar( 1 / 3 ).plus( offset );
        } );
      } );
    }
  } );

} );