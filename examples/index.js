const path = require('path');
const inappcloud = require('../src');

inappcloud.start({
  port: 3000,
  functionsPath: path.resolve(__dirname, 'functions')
});
