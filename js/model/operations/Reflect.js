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

  function Reflect() {
    Operation.call( this, 'remap' );
  }

  shapeshift.register( 'Reflect', Reflect );

  return inherit( Operation, Reflect, {
    transform: function( vector ) {
      return vector.timesScalar( -1 );
    },

    apply: function( body ) {
      var t = this.transform.bind( this );
      return [
        new Body(
          body.boundaryCurve.map( t ),
          body.holeCurves.map( function( curve ) { return curve.map( t ); } )
        )
      ];
    }
  } );

} );