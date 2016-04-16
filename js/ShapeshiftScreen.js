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
  function ShapeshiftScreen( level, restart ) {
    Screen.call( this, 'Pick a Title', new Text( 'hello' ),
      function() { return new ShapeshiftModel( level, restart ); },
      function( model ) {
        return new ShapeshiftScreenView( model, level, restart );
      }, {
        backgroundColor: 'white'
      }
    );
  }

  return inherit( Screen, ShapeshiftScreen );
} );