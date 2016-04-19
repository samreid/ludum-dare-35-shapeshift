define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ShapeshiftScreenView = require( 'SHAPESHIFT/view/ShapeshiftScreenView' );
  var ShapeshiftModel = require( 'SHAPESHIFT/model/ShapeshiftModel' );

  /**
   * @constructor
   */
  function ShapeshiftScreen() {
    Screen.call( this, 'Perfect Form', new Text( 'hello' ),
      function() { return new ShapeshiftModel(); },
      function( model ) {
        return new ShapeshiftScreenView( model );
      }, {
        backgroundColor: 'white'
      }
    );
  }

  return inherit( Screen, ShapeshiftScreen );
} );