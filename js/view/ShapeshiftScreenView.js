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
  var AdventureGameNode = require( 'SHAPESHIFT/view/adventure/AdventureGameNode' );
  var Sound = require( 'VIBE/Sound' );

  function ShapeshiftScreenView( model ) {
    phet.joist.display.backgroundColor = '#000';

    var self = this;

    window.screenView = this;

    var shapeshiftScreenView = this;
    this.model = model;

    var bounds = new Bounds2( 0, 0, 1024, 618 );
    ScreenView.call( this, { layoutBounds: bounds } );

    this.arcadeNode = new GameNode( model, this.layoutBounds, this.visibleBoundsProperty );
    this.adventureNode = new AdventureGameNode( model, this.layoutBounds, this.visibleBoundsProperty );
    this.freePlayNode = new GameNode( model, this.layoutBounds, this.visibleBoundsProperty );

    this.preventFit = true;

    this.homeScreen = new HomeScreen( bounds, function() {
      self.showNode( self.arcadeNode );
    }, function() {
      self.showNode( self.adventureNode );
    }, function() {
      self.showNode( self.freePlayNode );
    } );
    this.addChild( this.homeScreen );

    var level = phet.chipper.getQueryParameter( 'level' );
    if ( level ) {
      this.showNode( this.adventureNode );
    }
  }

  return inherit( ScreenView, ShapeshiftScreenView, {
    step: function( dt ) {
      this.shownNode && this.shownNode.step && this.shownNode.step( dt );
    },
    showNode: function( node ) {
      this.children = [ node ];
      this.shownNode = node;
    }
  } );
} );