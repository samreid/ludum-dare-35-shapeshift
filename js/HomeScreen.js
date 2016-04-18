define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var platform = require( 'PHET_CORE/platform' );
  var Panel = require( 'SUN/Panel' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Image = require( 'SCENERY/nodes/Image' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Path = require( 'SCENERY/nodes/Path' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var Color = require( 'SCENERY/util/Color' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Sound = require( 'VIBE/Sound' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var BodyNode = require( 'SHAPESHIFT/view/BodyNode' );
  var ShapeshiftModel = require( 'SHAPESHIFT/model/ShapeshiftModel' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );

  var played = false;

  var jewelCrusher = require( 'audio!SHAPESHIFT/jewel-crusher' );
  var jewelCrusherSound = new Sound( jewelCrusher );

  function HomeScreen( bounds, startButtonPressed ) {
    var buttonFont = { size: 35, weight: 'bold' };

    var minButtonWidth = 300;
    var arcadeModeButton = new RectangularPushButton( {
      minWidth: minButtonWidth,
      content: new Text( 'Arcade Mode', {
        font: new PhetFont( buttonFont )
      } ),
      baseColor: '#55ff55',
      listener: startButtonPressed
    } );

    var adventureModeButton = new RectangularPushButton( {
      minWidth: minButtonWidth,
      content: new Text( 'Adventure Mode', {
        font: new PhetFont( buttonFont )
      } ),
      baseColor: '#ff5555',
      listener: startButtonPressed
    } );

    var freePlayModeButton = new RectangularPushButton( {
      minWidth: minButtonWidth,
      content: new Text( 'Free Play', {
        font: new PhetFont( buttonFont )
      } ),
      baseColor: '#5555ff',
      listener: startButtonPressed
    } );

    var quote = new MultiLineText( 'To improve is to change;\nto be perfect is to change often.\n - Winston Churchill', {
      align: 'left',
      font: new PhetFont( { size: 23 } )
    } );
    quote.right = bounds.right - 10;
    quote.bottom = bounds.bottom - 10;

    var subtitle = new Text( 'Ludum Dare 35', { font: new PhetFont( { size: 23 } ) } );
    subtitle.left = bounds.left + 10;
    subtitle.bottom = bounds.bottom - 10;

    var titleText = new Text( 'Perfect Form', {
      font: new PhetFont( { size: 105 } ),
      centerX: bounds.centerX,
      top: 10
    } );

    var circle = new Circle( 3000, {
      fill: new Color( 255, 250, 115, 1 )

      //new RadialGradient( 0, 0, 0, 0, 0, 1000 )
      //.addColorStop( 0, new Color( 204, 13, 15, 1.0 ) )
      //.addColorStop( 0.5,  )
    } );

    var children = [];
    for ( var angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / 20 ) {
      var startPoint = Vector2.createPolar( 1000, angle - Math.PI * 2 / 40 );
      var endPoint = Vector2.createPolar( 1000, angle + Math.PI * 2 / 40 );
      var triangle = new Path( new Shape()
        .moveTo( circle.centerX, circle.centerY )
        .lineToRelative( startPoint.x, startPoint.y )
        .lineToRelative( endPoint.x, endPoint.y )
        .close(), { fill: 'white' } );
      children.push( triangle );
    }

    var triangleFan = new Node( {
      children: children,
      x: 200,
      y: 200
    } );
    this.triangleFan = triangleFan;

    var startBody = ShapeshiftModel.levels[ 1 ].startBodies[ 0 ];
    var op1 = ShapeshiftModel.levels[ 1 ].operations[ 0 ];
    var op2 = ShapeshiftModel.levels[ 1 ].operations[ 1 ];
    var scaleOptions = { scale: 0.75 };
    var exampleNode = new HBox( {
      spacing: 10,
      children: [
        new BodyNode( startBody, 'black' ).mutate( scaleOptions ),
        new ArrowNode( 0, 0, 30, 0, { scale: 2 } ),
        new BodyNode( op1.apply( startBody )[ 0 ], 'black' ).mutate( scaleOptions ),
        new ArrowNode( 0, 0, 30, 0, { scale: 2 } ),
        new BodyNode( op2.apply( op1.apply( startBody )[ 0 ] )[ 0 ], 'black' ).mutate( scaleOptions )
      ],
      centerX: bounds.centerX,
      top: titleText.bottom + 10
    } );

    Node.call( this, {
      children: [
        circle,
        triangleFan,
        exampleNode,
        new VBox( {
          spacing: 20,
          children: [
            arcadeModeButton,
            adventureModeButton,
            freePlayModeButton
          ],
          centerX: bounds.centerX,
          bottom: bounds.bottom - 10
        } ),
        titleText,
        quote,
        subtitle
      ]
    } );

    var musak = function() {
      if ( !played ) {
        if ( platform.ie ) {
          // jewelCrusherSound.play();
        }
        played = true;
      }
    };
    this.addInputListener( {
      down: musak,
      move: musak
    } );
  }

  return inherit( Node, HomeScreen, {
    step: function( dt ) {
      this.triangleFan.rotateAround( this.triangleFan.center, Math.PI / 32 * dt );
    }
  } );
} );