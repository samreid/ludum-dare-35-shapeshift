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
  var Vector2 = require( 'DOT/Vector2' );

  function SelfFractal() {
    Operation.call( this, 'remap' );
  }

  shapeshift.register( 'SelfFractal', SelfFractal );

  return inherit( Operation, SelfFractal, {
    apply: function( body ) {

      var mapCurve = function( points ) {
        var result = [];
        var centroid = new Vector2( 0, 0 );
        for ( var i = 0; i < points.length; i++ ) {
          var p = points[ i ];
          centroid.x += p.x / points.length;
          centroid.y += p.y / points.length;
        }

        var normalized = points.map( function( p ) {
          return p.minus( centroid ).times( 1 / 3 );
        } );

        for ( i = 0; i < points.length; i++ ) {
          var p = points[ i ];
          for ( var j = 0; j < normalized.length; j++ ) {
            var newPoint = normalized[ j ].plus( p );
            newPoint.old = p;
            result.push( newPoint );
          }
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