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

  stik.helper( "zip", function(){
    return function(firstArray, secondArray){
      var mergedArray = [];

      for (var i = 0; i < firstArray.length; i++) {
        mergedArray.push([]);
        mergedArray[i].push(firstArray[i]);
        mergedArray[i].push(secondArray[i]);
      }

      return mergedArray;
    }
  });
})( window.stik );
