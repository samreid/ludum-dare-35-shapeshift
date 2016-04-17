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

  function ShapeshiftModel() {
    var numPoints = Math.floor( Math.random() * 10 ) + 5;

    // var array = [ new Vector2( -100, -100 ), new Vector2( 100, -100 ), new Vector2( 100, 100 ), new Vector2( -100, 100 ) ];
    // var array = [ new Vector2( -100, -100 ), new Vector2( 100, -100 ), new Vector2( -100, 100 ) ];
    // var array = [ new Vector2( -100, -100 ), new Vector2( 100, -100 ), new Vector2( 100, 100 ), new Vector2() ];
    var array = [];

    numPoints = 7;
    for ( var i = 0; i < numPoints; i++ ) {
      array.push( Vector2.createPolar( 50, i * ( Math.PI * 2 ) / numPoints ) );
      array.push( Vector2.createPolar( 100, ( i + 0.5 ) * ( Math.PI * 2 ) / numPoints ) );
      // var x = Math.random() * 200 - 100;
      // var y = Math.random() * 200 - 100;
      // array.push( new Vector2( x, y ) );
    }

    var initialBody = new Body( array, [] );

    PropertySet.call( this, {} );
    window.model = this;

    this.bodies = new ObservableArray( [ initialBody ] ); // current display
    this.targetBodies = new ObservableArray( [ initialBody ] ); // latest target
    this.initialBody = initialBody;
    this.animationQueue = [];
  }

  return inherit( PropertySet, ShapeshiftModel, {
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
      this.bodies.clear();
      this.bodies.add( this.initialBody );
      this.targetBodies.clear();
      this.targetBodies.add( this.initialBody );
      this.animationQueue = [];
    }
  } );
} );