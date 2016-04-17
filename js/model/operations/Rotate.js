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
    Operation.call( this, 'rotate', '#0a0', '' + angle );

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
      return [ body.transformedWithOld( this.transform.bind( this ) ) ];
    }
  } );

} );