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

  function RemapAnimation( beforeBody, afterBody ) {
    this.beforeBody = beforeBody;
    this.afterBody = afterBody;

    var augmented = Body.remapAugmented( beforeBody, afterBody );
    this.augmentedBeforeBody = augmented.before;
    this.augmentedAfterBody = augmented.after;
  }

  shapeshift.register( 'RemapAnimation', RemapAnimation );

  return inherit( Object, RemapAnimation, {
    interpolateCurve: function( ratio, beforeCurve, afterCurve ) {
      var result = [];
      for ( var i = 0; i < beforeCurve.length; i++ ) {
        result.push( beforeCurve[ i ].blend( afterCurve[ i ], ratio ) );
      }
      return result;
    },

    getCurrentBody: function( ratio ) {
      var boundaryCurve = this.interpolateCurve( ratio,
                                                 this.augmentedBeforeBody.boundaryCurve,
                                                 this.augmentedAfterBody.boundaryCurve );
      var holeCurves = [];
      for ( var i = 0; i < this.augmentedBeforeBody.holeCurves.length; i++ ) {
        holeCurves.push( this.interpolateCurve( ratio,
                                                this.augmentedBeforeBody.holeCurves[ i ],
                                                this.augmentedAfterBody.holeCurves[ i ] ) );
      }
      return new Body( boundaryCurve, holeCurves );
    }
  } );
} );
