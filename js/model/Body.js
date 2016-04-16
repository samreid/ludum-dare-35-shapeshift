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

  function Body( boundaryCurve, holeCurves ) {
    this.boundaryCurve = boundaryCurve; // Array.<Vector2>
    this.holeCurves = holeCurves; // Array.<Array.<Vector2>>
  }

  shapeshift.register( 'Body', Body );

  return inherit( Object, Body, {

  } );
} );