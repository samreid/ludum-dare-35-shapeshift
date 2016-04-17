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
  var ConvexHull2 = require( 'DOT/ConvexHull2' );

  function ConvexHull() {
    Operation.call( this, 'remap', '#00c' );
  }

  shapeshift.register( 'ConvexHull', ConvexHull );

  return inherit( Operation, ConvexHull, {
    apply: function( body ) {

      var pointsToHull = function( points ) {
        var boundaryHull = ConvexHull2.grahamScan( points, false );

        var result = boundaryHull.map( function( v ) {
          var x = v.copy();
          x.old = v;
          return x;
        } );

        result.old = points;

        return result;
      };

      return [
        new Body(
          pointsToHull( body.boundaryCurve ),
          body.holeCurves.map( function( curve ) { return pointsToHull( curve ); } )
        )
      ];
    }
  } );

} );