module.exports = function(grunt) {

    // Time how long tasks take.
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurations
    var config = {
        app: 'app',
        dist: 'dist',
        srcjs: ['js/*.*', '../bower_components/foundation/js/vendor/modernizr.js', '../bower_components/jquery/dist/jquery.js',
            '../bower_components/foundation/js/foundation/foundation.js', '../bower_components/foundation/js/foundation/foundation.topbar.js',
            '../bower_components/lightbox2/dist/js/lightbox.js'
        ],
        srcscss: ['scss/*.*'],
        srccss: ['css/*.*', '../bower_components/foundation/css/foundation.css', '../bower_components/lightbox2/dist/css/lightbox.css'],
        srcimg: ['img/*.*' , '../bower_components/lightbox2/dist/images/*.*' ],
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        config: config,
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['.tmp', '<%= config.dist %>/*', '!<%= config.dist %>/.git*']
                }]
            }
        },

        processhtml: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: ['*.html'],
                    dest: '<%= config.dist %>',
                    ext: '.html'
                }],
            },
        },

        copy: {
            distimg: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: '<%= config.srcimg %>',
                    dest: '<%= config.dist %>',

                }]
            },
            lightboximg: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/lightbox2/dist/',
                    src: 'images/*.*',
                    dest: '<%= config.dist %>',

                }]
            },
            cname: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: 'CNAME',
                    dest: '<%= config.dist %>',

                }]
            },
        },

        uglify: {
            options: {
                //                banner: '/*Packaged on : <%=grunt.template.today("yyyy-mm-dd")%>*/\n'
            },
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    extDot: 'last',
                    /* Without this jquery.xyz.js and jquery.js at source will only produce one jquery.min.js at the destination folder
                    Drove me nuts wondering why uglify seem to miss files. Turns out, i didnt read the doc close enough.
                    But, why some one thought that setting extDot default to 'first' is the best thing to do is still a mystery. Extensions usually start after the last dot !  */
                    cwd: '<%= config.app %>',
                    src: '<%= config.srcjs %>',
                    dest: '<%= config.dist %>/js',
                    ext: '.min.js'
                }]
            },
        },
        cssmin: {
            options: {
            processImport: false,
            },
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= config.app %>',
                    src: '<%= config.srccss %>',
                    dest: '<%= config.dist %>/css',
                    ext: '.min.css'
                }]
            }
        },

        sass: {
            options: {
                sourceMap: true,
                style: 'expanded'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/scss',
                    src: ['*.scss'],
                    dest: '<%= config.app %>/css',
                    ext: '.css'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '**/*.html',
                    dest: '<%= config.dist %>',
                }]
            },

        },
        watch: {
            scss: {
                files: '<%= config.app %>/scss/*',
                tasks: ['sass']
            }
        },


    });

    //grunt.registerTask('default', ['clean:dist', 'copy:srcimg', 'copy:distimg', 'processhtml', 'cssmin', 'uglify', 'htmlmin']);

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['usage']);
    grunt.registerTask('dev', ['sass', 'watch:scss']);
    grunt.registerTask('build', ['clean:dist','sass', 'copy:distimg','copy:lightboximg','copy:cname', 'processhtml', 'cssmin', 'uglify', 'htmlmin']);
    grunt.registerTask('build-nomin', ['clean:dist','sass', 'copy:distimg', 'processhtml']);

    grunt.registerTask('usage', 'display usage parameters', function() {
        console.log("usage :");
        console.log("\t grunt clean:dist - cleans /dist folder");
        console.log("\t grunt dev - development mode");
        console.log("\t grunt build - build and update minimized version to /dist folder");
    });

    // add sass to the grunt file

};
