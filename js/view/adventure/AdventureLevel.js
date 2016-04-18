// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var BodyNode = require( 'SHAPESHIFT/view/BodyNode' );

  function Level( text, startBodies, operations, availableOperations ) {
    this.text = text;
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

    var toCanvas = function( bodyArray ) {
      var node = new Node( {
        children: bodyArray.map( function( b ) {return new BodyNode( b );} )
      } );
      var image = node.toCanvasNodeSynchronous().children[ 0 ].image;
      return image;
    };

    var self = this;

    this.isAnswerCorrect = function( bodyArray ) {
      var goalCanvas = toCanvas( self.goalBodies );
      var proposedAnswer = toCanvas( bodyArray );

      // TODO: precision is in pixels.  What should we do here?
      var equal = imagediff.equal( proposedAnswer, goalCanvas, 25 );
      return equal;
    };
  }

  return inherit( Object, Level, {} );
} );