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
  var Path = require( 'SCENERY/nodes/Path' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );

  function BodyNode( body ) {
    Node.call( this );

    if ( !body ) {
      throw new Error( 'no assertions enablable!' );
    }

    this.body = body;

    this.addChild( new Path( this.createShape(), {
      fill: '#f00'
    } ) );
  }

  shapeshift.register( 'BodyNode', BodyNode );

  return inherit( Node, BodyNode, {
    createShape: function() {
      var shape = new Shape();

      BodyNode.applyCurveToShape( shape, this.body.boundaryCurve );
      this.body.holeCurves.forEach( BodyNode.applyCurveToShape.bind( null, shape ) );

      return shape;
    }
  }, {
    applyCurveToShape: function( shape, curve ) {
      shape.moveToPoint( curve[ 0 ] );
      for ( var i = 1; i < curve.length; i++ ) {
        shape.lineToPoint( curve[ i ] );
      }
      shape.close();
    }
  } );
} );