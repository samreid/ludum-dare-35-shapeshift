define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Vector2 = require( 'DOT/Vector2' );
  var Reflect = require( 'SHAPESHIFT/model/operations/Reflect' );
  var Rotate = require( 'SHAPESHIFT/model/operations/Rotate' );
  var CompositeAnimation = require( 'SHAPESHIFT/model/CompositeAnimation' );
  var RemapAnimation = require( 'SHAPESHIFT/model/RemapAnimation' );
  var RotationAnimation = require( 'SHAPESHIFT/model/RotationAnimation' );
  var Body = require( 'SHAPESHIFT/model/Body' );

  var Sound = require( 'VIBE/Sound' );

  var lastPlaySound = Date.now();
  var numberOfReplaysProperty = new Property( 0 );

  var LevelDesign = require( 'SHAPESHIFT/model/LevelDesign' );

  var levels = new LevelDesign().getLevels();

  function ShapeshiftModel() {

    PropertySet.call( this, {} );
    window.model = this;

    this.animationQueue = [];

    this.bodies = new ObservableArray(); // current display
    this.targetBodies = new ObservableArray(); // latest target
    this.goalBodies = new ObservableArray();

    var level = phet.chipper.getQueryParameter( 'level' );
    if ( typeof level === 'string' ) {
      level = parseInt( level, 10 );
    }
    else {
      level = 0;
    }
    this.startLevel( levels[ level ] );
  }

  return inherit( PropertySet, ShapeshiftModel, {
    startLevel: function( level ) {
      this.currentLevel = level;

      this.bodies.clear();
      this.bodies.addAll( level.startBodies );

      this.targetBodies.clear();
      this.targetBodies.addAll( level.startBodies.concat( [] ) );

      this.goalBodies.clear();
      this.goalBodies.addAll( level.goalBodies );
    },
    step: function( dt ) {
      var hadAnimation = this.animationQueue.length;

      while ( this.animationQueue.length && dt ) {
        dt = this.animationQueue[ 0 ].step( dt );

        // If there is remaining time, our animation has finished
        if ( dt > 0 ) {
          this.animationQueue.shift();
        }
      }

      if ( this.animationQueue.length ) {
        this.bodies.clear();
        this.bodies.addAll( this.animationQueue[ 0 ].getBodies() );
      }
      else if ( hadAnimation ) {
        this.bodies.clear();
        this.bodies.addAll( this.targetBodies.getArray() );

        // All queued actions completed
        // check for success
        this.checkSuccess();
      }
    },

    checkSuccess: function() {
      var isCorrect = this.currentLevel.isAnswerCorrect( this.bodies.getArray() );
      if ( isCorrect ) {
        var levelIndex = levels.indexOf( this.currentLevel ) + 1;
        if ( levelIndex >= levels.length ) {
          levelIndex = 0;
        }
        this.startLevel( levels[ levelIndex ] );
      }
    },

    applyOperation: function( operation ) {
      var newTargetBodies = [];
      this.targetBodies.forEach( function( body ) {
        newTargetBodies = newTargetBodies.concat( operation.apply( body ) );
      } );

      if ( operation.animationType === 'remap' ) {
        this.animationQueue.push( new CompositeAnimation( this.targetBodies.map( function( body ) {
          return new RemapAnimation( body, operation.apply( body )[ 0 ] );
        } ).getArray(), 0.5 ) );
      }
      else if ( operation.animationType === 'rotate' ) {
        this.animationQueue.push( new CompositeAnimation( this.targetBodies.map( function( body ) {
          return new RotationAnimation( body, operation.apply( body )[ 0 ], operation.angle );
        } ).getArray(), 0.5 ) );
      }
      else {
        // throw new Error( 'implement duplicate animation' );
        // TODO
        if ( !this.animationQueue.length ) {
          // we wouldn't get updated otherwise
          this.bodies.clear();
          this.bodies.addAll( newTargetBodies );
        }
      }

      this.targetBodies.clear();
      this.targetBodies.addAll( newTargetBodies );
    },

    reset: function() {
      this.startLevel( this.currentLevel );
      this.animationQueue = [];
    }
  }, {
    levels: levels
  } );
} );