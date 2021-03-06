// Copyright 2015

/**
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var shapeshift = require( 'SHAPESHIFT/shapeshift' );
  var Body = require( 'SHAPESHIFT/model/Body' );
  var Operation = require( 'SHAPESHIFT/model/operations/Operation' );

  function Snowflake( multiplier ) {
    this.multiplier = multiplier || 1;
    Operation.call( this, 'remap', '#a0a', '' + this.multiplier, 'Snowflake' );
  }

  shapeshift.register( 'Snowflake', Snowflake );

  return inherit( Operation, Snowflake, {
    apply: function( body ) {
      var self = this;

      if ( body.boundaryCurve.length > 1000 ) {
        return [ new Body( [], [] ) ];
        // return [ new Body( body.boundaryCurve.slice(), body.holeCurves.map( function( curve ) { return curve.slice(); } ) ) ];
      }

      var mapCurve = function( points ) {
        var result = [];
        for ( var i = 0; i < points.length; i++ ) {
          var firstPoint = points[ ( i === 0 ) ? ( points.length - 1 ) : ( i - 1 ) ];
          var secondPoint = points[ i ];

          var delta = secondPoint.minus( firstPoint );
          result.push( firstPoint.plus( delta.timesScalar( 1 / 3 ) ) );
          var equilateralPointMultiplier = ( 1 / 3 ) * ( 1 / 2 ) * Math.sqrt( 3 ) * self.multiplier;
          result.push( firstPoint.plus( delta.timesScalar( 1 / 2 ) ).plus( delta.perpendicular().timesScalar( equilateralPointMultiplier ) ) );
          result.push( firstPoint.plus( delta.timesScalar( 2 / 3 ) ) );
          var endpoint = secondPoint.copy();
          endpoint.old = secondPoint;
          result.push( endpoint );
        }
        result.old = points;
        return result;
      };

      return [
        new Body(
          mapCurve( body.boundaryCurve ),
          body.holeCurves.map( function( curve ) { return mapCurve( curve ); } )
        )
      ];
    }
  } );

} );