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

  function Subdivide() {
    Operation.call( this, 'remap' );
  }

  shapeshift.register( 'Subdivide', Subdivide );

  return inherit( Operation, Subdivide, {
    apply: function( body ) {

      var mapCurve = function( points ) {
        var result = [];

        function prev( n ) {
          return n === 0 ? ( points.length - 1 ) : n - 1;
        }
        for ( var i = 0; i < points.length; i++ ) {
          var firstPoint = points[ prev( prev( i ) ) ];
          var secondPoint = points[ prev( i ) ];
          var thirdPoint = points[ i ];

          // mid points
          var oneTwo = firstPoint.average( secondPoint );
          var twoThree = secondPoint.average( thirdPoint );

          // cubic b-spline mask, 1/4 ( a + 2b + c )
          var newSecondPoint = oneTwo.plus( secondPoint.timesScalar( 2 ) ).plus( twoThree ).timesScalar( 1 / 4 );
          newSecondPoint.old = secondPoint;

          // add points
          result.push( oneTwo ); // mid-point
          result.push( twoThree ); // sub-div
        }
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