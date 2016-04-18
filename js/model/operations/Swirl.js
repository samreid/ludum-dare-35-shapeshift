// Copyright 2015

/**
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var shapeshift = require( 'SHAPESHIFT/shapeshift' );
  var Body = require( 'SHAPESHIFT/model/Body' );
  var Operation = require( 'SHAPESHIFT/model/operations/Operation' );

  function Swirl( factor ) {
    this.factor = factor || 1;
    Operation.call( this, 'remap', '#c80', '' + factor, 'Swirl' );
  }

  shapeshift.register( 'Swirl', Swirl );

  return inherit( Operation, Swirl, {
    transform: function( vector ) {
      var angle = vector.angle();
      var magnitude = vector.magnitude();
      return Vector2.createPolar( magnitude, angle + this.factor * magnitude / 200 );
    },

    apply: function( body ) {
      return [ body.discreteTransformedCurve( this.transform.bind( this ) ) ];
    }
  } );

} );