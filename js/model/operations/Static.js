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

  function Static( curve, name ) {
    this.curve = curve;
    this.name = name;
    this.isStatic = true;

    Operation.call( this, 'remap', '#888', '[' + curve.map( function( v ) { return 'new Vector2( ' + v.x + ', ' + v.y + ')'; } ).join( ',' ) + ']', name );
  }

  shapeshift.register( 'Static', Static );

  return inherit( Operation, Static, {
    apply: function( body ) {
      return [ new Body( this.curve.slice(), [] ) ];
    }
  } );

} );