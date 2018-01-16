var folio = require('folio')
var path = require('path')
var fs = require('fs')

var filtr = new folio.Glossary([
  path.join(__dirname, '..', 'lib', 'loopback-advance-filters.js')
], {
  prefix: fs.readFileSync(path.join(__dirname, 'browser', 'prefix.js'), 'utf8'),
  suffix: fs.readFileSync(path.join(__dirname, 'browser', 'suffix.js'), 'utf8')
})

filtr.compile((err, source) => {
  fs.writeFileSync(path.join(__dirname, '..', 'dist', 'filtr.js'), source)
  console.log('Build successful: ' + '\tdist/loopback-advance-filters.js')
})

var filtrMin = new folio.Glossary([
  path.join(__dirname, '..', 'lib', 'loopback-advance-filters.js')
], {
  minify: true,
  prefix: fs.readFileSync(path.join(__dirname, 'browser', 'prefix.js'), 'utf8'),
  suffix: fs.readFileSync(path.join(__dirname, 'browser', 'suffix.js'), 'utf8')
})

filtrMin.compile((err, source) => {
  var copyright = fs.readFileSync(path.join(__dirname, 'browser', 'copyright.js'))
  fs.writeFileSync(path.join(__dirname, '..', 'dist', 'loopback-advance-filters.min.js'), copyright + '\n' + source)
  console.log('Build successful: ' + '\tdist/loopback-advance-filters.min.js')
})
