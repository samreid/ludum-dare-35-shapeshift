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

  function DeleteVertices( n ) {
    Operation.call( this, 'remap', '#aa0' );

    this.n = n; // delete every nth vertex
  }

  shapeshift.register( 'DeleteVertices', DeleteVertices );

  return inherit( Operation, DeleteVertices, {

    apply: function( body ) {

      var n = this.n;
      var mapCurve = function( points ) {
        var result = [];
        var okToDelete = points.length >= 6;
        for ( var i = 0; i < points.length; i++ ) {
          if ( i % n === 0 && okToDelete ) {
            //delete
          }
          else {
            var copy = points[ i ].copy();
            copy.old = points[ i ];
            result.push( copy );
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