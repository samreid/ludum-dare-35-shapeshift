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
  var ArcadeLevel = require( 'SHAPESHIFT/view/arcade/ArcadeLevel' );
  var Body = require( 'SHAPESHIFT/model/Body' );
  var Vector2 = require( 'DOT/Vector2' );
  var Random = require( 'DOT/Random' );

  var random = new Random();

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
    var createStar = function( numPoints ) {
      var array = [];

      for ( var i = 0; i < numPoints; i++ ) {
        array.push( Vector2.createPolar( 100, i * ( Math.PI * 2 ) / numPoints ) );
        array.push( Vector2.createPolar( 200, ( i + 0.5 ) * ( Math.PI * 2 ) / numPoints ) );
      }

      return array;
    };

    var createRegular = function( numPoints ) {
      var array = [];

      for ( var i = 0; i < numPoints; i++ ) {
        array.push( Vector2.createPolar( 200, i * ( Math.PI * 2 ) / numPoints ) );
        // array.push( Vector2.createPolar( 200, ( i + 0.5 ) * ( Math.PI * 2 ) / numPoints ) );
      }

      return array;
    };

    // var createHalfRegular = function( numPoints ) {
    //   var array = [];

    //   for ( var i = 0; i <= numPoints; i++ ) {
    //     array.push( Vector2.createPolar( 200, -Math.PI / 2 + i / numPoints * ( Math.PI ) ) );
    //     // array.push( Vector2.createPolar( 200, ( i + 0.5 ) * ( Math.PI * 2 ) / numPoints ) );
    //   }

    //   return array;
    // };

    var createMoon = function() {
      var result = [];
      var res = 70;
      var angle1 = -Math.PI / 2;
      var angle2 = Math.PI * 3 / 4;
      for ( var i = 0; i <= res; i++ ) {
        var angle = angle1 + ( angle2 - angle1 ) * ( i / res );
        result.push( Vector2.createPolar( 200, angle ) );
      }
      var p1 = Vector2.createPolar( 1, angle1 );
      var p2 = Vector2.createPolar( 1, angle2 );
      var mid = p1.average( p2 ).plus( p2.minus( p1 ).perpendicular().normalized().timesScalar( -0.2 ) );
      var r = p1.distance( mid );
      var rangle1 = p1.minus( mid ).angle();
      var rangle2 = p2.minus( mid ).angle();
      for ( var j = 1; j < res; j++ ) {
        var rangle = rangle1 + ( rangle2 - rangle1 ) * ( 1 - j / res );
        result.push( Vector2.createPolar( 1, rangle ).plus( mid ).timesScalar( 200 ) );
      }
      return result;
    };

    this.getLevels = function() {
      var rectangle = [ new Vector2( 200, 200 ), new Vector2( -200, 200 ), new Vector2( -200, -200 ), new Vector2( 200, -200 ) ];

      var statics = [
        new Static( rectangle ),
        new Static( createRegular( 3 ), 'Triangle' ),
        new Static( createRegular( 3 ), 'Triangle' ),
        new Static( [ new Vector2( 200, 200 ), new Vector2( -200, 200 ), new Vector2( -200, -200 ), new Vector2( 200, -200 ) ], 'Square' ),
        new Static( createRegular( 5 ), 'Pentagon' ),
        new Static( createStar( 7 ), 'Star' ),
        new Static( [ new Vector2( 230, 0 ), new Vector2( 100, 130 ), new Vector2( 100, 60 ), new Vector2( -200, 60 ), new Vector2( -200, -60 ), new Vector2( 100, -60 ), new Vector2( 100, -130 ) ], 'Arrow' ),
        new Static( [
          new Vector2( 100, 200 ),
          new Vector2( -100, 200 ),
          new Vector2( -200, -200 ),
          new Vector2( 200, -200 )
        ], 'Cup' )
      ];
      var dynamics = [
        new Rotate( Math.PI / 2 ),
        new Scale( 1.5, 1 / 1.5 ),
        new Shear( 1 ),
        new Shear( -1 ),
        new ConvexHull(),
        new Subdivide(),
        new Invert( 180 ),
        new RadialDoubling(),
        new Snowflake( 1 ),
        new Snowflake( -1 ),
        new Swirl( 1 ),
        new Swirl( -1 ),
        new DeleteVertices( 2 )
      ];

      var createLevel = function( index ) {

        var remainingStatics = [].concat( statics );

        var numberStatics = index <= 3 ? 1 : index <= 6 ? 2 : 3;
        var ops = [];
        for ( var i = 0; i < numberStatics; i++ ) {
          var selectedStaticIndex = random.nextInt( remainingStatics.length );
          ops.push( remainingStatics[ selectedStaticIndex ] );
          remainingStatics.splice( selectedStaticIndex, 1 ); // remove so it can only be selected once
        }

        var numDynamic = index <= 2 ? 3 : index <= 5 ? 4 : index <= 8 ? 5 : 6;
        var usedSnowflakeOrSwirl = false;
        for ( var i = 0; i < numDynamic; i++ ) {
          var nextDynamic = dynamics[ random.nextInt( dynamics.length ) ];

          while ( usedSnowflakeOrSwirl && (nextDynamic.name === 'Swirl' || nextDynamic.name === 'Snowflake') ) {
            nextDynamic = dynamics[ random.nextInt( dynamics.length ) ];
          }
          ops.push( nextDynamic );
          if ( nextDynamic.name === 'Swirl' || nextDynamic.name === 'Snowflake' ) {
            usedSnowflakeOrSwirl = true;
          }
        }
        var numberSteps = Math.floor( index / 2 ) + 2;
        return new ArcadeLevel( ops, index + 3, numberSteps );
      };

      var levels = [];
      for ( var i = 0; i < 10; i++ ) {
        levels.push( createLevel( i ) );
      }
      return levels;
    };
  }

  return inherit( Object, LevelDesign, {} );
} );