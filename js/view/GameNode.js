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
  var OperationButton = require( 'SHAPESHIFT/view/OperationButton' );
  var Reflect = require( 'SHAPESHIFT/model/operations/Reflect' );
  var Rotate = require( 'SHAPESHIFT/model/operations/Rotate' );

  function GameNode( model, layoutBounds ) {
    Node.call( this );

    this.model = model;

    this.shapeLayer = new Node( {
      translation: layoutBounds.center
    } );
    this.addChild( this.shapeLayer );

    this.bodyNodeMap = {}; // body.id => BodyNode

    // listen
    this.model.bodies.addItemAddedListener( this.addBody.bind( this ) );
    this.model.bodies.addItemRemovedListener( this.removeBody.bind( this ) );

    // add
    this.model.bodies.forEach( this.addBody.bind( this ) );

    this.addChild( new OperationButton( model.bodies, new Reflect(), {
      left: layoutBounds.left + 10,
      bottom: layoutBounds.bottom - 10
    } ) );
    this.addChild( new OperationButton( model.bodies, new Rotate( Math.PI / 2 ), {
      right: layoutBounds.right - 10,
      bottom: layoutBounds.bottom - 10
    } ) );
  }

  shapeshift.register( 'GameNode', GameNode );

  return inherit( Node, GameNode, {
    addBody: function( body ) {
      var bodyNode = new BodyNode( body );
      this.shapeLayer.addChild( bodyNode );
      this.bodyNodeMap[ body.id ] = bodyNode;
    },

    removeBody: function( body ) {
      this.shapeLayer.removeChild( this.bodyNodeMap[ body.id ] );
      delete this.bodyNodeMap[ body.id ];
    }
  } );
} );