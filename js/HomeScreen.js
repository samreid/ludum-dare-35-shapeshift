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

  var played = false;

  var jewelCrusher = require( 'audio!SHAPESHIFT/jewel-crusher' );
  var jewelCrusherSound = new Sound( jewelCrusher );

  function HomeScreen( bounds, startButtonPressed ) {
    var arcadeModeButton = new RectangularPushButton( {
      content: new Text( 'Arcade Mode', {
        font: new PhetFont( { size: 40, weight: 'bold' } )
      } ),
      baseColor: '#55ff55',
      listener: startButtonPressed
    } );

    var adventureModeButton = new RectangularPushButton( {
      content: new Text( 'Adventure Mode', {
        font: new PhetFont( { size: 40, weight: 'bold' } )
      } ),
      baseColor: '#ff5555',
      listener: startButtonPressed
    } );

    var freePlayModeButton = new RectangularPushButton( {
      content: new Text( 'Free Play', {
        font: new PhetFont( { size: 40, weight: 'bold' } )
      } ),
      baseColor: '#5555ff',
      listener: startButtonPressed
    } );

    var instructions = new MultiLineText( 'These are instructions', {
      align: 'left',
      font: new PhetFont( { size: 28 } )
    } );
    instructions.left = arcadeModeButton.right + 80;
    instructions.centerY = arcadeModeButton.centerY;

    var subtitle = new Text( 'Ludum Dare 35', { font: new PhetFont( { size: 28 } ) } );
    subtitle.right = arcadeModeButton.left - 80;
    subtitle.centerY = arcadeModeButton.centerY;

    var titleText = new Text( 'Dawn of Night', {
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
    Node.call( this, {
      children: [
        circle,
        triangleFan,
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