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
  var Color = require( 'SCENERY/util/Color' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var BodyNode = require( 'SHAPESHIFT/view/BodyNode' );
  var Shape = require( 'KITE/Shape' );

  var MAX_WIDTH = 80;
  var MAX_HEIGHT = 80;

  // For creating levels
  var allOps = [];

  function OperationButton( model, operation, options ) {
    var self = this;

    this.model = model;
    this.operation = operation;
    this.useLabel = !!options && !!options.useLabel;

    this.dirty = true;

    this.contentBounds = new Bounds2( 0, 0, MAX_WIDTH, MAX_HEIGHT );

    this.optionalLabel = new Text( operation.name, {
      fill: '#eee',
      maxWidth: MAX_WIDTH,
      top: MAX_HEIGHT + 5,
      centerX: MAX_WIDTH / 2,
      fontSize: 16
    } );

    this.content = new Node( {
      localBounds: this.useLabel ? ( this.contentBounds.union( this.optionalLabel.bounds ) ) : this.contentBounds
    } );

    // If bodies change, mark as dirty (so we don't update on EVERY change)
    var dirtyListener = this.markDirty.bind( this );
    model.targetBodies.addItemAddedListener( dirtyListener );
    model.targetBodies.addItemRemovedListener( dirtyListener );

    // For level design
    var buttonOptions = _.extend( {
      content: this.content,
      listener: function() {
        model.applyOperation( self.operation );
        allOps.push( self.operation.toString() );

        console.log( allOps.join( ', ' ) );
      },
      xMargin: 13,
      yMargin: 10,
      baseColor: operation.color || new Color( 153, 206, 255 )
    }, options );

    RectangularPushButton.call( this, buttonOptions );
  }

  shapeshift.register( 'OperationButton', OperationButton );

  return inherit( RectangularPushButton, OperationButton, {
    getAppliedBodies: function( bodies ) {
      var self = this;

      var result = [];
      bodies.forEach( function( body ) {
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

        var bodies = this.getAppliedBodies( this.model.targetBodies );

        var container = new Node( {
          maxWidth: MAX_WIDTH,
          maxHeight: MAX_HEIGHT,
          children: bodies.map( function( body ) {
            return new BodyNode( body, '#eee' );
          } ),
          center: this.contentBounds.center
        } );
        this.content.children = this.useLabel ? [ container, this.optionalLabel ] : [ container ];

        this.enabled = bodies.length > 0 && bodies[ 0 ].boundaryCurve.length > 0;
      }
    }
  } );
} );