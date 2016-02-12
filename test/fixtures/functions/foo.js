const route = require('../../../src').route;

module.exports = route({ method: 'GET', path: '/foo' }, (req, res) => {
  res.send('bar');
});
