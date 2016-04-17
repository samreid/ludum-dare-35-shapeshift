// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  function Level( startBodies, operations, availableOperations ) {
    this.startBodies = startBodies;
    this.operations = operations;
    this.availableOperations = availableOperations;

    var mapBodies = function( bodies, op ) {
      var result = [];
      bodies.forEach( function( body ) {
        result = result.concat( op.apply( body ) );
      } );
      return result;
    };

    var bodies = startBodies;

    for ( var i = 0; i < this.operations.length; i++ ) {
      var op = this.operations[ i ];

      bodies = mapBodies( bodies, op );
    }

    this.goalBodies = bodies;

    this.isAnswerCorrect = function( bodyArray ) {
      console.log( 'checking correct' );
      return false;
    };
  }

  return inherit( Object, Level, {} );
} );