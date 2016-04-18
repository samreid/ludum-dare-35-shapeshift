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
    var createStar = function() {
      var array = [];

      var numPoints = 7;
      for ( var i = 0; i < numPoints; i++ ) {
        array.push( Vector2.createPolar( 90, i * ( Math.PI * 2 ) / numPoints ) );
        array.push( Vector2.createPolar( 180, ( i + 0.5 ) * ( Math.PI * 2 ) / numPoints ) );
      }

      return new Body( array, [] );
    };


    var createRegular = function( numPoints ) {
      var array = [];

      for ( var i = 0; i < numPoints; i++ ) {
        array.push( Vector2.createPolar( 200, i * ( Math.PI * 2 ) / numPoints ) );
        // array.push( Vector2.createPolar( 200, ( i + 0.5 ) * ( Math.PI * 2 ) / numPoints ) );
      }

      return array;
    };

    this.getLevels = function() {
      var rectangle = [ new Vector2( 200, 200 ), new Vector2( -200, 200 ), new Vector2( -200, -200 ), new Vector2( 200, -200 ) ];
      return [
        new ArcadeLevel( [ new Body( rectangle.slice(), [] ) ], [
          new Static( rectangle ),
          new Static( createRegular( 3 ), 'Triangle' ),
          new Snowflake( 1 ),
          new Snowflake( -1 ),
          new RadialDoubling()
        ], 3 )
      ];
    };
  }

  return inherit( Object, LevelDesign, {} );
} );