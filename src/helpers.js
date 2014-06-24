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
