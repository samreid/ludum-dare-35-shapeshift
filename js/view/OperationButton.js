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
  var BodyNode = require( 'SHAPESHIFT/view/BodyNode' );
  var Shape = require( 'KITE/Shape' );

  var MAX_WIDTH = 80;
  var MAX_HEIGHT = 80;

  function OperationButton( bodies, operation, options ) {
    var self = this;

    this.bodies = bodies;
    this.operation = operation;

    this.dirty = true;

    this.contentBounds = new Bounds2( 0, 0, MAX_WIDTH, MAX_HEIGHT );

    this.content = new Node( {
      localBounds: this.contentBounds
    } );

    // If bodies change, mark as dirty (so we don't update on EVERY change)
    var dirtyListener = this.markDirty.bind( this );
    bodies.addItemAddedListener( dirtyListener );
    bodies.addItemRemovedListener( dirtyListener );

    var buttonOptions = _.extend( {
      content: this.content,
      listener: function() {
        var newBodies = self.getAppliedBodies();
        bodies.clear();
        bodies.addAll( newBodies );
      },
      xMargin: 13,
      yMargin: 10
      // baseColor:
    }, options );

    RectangularPushButton.call( this, buttonOptions );
  }

  shapeshift.register( 'OperationButton', OperationButton );

  return inherit( RectangularPushButton, OperationButton, {
    getAppliedBodies: function() {
      var self = this;

      var result = [];
      this.bodies.forEach( function( body ) {
        result = result.concat( self.operation.apply( body ) );
      } );
      return result;
    },

    markDirty: function() {
      this.dirty = true;
    },

    update: function() {
      if ( this.dirty ) {
        this.dirty = false;

        var container = new Node( {
          maxWidth: MAX_WIDTH,
          maxHeight: MAX_HEIGHT,
          children: this.getAppliedBodies().map( function( body ) {
            return new BodyNode( body );
          } ),
          center: this.contentBounds.center
        } );
        this.content.children = [ container ];
      }
    }
  } );
} );