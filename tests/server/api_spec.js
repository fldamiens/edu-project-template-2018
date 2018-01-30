const frisby = require('frisby');
const Joi = frisby.Joi;
const URL = 'http://localhost:'+process.env.SERVER_PORT+'/episodes';

describe('Posts', function () {
  it('should return all posts and first post should have comments', function (done) {
    frisby.get('http://www.google.fr')
    .expect('status', 418)
    .done(done);
  });
});
