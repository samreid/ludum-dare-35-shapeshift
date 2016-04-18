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
  var HBox = require( 'SCENERY/nodes/HBox' );
  var BodyNode = require( 'SHAPESHIFT/view/BodyNode' );
  var OperationButton = require( 'SHAPESHIFT/view/OperationButton' );
  var Eyebrow = require( 'SHAPESHIFT/view/Eyebrow' );
  var Eyeball = require( 'SHAPESHIFT/view/Eyeball' );
  var Plane = require( 'SCENERY/nodes/Plane' );
  var TitledPanel = require( 'SHAPESHIFT/view/TitledPanel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var Vector2 = require( 'DOT/Vector2' );

  // operations
  var Reflect = require( 'SHAPESHIFT/model/operations/Reflect' );
  var Rotate = require( 'SHAPESHIFT/model/operations/Rotate' );
  var ConvexHull = require( 'SHAPESHIFT/model/operations/ConvexHull' );
  var RadialDoubling = require( 'SHAPESHIFT/model/operations/RadialDoubling' );
  var SelfFractal = require( 'SHAPESHIFT/model/operations/SelfFractal' );
  var DeleteVertices = require( 'SHAPESHIFT/model/operations/DeleteVertices' );
  var Snowflake = require( 'SHAPESHIFT/model/operations/Snowflake' );
  var Subdivide = require( 'SHAPESHIFT/model/operations/Subdivide' );
  var Shear = require( 'SHAPESHIFT/model/operations/Shear' );
  var Swirl = require( 'SHAPESHIFT/model/operations/Swirl' );
  var Invert = require( 'SHAPESHIFT/model/operations/Invert' );
  var Scale = require( 'SHAPESHIFT/model/operations/Scale' );

  function GameNode( model, layoutBounds, visibleBoundsProperty ) {
    Node.call( this );
    this.visibleBoundsProperty = visibleBoundsProperty;

    // So the eyes can watch the mouse wherever it goes
    this.addChild( new Plane() );

    this.model = model;
    this.layoutBounds = layoutBounds;

    this.shapeLayer = new Node( {
      translation: layoutBounds.center
    } );
    this.addChild( this.shapeLayer );

    this.buttonLayer = new HBox( {
      spacing: 25
    } );
    this.addChild( this.buttonLayer );

    this.bodyNodeMap = {}; // body.id => BodyNode

    this.operationButtons = [];

    // listen
    this.model.bodies.addItemAddedListener( this.addBody.bind( this ) );
    this.model.bodies.addItemRemovedListener( this.removeBody.bind( this ) );

    // add
    this.model.bodies.forEach( this.addBody.bind( this ) );

    // this.addOperation( new Reflect() );
    this.addOperation( new Rotate( Math.PI / 2 ) );
    // this.addOperation( new ConvexHull() );
    this.addOperation( new RadialDoubling() );
    this.addOperation( new Snowflake() );
    // this.addOperation( new DeleteVertices( 2 ) );
    // this.addOperation( new DeleteVertices( 3 ) );
    // this.addOperation( new SelfFractal() ); // makes things slow in preview for many others
    // this.addOperation( new Subdivide() );
    this.addOperation( new Shear() );
    this.addOperation( new Swirl() );
    this.addOperation( new Invert( 150 ) );
    this.addOperation( new Scale( 1.5, 1/1.5 ) );

    var leftEye = new Eyeball();
    var rightEye = new Eyeball();
    leftEye.centerX = this.layoutBounds.centerX - leftEye.width;
    this.addChild( leftEye.mutate( { y: 300 } ) );
    this.addChild( rightEye.mutate( { left: leftEye.right + leftEye.width, y: leftEye.y } ) );

    this.leftEyebrow = new Eyebrow();
    this.rightEyebrow = new Eyebrow();
    this.addChild( this.leftEyebrow.mutate( { x: leftEye.x, y: leftEye.y - 30 } ) );
    this.addChild( this.rightEyebrow.mutate( { x: rightEye.x, y: leftEye.y - 30, scale: new Vector2( -1, 1 ) } ) );

    this.addInputListener( {
      move: function( event ) {
        leftEye.lookAt( event.pointer.point );
        rightEye.lookAt( event.pointer.point );
      }
    } );

    var updateTitledPanelLocation = function( visibleBounds ) {
      titledPanel.top = visibleBounds.top + 10;
      titledPanel.right = visibleBounds.right - 10;
    };

    var goalNode = new Node( {
      children: model.goalBodies.map( function( b ) {
        return new BodyNode( b ).mutate( { scale: 0.5 } );
      } ).getArray()
    } );
    var update = function() {
      goalNode.children = model.goalBodies.map( function( b ) {
        return new BodyNode( b ).mutate( { scale: 0.5 } );
      } ).getArray();
      updateTitledPanelLocation( visibleBoundsProperty.value );
    };
    this.model.goalBodies.addItemAddedListener( update );
    this.model.goalBodies.addItemRemovedListener( update );

    var titledPanel = new TitledPanel( new Text( 'Goal', {
      fill: 'white',
      fontSize: 18
    } ), goalNode, {
      fill: 'black',
      stroke: 'white',
      xMargin: 10,
      yMargin: 10,
      centerX: this.layoutBounds.centerX
    } );
    this.addChild( titledPanel );

    visibleBoundsProperty.link( updateTitledPanelLocation );

    var resetAllButton = new ResetAllButton();
    resetAllButton.addListener( function() {
      model.reset();
    } );
    resetAllButton.mutate( {
      scale: this.buttonLayer.height / resetAllButton.height * 0.75,
    } );
    visibleBoundsProperty.link( function( visibleBounds ) {
      resetAllButton.right = visibleBounds.right - 10;
    } );
    this.addChild( resetAllButton );

    var self = this;
    visibleBoundsProperty.link( function( visibleBounds ) {
      self.buttonLayer.bottom = visibleBounds.bottom - 20;
      resetAllButton.bottom = self.buttonLayer.bottom;
    } );
  }

  shapeshift.register( 'GameNode', GameNode );

  return inherit( Node, GameNode, {
    addOperation: function( operation ) {
      var operationButton = new OperationButton( this.model, operation );
      this.buttonLayer.addChild( operationButton );
      this.operationButtons.push( operationButton );

      this.layoutOperationButtons();
    },

    layoutOperationButtons: function() {
      this.buttonLayer.centerX = this.layoutBounds.centerX;
    },

    addBody: function( body ) {
      var bodyNode = new BodyNode( body );
      this.shapeLayer.addChild( bodyNode );
      this.bodyNodeMap[ body.id ] = bodyNode;
    },

    removeBody: function( body ) {
      this.shapeLayer.removeChild( this.bodyNodeMap[ body.id ] );
      delete this.bodyNodeMap[ body.id ];
    },

    step: function( dt ) {
      this.operationButtons.forEach( function( operationButton ) {
        operationButton.update();
      } );
      this.leftEyebrow.step( dt );
      this.rightEyebrow.step( dt );
    }
  } );
} );