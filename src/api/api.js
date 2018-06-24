'use strict';

import express from 'express';
const router = express.Router();

// Dynamic Models
// This will use a model matching /:model/ in all routes that have a model parameter
import modelFinder from '../middleware/models.js';
router.param('model', modelFinder);

// Each of our REST endpoints simply calls the model's appropriate CRUD Method (only give the students GET and POST for now)
// In all cases, we just catch(next), which feeds any errors we get into the next() as a param
// This fires off the error middleware automatically.  Otherwise, we send out a formatted JSON Response

let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

router.get('/api/v1/:model', (req,res,next) => {
  req.model.find({})
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.get('/api/v1/:model/:id', (req,res,next) => {
  req.model.findById(req.params.id)
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.post('/api/v1/:model', (req,res,next) => {
  console.log('did i get here?');
  let record = new req.model(req.body);
  console.log(record);
  record.save()
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.put('/api/v1/:model/:id', (req,res, next) => {
  let criteria = req.body;
  criteria.id = req.params.id;
  req.model.updateOne(criteria);
  criteria.save()
    .then( data => sendJSON(res,data) )
    .catch(next);
});

export default router;