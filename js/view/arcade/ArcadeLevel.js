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
  var Random = require( 'DOT/Random' );

  var random = new Random();

  function ArcadeLevel( startBodies, availableOperations, numTargets ) {
    this.startBodies = startBodies;
    this.availableOperations = availableOperations;

    var mapBodies = function( bodies, op ) {
      var result = [];
      bodies.forEach( function( body ) {
        result = result.concat( op.apply( body ) );
      } );
      return result;
    };

    var getRandomSequence = function( numberSteps ) {
      var out = [];
      for ( var i = 0; i < numberSteps; i++ ) {
        out.push( availableOperations[ random.nextInt( availableOperations.length ) ] );
      }
      return out;
    };
    this.listOfGoalBodyGroups = [];
    for ( var i = 0; i < numTargets; i++ ) {
      var numberSteps = random.nextInt( 2 ) + 1;
      var randomSequence = getRandomSequence( numberSteps );

      var bodies = startBodies;
      for ( var k = 0; k < randomSequence.length; k++ ) {
        var op = randomSequence[ k ];
        bodies = mapBodies( bodies, op );
      }

      this.listOfGoalBodyGroups.push( bodies );
      debugger;
    }

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

  return inherit( Object, ArcadeLevel, {
    getGoalBodies: function() {
      var children = [];
      for ( var i = 0; i < this.listOfGoalBodyGroups.length; i++ ) {
        var group = this.listOfGoalBodyGroups[ i ];
        children = children.concat( group );
      }
      return children;
    }
  } );
} );