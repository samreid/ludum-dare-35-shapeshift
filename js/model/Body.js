// Copyright 2015

/**
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var cupcakeSnake = require( 'CUPCAKE_SNAKE/cupcakeSnake' );

  function Body( boundaryCurve, holeCurves ) {
    this.boundaryCurve = boundaryCurve; // Array.<Vector2>
    this.holeCurves = holeCurves; // Array.<Array.<Vector2>>
  }

  cupcakeSnake.register( 'Body', Body );

  return inherit( Object, Body, {

  } );
} );