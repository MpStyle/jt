module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            default: {
                files: [
                    {src: ['src/typescript/jt.ts'], dest: 'dist/jt.js'},
                    {src: ['src/typescript/jt.ts'], dest: 'test/html/jt.js'}
                ],
                options: {
                    allowSyntheticDefaultImports: true,
                    module: "system",
                    sourceMap: true,
                    additionalFlags: '--target ES5'
                }
            }
        },
        uglify: {
            default: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*.js', '!*.min.js'],
                        dest: 'dist',
                        ext: '.min.js',
                        sourceMap: true
                    }
                ]
            },
            options: {
                mangle: true,
                compress: {
                    unused: true,
                    collapse_vars: true,
                    drop_console: true,
                    drop_debugger: true,
                    dead_code: true,
                    sequences: true,
                    properties: true,
                    conditionals: true,
                    comparisons: true,
                    booleans: true,
                    loops: true,
                    if_return: true,
                    join_vars: true,
                    cascade: true,
                    reduce_vars: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.ts'],
                tasks: ['ts', 'uglify'],
                options: {
                    spawn: false,
                    debounceDelay: 5
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'ts',
        'uglify'
    ]);
};