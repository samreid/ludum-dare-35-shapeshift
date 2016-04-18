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

  function Scale( x, y ) {
    this.x = x;
    this.y = y;
    Operation.call( this, 'remap', Operation.SHIFT_COLOR, '' + x + ',' + y, 'Scale' );
  }

  shapeshift.register( 'Scale', Scale );

  return inherit( Operation, Scale, {
    transform: function( vector ) {
      return new Vector2( vector.x * this.x, vector.y * this.y );
    },

    apply: function( body ) {
      return [ body.transformedWithOld( this.transform.bind( this ) ) ];
    }
  } );

} );