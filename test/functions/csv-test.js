const path = require('path');
const expect = require('chai').expect;

const csv = require('../../src/functions/csv');

describe('CSV', () => {

  it('converts a CSV file into JSON', (done) => {
    csv({
      path: path.resolve(__dirname, '../fixtures/test.csv')
    }).toJSON().then(json => {
      expect(json).to.deep.equal([{name:'sencha',type:'green'}]);
      done();
    });
  });

});
