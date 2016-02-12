const path = require('path');
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../src/app')({
  functionsPath: path.resolve(__dirname, 'fixtures/functions')
});

describe('In-App Cloud', () => {

  it('processes route functions', (done) => {
    request(app).get('/foo').expect(200).end((err, res) => {
      if (err) return done(err);
      expect(res.text).to.equal('bar');
      done();
    });
  });

});
