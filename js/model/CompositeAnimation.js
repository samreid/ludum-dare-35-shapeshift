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

  function CompositeAnimation( animations, duration ) {
    this.animations = animations;

    this.duration = duration;
    this.timeElapsed = 0;
  }

  shapeshift.register( 'CompositeAnimation', CompositeAnimation );

  return inherit( Object, CompositeAnimation, {
    step: function( dt ) {
      this.timeElapsed += dt;

      // Return remaining time that should be applied to future animations (positive indicates this animation is done).
      if ( this.timeElapsed > this.duration ) {
        return this.timeElapsed - this.duration;
      }
      else {
        return 0;
      }
    },

    getBodies: function() {
      // Linear for now, but can modify this formula to handle tweening.
      var ratio = this.timeElapsed / this.duration;

      return this.animations.map( function( animation ) {
        return animation.getCurrentBody( ratio );
      } );
    }
  } );
} );
