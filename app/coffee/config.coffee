require.config

  paths:
    async: "../components/requirejs-plugins/src/async"
    text: "../components/requirejs-text/text"
    jquery: "../components/jquery/dist/jquery"
    jqueryEasing: "../components/jquery.easing/js/jquery.easing"
    jqueryColor: "../components/jquery-color/jquery.color"
    jqueryTransit: "../components/jquery.transit/jquery.transit"
    jqueryLazyload: "libs/jquery-lazyload"
    jqueryOverscroll: "../components/jquery-overscroll/dist/jquery.overscroll"
    browserDetection: "../components/browserdetection/src/browser-detection"
    jqueryPlaceholder: "../components/jquery-placeholder/jquery.placeholder"
    jqueryHiddenHeight: "../components/jquery-hidden-height/src/jquery.hidden.height"
    tooltipster: "../components/tooltipster/js/jquery.tooltipster"
    underscore: "../components/underscore-amd/underscore"
    backbone: "../components/backbone-amd/backbone"
    backboneLocalStorage: "../components/backbone.localStorage/backbone.localStorage"
    moment: "../components/moment/moment"
    templates: "../templates"

  shim:
    tooltipster:
      deps: ["jquery"]
    jqueryTransit:
      deps: ["jquery"]
