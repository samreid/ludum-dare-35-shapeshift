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
  var Shear = require( 'SHAPESHIFT/model/operations/Shear' );
  var Swirl = require( 'SHAPESHIFT/model/operations/Swirl' );
  var Invert = require( 'SHAPESHIFT/model/operations/Invert' );
  var Scale = require( 'SHAPESHIFT/model/operations/Scale' );
  var Static = require( 'SHAPESHIFT/model/operations/Static' );

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
    var createStar = function( numPoints ) {
      var array = [];

      for ( var i = 0; i < numPoints; i++ ) {
        array.push( Vector2.createPolar( 90, i * ( Math.PI * 2 ) / numPoints ) );
        array.push( Vector2.createPolar( 180, ( i + 0.5 ) * ( Math.PI * 2 ) / numPoints ) );
      }

      return array;
    };

    this.getLevels = function() {

      /*
       this.addOperation( new Rotate( Math.PI / 2 ) );
       this.addOperation( new Scale( 1.5, 1/1.5 ) );
       this.addOperation( new Shear( 1 ) );
       this.addOperation( new Shear( -1 ) );
       this.addOperation( new ConvexHull() );
       this.addOperation( new Subdivide() );
       this.addOperation( new Invert( 180 ) );
       this.addOperation( new RadialDoubling() );
       this.addOperation( new Snowflake( 1 ) );
       this.addOperation( new Snowflake( -1 ) );
       this.addOperation( new Swirl( 1 ) );
       this.addOperation( new Swirl( -1 ) );
       this.addOperation( new DeleteVertices( 2 ) );
       this.addOperation( new SelfFractal() ); // makes things slow in preview for many others
       this.addOperation( new Static( createRegular( 3 ), 'Triangle' ) );
       this.addOperation( new Static( [ new Vector2( 200, 200 ), new Vector2( -200, 200 ), new Vector2( -200, -200 ), new Vector2( 200, -200 ) ], 'Square' ) );
       this.addOperation( new Static( createRegular( 5 ), 'Pentagon' ) );
       this.addOperation( new Static( createStar( 7 ), 'Star' ) );
       this.addOperation( new Static( createRegular( 80 ), 'Circle' ) );
       // this.addOperation( new Static( createHalfRegular( 40 ), 'Semicircle' ) );
       this.addOperation( new Static( [ new Vector2( 230, 0 ), new Vector2( 100, 130 ), new Vector2( 100, 60 ), new Vector2( -200, 60 ), new Vector2( -200, -60 ), new Vector2( 100, -60 ), new Vector2( 100, -130 ) ], 'Arrow' ) );
       this.addOperation( new Static( [
       new Vector2( 100, 200 ),
       new Vector2( -100, 200 ),
       new Vector2( -200, -200 ),
       new Vector2( 200, -200 )
       ], 'Cup' ) );
       */

      var triangleCurve = [ new Vector2( 200, 0 ), new Vector2( -99.99999999999996, 173.20508075688775 ), new Vector2( -100.00000000000009, -173.20508075688767 ) ];
      var squareCurve = [ new Vector2( 200, 200 ), new Vector2( -200, 200 ), new Vector2( -200, -200 ), new Vector2( 200, -200 ) ];
      var arrowCurve = [ new Vector2( 230, 0 ), new Vector2( 100, 130 ), new Vector2( 100, 60 ), new Vector2( -200, 60 ), new Vector2( -200, -60 ), new Vector2( 100, -60 ), new Vector2( 100, -130 ) ];
      var starCurve = createStar( 7 );

      return [
        // Easier
        new AdventureLevel( 'Surrounded by Nazi vampires\n' +
                            'I had to disguise myself as a starfish.', [ new Body( triangleCurve, [] ) ], [
          new Invert( 180 ),
          new RadialDoubling(),
          new Invert( 180 )
        ], [
          new Static( triangleCurve ),
          new Invert( 180 ),
          new RadialDoubling()
        ] ),

        // Medium-hard
        new AdventureLevel( 'Would the ancient tribe save me?\n' +
                            'Only if I made them think I was\n' +
                            'Hungry Hungry Hippos', [ new Body( triangleCurve, [] ) ], [
          new Snowflake( 1 ),
          new Rotate( Math.PI / 2 ),
          new Scale( 1.5, 1 / 1.5 ),
          new RadialDoubling()
        ], [
          new Static( triangleCurve ),
          new Scale( 1.5, 1 / 1.5 ),
          new Rotate( Math.PI / 2 ),
          new Snowflake( 1 ),
          // new Snowflake( -1 ),
          new RadialDoubling()
        ] ),

        // Medium
        new AdventureLevel( 'To retrive the artifact of Kl\'aar\n' +
                            'I would have to venture\n' +
                            'into the depths of the ocean', [ new Body( arrowCurve, [] ) ], [
          new Snowflake( 1 ), new Invert( 180 ), new Rotate( 1.5707963267948966 )
        ], [
          new Static( arrowCurve ),
          new Rotate( Math.PI / 2 ),
          new Snowflake( 1 ),
          // new Snowflake( -1 ),
          new Invert( 180 )
        ] ),

        // Medium
        new AdventureLevel( '', [ new Body( starCurve, [] ) ], [
          new Snowflake( 1 ), new DeleteVertices( 2 ), new RadialDoubling()
        ], [
          new Static( starCurve ),
          new Snowflake( 1 ), new Snowflake( -1 ), new RadialDoubling(), new DeleteVertices( 2 )
        ] ),

        // Hard
        new AdventureLevel( '', [ new Body( squareCurve, [] ) ], [
          new Snowflake( -1 ), new Invert( 180 ), new Scale( 1.5, 0.6666666666666666 ), new Invert( 180 ), new RadialDoubling()
        ], [
          new Static( squareCurve ),
          new Scale( 1.5, 0.6666666666666666 ), new RadialDoubling(), new Snowflake( 1 ), new Snowflake( -1 ), new Invert( 180 ),
        ] ),


// square
//new Snowflake(-1), new Invert(180), new Scale(1.5,0.6666666666666666), new Invert(180), new RadialDoubling()

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
                            'but I got it covered.', [ new Body( createStar( 7 ), [] ) ], [
          new RadialDoubling()
        ], [
          new RadialDoubling(),
          new DeleteVertices( 3 ),
          new Snowflake()
        ] ),
        new AdventureLevel( 'In Cairo, my companion lost her passport\nbut I filled in.', [ createTriangle() ], [
          new RadialDoubling()
        ], [
          new Snowflake(),
          new DeleteVertices( 3 ),
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
        new AdventureLevel( 'Finally! The crystal fractal is mine--\n' +
                            'or now I belong to it.\n' +
                            '\nThe End', [ createTriangle() ], [
          new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] ),
        new AdventureLevel( 'Years later,\n' +
                            'Murphy McMorph retired and started a rock band.',
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