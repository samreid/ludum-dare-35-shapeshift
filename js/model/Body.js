// Copyright 2015

/**
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var shapeshift = require( 'SHAPESHIFT/shapeshift' );
  var Vector2 = require( 'DOT/Vector2' );
  var Util = require( 'DOT/Util' );

  var globalId = 1;

  // TODO: ignore
  function log( msg ) {
    // console.log( msg );
  }

  function Body( boundaryCurve, holeCurves ) {
    this.id = globalId++;

    this.boundaryCurve = boundaryCurve; // Array.<Vector2>
    this.holeCurves = holeCurves; // Array.<Array.<Vector2>>
  }

  shapeshift.register( 'Body', Body );

  return inherit( Object, Body, {
    transformed: function( vectorMap ) {
      var boundaryCurve = this.boundaryCurve.map( vectorMap );
      var holeCurves = this.holeCurves.map( function( curve ) {
        return curve.map( vectorMap );
      } );
      return new Body( boundaryCurve, holeCurves );
    },

    curveMapped: function( curveMap ) {
      var boundaryCurve = curveMap( this.boundaryCurve );
      var holeCurves = this.holeCurves.map( curveMap );
      return new Body( boundaryCurve, holeCurves );
    },

    transformedWithOld: function( vectorMap ) {
      return this.transformed( function( vector ) {
        var result = vectorMap( vector );
        result.old = vector;
        return result;
      } );
    },

    discreteTransformedCurve: function( vectorMap ) {
      return this.curveMapped( Body.curveMappingWithTransform( vectorMap ) );
    },

    getBoundaryCentroid: function() {
      var centroid = new Vector2( 0, 0 );
      for ( var i = 0; i < this.boundaryCurve.length; i++ ) {
        var p = this.boundaryCurve[ i ];
        centroid.x += p.x / this.boundaryCurve.length;
        centroid.y += p.y / this.boundaryCurve.length;
      }
      return centroid;
    }
  }, {
    curveMappingWithTransform: function( vectorMap ) {
      return function( curve ) {
        return Body.removeCollinear( Body.discretizeCurve( curve, 5 ).map( function( vector ) {
          var result = vectorMap( vector );
          if ( _.contains( curve, vector ) ) {
            result.old = vector;
          }
          return result;
        } ), 0.1 );
      };
    },

    discretizeCurve: function( curve, maxDistance ) {
      var result = [];

      function next( n ) {
        return ( n === curve.length - 1 ) ? 0 : ( n + 1 );
      }

      for ( var i = 0; i < curve.length; i++ ) {
        var firstPoint = curve[ i ];
        var secondPoint = curve[ next( i ) ];

        var delta = secondPoint.minus( firstPoint );
        var magnitude = delta.magnitude();
        var segments = 1;
        while ( magnitude / segments > maxDistance ) {
          segments++;
        }
        for ( var j = 1; j < segments; j++ ) {
          result.push( firstPoint.blend( secondPoint, j / segments ) );
        }
        result.push( secondPoint );
      }
      return result;
    },

    removeCollinear: function( curve, epsilon ) {
      function next( n ) {
        return ( n === curve.length - 1 ) ? 0 : ( n + 1 );
      }
      function previous( n ) {
        return ( n === 0 ) ? ( curve.length - 1 ) : ( n - 1 );
      }

      var result = [];

      for ( var i = 0; i < curve.length; i++ ) {
        if ( !Util.arePointsCollinear( curve[ i ], curve[ next( i ) ], curve[ next( next( i ) ) ], epsilon ) ) {
          result.push( curve[ next( i ) ] );
        }
      }

      return result;
    },

    remapAugmented: function( beforeBody, afterBody ) {
      assert && assert( beforeBody.boundaryCurve === afterBody.boundaryCurve.old );
      assert && assert( beforeBody.holeCurves.length === afterBody.holeCurves.length );
      assert && assert( _.every( afterBody.holeCurves, function( curve ) { return !!curve.old; } ) );

      var boundaryMap = Body.remapCurve( beforeBody.boundaryCurve, afterBody.boundaryCurve );
      var holeCurveMaps = afterBody.holeCurves.map( function( curve ) {
        return Body.remapCurve( curve.old, curve );
      } );

      return {
        before: new Body( boundaryMap.before, holeCurveMaps.map( function( map ) { return map.before; } ) ),
        after: new Body( boundaryMap.after, holeCurveMaps.map( function( map ) { return map.after; } ) )
      };
    },

    remapCurve: function( beforeCurve, afterCurve ) {
      assert && assert( afterCurve.old === beforeCurve );

      // Tag "before" curve entries with their index, so we can do fast (non-quadratic) lookups
      for ( var m = 0; m < beforeCurve.length; m++ ) {
        beforeCurve[ m ].beforeIndex = m;
      }

      log( 'remapping curve ' + beforeCurve.map( function( v ) {
        return '(' + v.x + ',' + v.y + ')';
      } ).join( ',' ) + ' => ' + afterCurve.map( function( v ) {
        return '(' + v.x + ',' + v.y + ( v.old ? ( '|' + v.old.beforeIndex ) : '' ) + ')';
      } ).join( ',' ) );

      var beforeResult = [];
      var afterResult = [];
      afterResult.old = beforeResult;

      function beforeNext( n ) {
        return ( n + 1 === beforeCurve.length ) ? 0 : ( n + 1 );
      }
      function afterNext( n ) {
        return ( n + 1 === afterCurve.length ) ? 0 : ( n + 1 );
      }

      // functions using tagged indices
      function beforeIndexFromAfterPoint( afterPoint ) {
        return afterPoint.old.beforeIndex;
      }
      function beforeIndexFromAfterIndex( afterIndex ) {
        return afterCurve[ afterIndex ].old.beforeIndex;
      }
      function beforePointFromAfterPoint( afterPoint ) {
        return beforeCurve[ afterPoint.old.beforeIndex ];
      }
      function beforePointFromAfterIndex( afterIndex ) {
        return beforeCurve[ afterCurve[ afterIndex ].old.beforeIndex ];
      }

      function distanceAlongCurve( curve ) {
        var distance = 0;
        for ( var i = 1; i < curve.length; i++ ) {
          distance += curve[ i - 1 ].distance( curve[ i ] );
        }
        return distance;
      }

      function pointAtDistanceAlongCurve( curve, distance ) {
        var accumulatedDistance = 0;
        for ( var i = 1; i < curve.length; i++ ) {
          var sectionDistance = curve[ i - 1 ].distance( curve[ i ] );
          if ( distance <= accumulatedDistance + sectionDistance ) {
            var ratio = ( distance - accumulatedDistance ) / sectionDistance;
            return curve[ i - 1 ].blend( curve[ i ], ratio );
          }
          else {
            accumulatedDistance += sectionDistance;
          }
        }
      }

      // Find the first index in the afterCurve that maps to an old before vector
      var firstIndex;
      for ( firstIndex = 0; firstIndex < afterCurve.length; firstIndex++ ) {
        if ( afterCurve[ firstIndex ].old ) {
          break;
        }
      }

      log( 'firstIndex: ' + firstIndex );

      // If there is no "old" map, we need to do a full remap
      if ( firstIndex === afterCurve.length ) {
        log( 'No old mapping, full remap' );
        firstIndex = 0;

        // for now, just find the closest point to our point 0 (no quadratic behavior for large bodies)
        // then map those together and run the rest
        var closestIndex = 0;
        var closestDistance = Number.POSITIVE_INFINITY;

        for ( var k = 0; k < beforeCurve.length; k++ ) {
          var dist = beforeCurve[ k ].distance( afterCurve[ 0 ] );
          if ( dist < closestDistance ) {
            closestDistance = dist;
            closestIndex = k;
          }
        }

        log( 'Closest before index ' + closestIndex );

        // map it to the closest
        afterCurve[ 0 ].old = beforeCurve[ closestIndex ];
      }

      // Now guaranteed at least a firstIndex with one thing mapped
      var startAfterIndex = firstIndex;
      var currentAfterIndex = null;
      var lastAfterEndIndex = null;
      while ( lastAfterEndIndex !== firstIndex ) {
        currentAfterIndex = startAfterIndex;

        // before-after pair before our interval
        var firstAfterPoint = afterCurve[ startAfterIndex ];
        var firstBeforePoint = beforeCurve[ firstAfterPoint.old.beforeIndex ];

        var beforePoints = [];
        var afterPoints = [];
        for ( currentAfterIndex = afterNext( currentAfterIndex );
              !afterCurve[ currentAfterIndex ].old;
              currentAfterIndex = afterNext( currentAfterIndex ) ) {
          afterPoints.push( afterCurve[ currentAfterIndex ] );
        }
        var beforeStart = beforeNext( afterCurve[ startAfterIndex ].old.beforeIndex );
        var beforeEnd = afterCurve[ currentAfterIndex ].old.beforeIndex;
        for ( var currentBeforeIndex = beforeStart;
              currentBeforeIndex !== beforeEnd;
              currentBeforeIndex = beforeNext( currentBeforeIndex ) ) {
          beforePoints.push( beforeCurve[ currentBeforeIndex ] );
        }

        // before-after pair after our interval
        var lastAfterPoint = afterCurve[ currentAfterIndex ];
        var lastBeforePoint = beforeCurve[ lastAfterPoint.old.beforeIndex ];

        log( 'interval before:' + ( firstAfterPoint.old.beforeIndex ) + '-' + ( lastAfterPoint.old.beforeIndex ) +
             ' after:' + ( startAfterIndex ) + '-' + ( currentAfterIndex ) );

        // pointAtDistanceAlongCurve
        var insertions = []; // tagged with .ratio
        var beforeSubcurve = [ firstBeforePoint ].concat( beforePoints ).concat( [ lastBeforePoint ] );
        var afterSubcurve = [ firstAfterPoint ].concat( afterPoints ).concat( [ lastAfterPoint ] );
        var beforeTotalDistance = distanceAlongCurve( beforeSubcurve );
        var afterTotalDistance = distanceAlongCurve( afterSubcurve );
        if ( beforePoints.length ) {
          var bfdist = 0;
          for ( var bfi = 0; bfi < beforePoints.length; bfi++ ) {
            bfdist += beforePoints[ bfi ].distance( bfi === 0 ? firstBeforePoint : beforePoints[ bfi - 1 ] );
            var ratio = bfdist / beforeTotalDistance;
            insertions.push( {
              before: beforePoints[ bfi ].copy(),
              // after: firstAfterPoint.blend( lastAfterPoint, ratio ),
              after: pointAtDistanceAlongCurve( afterSubcurve, ratio * afterTotalDistance ),
              ratio: ratio
            } );
          }
        }
        if ( afterPoints.length ) {
          var afdist = 0;
          for ( var afi = 0; afi < afterPoints.length; afi++ ) {
            afdist += afterPoints[ afi ].distance( afi === 0 ? firstAfterPoint : afterPoints[ afi - 1 ] );
            var ratio = afdist / afterTotalDistance;
            insertions.push( {
              // before: firstBeforePoint.blend( lastBeforePoint, ratio ),
              before: pointAtDistanceAlongCurve( beforeSubcurve, ratio * beforeTotalDistance ),
              after: afterPoints[ afi ].copy(),
              ratio: ratio
            } );
          }
        }

        insertions = _.sortBy( insertions, 'ratio' );

        // Push results of this interval (including insertions and start point) into our results
        log( '  start point: ' + firstBeforePoint.x + ',' + firstBeforePoint.y + ' => ' +
             firstAfterPoint.x + ',' + firstAfterPoint.y );
        beforeResult.push( firstBeforePoint );
        afterResult.push( firstAfterPoint );
        insertions.forEach( function( insertion ) {
          log( '  insertion: before: ' + insertion.before.x + ',' + insertion.before.y + ' => ' +
               insertion.after.x + ',' + insertion.after.y + ' ratio:' + insertion.ratio );
          beforeResult.push( insertion.before );
          afterResult.push( insertion.after );
        } );

        // Set things up for the next look
        startAfterIndex = lastAfterEndIndex = currentAfterIndex;
      }

      return {
        before: beforeResult,
        after: afterResult
      };
    },

    testRemapCurve: function() {
      var v1 = new Vector2( 0, 0 );
      var v2 = new Vector2( 10, 0 );
      var v3 = new Vector2( 10, 10 );
      var v4 = new Vector2( 20, 100 );

      var before1 = v1.copy();
      var before2 = v3.copy();
      var before3 = v4.copy();

      var after1 = v1.copy();
      var after2 = v2.copy();
      var after3 = v4.copy();

      // after1.old = before1;
      // after3.old = before3;

      var remap = Body.remapCurve( [ before1, before2, before3 ], [ after1, after2, after3 ] );
      debugger;


    }
  } );
} );