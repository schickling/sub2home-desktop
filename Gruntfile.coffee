backboneModules = [
  "main"
  "models/clientModel"
  "views/header/HeaderView"
  "views/header/ClientView"
  "views/home/home/MainView"
  "views/home/info/MainView"
  "views/home/404/MainView"
  "views/client/login/MainView"
  "views/client/dashboard/MainView"
  "views/client/config/MainView"
  "views/store/home/MainView"
  "views/store/info/MainView"
  "views/store/selection/MainView"
  "views/store/tray/MainView"
  "views/store/checkout/MainView"
  "views/store/dashboard/MainView"
  "views/store/assortment/MainView"
  "views/store/config/MainView"
]

serviceSnippet = """
<!-- Analytics start -->
<script>

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-39743634-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

</script>
<!-- Analytics end -->
<!-- Uservoice start -->
<script>
  (function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/71mfZHGrfSGEFsFVRZ0YRg.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})()
</script>
<!-- Uservoice end -->
"""

module.exports = (grunt) ->

  require("load-grunt-tasks") grunt
  require("time-grunt") grunt

  grunt.initConfig

    config:
      dist: "./dist"
      src: "./app"
      test: "./test"

    coffee:
      options:
        bare: true
        sourceMap: true
        sourceRoot: ""

      src:
        files: [
          expand: true
          cwd: "<%= config.src %>/coffee"
          src: "**/*.coffee"
          dest: "<%= config.src %>/js"
          ext: ".js"
        ]

      test:
        files: [
          expand: true
          cwd: "<%= config.test %>"
          src: "**/*.coffee"
          dest: "<%= config.test %>/.tmp"
          ext: ".js"
        ]

      dist:
        files: [
          expand: true
          cwd: "<%= config.src %>/coffee"
          src: "**/*.coffee"
          dest: "<%= config.src %>/js"
          ext: ".js"
        ]

    jshint:
      options:
        jshintrc: ".jshintrc"

      all: [
        "Gruntfile.js"
        "<%= config.src %>/js/main.js"
        "<%= config.src %>/js/config.js"
        "<%= config.src %>/js/services/*.js"
        "<%= config.src %>/js/models/*.js"
        "<%= config.src %>/js/collections/*.js"
        "<%= config.src %>/js/views/**/*.js"
        "test/spec/**/*.js"
      ]

    connect:
      server:
        options:
          port: 8888
          hostname: '0.0.0.0'
          base: 'app'

    requirejs:
      dist:
        options:
          optimize: "uglify"
          baseUrl: "<%= config.src %>/js"
          mainConfigFile: "<%= config.src %>/js/config.js"
          preserveLicenseComments: false
          include: backboneModules
          out: "<%= config.dist %>/js/main.js"

    rev:
      dist:
        files:
          src: [
            "<%= config.dist %>/js/main.js"
            "<%= config.dist %>/css/main.css"
          ]

    usemin:
      html: ["<%= config.dist %>/index.html"]
      options:
        dirs: ["<%= config.dist %>"]

    open:
      server:
        path: "https://sub2home.dev"
        app: "Google Chrome Canary"

    htmlmin:
      dist:
        options:
          collapseWhitespace: true
        files: ["<%= config.dist %>/index.html": "<%= config.dist %>/index.html"]

    clean:
      dist: "<%= config.dist %>"
      #test: "<%= config.test %>/.tmp"
      cache: "node_modules/grunt-newer/.cache"
      options:
        force: true

    copy:
      dist:
        files: [
          expand: true
          dot: true
          cwd: "<%= config.src %>"
          dest: "<%= config.dist %>"
          src: [
            "index.html"
            "sitemap.xml"
            "robots.txt"
            "favicon.ico"
            "components/requirejs/require.js"
            "mobile/*"
            "browser/*"
          ]
        ]

    less:
      src:
        files:
          "<%= config.src %>/css/main.css": "<%= config.src %>/less/main.less"
        options:
          sourceMap: true

      dist:
        files:
          "<%= config.dist %>/css/main.css": "<%= config.src %>/less/main.less"
        options:
          yuicompress: true

    watch:
      coffeeSrc:
        files: ["<%= config.src %>/coffee/**/*.coffee"]
        tasks: ["newer:coffee:src"]

      coffeeTest:
        files: ["<%= config.test %>/spec/**/*.coffee"]
        tasks: ["newer:coffee:test"]

      less:
        files: ["<%= config.src %>/less/*.less"]
        tasks: ["less:src"]

      livereload:
        files: [
          "<%= config.src %>/js/**/*.js"
          "<%= config.src %>/templates/**/*.html"
          "<%= config.src %>/css/*.css"
        ]
        options:
          livereload:
            port: 35730

    karma:
      unit:
        configFile: "karma.conf.js"
        singleRun: true

    replace:
      dist:
        src: ["<%= config.dist %>//index.html"]
        overwrite: true
        replacements: [
          from: "<!-- serviceSnippet -->"
          to: serviceSnippet
        ]

    htmlrefs:
      dist:
        src: "<%= config.dist %>/index.html"

  grunt.registerTask "reset", [
    "clean:cache"
    "any-newer:less"
    "newer:coffee:src"
    "newer:coffee:test"
  ]

  grunt.registerTask "server", [
    "any-newer:less"
    "newer:coffee:src"
    "newer:coffee:test"
    "connect:server"
    "watch"
  ]

  grunt.registerTask "test", [
    "coffee"
    "karma:unit"
  ]

  grunt.registerTask "build", [
    "clean:dist"
    "coffee:dist"
    "copy:dist"
    "requirejs:dist"
    "less:dist"
    "replace:dist"
    "htmlrefs:dist"
    "rev:dist"
    "usemin"
    "htmlmin"
  ]

  grunt.registerTask "default", [
    "server"
  ]
