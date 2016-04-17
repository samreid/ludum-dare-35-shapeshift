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
  var Bounds2 = require( 'DOT/Bounds2' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var Shape = require( 'KITE/Shape' );

  function OperationButton( bodies, operation, options ) {
    this.bodies = bodies;
    this.operation = operation;


    var contentBounds = new Bounds2( 0, 0, 50, 50 );

    var content = new Node( {
      localBounds: contentBounds
    } );

    var buttonOptions = _.extend( {
      content: content,
      listener: function() {
        var newBodies = [];
        bodies.forEach( function( body ) {
          newBodies = newBodies.concat( operation.apply( body ) );
        } );
        bodies.clear();
        bodies.addAll( newBodies );
      }
      // baseColor:
    }, options );

    RectangularPushButton.call( this, buttonOptions );
  }

  shapeshift.register( 'OperationButton', OperationButton );

  return inherit( RectangularPushButton, OperationButton );
} );