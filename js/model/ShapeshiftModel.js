define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );
  var Reflect = require( 'SHAPESHIFT/model/operations/Reflect' );
  var Rotate = require( 'SHAPESHIFT/model/operations/Rotate' );
  var Body = require( 'SHAPESHIFT/model/Body' );

  var Sound = require( 'VIBE/Sound' );

  var lastPlaySound = Date.now();
  var numberOfReplaysProperty = new Property( 0 );

  function ShapeshiftModel() {
    PropertySet.call( this, {

    } );
    window.model = this;
  }

  return inherit( PropertySet, ShapeshiftModel, {
    step: function( dt ) {

    }
  } );
} );