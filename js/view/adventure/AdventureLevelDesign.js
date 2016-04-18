// Copyright 2016, University of Colorado Boulder

/**
 *
 Murphy McMorph
 in
 Quest for the Crystal Fractal

 Day 1:
 On the road to the airport, I had to replace a flat tire.

 Our plane lost a wing, but I got it covered.

 In Cairo, my companion lost her passport, but I filled in.

 Chased by nazi werewolves, I am the silver bullet.

 The tomb was cursed--but you can't curse a spider.

 If I walk amongst the mummies, they will never find me.

 At last, the locked chamber.  I am the key.

 It was a trap, there is only one way out. (ladder)

 A flame will burn through the last barrier.

 The crystal fractal is mine and I belong to it.

 Credits and follow-up:
 6 years later, Murphy became a street performer.
 The mummies are still on the loose.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var AdventureLevel = require( 'SHAPESHIFT/view/adventure/AdventureLevel' );
  var Body = require( 'SHAPESHIFT/model/Body' );
  var Vector2 = require( 'DOT/Vector2' );

  // operations
  var Reflect = require( 'SHAPESHIFT/model/operations/Reflect' );
  var Rotate = require( 'SHAPESHIFT/model/operations/Rotate' );
  var ConvexHull = require( 'SHAPESHIFT/model/operations/ConvexHull' );
  var RadialDoubling = require( 'SHAPESHIFT/model/operations/RadialDoubling' );
  var SelfFractal = require( 'SHAPESHIFT/model/operations/SelfFractal' );
  var DeleteVertices = require( 'SHAPESHIFT/model/operations/DeleteVertices' );
  var Snowflake = require( 'SHAPESHIFT/model/operations/Snowflake' );
  var Subdivide = require( 'SHAPESHIFT/model/operations/Subdivide' );

  function LevelDesign() {
    var createTriangle = function() {
      var length = 150;
      var dx = 50;
      var dy = 40;
      var array = [ new Vector2( -length + dx, -length + dy ), new Vector2( length + dx, -length + dy ), new Vector2( -length + dx, length + dy ) ];
      return new Body( array, [] );
    };
    var createRectangle = function() {
      var length = 150;
      var dx = 0;
      var dy = 20;
      var array = [ new Vector2( -length + dx, -length + dy ), new Vector2( length + dx, -length + dy ), new Vector2( length + dx, length + dy ), new Vector2( -length + dx, length + dy ) ];
      return new Body( array, [] );
    };
    var createStar = function() {
      var array = [];

      var numPoints = 7;
      for ( var i = 0; i < numPoints; i++ ) {
        array.push( Vector2.createPolar( 90, i * ( Math.PI * 2 ) / numPoints ) );
        array.push( Vector2.createPolar( 180, ( i + 0.5 ) * ( Math.PI * 2 ) / numPoints ) );
      }

      return new Body( array, [] );
    };

    this.getLevels = function() {
      return [
        new AdventureLevel( 'Quest for the Crystal Fractal\n\n' +
                            'Day 1:\n' +
                            'On the road to the airport\n' +
                            'I had to replace a flat tire.', [ createRectangle() ], [
          new RadialDoubling(), new Snowflake(), new DeleteVertices( 3 )
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] ),
        new AdventureLevel( '', [ createStar() ], [
          new DeleteVertices( 3 ),
          new Snowflake()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake()
        ] ),
        new AdventureLevel( '', [ createTriangle() ], [
          new Snowflake(), new DeleteVertices( 3 ), new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] )
      ];
    };
  }

  return inherit( Object, LevelDesign, {} );
} );