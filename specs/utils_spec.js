describe("utils", function(){
  describe("$window", function(){
    it("should pass in the global window object through a boundary", function(){
      var result = stik.labs.boundary({
        name: "$window"
      }).run();

      expect(result).toEqual(window);
    });
  });

  describe("debounce", function(){
    it("should return a function", function(){
      function original(){}

      var debounce = stik.labs.helper({
        name: "debounce"
      }).run();

      var debounced = debounce(original, 0);

      expect(debounced).toEqual(jasmine.any(Function));
    });

    it("should execute the original function when called", function(){
      var original = jasmine.createSpy("original");

      var debounce = stik.labs.helper({
        name: "debounce"
      }).run();

      var debounced = debounce(original, 1);

      runs(function(){
        debounced();
      });

      waits(30)

      runs(function(){
        expect(original).toHaveBeenCalled();
      });
    });

    it("executes the original function only once when called multiple times within the debounce period", function(){
      var original = jasmine.createSpy("original");

      var debounce = stik.labs.helper({
        name: "debounce"
      }).run();

      var debounced = debounce(original, 50);

      runs(function(){
        for (var i = 0; i < 5; ++i) {
          debounced();
        }
      });

      waits(50);

      runs(function(){
        expect(original.calls.length).toEqual(1);
      });
    });

    it("executes the original function only once when called intermittently within the debounce period", function (done) {
      var original = jasmine.createSpy("original");

      var debounce = stik.labs.helper({
        name: "debounce"
      }).run();

      var debounced = debounce(original, 50);

      runs(function(){
        setTimeout(debounced, 10);
        setTimeout(debounced, 20);
        setTimeout(debounced, 30);
        setTimeout(debounced, 40);
        setTimeout(debounced, 50);
      });

      waits(150);

      runs(function(){
        expect(original.calls.length).toEqual(1);
      });
    });
  });

  it("executes the original function again if called after the debounce period", function(){
    var original = jasmine.createSpy("original");

    var debounce = stik.labs.helper({
      name: "debounce"
    }).run();

    var debounced = debounce(original, 30);

    runs(function(){
      debounced();
      setTimeout(debounced, 60);
    });

    waits(100);

    runs(function(){
      expect(original.calls.length).toEqual(2);
    });
  });
});
