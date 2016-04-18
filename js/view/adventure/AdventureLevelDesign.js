// Copyright 2016, University of Colorado Boulder

/**
 *

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
          new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] ),
        new AdventureLevel( 'Our plane lost a wing\n' +
                            'but I got it covered.', [ createStar() ], [
          new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake()
        ] ),
        new AdventureLevel( 'In Cairo, my companion lost her passport\nbut I filled in.', [ createTriangle() ], [
          new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] ),
        new AdventureLevel( 'Chased by nazi werewolves,\n' +
                            'I am the silver bullet.', [ createTriangle() ], [
          new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] )
        , new AdventureLevel( 'The tomb was cursed--\n' +
                              'but you can\'t curse a spider.', [ createTriangle() ], [
          new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] )
        , new AdventureLevel( 'If I walk amongst the mummies,\n' +
                              'they will never find me..', [ createTriangle() ], [
          new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] )

        , new AdventureLevel( 'At last, the locked chamber.\n' +
                              'I am the key..', [ createTriangle() ], [
          new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] )
        , new AdventureLevel( 'It was a trap,\nthere is only one way out...', [ createTriangle() ], [
          new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] )
        , new AdventureLevel( 'A flame will burn\nthrough the last barrier..', [ createTriangle() ], [
          new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] ),
        new AdventureLevel( 'The crystal fractal is mine\nand now I belong to it.\n' +
                            '\nThe End', [ createTriangle() ], [
          new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] ),
        new AdventureLevel( 'Years later,\n' +
                            'Murphy McMorph became a street performer.',
          [ createTriangle() ], [
            new RadialDoubling()
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