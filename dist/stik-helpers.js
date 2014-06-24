// Stik-helpers - Version: 0.4.0 | From: 25-6-2014
(function( stik ){
  var helpers = {},
      modules = {},
      tmpDependencies = {};

  stik.helper = function helper( as, func ){
    if ( !as ) { throw "Stik: Helper needs a name"; }
    if ( !func || typeof func !== "function" ) { throw "Stik: Helper needs a function"; }

    modules[ as ] = stik.injectable({
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
      tmpDependencies[ name ] = stik.injectable({
        module: doubles[ name ]
      });
    }
  };

  helpers.cleanDoubles = function cleanDoubles(){
    tmpDependencies = {};
  };

  stik.boundary( { as: "$h", to: helpers } );
}( window.stik ));

(function( stik ){
  stik.boundary( { as: "$window", to: window } );

  stik.helper( "$window", function(){
    return window;
  });

  stik.helper( "isArray", function(){
    return function isArray( obj ){
      return Object.prototype.toString.call( obj ) === "[object Array]"
    }
  });

  stik.helper( "debounce", function(){
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

  stik.helper( "deepExtend", function(){
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

  stik.helper( "promise", function(){
    return function Promise(){
      return {
        fail: function (callback) {
          this.reject = callback;
        },
        then: function (callback, callback1) {
          this.resolve = callback;
          callback1 !== undefined ? this.reject = callback1 : false;
        }
      }
    }
  });

  stik.helper( "zip", function(){
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
})( window.stik );
