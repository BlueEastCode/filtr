# Loopback Advance Filters [![Build Status](https://secure.travis-ci.org/logicalparadox/filtr.png)](http://travis-ci.org/logicalparadox/filtr)

Filter javascript arrays using a MongoDB style syntax and is available for node.js
and the browser. It was originally written as an internal component for [Seed](https://github.com/qualiancy/seed),
but it had no other dependancies and seemed fit for use in the browser.

## Installation

### Node.js

Filtr is available on npm.

    npm install loopback-advance-filters

## Features

loopback-advance-filters is still in early development so expect this list to grow.

##### Expansive Query Language

* Comparators: `gt`, `gte`, `lt`, `lte`, `all`, `exists`, `mod`, `eq`, `ne`, `in`, `nin`, `size`
* Traversables: `or`, `nor`, `and`

##### Data Helpers

* `filtr.getPathValue` returns the nested value in an object given a string path
* `filtr.setPathValue` sets the nested value in an object given a string path
* `filtr.comparators` are available directly for quick value testing

### Usage

```js
var query = filtr({ gt: 15, lt: 25 })
  , results = query.test([ 5, 10, 17, 19, 25 ]);
// results == [ 17, 19 ];
```

#### Test options provide different output 

Testing also supports a number of options passed in as the second argument.

* **spec**: output modifer
  * _subset_: (default) return an array containing a subset of matched items
  * _boolean_: return an array of the original length with each item being a boolean when object passed or failed.
  * _index_: return an array of numbers matching the index of passed object in the original array
* **type**: input modifier
  * _set_: (default) assert that the data provided is an array. test each item.
  * _single_: assert that the data provided is a single item. return boolean.

Using the `spec` output modifier is an easy way to handle post processing of result sets
without having to match up a subset.

```js
var query = filtr({ gt: 15, lt: 25 })
  , results = query.test([ 5, 10, 17, 19, 25 ], { spec: 'boolean' });
// results == [ false, false, true, true, false ];
```

#### Using paths for deep matching

Filtr also supports using paths for deep matching within a javascript object. Given the 
following items, and sample queries.

```js
var dataComplex = [
    { a: { b: 100 }
    , c: 'testC'
    , d: 
      [ { e: 'world' } ] 
    }
  , { a: { b: 50 }
    , c: 'testC'
    , d: 
      [ { e: 'universe' }
      , { e: 'galaxy' } ]
    }
];

var query1 = filtr({ 'a.b': { gt: 75, lt: 125 } });
  , query2 = filtr({ 'a.b': { gt: 25, lt: 75 }, 'd[0].e': { $eq: 'universe' } });

var res1 = query1.test(dataComplex)  // result would have the first item
  , res2 = query1.test(dataComplex); // result would have the second item 
```

A helper is also available that returns the value in a nested object given a string path.

```js
var hello = filtr.getPathValue('d[0].e', dataComplex[1]);
// hello == 'universe'
```

## Where to Get Help

Please post issues to [GitHub Issues](https://github.com/BlueEastCode/loopback-advance-filters/issues).

## Tests

Tests are written in the BDD styles for the [Mocha]() test runner using the
`should` assertion interface from [Chai](http://chaijs.com). Running tests is simple:

    make test

A browser suite is also available at `test/browser/index.js`. The same test definitions are 
used in both contexts.

### Contributing

Interested in contributing? Fork to get started. Contact [@BlueEastCode](http://github.com/BlueEastCode) 
if you are interested in being regular contributor.

### Forked From 

* Jake Luer ([Github: @logicalparadox](http://github.com/logicalparadox)) ([Twitter: @jakeluer](http://twitter.com/jakeluer)) ([Website](http://alogicalparadox.com))

## License

(The MIT License)
