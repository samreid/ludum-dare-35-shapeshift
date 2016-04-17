define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var HomeScreen = require( 'SHAPESHIFT/HomeScreen' );
  var GameNode = require( 'SHAPESHIFT/view/GameNode' );
  var Sound = require( 'VIBE/Sound' );

  function ShapeshiftScreenView( model ) {
    phet.joist.display.backgroundColor = '#000';

    var self = this;

    window.screenView = this;

    var shapeshiftScreenView = this;
    this.model = model;

    var bounds = new Bounds2( 0, 0, 1024, 618 );
    ScreenView.call( this, { layoutBounds: bounds } );

    this.gameNode = new GameNode( model, this.layoutBounds, this.visibleBoundsProperty );

    this.preventFit = true;

    this.homeScreen = new HomeScreen( bounds, function() {
      self.hideHomeScreen();
      self.startLevel( 0 );
      // TODO
    } );
    this.addChild( this.homeScreen );

    var level = phet.chipper.getQueryParameter( 'level' );
    if ( level ) {
      this.hideHomeScreen();

      this.startLevel( 0 );
    }
  }

  return inherit( ScreenView, ShapeshiftScreenView, {
    hideHomeScreen: function() {
      this.removeChild( this.homeScreen );
    },
    step: function( dt ) {
      if ( this.gameNode.hasParent() ) {
        this.gameNode.step( dt );
      }
    },
    startLevel: function( levelIndex ) {
      this.addChild( this.gameNode );
    }
  } );
} );