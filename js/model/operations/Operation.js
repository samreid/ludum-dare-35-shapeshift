// Copyright 2015

/**
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var cupcakeSnake = require( 'CUPCAKE_SNAKE/cupcakeSnake' );
  var inherit = require( 'PHET_CORE/inherit' );

  function Operation( animationType ) {
    this.animationType = animationType; // 'remap', 'rotate', 'duplicate'
  }

  cupcakeSnake.register( 'Operation', Operation );

  return inherit( Object, Operation, {
    apply: function( body ) {
      throw new Error( 'implement subtype' );
    }
  } );
} );