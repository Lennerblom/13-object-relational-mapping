'use strict';

require('babel-register');
const superagent = require('superagent');
const app = require('../../../src/app.js');

describe('API', () => {

  const PORT = 3013;
  beforeAll( () => {
    app.start(PORT);
  });
  afterAll( () => {
    app.stop();
  });
 
  it('should pas because true is true', () => {
    expect('true').toBe('true');
  });

  it('gets a 200 response on a good model', () => {
    return superagent.get('http://localhost:3013/api/v1/chores')
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

  it('gets a 500 response on an invalid model', () => {
    return superagent.get('http://localhost:3013/api/v1/chores')
      .then(console.log('hi 500'))
      .catch(response => {
        expect(response.status).toEqual(500);
      });
  });

});