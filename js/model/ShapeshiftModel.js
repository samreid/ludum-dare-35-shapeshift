define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Vector2 = require( 'DOT/Vector2' );
  var Reflect = require( 'SHAPESHIFT/model/operations/Reflect' );
  var Rotate = require( 'SHAPESHIFT/model/operations/Rotate' );
  var Body = require( 'SHAPESHIFT/model/Body' );

  var Sound = require( 'VIBE/Sound' );

  var lastPlaySound = Date.now();
  var numberOfReplaysProperty = new Property( 0 );

  function ShapeshiftModel() {
    var numPoints = Math.floor( Math.random() * 10 ) + 5;

    var array = [ new Vector2( -100, -100 ), new Vector2( 100, -100 ), new Vector2( 100, 100 ), new Vector2( -100, 100 ) ];
    // var array = [ new Vector2( -100, -100 ), new Vector2( 100, -100 ), new Vector2( -100, 100 ) ];
    // var array = [ new Vector2( -100, -100 ), new Vector2( 100, -100 ), new Vector2( 100, 100 ), new Vector2() ];
    // var array = [];
    // for ( var i = 0; i < numPoints; i++ ) {
    //   var x = Math.random() * 200 - 100;
    //   var y = Math.random() * 200 - 100;
    //   array.push( new Vector2( x, y ) );
    // }

    var initialBody = new Body( array, [] );

    PropertySet.call( this, {} );
    window.model = this;

    this.bodies = new ObservableArray( [ initialBody ] );
  }

  return inherit( PropertySet, ShapeshiftModel, {
    step: function( dt ) {

    }
  } );
} );