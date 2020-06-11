const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

module.exports = grunt => {
  grunt.initConfig({
    clean: ['temp', 'dist'],
    sass: {
      options: {
        implementation: sass
      },
      main: {
        files: [{
          expand: true,
          cwd: 'src/assets/styles',
          src: '**.scss',
          dest: 'temp/styles/',
          ext: '.css'
        }]
      }
    },
    babel: {
      options: {
        presets: ['@babel/preset-env']
      },
      main: {
        files: [{
          expand: true,
          cwd: 'src/assets/scripts',
          src: '**.js',
          dest: 'temp/scripts/',
          ext: '.js'
        }]
      }
    },
    image: {
      static: {
        options: {
          optipng: false,
          pngquant: true,
          zopflipng: true,
          jpegRecompress: false,
          mozjpeg: true,
          guetzli: false,
          gifsicle: true,
          svgo: true
        },
        files: [
          {
            expand: true,
            cwd: 'src/assets/images',
            src: ['**'],
            dest: 'dist/images/'
          },
          {
            expand: true,
            cwd: 'src/assets/fonts',
            src: ['**'],
            dest: 'dist/fonts/'
          }
        ]
      },
    },
    copy: {
      dist: {
        files: [
          { expand: true, src: ['public/**'], dest: 'dist/' },
        ]
      }
    },
    swigtemplates: {
      options: {
        defaultContext: data,
        templatesDir: 'src/**.html'
      },
      production: {
        dest: 'temp/*.html',
        src: ['src/**.html']
      },
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'dist/assets/styles/*.css',
            'dist/*.html',
            'dist/assets/scripts/*.js'
          ]
        },
        options: {
          port: 9000,
          files: 'dist/**',
          watchTask: true,
          server: {
            baseDir: ['temp', 'src', 'public'],
            routes: {
              '/node_modules': 'node_modules'
            }
          }
        }
      }
    },
    concat: {
      dist: {
        src: ['temp/scripts/*.js'],
        dest: 'temp/scripts/main.min.js'
      }
    },
    uglify: {
      options: {
      },
      dist: {
        files: {
          'release/scripts/main.js': 'temp/scripts/main.min.js'
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'temp/styles/min.css': 'temp/styles/*.css'
        }
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['dist/**/*.html', '*.html'],
          dest: 'release'
        }]
      }
    },
    watch: {
      js: {
        files: ['src/assets/scripts/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/assets/styles/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['src/*.html'],
        tasks: ['swigtemplates']
      },
    }
  })
  grunt.registerTask('hack_useref', function () {

  })
  // grunt.loadNpmTasks('grunt-sass')
  loadGruntTasks(grunt)
  grunt.registerTask('compile', ['sass', 'babel', 'swigtemplates', 'browserSync', 'watch'])
  grunt.registerTask('useref', ['concat', 'uglify', 'cssmin', 'htmlmin'])
}