var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

require(['/base/src/js/config.js'], function () {

    require({
        // Karma serves files from '/base'
        baseUrl: '/base/src/js',

        // ask Require.js to load these files (all our tests)
        deps: tests,

        // start test run, once Require.js is done
        callback: window.__karma__.start
    });

});