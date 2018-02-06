const frisby = require('frisby');
const Joi = frisby.Joi;
const URL = 'http://localhost:3000/api/episodes';
const file = require('./../../src/server/data/database');
const fs = require('fs-extra');
const uuid = require('node-uuid');
const path = require('path');

const pathData = path.join(__dirname, 'server/data');

/* -------------- IMPORTANT ----------- */
// Il faut commenter la ligne 5 et décommenter la ligne 6


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
describe('Method: GET / Path: /', function () {
  it ('Find all episode - return 200 OK', function (done) {
    frisby.get(URL + '/')
      .expect('status', 200)
      .done(done);
  });
});

describe('Method: GET / Path: /:id', function(){
  it ('Find one episode - return 200 OK', function (done) {
    frisby.get(URL + '/1')
      .expect('status', 200)
      .done(done);
  });

  it ('Find false episode - return 400 File Not Found', function (done) {
    frisby.get(URL + '/false')
      .then(function(res){
        expect(res.json.status).toBe(400);
        expect(res.json.result).toBe("error");
        expect(res.json.message).toBe("Error when oppening the file");
      })
      .expect('status', 400)
      .done(done);
  });
});

describe('Method: DELETE / Path: /:id', function(){
  it ('Delete one episode - return 200', function (done) {
    frisby.del(URL + '/4')
    .expect('jsonTypes', {
      'result': Joi.string(),
      'message': {
          'data': {
            'id': Joi.string(),
            'code': Joi.string(),
            'score': Joi.string(),
            'name': Joi.string()
          },
          'result': Joi.string(),
          'status': Joi.number()
      }
    })
      .expect('status', 200)
      .done(done);
  });

  it ('Delete one false episode - return 400 File Not Found', function (done) {
    frisby.del(URL + '/false')
      .then(function(res){
        expect(res.json.message.status).toBe(400);
        expect(res.json.message.result).toBe("error");
        expect(res.json.message.message).toBe("Error when oppening the file");
        expect(res.json.result).toBe("error");
      })
      .expect('status', 400)
      .done(done);
  });
});

describe('Method: POST / Path: /', function(){
  it ('Post one episode - return 200 OK', function (done) {
    frisby.post(URL + '/', {
        'name': 'Post an episode',
        'code': 'S01E01',
        'score': '5'
      })
      .expect('jsonTypes', {
        'result': Joi.string(),
        'message': {
            'data': {
              'id': Joi.string(),
              'code': Joi.string(),
              'score': Joi.string(),
              'name': Joi.string()
            },
            'result': Joi.string(),
            'message': Joi.string(),
            'status': Joi.number()
        }
      })
      .expect('status', 200)
      .done(done);
  });
  it ('Post one episode with error in keys - return 400', function (done) {
    frisby.post(URL + '/', {
        'KEYS': 'An error',
        'code': 'S01E01',
        'score': '5'
      })
      .then(function(res){
        expect(res.json.result).toBe("error");
        expect(res.json.message.result).toBe("error");
        expect(res.json.message.message).toBe("Wrong parameters keys in the request");
      })
      .expect('status', 400)
      .done(done);
  });
});

describe('Method: PUT / Path: /', function(){
  it ('Modify one episode (Name) - return 200 OK', function (done) {
    frisby.put(URL + '/', {
        'id': 1,
        'name': 'Modify episode 1'
      })
      .expect('jsonTypes', {
        'result': Joi.string(),
        'message': {
            'data': {
              'id': Joi.string(),
              'code': Joi.string(),
              'score': Joi.string(),
              'name': Joi.string()
            },
            'result': Joi.string(),
            'message': Joi.string(),
            'status': Joi.number()
        }
      })
      .expect('status', 200)
      .done(done);
  });
  it ('Modify one episode (KEYS) - return 400', function (done) {
    frisby.put(URL + '/', {
        'id': 3,
        'score': 'ERROR'
      })
      .then(function(res){
        expect(res.json.result).toBe("error");
        expect(res.json.message.result).toBe("error");
        expect(res.json.message.message).toBe("Illegal value in the score parameters");
      })
      .expect('status', 400)
      .done(done);
  });
});

describe('Other test', function(){
  it ('Route Not Found - return 404', function (done) {
    frisby.post(URL + '/notFound')
      .then(function(res){
        expect(res.json.result).toBe("error");
        expect(res.json.message).toBe("Route not found");
      })
      .expect('status', 404)
      .done(done);
  });
});
