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

  grunt.initConfig

    config:
      dist: "./dist"
      app: "./app"
      test: "./test"

    coffee:
      options:
        bare: true
        sourceMap: true
        sourceRoot: ""

      src:
        files: [
          expand: true
          cwd: "<%= config.app %>/coffee"
          src: "**/*.coffee"
          dest: "<%= config.app %>/js"
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
          cwd: "<%= config.app %>/coffee"
          src: "**/*.coffee"
          dest: "<%= config.app %>/js"
          ext: ".js"
        ]

    jshint:
      options:
        jshintrc: ".jshintrc"

      all: [
        "Gruntfile.js"
        "<%= config.app %>/js/main.js"
        "<%= config.app %>/js/config.js"
        "<%= config.app %>/js/services/*.js"
        "<%= config.app %>/js/models/*.js"
        "<%= config.app %>/js/collections/*.js"
        "<%= config.app %>/js/views/**/*.js"
        "test/spec/**/*.js"
      ]

    requirejs:
      dist:
        options:
          optimize: 'none'
          baseUrl: "<%= config.app %>/js"
          mainConfigFile: "<%= config.app %>/js/config.js"
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

    htmlmin:
      dist:
        options:
          collapseWhitespace: true
        files: ["<%= config.dist %>/index.html": "<%= config.dist %>/index.html"]

    svgmin:
      dist:
        files: [
          expand: true
          src: ["<%= config.dist %>/fonts/*.svg"]
        ]

    uglify:
      dist:
        files: [
          expand: true
          src: "<%= config.dist %>/**/*.js"
        ]

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
          cwd: "<%= config.app %>"
          dest: "<%= config.dist %>"
          src: [
            "index.html"
            "sitemap.xml"
            "robots.txt"
            "favicon.ico"
            "components/requirejs/require.js"
            "browser/*"
            "fonts/*"
          ]
        ]

    less:
      src:
        files:
          "<%= config.app %>/css/main.css": "<%= config.app %>/less/main.less"
        options:
          sourceMap: true

      dist:
        files:
          "<%= config.dist %>/css/main.css": "<%= config.app %>/less/main.less"
        options:
          cleancss: true

    watch:
      coffeeSrc:
        files: ["<%= config.app %>/coffee/**/*.coffee"]
        tasks: ["newer:coffee:src"]

      coffeeTest:
        files: ["<%= config.test %>/spec/**/*.coffee"]
        tasks: ["newer:coffee:test"]

      less:
        files: ["<%= config.app %>/less/*.less"]
        tasks: ["less:src"]

      livereload:
        files: [
          "<%= config.app %>/js/**/*.js"
          "<%= config.app %>/templates/**/*.html"
          "<%= config.app %>/css/*.css"
        ]
        options:
          livereload:
            port: 35732
            key: grunt.file.read("app/certs/localhost.key").toString()
            cert: grunt.file.read("app/certs/localhost.crt").toString()

    karma:
      unit:
        configFile: "karma.conf.js"
        singleRun: true

    replace:
      dist:
        src: ["<%= config.dist %>/index.html"]
        overwrite: true
        replacements: [
          from: "<!-- serviceSnippet -->"
          to: serviceSnippet
        ]

    cdn:
      options:
        cdn: "https://d1zknyeapm9tzb.cloudfront.net"
      dist:
        src: "<%= config.dist %>/index.html"

    htmlrefs:
      dist:
        src: "<%= config.dist %>/index.html"

    connect:
      server:
        options:
          port: 8081
          livereload: 35732
          open: true
          base: "app"
          protocol: "https"
          key: grunt.file.read("app/certs/localhost.key").toString()
          cert: grunt.file.read("app/certs/localhost.crt").toString()
          middleware: (connect, options) ->
            middlewares = []
            options.base = [options.base]  unless Array.isArray(options.base)
            directory = options.directory or options.base[options.base.length - 1]
            options.base.forEach (base) ->

              # Serve static files.
              middlewares.push connect.static(base)
              return


            # Make directory browse-able.
            middlewares.push connect.directory(directory)

            # ***
            # Not found - just serve index.html
            # ***
            middlewares.push (req, res) ->
              file = undefined
              i = 0

              while i < options.base.length
                file = options.base + "/index.html"
                if grunt.file.exists(file)
                  require("fs").createReadStream(file).pipe res
                  return # we're done
                i++
              res.statusCode 404 # where's index.html?
              res.end()
              return

            middlewares

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
    "connect"
    "watch"
  ]

  grunt.registerTask "test", [
    "coffee"
    "karma:unit"
  ]

  grunt.registerTask "build", [
    "clean:dist"
    "coffee:dist"
    "copy"
    "requirejs"
    "uglify"
    "less:dist"
    "replace"
    "htmlrefs"
    "rev"
    "usemin"
    "cdn"
    "htmlmin"
    "svgmin"
  ]

  grunt.registerTask "default", [
    "server"
  ]
