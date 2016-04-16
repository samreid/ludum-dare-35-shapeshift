// Copyright 2015

/**
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var shapeshift = require( 'SHAPESHIFT/shapeshift' );
  var inherit = require( 'PHET_CORE/inherit' );

  function Operation( animationType ) {
    this.animationType = animationType; // 'remap', 'rotate', 'duplicate'
  }

  shapeshift.register( 'Operation', Operation );

  return inherit( Object, Operation, {
    apply: function( body ) {
      throw new Error( 'implement subtype' );
    }
  } );
} );