(function () {
  'use strict';

  function parseName(name) {
    var parts = name.split('?'),
        choices,
        object = {
          test: parts[0],
          yep: false,
          nope: false
        };

    // If there are no scripts we can return here
    if (parts.length === 1) { return object; }

    // Parse the scripts
    choices = parts[1].split(':');

    // Allow for an empty script for passed test so that
    // we can just conditionally load polyfills
    object.yep = choices[0] || false;

    // If we only want a script for a passed test it's done
    if (choices.length === 1) { return object; }

    object.nope = choices[1];

    return object;
  }

  define({
    load: function (name, req, onload, config) {
      var testResult,
          options = parseName(name);

      // Test for overridden configs first so to use them
      // instead of the Modernizr object
      if (typeof config.modernizr !== 'undefined' &&
          typeof config.modernizr[options.test] !== 'undefined'){
        testResult = config.modernizr[options.test];

      // Use the Modernizr object to get the test result
      } else if (typeof window.Modernizr !== 'undefined') {
        testResult = window.Modernizr[options.test];

      // No Modernizr and no config to set the value
      } else {
        throw new Error('RequireJS Modernizr requires Modernizr: ' + name);
      }


      // If the test was good and we want a script, load it
      if (options.yep && testResult) {
        req([options.yep], function (result) {
          onload(result);
        });

      // Test was bad and we have a script for that
      } else if (options.nope && !testResult) {
        req([options.nope], function (result) {
          onload(result);
        });

      // Send back undefined if the request was for a script
      // that we don't have
      } else if (options.yep || options.nope) {
        onload(undefined);

      // If the request isn't for a script, then just return the
      // test result
      } else {
        onload(testResult);
      }
    },
    normalize: function (name, normalize) {
      var parsed = parseName(name),
          string = parsed.test;

      if (parsed.yep) {
        string += '?' + normalize(parsed.yep);
      } else if (parsed.nope) {
        string += '?';
      }
      if (parsed.nope) {
        string += ':' + normalize(parsed.nope);
      }

      return string;
    }
  });
}());

