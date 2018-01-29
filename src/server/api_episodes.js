const express = require('express');
const uuid = require('node-uuid');
const file = require('./data/database');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the post api episodes
router.get('/', function(req, res) {
  file.findAll(function(obj){
    if(typeof(obj['error']) != "undefined" ){
      res.status(400).json({result : "error", message : obj['error']});
    }else{
      res.status(200).json({result : "success", message : obj['data']});
    }
  });
});

//get an episode
router.get('/:id', function(req, res) {
    file.find(req, res, req.params.id,function(obj){
      res.status(obj['status']).json(obj);
    });
});

//delete an episode
router.delete('/:id', function(req, res) {
    file.delete(req, res, req.params.id,function(obj){
      res.status(obj['status']).json(obj);
    });
});

// define the post api episodes
router.post('/', function(req, res) {
  if(Object.keys(req.body).length != 3){
    res.status(400).json({result : "error", message : 'Wrong parameters in the request'});
  }else if(!("name" in req.body) || !("code" in req.body) || !("score" in req.body)){
    res.status(400).json({result : "error", message : 'Wrong parameters keys in the request'});
  }else if((typeof(req.body["name"]) != 'string' && req.body["name"].length != 0) || (typeof(req.body["code"]) != 'string' && req.body["code"].length != 0) || isNaN(parseFloat(req.body["score"])) ||  (typeof(parseFloat(req.body["score"])) != "number")){
    res.status(400).json({result : "error", message : 'Illegal value in the request'});
  }else{
    var episode = req.body;
    episode['id'] = uuid.v4();
    episode['score'] = parseFloat(req.body["score"]);

    file.createEpisode(req, res, episode, function(obj){
      res.status(obj['status']).json(obj);
    });
  }
});

module.exports = router;
