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

  function CompositeOperation( operations ) {
    this.operations = operations;
    Operation.call( this, 'remap', '#005', operations.join( ', ' ) );
  }

  shapeshift.register( 'CompositeOperation', CompositeOperation );

  return inherit( Operation, CompositeOperation, {
    apply: function( body ) {
      for ( var i = 0; i < this.operations.length; i++ ) {
        body = this.operations[ i ].apply( body );
      }
      return body;
    }
  } );

} );