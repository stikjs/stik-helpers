#Helpers
Helpers can be used as a shortcut to create small functional pieces of code.

All defined helpers reside under the **$h** module that can be injected into controllers, behaviors and boundaries.

##Defining
```javascript
// this helper does not have dependencies
stik.helper("hasClass", function(){
  return function(elm, selector){
    var className = " " + selector + " ";
    return (" " + elm.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1;
  };
});
// the helper defined below depends on the
// previously defined hasClass helper
stik.helper("toggleClass", function(hasClass){
  return function(elm, selector){
    if (hasClass(elm, selector)) {
      var regex = new RegExp("\\b\\s?" + selector + "\\b", "g");
      elm.className = elm.className.replace(regex, '');
    } else if (!hasClass(elm, selector)) {
      elm.className += " " + selector;
    }
  };
});
```

##Using it
```javascript
stik.controller("AppCtrl", "List", function($template, $h){
  $h.toggleClass($template, "stik-is-awesome");
});

stik.behavior("shine-on-focus", function($template, $h){
  $template.addEventListener("focus", function(){
    $h.toggleClass($template, "shining");
  });
  $template.addEventListener('blur', function(){
    $h.toggleClass($template, "shining");
  });
});

stik.boundary({
  as: "myAwesomeExternalLibraryBoundary",
  from: "controller",
  resolvable: true,
  to: function($h, $template){
    var http = new SomeHttpLibrary();
    if ($h.hasClass($template, 'not-loaded')) {
      http.get('/load-app.html').wheDone(function(res){
        $h.toggleClass($template, 'loading-done');
      });
    }
  }
});
```


##$window
Allows you to mock the window global obj
```javascript
stik.behavior("someWindowDependentBehavior", function($window){
  $window.AudioListener();
  // in this way you can later on
  // mock the window object on your tests
});

// or

stik.helper("clearTimeout", function($window){
  return $window.clearTimeout;
});
```

##debounce
Debouncing ensures that a method gets executed only once, during the specified interval, even if several calls were triggered.

```javascript
stik.behavior("shineOnMouseMove", function($h, $template){
  shineFunc.bind({}, $template);

  // the `shineThis` function will only be called
  // once within 500ms even if the browser triggers
  // 100+ mouse events
  $template.addEventListener("mousemove", $h.debounce(shineThis, 500));
});
```

##deepExtend
Gives you the ability to deep copy all properties and values from one object to another.

```javascript
stik.controller("AppCtrl", "Post", function($h, httpGet){
  currentPost = {};

  anotherPost = httpGet("/posts/1029783.json");

  $h.deepExtend currentPost, anotherPost
  // currentPost will have all new properties
  // and values from anotherPost
});
```
