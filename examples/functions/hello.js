const route = require('../../src').route;

module.exports = route({ method: 'GET', path: '/hello' }, (req, res) => {
  res.send('hello');
});
