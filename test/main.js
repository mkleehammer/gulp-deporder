var deporder = require('../');
var path = require('path');
var File = require('gulp-util').File;
var assert = require('assert');
require('mocha');

describe('gulp-deporder', function() {
    describe('deporder()', function() {

        it('should be stable', function(done) {
            var stream = deporder();

            var before   = ['arkstream.js', 'blackpearl.js', 'chimneypool.js'].map(makeFile);
            var expected = ['arkstream.js', 'blackpearl.js', 'chimneypool.js'];

            var result = [];
            stream.on('data', function(f) {
                result.push(f.relative);
            });

            stream.on('end', function() {
                assert.deepEqual(result, expected);
                done();
            });

            before.forEach(stream.write);
            stream.end();
        });

        it('should reorder', function(done) {

            var stream = deporder();

            var before   = [ 'arkstream.js  --> chimneypool.js blackpearl.js',
                             'blackpearl.js --> chimneypool.js',
                             'chimneypool.js' 
                           ].map(makeFile);
            var expected = [ 'chimneypool.js', 'blackpearl.js', 'arkstream.js' ];

            var result = [];
            stream.on('data', function(f) { result.push(f.relative); });

            stream.on('end', function() {
                assert.deepEqual(result, expected);
                done();
            });

            before.forEach(stream.write);
            stream.end();
        });

        it('should report errors', function(done) {

            var stream = deporder();

            var before   = [ 'arkstream.js  --> chimneypool.js blackpearl.js',
                             'blackpearl.js --> danderspritz.js',
                             'chimneypool.js' 
                           ].map(makeFile);

            var result = [];
            stream.on('data', function(f) { result.push(f.relative); });

            stream.on('error', function(e) { 
                done();
            });

            before.forEach(stream.write);
            stream.end();
        });
    });

    function makeFile(spec) {
        var filename;
        var dir = '/mkultra';
        var contents = 'Hello, Sailor!';

        var match = /^(\S+)\s+-->\s+(.*)$/.exec(spec);
        if (match) {
            filename = match[1];
            contents = '\n // requires: ' + match[2] + '\n' + contents;
        } else {
            filename = spec;
        }

        return new File({
            cwd:  dir,
            base: dir,
            path: path.join(dir, filename),
            contents: new Buffer(contents)
        });
    }
});
