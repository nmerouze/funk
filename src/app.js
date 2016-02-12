const fs = require('fs');
const path = require('path');
const later = require('later');

module.exports = function app(options) {
  const express = require('express');
  const app = express();

  const files = fs.readdirSync(options.functionsPath);
  files.forEach(file => {
    const func = require(path.resolve(options.functionsPath, file));

    if (func.type === 'route') {
      app[func.method](func.path, func.handler);
    }

    if (func.type === 'task') {
      later.setInterval(func.handler, func.interval);
    }
  });

  return app;
};
