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
  var Shape = require( 'KITE/Shape' );

  function BodyNode( body ) {
    this.currentBody = body; // 0
    this.nextBody = null; // 1
    this.ratio = 0;

    this.path = new Path();
  }

  shapeshift.register( 'BodyNode', BodyNode );

  return inherit( Object, BodyNode, {
    createShape: function() {
      assert( this.ratio === 0 || this.nextBody );


    }
  } );
} );