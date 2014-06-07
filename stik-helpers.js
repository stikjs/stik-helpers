// ==========================================================================
// Project:   Stik Helpers - Functional helpers for Stik.js
// Copyright: Copyright 2013-2014 Lukas Alexandre
// License:   Licensed under MIT license
//            See https://github.com/stikjs/stik-helpers/blob/master/LICENSE
// ==========================================================================

// Version: 0.3.0 | From: 07-06-2014

(function(){
  var helpers = {},
      modules = {},
      tmpDependencies = {};

  window.stik.helper = function helper( as, func ){
    if ( !as ) { throw "Stik: Helper needs a name"; }
    if ( !func || typeof func !== "function" ) { throw "Stik: Helper needs a function"; }

    modules[ as ] = window.stik.injectable({
      module: func,
      resolvable: true
    });
    helpers[ as ] = function(){
      var func = modules[ as ].resolve( withDependencies() );
      return func.apply( {}, arguments );
    };

    return helpers[ as ];
  };

  function withDependencies(){
    for ( var name in modules ) {
      if ( !tmpDependencies.hasOwnProperty( name ) ) {
        tmpDependencies[ name ] = modules[ name ];
      }
    }

    return tmpDependencies;
  }

  helpers.pushDoubles = function pushDoubles( doubles ){
    for ( var name in doubles ) {
      tmpDependencies[ name ] = window.stik.injectable({
        module: doubles[ name ]
      });
    }
  };

  helpers.cleanDoubles = function cleanDoubles(){
    tmpDependencies = {};
  };

  window.stik.boundary( { as: "$h", to: helpers } );
}());

window.stik.boundary( { as: "$window", to: window } );

window.stik.helper( "$window", function(){
  return window;
});

window.stik.helper( "isArray", function(){
  return function isArray( obj ){
    return Object.prototype.toString.call( obj ) === "[object Array]"
  }
});

window.stik.helper( "debounce", function(){
  return function debounce( func, wait, immediate ){
    // copied from underscore.js
    var timeout;
    return function(){
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if ( !immediate ) func.apply( context, args );
      };
      var callNow = immediate && !timeout;
      clearTimeout( timeout );
      timeout = setTimeout( later, wait );
      if ( callNow ) func.apply( context, args );
    };
  };
});

window.stik.helper( "deepExtend", function(){
  return function deepExtend( destination, source ){
    for ( var property in source ) {
      if ( Object.isObjectLiteral( destination[ property ] ) && Object.isObjectLiteral( source[ property ] ) ) {
        destination[ property ] = destination[ property ] || {};
        arguments.callee( destination[ property ], source[ property ]);
      } else {
        destination[ property ] = source[ property ];
      }
    }
    return destination;
  };
});

window.stik.helper( "zip", function(){
  return function(firstArray, secondArray){
    var matrix = [];

    for (var i = 0; i < firstArray.length; i++) {
      matrix.push([]);
      matrix[i].push(firstArray[i]);
      matrix[i].push(secondArray[i]);
    }

    return matrix;
  }
});
