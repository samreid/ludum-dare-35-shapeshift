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
  var VBox = require( 'SCENERY/nodes/VBox' );
  var BodyNode = require( 'SHAPESHIFT/view/BodyNode' );
  var OperationButton = require( 'SHAPESHIFT/view/OperationButton' );
  var Eyebrow = require( 'SHAPESHIFT/view/Eyebrow' );
  var Eyeball = require( 'SHAPESHIFT/view/Eyeball' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var Plane = require( 'SCENERY/nodes/Plane' );
  var TitledPanel = require( 'SHAPESHIFT/view/TitledPanel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var Vector2 = require( 'DOT/Vector2' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ShapeshiftModel = require( 'SHAPESHIFT/model/ShapeshiftModel' );
  var Body = require( 'SHAPESHIFT/model/Body' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var RoundPushButton = require( 'SUN/buttons/RoundPushButton' );
  var VStrut = require( 'SCENERY/nodes/VStrut' );

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
  var Static = require( 'SHAPESHIFT/model/operations/Static' );

  var FreeplayGameModel = require( 'SHAPESHIFT/view/freeplay/FreeplayGameModel' );
  var FreeplayLevel = require( 'SHAPESHIFT/view/freeplay/FreeplayLevel' );

  function FreeplayGameNode( blah, layoutBounds, visibleBoundsProperty, showHomeScreen ) {
    Node.call( this );

    var createStar = function( numPoints ) {
      var array = [];

      for ( var i = 0; i < numPoints; i++ ) {
        array.push( Vector2.createPolar( 100, i * ( Math.PI * 2 ) / numPoints ) );
        array.push( Vector2.createPolar( 200, ( i + 0.5 ) * ( Math.PI * 2 ) / numPoints ) );
      }

      return array;
    };

    var createRegular = function( numPoints ) {
      var array = [];

      for ( var i = 0; i < numPoints; i++ ) {
        array.push( Vector2.createPolar( 200, i * ( Math.PI * 2 ) / numPoints ) );
        // array.push( Vector2.createPolar( 200, ( i + 0.5 ) * ( Math.PI * 2 ) / numPoints ) );
      }

      return array;
    };


    var model = new FreeplayGameModel( [
      new FreeplayLevel( 'Our plane lost a wing\n' +
                         'but I got it covered.', [ new Body( [ new Vector2( 200, 200 ), new Vector2( -200, 200 ), new Vector2( -200, -200 ), new Vector2( 200, -200 ) ], [] ) ], [
        new RadialDoubling()
      ], [
        new RadialDoubling(),
        new DeleteVertices( 3 ),
        new Snowflake()
      ] )
    ] );
    this.visibleBoundsProperty = visibleBoundsProperty;

    // So the eyes can watch the mouse wherever it goes
    this.addChild( new Plane() );

    this.model = model;
    this.layoutBounds = layoutBounds;

    this.shapeLayer = new Node( {
      x: layoutBounds.centerX,
      y: layoutBounds.centerY * 2 / 3,
      scale: 0.5
    } );
    this.addChild( this.shapeLayer );

    this.buttonLayer = new VBox( {
      spacing: 25,
      scale: 0.5
    } );
    this.addChild( this.buttonLayer );

    this.bodyNodeMap = {}; // body.id => BodyNode

    this.operationButtons = [];

    // listen
    this.model.bodies.addItemAddedListener( this.addBody.bind( this ) );
    this.model.bodies.addItemRemovedListener( this.removeBody.bind( this ) );

    // add
    this.model.bodies.forEach( this.addBody.bind( this ) );

    this.addOperation( new Reflect() );
    this.addOperation( new Rotate( Math.PI / 2 ) );
    this.addOperation( new ConvexHull() );
    this.addOperation( new RadialDoubling() );
    this.addOperation( new Snowflake() );
    this.addOperation( new DeleteVertices( 2 ) );
    this.addOperation( new DeleteVertices( 3 ) );
    this.addOperation( new SelfFractal() ); // makes things slow in preview for many others
    this.addOperation( new Subdivide() );
    this.addOperation( new Shear() );
    this.addOperation( new Swirl() );
    this.addOperation( new Invert( 150 ) );
    this.addOperation( new Scale( 1.5, 1/1.5 ) );
    this.addOperation( new Static( createRegular( 3 ), 'Triangle' ) );
    this.addOperation( new Static( [ new Vector2( 200, 200 ), new Vector2( -200, 200 ), new Vector2( -200, -200 ), new Vector2( 200, -200 ) ], 'Square' ) );
    this.addOperation( new Static( createRegular( 5 ), 'Pentagon' ) );
    this.addOperation( new Static( createStar( 7 ), 'Star' ) );

    this.eyeLayer = new Node( { scale: 0.7 } );
    this.addChild( this.eyeLayer );
    var leftEye = new Eyeball();
    var rightEye = new Eyeball();
    leftEye.centerX = this.layoutBounds.centerX / 0.7 - leftEye.width;
    this.eyeLayer.addChild( leftEye.mutate( { y: 200 / 0.7 } ) );
    this.eyeLayer.addChild( rightEye.mutate( { left: leftEye.right + leftEye.width, y: leftEye.y } ) );

    this.leftEyebrow = new Eyebrow();
    this.rightEyebrow = new Eyebrow();
    this.eyeLayer.addChild( this.leftEyebrow.mutate( { x: leftEye.x, y: leftEye.y - 30 } ) );
    this.eyeLayer.addChild( this.rightEyebrow.mutate( { x: rightEye.x, y: leftEye.y - 30, scale: new Vector2( -1, 1 ) } ) );

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

    var homeButton = new RoundPushButton( { scale: 1.5, content: new FontAwesomeNode( 'home', { fill: 'black' } ) } );
    homeButton.addListener( showHomeScreen );
    this.addChild( homeButton );

    visibleBoundsProperty.link( function( visibleBounds ) {
      homeButton.top = visibleBounds.top + 10;
      homeButton.left = visibleBounds.left + 10;
    } );

    var self = this;
    visibleBoundsProperty.link( function( visibleBounds ) {
      self.buttonLayer.bottom = visibleBounds.bottom - 20;
    } );

  }

  shapeshift.register( 'FreeplayGameNode', FreeplayGameNode );

  return inherit( Node, FreeplayGameNode, {
    clearOperations: function() {
      this.buttonLayer.children = [];
      this.operationButtons.length = 0;
    },
    addOperation: function( operation ) {
      var operationButton = new OperationButton( this.model, operation, {
        useLabel: true
      } );

      if ( this.buttonLayer.children.length === 0 || this.buttonLayer.children[ this.buttonLayer.children.length - 1 ].children.length === 7 ) {
        var hbox = new HBox( {
          spacing: 25
        } );
        hbox.addChild( operationButton );
        this.buttonLayer.addChild( hbox );
      }
      else {
        this.buttonLayer.children[ this.buttonLayer.children.length - 1 ].addChild( operationButton );
      }

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
      this.model.step( dt );
      this.operationButtons.forEach( function( operationButton ) {
        operationButton.update();
      } );
      this.leftEyebrow.step( dt );
      this.rightEyebrow.step( dt );
    }
  } );
} );