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

  function ArcadeLevel( availableOperations, numTargets ) {
    this.solved = {};
    this.availableOperations = availableOperations;

    var nonStaticOps = availableOperations.filter( function( op ) {
      return !op.isStatic;
    } );

    var staticOps = availableOperations.filter( function( op ) {
      return op.isStatic;
    } );

    this.staticOps = staticOps;

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
        out.push( nonStaticOps[ random.nextInt( nonStaticOps.length ) ] );
      }
      return out;
    };
    this.listOfGoalBodyGroups = [];
    for ( var i = 0; i < numTargets; i++ ) {
      var numberSteps = random.nextInt( 2 ) + 1;
      var randomSequence = getRandomSequence( numberSteps );

      var selectedStaticOp = staticOps[ random.nextInt( staticOps.length ) ];
      var bodies = selectedStaticOp.apply( null );
      for ( var k = 0; k < randomSequence.length; k++ ) {
        var op = randomSequence[ k ];
        bodies = mapBodies( bodies, op );
      }

      this.listOfGoalBodyGroups.push( bodies );
    }

    var toCanvas = function( bodyArray ) {
      var node = new Node( {
        children: bodyArray.map( function( b ) {return new BodyNode( b );} )
      } );
      var image = node.toCanvasNodeSynchronous().children[ 0 ].image;
      return image;
    };

    var self = this;

    this.isAnswerCorrect = function( bodyArray, goalBodies ) {
      var goalCanvas = toCanvas( goalBodies );
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