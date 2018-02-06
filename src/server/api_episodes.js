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
  file.findAll().then(function(succ){
    res.status(200).json({result : "success", message : succ});
  },function(err){
    res.status(400).json({result : "error", message : err});
  })
});

//get an episode
router.get('/:id', function(req, res) {
  file.find(req.params.id).then(function(succ){
    res.status(succ['status']).json(succ);
  },function(err){
    res.status(err['status']).json(err);
  })
});

//delete an episode
router.delete('/:id', function(req, res) {
    file.delete(req.params.id).then(function(succ){
      res.status(200).json({result : "success", message : succ});
    },function(err){
      res.status(400).json({result : "error", message : err});
    })
});

// define the post api episodes
router.post('/', function(req, res) {
  var episode = req.body;
  episode['id'] = uuid.v4();

  file.createEpisode(episode).then(function(succ){
    res.status(200).json({result : "success", message : succ});
  },function(err){
    res.status(400).json({result : "error", message : err});
    });
});

// define the post api episodes
router.put('/', function(req, res) {
  file.updateFile(req.body).then(function(succ){
    res.status(200).json({result : "success", message : succ});
  },function(err){
    res.status(400).json({result : "error", message : err});
  })
});

router.use(function(req, res, next) {
    if (!req.route)
        res.status(404).json({result : "error", message : "Route not found"});
    next();
});

module.exports = router;
