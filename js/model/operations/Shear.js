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

  function Shear() {
    Operation.call( this, 'remap', '#888', '', 'Shear' );
  }

  shapeshift.register( 'Shear', Shear );

  return inherit( Operation, Shear, {
    transform: function( vector ) {
      return new Vector2( vector.x - vector.y, vector.y );
    },

    apply: function( body ) {
      return [ body.transformedWithOld( this.transform.bind( this ) ) ];
    }
  } );

} );