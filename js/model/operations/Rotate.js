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

  function Rotate( angle ) {
    Operation.call( this, 'rotate' );

    this.angle = angle;
  }

  shapeshift.register( 'Rotate', Rotate );

  return inherit( Operation, Rotate, {
    transform: function( vector ) {
      var result = vector.rotated( this.angle );
      result.old = vector;
      return result;
    },

    apply: function( body ) {
      var t = this.transform.bind( this );

      var boundary = body.boundaryCurve.map( t );
      boundary.old = body.boundaryCurve;

      return [
        new Body(
          boundary,
          body.holeCurves.map( function( curve ) {
            var newCurve = curve.map( t );
            newCurve.old = curve;
            return newCurve.map( t );
          } )
        )
      ];
    }
  } );

} );