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

  function Operation( animationType, color, argsString, name ) {
    this.animationType = animationType; // 'remap', 'rotate', 'duplicate'
    this.color = color;
    this.argsString = argsString; // For creating levels
    this.name = name;
  }

  shapeshift.register( 'Operation', Operation );

  return inherit( Object, Operation, {
    apply: function( body ) {
      throw new Error( 'implement subtype' );
    },
    toString: function() {
      return 'new ' + this.constructor.name + '(' + ( this.argsString ? this.argsString : '' ) + ')'
    }
  }, {
    SHIFT_COLOR: '#0a0',
    SYMMETRIC_COLOR: '#0aa'
  } );
} );