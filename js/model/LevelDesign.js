// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Level = require( 'SHAPESHIFT/model/Level' );
  var Body = require( 'SHAPESHIFT/model/Body' );
  var Vector2 = require( 'DOT/Vector2' );

  // operations
  var Reflect = require( 'SHAPESHIFT/model/operations/Reflect' );
  var Rotate = require( 'SHAPESHIFT/model/operations/Rotate' );
  var ConvexHull = require( 'SHAPESHIFT/model/operations/ConvexHull' );
  var RadialDoubling = require( 'SHAPESHIFT/model/operations/RadialDoubling' );
  var SelfFractal = require( 'SHAPESHIFT/model/operations/SelfFractal' );
  var DeleteVertices = require( 'SHAPESHIFT/model/operations/DeleteVertices' );
  var Snowflake = require( 'SHAPESHIFT/model/operations/Snowflake' );
  var Subdivide = require( 'SHAPESHIFT/model/operations/Subdivide' );

  function LevelDesign() {
    var createTriangle = function() {
      var length = 150;
      var dx = 50;
      var dy = 40;
      var array = [ new Vector2( -length + dx, -length + dy ), new Vector2( length + dx, -length + dy ), new Vector2( -length + dx, length + dy ) ];
      return new Body( array, [] );
    };
    var createRectangle = function() {
      var length = 150;
      var dx = 0;
      var dy = 20;
      var array = [ new Vector2( -length + dx, -length + dy ), new Vector2( length + dx, -length + dy ), new Vector2( length + dx, length + dy ), new Vector2( -length + dx, length + dy ) ];
      return new Body( array, [] );
    };
    var createStar = function() {
      var array = [];

      var numPoints = 7;
      for ( var i = 0; i < numPoints; i++ ) {
        array.push( Vector2.createPolar( 90, i * ( Math.PI * 2 ) / numPoints ) );
        array.push( Vector2.createPolar( 180, ( i + 0.5 ) * ( Math.PI * 2 ) / numPoints ) );
      }

      return new Body( array, [] );
    };
    var createMap = function() {

      // from poly2tri
      var array = [
        new Vector2( 0.559831, -1.06638 ),
        new Vector2( 0.570942, -1.06638 ),
        new Vector2( 0.570942, -1.08383 ),
        new Vector2( 0.574646, -1.08383 ),
        new Vector2( 0.574646, -1.08134 ),
        new Vector2( 0.574646, -1.07885 ),
        new Vector2( 0.578349, -1.07635 ),
        new Vector2( 0.582053, -1.07386 ),
        new Vector2( 0.585757, -1.07386 ),
        new Vector2( 0.58946, -1.07386 ),
        new Vector2( 0.593164, -1.07386 ),
        new Vector2( 0.596868, -1.07386 ),
        new Vector2( 0.596868, -1.07635 ),
        new Vector2( 0.600571, -1.07635 ),
        new Vector2( 0.600571, -1.07885 ),
        new Vector2( 0.600571, -1.08134 ),
        new Vector2( 0.600571, -1.08383 ),
        new Vector2( 0.600571, -1.08633 ),
        new Vector2( 0.600571, -1.08882 ),
        new Vector2( 0.596868, -1.08882 ),
        new Vector2( 0.596868, -1.09132 ),
        new Vector2( 0.593164, -1.09132 ),
        new Vector2( 0.58946, -1.09132 ),
        new Vector2( 0.585757, -1.09132 ),
        new Vector2( 0.574646, -1.09132 ),
        new Vector2( 0.574646, -1.0963 ),
        new Vector2( 0.659831, -1.0963 ),
        new Vector2( 0.659831, -1.06388 ),
        new Vector2( 0.678349, -1.06388 ),
        new Vector2( 0.678349, -1.11875 ),
        new Vector2( 0.6783491, -1.11376 ),
        new Vector2( 0.682053, -1.11127 ),
        new Vector2( 0.685757, -1.10877 ),
        new Vector2( 0.68946, -1.10628 ),
        new Vector2( 0.696868, -1.10378 ),
        new Vector2( 0.700571, -1.10129 ),
        new Vector2( 0.704275, -1.10129 ),
        new Vector2( 0.711683, -1.10129 ),
        new Vector2( 0.71909, -1.10129 ),
        new Vector2( 0.730201, -1.0963 ),
        new Vector2( 0.700571, -1.06388 ),
        new Vector2( 0.885757, -0.98907 ),
        new Vector2( 0.970942, -1.08134 ),
        new Vector2( 0.804275, -1.14867 ),
        new Vector2( 0.811683, -1.15865 ),
        new Vector2( 0.782053, -1.15865 ),
        new Vector2( 0.756127, -1.12623 ),
        new Vector2( 0.741312, -1.13122 ),
        new Vector2( 0.741312, -1.13371 ),
        new Vector2( 0.741312, -1.1387 ),
        new Vector2( 0.737608, -1.14119 ),
        new Vector2( 0.730201, -1.14119 ),
        new Vector2( 0.726497, -1.14368 ),
        new Vector2( 0.71909, -1.14618 ),
        new Vector2( 0.715386, -1.14618 ),
        new Vector2( 0.711683, -1.14618 ),
        new Vector2( 0.704275, -1.14618 ),
        new Vector2( 0.700571, -1.14368 ),
        new Vector2( 0.696868, -1.14119 ),
        new Vector2( 0.68946, -1.1387 ),
        new Vector2( 0.685757, -1.1362 ),
        new Vector2( 0.678349, -1.1362 ),
        new Vector2( 0.678349, -1.15117 ),
        new Vector2( 0.68946, -1.15117 ),
        new Vector2( 0.68946, -1.15865 ),
        new Vector2( 0.663534, -1.15865 ),
        new Vector2( 0.663534, -1.15117 ),
        new Vector2( 0.667238, -1.15117 ),
        new Vector2( 0.667238, -1.12872 ),
        new Vector2( 0.582053, -1.13122 ),
        new Vector2( 0.582053, -1.1387 ),
        new Vector2( 0.570942, -1.1387 ),
        new Vector2( 0.570942, -1.15865 ),
        new Vector2( 0.559831, -1.15865 ),
        new Vector2( 0.559831, -1.1387 ),
        new Vector2( 0.470942, -1.14119 ),
        new Vector2( 0.470942, -1.14618 ),
        new Vector2( 0.456127, -1.14618 ),
        new Vector2( 0.456127, -1.15865 ),
        new Vector2( 0.445016, -1.15865 ),
        new Vector2( 0.445016, -1.15366 ),
        new Vector2( 0.44872, -1.15366 ),
        new Vector2( 0.44872, -1.14618 ),
        new Vector2( 0.356127, -1.14618 ),
        new Vector2( 0.356127, -1.15366 ),
        new Vector2( 0.359831, -1.15366 ),
        new Vector2( 0.359831, -1.15865 ),
        new Vector2( 0.322794, -1.16114 ),
        new Vector2( 0.322794, -1.15117 ),
        new Vector2( 0.322794, -1.14119 ),
        new Vector2( 0.330201, -1.13371 ),
        new Vector2( 0.330201, -1.1387 ),
        new Vector2( 0.345016, -1.1387 ),
        new Vector2( 0.345016, -1.10628 ),
        new Vector2( 0.445016, -1.10378 ),
        new Vector2( 0.445016, -1.09381 ),
        new Vector2( 0.452423, -1.09381 ),
        new Vector2( 0.452423, -1.09132 ),
        new Vector2( 0.452423, -1.08882 ),
        new Vector2( 0.456127, -1.08633 ),
        new Vector2( 0.459831, -1.08383 ),
        new Vector2( 0.463534, -1.08383 ),
        new Vector2( 0.467238, -1.08134 ),
        new Vector2( 0.470942, -1.08134 ),
        new Vector2( 0.470942, -1.08383 ),
        new Vector2( 0.474646, -1.08383 ),
        new Vector2( 0.478349, -1.08633 ),
        new Vector2( 0.482053, -1.08882 ),
        new Vector2( 0.482053, -1.09132 ),
        new Vector2( 0.482053, -1.09381 ),
        new Vector2( 0.478349, -1.0963 ),
        new Vector2( 0.474646, -1.0988 ),
        new Vector2( 0.470942, -1.0988 ),
        new Vector2( 0.470942, -1.10129 ),
        new Vector2( 0.467238, -1.10129 ),
        new Vector2( 0.467238, -1.10378 ),
        new Vector2( 0.556127, -1.10378 ),
        new Vector2( 0.556127, -1.11127 ),
        new Vector2( 0.559831, -1.11127 ),
        new Vector2( 0.559831, -1.09132 ),
        new Vector2( 0.530201, -1.09132 ),
        new Vector2( 0.530201, -1.07386 ),
        new Vector2( 0.559831, -1.07386 )
      ];
      var scale = 800;
      array.forEach( function( p ) {
        p.x = p.x * scale - 500;
        p.y = p.y * -scale - 900;
      } );
      return new Body( array, [] );
    };

    var createBird = function() {

      // from poly2tri
      var array = [
        new Vector2( 4.57998, 4.03402 ),
        new Vector2( 4.06435, 4.06435 ),
        new Vector2( 3.51839, 4.21601 ),
        new Vector2( 3.09376, 4.42832 ),
        new Vector2( 2.60846, 4.57998 ),
        new Vector2( 2.09284, 4.7013 ),
        new Vector2( 1.51655, 4.82263 ),
        new Vector2( 0.909929, 4.94395 ),
        new Vector2( 0.242648, 5.06527 ),
        new Vector2( -0.30331, 5.0956 ),
        new Vector2( -1.15258, 5.12594 ),
        new Vector2( -1.72887, 5.12594 ),
        new Vector2( -2.48714, 5.12594 ),
        new Vector2( -2.85111, 5.03494 ),
        new Vector2( -3.36674, 5.30792 ),
        new Vector2( -3.70038, 5.52024 ),
        new Vector2( -4.15534, 5.9752 ),
        new Vector2( -4.7013, 6.27851 ),
        new Vector2( -5.0956, 6.61215 ),
        new Vector2( -5.73255, 6.67281 ),
        new Vector2( -6.55149, 6.73348 ),
        new Vector2( -6.88513, 6.61215 ),
        new Vector2( -7.46142, 6.36951 ),
        new Vector2( -7.88605, 6.18752 ),
        new Vector2( -8.25003, 5.91454 ),
        new Vector2( -8.64433, 5.61123 ),
        new Vector2( -8.88698, 5.30792 ),
        new Vector2( -9.06896, 5.00461 ),
        new Vector2( -9.25095, 4.88329 ),
        new Vector2( -9.94856, 4.73163 ),
        new Vector2( -10.6462, 4.64064 ),
        new Vector2( -11.1011, 4.54965 ),
        new Vector2( -11.3741, 4.42832 ),
        new Vector2( -11.5561, 4.21601 ),
        new Vector2( -11.0101, 4.21601 ),
        new Vector2( -10.1305, 3.94303 ),
        new Vector2( -9.61492, 3.73071 ),
        new Vector2( -9.15996, 3.4274 ),
        new Vector2( -8.73532, 3.00277 ),
        new Vector2( -8.34102, 2.6388 ),
        new Vector2( -7.97705, 2.36582 ),
        new Vector2( -7.61308, 2.03218 ),
        new Vector2( -7.18844, 1.45589 ),
        new Vector2( -6.79414, 1.12225 ),
        new Vector2( -6.64248, 0.788605 ),
        new Vector2( -6.36951, 0.242648 ),
        new Vector2( -6.24818, -0.212317 ),
        new Vector2( -6.00553, -0.515627 ),
        new Vector2( -5.73255, -0.818936 ),
        new Vector2( -5.24726, -1.2739 ),
        new Vector2( -4.7923, -1.60754 ),
        new Vector2( -4.42832, -2.00184 ),
        new Vector2( -3.67005, -2.21416 ),
        new Vector2( -3.18475, -2.39615 ),
        new Vector2( -2.5478, -2.69946 ),
        new Vector2( -1.91085, -2.79045 ),
        new Vector2( -1.06158, -2.88144 ),
        new Vector2( -0.333641, -2.88144 ),
        new Vector2( 0.242648, -2.85111 ),
        new Vector2( 0.94026, -2.82078 ),
        new Vector2( 1.2739, -2.85111 ),
        new Vector2( 1.42556, -3.0331 ),
        new Vector2( 1.42556, -3.30608 ),
        new Vector2( 1.33456, -3.57905 ),
        new Vector2( 1.15258, -4.00369 ),
        new Vector2( 1.03125, -4.57998 ),
        new Vector2( 0.849267, -5.15627 ),
        new Vector2( 0.63695, -5.5809 ),
        new Vector2( 0.30331, -5.91454 ),
        new Vector2( 0.060662, -6.15719 ),
        new Vector2( -0.333641, -6.27851 ),
        new Vector2( -0.697612, -6.27851 ),
        new Vector2( -1.15258, -6.36951 ),
        new Vector2( -1.57721, -6.39984 ),
        new Vector2( -2.09284, -6.52116 ),
        new Vector2( -2.36582, -6.79414 ),
        new Vector2( -2.48714, -7.06712 ),
        new Vector2( -2.18383, -6.97612 ),
        new Vector2( -1.85019, -6.79414 ),
        new Vector2( -1.42556, -6.76381 ),
        new Vector2( -1.15258, -6.79414 ),
        new Vector2( -1.36489, -6.88513 ),
        new Vector2( -1.69853, -6.97612 ),
        new Vector2( -1.97151, -7.12778 ),
        new Vector2( -2.12317, -7.37043 ),
        new Vector2( -2.27482, -7.64341 ),
        new Vector2( -2.39615, -7.91639 ),
        new Vector2( -2.36582, -8.21969 ),
        new Vector2( -2.03218, -7.85572 ),
        new Vector2( -1.81986, -7.7344 ),
        new Vector2( -1.57721, -7.67374 ),
        new Vector2( -1.36489, -7.49175 ),
        new Vector2( -1.21324, -7.40076 ),
        new Vector2( -0.849267, -7.2491 ),
        new Vector2( -0.60662, -7.12778 ),
        new Vector2( -0.242648, -6.91546 ),
        new Vector2( 0.030331, -6.70315 ),
        new Vector2( 0.363972, -6.4605 ),
        new Vector2( 0.242648, -6.61215 ),
        new Vector2( 0.152837, -6.72007 ),
        new Vector2( -0.092855, -6.88818 ),
        new Vector2( -0.506653, -7.15974 ),
        new Vector2( -0.765276, -7.31491 ),
        new Vector2( -1.01097, -7.41836 ),
        new Vector2( -1.16614, -7.5606 ),
        new Vector2( -1.32132, -7.71577 ),
        new Vector2( -1.45063, -7.81922 ),
        new Vector2( -1.50235, -8.06492 ),
        new Vector2( -1.50235, -8.29768 ),
        new Vector2( -1.46356, -8.53044 ),
        new Vector2( -1.38597, -8.29768 ),
        new Vector2( -1.28252, -8.05199 ),
        new Vector2( -1.14028, -7.87095 ),
        new Vector2( -0.985106, -7.84509 ),
        new Vector2( -0.817001, -7.84509 ),
        new Vector2( -0.623033, -7.70284 ),
        new Vector2( -0.390272, -7.52181 ),
        new Vector2( -0.105787, -7.31491 ),
        new Vector2( 0.178699, -7.06922 ),
        new Vector2( 0.489047, -6.84939 ),
        new Vector2( 0.670083, -6.66835 ),
        new Vector2( 0.928707, -6.47438 ),
        new Vector2( 1.16147, -6.33214 ),
        new Vector2( 1.47182, -6.13817 ),
        new Vector2( 1.82096, -5.91834 ),
        new Vector2( 2.04079, -5.84076 ),
        new Vector2( 2.15717, -5.71144 ),
        new Vector2( 2.18303, -5.45282 ),
        new Vector2( 2.06665, -5.28472 ),
        new Vector2( 1.87268, -5.3623 ),
        new Vector2( 1.49768, -5.63386 ),
        new Vector2( 1.22612, -5.81489 ),
        new Vector2( 1.03216, -5.91834 ),
        new Vector2( 0.876982, -5.95714 ),
        new Vector2( 0.954569, -5.80196 ),
        new Vector2( 1.00629, -5.60799 ),
        new Vector2( 1.16147, -5.29765 ),
        new Vector2( 1.3425, -4.9873 ),
        new Vector2( 1.45888, -4.65109 ),
        new Vector2( 1.47182, -4.4054 ),
        new Vector2( 1.73044, -3.95281 ),
        new Vector2( 1.84682, -3.6166 ),
        new Vector2( 1.98906, -3.30625 ),
        new Vector2( 2.14424, -2.95711 ),
        new Vector2( 2.26062, -2.75021 ),
        new Vector2( 2.42872, -2.59503 ),
        new Vector2( 2.63562, -2.50452 ),
        new Vector2( 2.98476, -2.51745 ),
        new Vector2( 3.12701, -2.71141 ),
        new Vector2( 3.06235, -3.09935 ),
        new Vector2( 2.9589, -3.4097 ),
        new Vector2( 2.86838, -3.75884 ),
        new Vector2( 2.79079, -4.12091 ),
        new Vector2( 2.70028, -4.43126 ),
        new Vector2( 2.55803, -4.75454 ),
        new Vector2( 2.48045, -5.03902 ),
        new Vector2( 2.3382, -5.37523 ),
        new Vector2( 2.29941, -5.59506 ),
        new Vector2( 2.23475, -5.90541 ),
        new Vector2( 2.11837, -6.21576 ),
        new Vector2( 1.7951, -6.65542 ),
        new Vector2( 1.39423, -7.05628 ),
        new Vector2( 1.09681, -7.26318 ),
        new Vector2( 0.838188, -7.37956 ),
        new Vector2( 0.41146, -7.49594 ),
        new Vector2( -0.002337, -7.62526 ),
        new Vector2( -0.416135, -7.7675 ),
        new Vector2( -0.687689, -8.05199 ),
        new Vector2( -0.907519, -8.40113 ),
        new Vector2( -0.70062, -8.19423 ),
        new Vector2( -0.312685, -8.05199 ),
        new Vector2( -0.015268, -7.89681 ),
        new Vector2( 0.217493, -7.89681 ),
        new Vector2( 0.243355, -7.90974 ),
        new Vector2( 0.023525, -8.1425 ),
        new Vector2( -0.157511, -8.25888 ),
        new Vector2( -0.403203, -8.43992 ),
        new Vector2( -0.648896, -8.75027 ),
        new Vector2( -0.778207, -8.90544 ),
        new Vector2( -0.881657, -9.18993 ),
        new Vector2( -0.80407, -9.60372 ),
        new Vector2( -0.597171, -9.177 ),
        new Vector2( -0.14458, -8.9701 ),
        new Vector2( 0.269217, -8.62096 ),
        new Vector2( 0.695946, -8.28475 ),
        new Vector2( 1.13561, -8.00026 ),
        new Vector2( 1.52354, -7.62526 ),
        new Vector2( 1.82096, -7.26318 ),
        new Vector2( 1.95027, -7.09508 ),
        new Vector2( 1.9632, -7.15974 ),
        new Vector2( 1.66578, -7.58646 ),
        new Vector2( 1.45888, -7.84509 ),
        new Vector2( 1.13561, -8.20716 ),
        new Vector2( 0.760601, -8.65975 ),
        new Vector2( 0.450253, -8.99596 ),
        new Vector2( 0.269217, -9.28045 ),
        new Vector2( 0.126974, -9.65545 ),
        new Vector2( 0.19163, -10.2761 ),
        new Vector2( 0.333873, -9.84942 ),
        new Vector2( 0.63129, -9.68131 ),
        new Vector2( 0.980431, -9.26751 ),
        new Vector2( 1.26492, -8.72441 ),
        new Vector2( 1.60113, -8.31061 ),
        new Vector2( 1.98906, -7.7675 ),
        new Vector2( 2.36407, -7.34077 ),
        new Vector2( 2.79079, -7.00456 ),
        new Vector2( 3.13994, -6.7718 ),
        new Vector2( 3.68304, -6.46145 ),
        new Vector2( 4.14857, -6.33214 ),
        new Vector2( 4.7434, -6.09938 ),
        new Vector2( 5.19599, -6.13817 ),
        new Vector2( 4.85978, -5.87955 ),
        new Vector2( 4.29081, -5.76317 ),
        new Vector2( 3.77356, -5.81489 ),
        new Vector2( 3.34683, -6.07352 ),
        new Vector2( 2.77786, -6.47438 ),
        new Vector2( 2.41579, -6.60369 ),
        new Vector2( 2.41579, -6.28042 ),
        new Vector2( 2.59683, -5.84076 ),
        new Vector2( 2.79079, -5.42696 ),
        new Vector2( 2.99769, -4.90971 ),
        new Vector2( 3.25632, -4.30195 ),
        new Vector2( 3.50201, -3.52608 ),
        new Vector2( 3.83822, -2.63383 ),
        new Vector2( 4.07098, -2.40107 ),
        new Vector2( 4.39426, -2.28469 ),
        new Vector2( 4.79512, -2.23296 ),
        new Vector2( 4.54943, -2.02606 ),
        new Vector2( 4.49771, -1.6252 ),
        new Vector2( 4.54943, -1.50882 ),
        new Vector2( 4.91151, -1.50882 ),
        new Vector2( 5.54513, -1.45709 ),
        new Vector2( 6.12704, -1.39244 ),
        new Vector2( 6.85118, -1.32778 ),
        new Vector2( 7.44601, -1.14674 ),
        new Vector2( 7.85981, -0.78467 ),
        new Vector2( 7.79516, -0.409667 ),
        new Vector2( 7.49774, -0.151043 ),
        new Vector2( 7.84688, 0.042924 ),
        new Vector2( 8.23481, 0.314479 ),
        new Vector2( 8.64861, 0.702414 ),
        new Vector2( 8.70034, 1.09035 ),
        new Vector2( 8.41585, 1.42656 ),
        new Vector2( 8.11843, 1.62053 ),
        new Vector2( 8.3512, 2.06019 ),
        new Vector2( 8.53223, 2.38347 ),
        new Vector2( 8.67447, 2.74554 ),
        new Vector2( 8.66154, 3.22399 ),
        new Vector2( 8.80379, 3.87055 ),
        new Vector2( 8.90724, 4.36193 ),
        new Vector2( 9.1012, 4.85332 ),
        new Vector2( 9.43741, 5.40936 ),
        new Vector2( 9.90293, 6.04298 ),
        new Vector2( 10.3167, 6.58609 ),
        new Vector2( 10.7047, 7.3749 ),
        new Vector2( 10.9374, 7.96973 ),
        new Vector2( 11.1573, 8.40939 ),
        new Vector2( 11.1573, 8.84905 ),
        new Vector2( 10.9374, 9.05595 ),
        new Vector2( 10.6659, 9.28871 ),
        new Vector2( 10.3426, 9.37922 ),
        new Vector2( 9.99345, 9.34043 ),
        new Vector2( 9.63138, 8.97836 ),
        new Vector2( 9.20465, 8.48697 ),
        new Vector2( 8.86844, 8.1249 ),
        new Vector2( 8.50637, 7.72404 ),
        new Vector2( 8.17016, 7.28438 ),
        new Vector2( 7.74343, 6.88351 ),
        new Vector2( 7.43308, 6.5473 ),
        new Vector2( 7.16153, 6.1723 ),
        new Vector2( 6.70894, 5.71971 ),
        new Vector2( 6.20462, 5.25418 ),
        new Vector2( 5.72617, 4.80159 ),
        new Vector2( 5.13134, 4.41366 ),
        new Vector2( 4.87271, 4.16797 )
      ];
      var scale = 16;
      array.forEach( function( p ) {
        p.x = p.x * scale;
        p.y = p.y * -scale;
      } );
      return new Body( array, [] );
    };

    this.getLevels = function() {
      return [
        new Level( [ createMap() ], [
          new RadialDoubling(), new Snowflake(), new DeleteVertices( 3 )
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] ),
        new Level( [ createBird() ], [
          new RadialDoubling(), new Snowflake(), new DeleteVertices( 3 )
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] ),
        new Level( [ createRectangle() ], [
          new RadialDoubling(), new Snowflake(), new DeleteVertices( 3 )
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] ),
        new Level( [ createStar() ], [
          new DeleteVertices( 3 ),
          new Snowflake()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake()
        ] ),
        new Level( [ createTriangle() ], [
          new Snowflake(), new DeleteVertices( 3 ), new RadialDoubling()
        ], [
          new DeleteVertices( 3 ),
          new Snowflake(),
          new RadialDoubling()
        ] )
      ];
    };
  }

  return inherit( Object, LevelDesign, {} );
} );