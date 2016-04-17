// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Level = require( 'SHAPESHIFT/model/Level' );
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
        new Level( [ createRectangle() ], [
          new RadialDoubling(), new Snowflake(), new DeleteVertices( 3 )
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] ),
        new Level( [ createStar() ], [
          new DeleteVertices( 3 ),
          new Snowflake()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake()
        ] ),
        new Level( [ createTriangle() ], [
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