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
  var Sound = require( 'VIBE/Sound' );

  function ShapeshiftScreenView( model ) {
    phet.joist.display.backgroundColor = '#000';

    var self = this;

    window.screenView = this;

    var shapeshiftScreenView = this;
    this.model = model;

    var bounds = new Bounds2( 0, 0, 1024, 618 );
    ScreenView.call( this, { layoutBounds: bounds } );

    this.preventFit = true;

    this.homeScreen = new HomeScreen( bounds, function() {
      self.removeChild( self.homeScreen );

      // TODO
    } );
    this.addChild( this.homeScreen );
  }

  return inherit( ScreenView, ShapeshiftScreenView, {
    step: function( dt ) {

    }
  } );
} );