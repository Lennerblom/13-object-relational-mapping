const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

import Chores from '../../../src/models/chores.js';
import {server} from '../../../src/app.js';

const API_URL = '/api/v1/chores';

const mockRequest = require('supertest')(server);

describe('app module', () => {

  beforeAll((done) => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://localhost/lab13db').then(() => {
        done();
      });
    });
  });

  afterEach((done) => {
    mockgoose.helper.reset().then(done);
  });


  it('should create chore', () => {

    return Chores
      .create({
        chore: 'dishes',
        assignedTo: 'Lydia',
      })
      .then(chore => {
        expect(chore.chore).toBe('dishes');
        expect(chore.assignedTo).toBe('');
      });

  });

  it('should get zilch directly', () => {

    return Chores.find().then(chores => {
      expect(chores).toEqual([]);
    });
  });

  it('should get zilch via api', () => {

    return mockRequest
      .get(API_URL)
      .then(data => JSON.parse(data.text))
      .then(chores => {
        expect(chores).toEqual([]);
      });

  });

  it('should post new chore via API', () => {

    return mockRequest
      .post(API_URL)
      .send({
        chore: 'Laundry',
        assignedTo: 'Abigail',
      })
      .then(data => JSON.parse(data.text))
      .then(chore => {

        expect(chore.assignedTo).toBe('Abigail');
        
        return mockRequest
          .get(API_URL)
          .then(data => JSON.parse(data.text))
          .then(chores => {
            expect(chores.length).toBe(1);
            expect(chores[0].assignedTo).toBe('Abigail');
          });
      });
  });

  it('should get 404', () => {
    let fail;
    return mockRequest.get('/foo/bar').then(response => {
      let err = JSON.stringify(response.text);
      expect(err).toBeDefined();
    }).catch(err => {
      fail(err);
    });
  });
});