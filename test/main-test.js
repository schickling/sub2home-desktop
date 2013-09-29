var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

require(['/base/src/js/config.js'], function () {

  var paths = requirejs.s.contexts._.config.paths;
  paths.timemachine = '../components/timemachine/timemachine';
  paths.resources = '../../test/resources';

  require.config({
    baseUrl: '/base/src/js',
    paths: paths,
    deps: tests,
    callback: window.__karma__.start
  });

});