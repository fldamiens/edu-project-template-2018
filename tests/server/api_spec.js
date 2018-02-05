const frisby = require('frisby');
const Joi = frisby.Joi;
const URL = 'http://localhost:3000/api/episodes';
const file = require('./../../src/server/data/database');
const fs = require('fs-extra');
const uuid = require('node-uuid');
const path = require('path');

const pathData = path.join(__dirname, 'server/data');

/*
beforeAll(function () {
  for(i=0; i<3; i++){
    var tmp = {}
    tmp['id'] = i;
    tmp['code'] = "S01E0" + i;
    tmp['score'] = i;
    tmp['name'] = 'Test' + i;
    file.createEpisode(tmp, "tests/server/data")
  }
});

afterAll(function () {
  file.findAll("tests/server/data").then(function(data){
    data.forEach(function(elt){
      file.delete(elt.data.id, "tests/server/data")
    })
  })
});

*/
describe('GET', function () {
  it ('Find all episode - return 200 OK', function (done) {
    frisby.get(URL + '/')
      .expect('status', 200)
      .done(done);
  });

  it ('Find one episode - return 200 OK', function (done) {
    frisby.get(URL + '/1')
      .expect('status', 200)
      .done(done);
  });
});
