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
  var Body = require( 'CUPCAKE_SNAKE/model/Body' );
  var Operation = require( 'CUPCAKE_SNAKE/model/operations/Operation' );

  function Reflect() {
    Operation.call( this, 'remap' );
  }

  cupcakeSnake.register( 'Reflect', Reflect );

  return inherit( Operation, Reflect, {
    transform: function( vector ) {
      return vector.timesScalar( -1 );
    },

    apply: function( body ) {
      return [
        new Body( body.boundaryCurve.map( this.transform.bind( this ) ),
                  body.holeCurves.map( function( curve ) { return curve.map( this.transform.bind( this ) ); } ) )
      ];
    }
  } );

} );