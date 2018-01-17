module.exports = (process && process.env && process.env.FILTR_COV) ? require('./lib-cov/filter') : require('./lib/filter')
