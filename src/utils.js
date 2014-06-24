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

window.stik.helper( "promise", function(){
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
