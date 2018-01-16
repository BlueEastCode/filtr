module.exports = (process && process.env && process.env.FILTR_COV)
  ? require('./lib-cov/loopback-advance-filters')
  : require('./lib/loopback-advance-filters')
