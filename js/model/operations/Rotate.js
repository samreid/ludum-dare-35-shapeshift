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

  function Rotate( angle ) {
    Operation.call( this, 'rotate' );

    this.angle = angle;
  }

  cupcakeSnake.register( 'Rotate', Rotate );

  return inherit( Operation, Rotate, {
    transform: function( vector ) {
      var result = vector.rotated( this.angle );
      result.old = vector;
      return result;
    },

    apply: function( body ) {
      return [
        new Body( body.boundaryCurve.map( this.transform.bind( this ) ),
                  body.holeCurves.map( function( curve ) { return curve.map( this.transform.bind( this ) ); } ) )
      ];
    }
  } );

} );