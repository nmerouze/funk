const Promise = require('bluebird');

function parseCSV(doc) {
  const csv = require('csv');

  return new Promise((resolve, reject) => {
    csv.parse(doc, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
}

module.exports = (options) => (
  {
    toJSON() {
      const fs = require('fs');
      Promise.promisifyAll(fs);

      return fs.readFileAsync(options.path, 'utf8').then(parseCSV).then(doc => {
        const data = doc.slice(1).map((item) => {
          const o = {};
          doc[0].forEach((key, i) => { o[key] = item[i] });
          return o;
        });

        return data;
      });
    }
  }
);
