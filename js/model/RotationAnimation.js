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
  var Vector2 = require( 'DOT/Vector2' );

  function RotationAnimation( beforeBody, afterBody, angle ) {
    this.beforeBody = beforeBody;
    this.afterBody = afterBody;
    this.angle = angle;
  }

  shapeshift.register( 'RotationAnimation', RotationAnimation );

  return inherit( Object, RotationAnimation, {
    getCurrentBody: function( ratio ) {
      var angle = this.angle * ratio;
      return this.beforeBody.transformed( function( vector ) {
        return vector.rotated( angle );
      } );
    }
  } );
} );
