
## Usage

```javascript
var deporder = require('gulp-deporder');
var concat   = require('gulp-concat');

gulp.task('scripts', function() {
  gulp.src('./lib/*.js')
    .pipe(deporder())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
});
```

This will reorder Javascript files in the stream based on comments at the top of files in the
form ``// requires: file1 file2``. This is useful for automatically ordering files before
concatenating them without a full-blown dependency system like requirejs.

The plugin attempts to reorder as little as possible so you can manually order large sets of
files and only use the comments to fine tune:

```javascript
gulp.task('scripts', function() {
    return gulp.src(['./models/*.js',
                     './collections/*.js',
                     './views/*.js'])
        .pipe(deporder())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'))
});
```

## LICENSE

(MIT License)

Copyright (c) 2014 Michael Kleehammer <michael@kleehammer.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
