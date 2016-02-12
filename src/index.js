const later = require('later');

function start(options) {
  require('./app')(options).listen(options.port, () => {
    console.log('In-App Cloud is ready.');
  });
}

function route(options, handler) {
  return {
    type: 'route',
    method: options.method.toLowerCase(),
    path: options.path,
    handler
  }
}

function task(interval, handler) {
  return {
    type: 'task',
    interval: later.parse.text(interval),
    handler
  }
}

module.exports = {
  start,
  task,
  route
}
