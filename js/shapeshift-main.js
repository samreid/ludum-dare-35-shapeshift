define( function( require ) {
  'use strict';

  // modules
  var ShapeshiftScreen = require( 'SHAPESHIFT/ShapeshiftScreen' );
  var platform = require( 'PHET_CORE/platform' );
  var BackgroundMusic = require( 'SHAPESHIFT/BackgroundMusic' );
  var App = require( 'SHAPESHIFT/App' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var titleString = require( 'string!SHAPESHIFT/shapeshift.title' );

  // strings
  var simOptions = {
    credits: {}
  };

  var level = 0;
  if ( phet.chipper.getQueryParameter( 'level' ) ) {
    level = parseInt( phet.chipper.getQueryParameter( 'level' ), 10 );
  }
  var app = null;

  SimLauncher.launch( function() {

    // After the user pressed restart level or go to homescreen, this function is called
    // level = 0 is homescreen
    var restart = function( level ) {
      app.destroy();
      app = new App( titleString, [ new ShapeshiftScreen( level, restart ) ], simOptions );
      app.start();
    };

    app = new App( titleString, [ new ShapeshiftScreen( level, restart ) ], simOptions );
    app.start();

    if ( !platform.ie ) {
      BackgroundMusic.start();
    }

    // <audio autoplay="autoplay" preload="preload" loop="loop">
    //   <source src="audio/jewel-crusher.mp3" type="audio/mpeg" />
    //   <source src="audio/jewel-crusher.ogg" type="audio/ogg" />
    // </audio>
  } );
} );