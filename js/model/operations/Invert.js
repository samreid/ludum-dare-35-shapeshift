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

  function Invert( circleSize ) {
    this.circleSize = circleSize;

    Operation.call( this, 'remap', '#888' );
  }

  shapeshift.register( 'Invert', Invert );

  return inherit( Operation, Invert, {
    transform: function( vector ) {
      var angle = vector.angle();
      var magnitude = vector.magnitude();
      return Vector2.createPolar( this.circleSize / ( magnitude / this.circleSize ), angle );
    },

    apply: function( body ) {
      return [ body.discreteTransformedCurve( this.transform.bind( this ) ) ];
    }
  } );

} );