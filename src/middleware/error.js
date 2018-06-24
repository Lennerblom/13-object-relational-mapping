'use strict';

export default  (err,req,res,next) => {
  let error = { error:err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  console.log('why???');
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};
