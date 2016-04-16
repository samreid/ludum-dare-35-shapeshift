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
  var Node = require( 'SCENERY/nodes/Node' );
  var BodyNode = require( 'SHAPESHIFT/view/BodyNode' );

  function GameNode( model ) {
    Node.call( this );

    this.model = model;

    this.bodyNodeMap = {}; // body.id => BodyNode

    // listen
    this.model.bodies.addItemAddedListener( this.addBody.bind( this ) );
    this.model.bodies.addItemRemovedListener( this.removeBody.bind( this ) );

    // add
    this.model.bodies.forEach( this.addBody.bind( this ) );
  }

  shapeshift.register( 'GameNode', GameNode );

  return inherit( Node, GameNode, {
    addBody: function( body ) {
      var bodyNode = new BodyNode( body );
      this.addChild( bodyNode );
      this.bodyNodeMap[ body.id ] = bodyNode;
    },

    removeBody: function( body ) {
      this.removeChild( this.bodyNodeMap[ body.id ] );
      delete this.bodyNodeMap[ body.id ];
    }
  } );
} );