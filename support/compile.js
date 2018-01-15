var folio = require('folio')
  , path = require('path')
  , fs = require('fs');


var filtr = new folio.Glossary([
    path.join(__dirname, '..', 'lib', 'loopback-advance-filters.js')
  ], {
    prefix: fs.readFileSync(path.join(__dirname, 'browser', 'prefix.js'), 'utf8'),
    suffix: fs.readFileSync(path.join(__dirname, 'browser', 'suffix.js'), 'utf8')
  });

filtr.compile(function (err, source) {
  fs.writeFileSync(path.join(__dirname, '..', 'dist', 'filtr.js'), source);
  console.log('Build successful: ' + '\tdist/loopback-advance-filters.js');
});

var filtr_min = new folio.Glossary([
    path.join(__dirname, '..', 'lib', 'loopback-advance-filters.js')
  ], {
    minify: true,
    prefix: fs.readFileSync(path.join(__dirname, 'browser', 'prefix.js'), 'utf8'),
    suffix: fs.readFileSync(path.join(__dirname, 'browser', 'suffix.js'), 'utf8')
  });

filtr_min.compile(function (err, source) {
  var copyright = fs.readFileSync(path.join(__dirname, 'browser', 'copyright.js'));
  fs.writeFileSync(path.join(__dirname, '..', 'dist', 'loopback-advance-filters.min.js'), copyright + '\n' + source);
  console.log('Build successful: ' + '\tdist/loopback-advance-filters.min.js');
});
