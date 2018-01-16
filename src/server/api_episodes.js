const express = require('express');
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
  res.send('liste episodes');
});

// define the post api episodes
router.post('/', function(req, res) {
  if(Object.keys(req.body).length != 3){
    res.status(400).json({result : "error", message : 'Wrong parameters in the request'})
  }else if(!("name" in req.body) || !("code" in req.body) || !("score" in req.body)){
    res.status(400).json({result : "error", message : 'Wrong parameters keys in the request'})
<<<<<<< HEAD
  }else if((typeof(req.body["name"]) != 'string' && req.body["name"].length != 0) || (typeof(req.body["code"]) != 'string' && req.body["code"].length != 0) || ((parseFloat(req.body["score"])) != NaN || typeof(parseFloat(req.body["score"])) != "number") ){
=======
  }else if((typeof(req.body["name"]) != 'string' && req.body["name"].length != 0) || (typeof(req.body["code"]) != 'string' && req.body["code"].length != 0) || typeof(parseFloat(req.body["score"])) != "number" ){
>>>>>>> b8d69a5db7723f3f1597ffa81d8b9794a21209f6
    res.status(400).json({result : "error", message : 'Illegal value in the request'})
  }else{
    var episode = req.body;
    episode['id'] = //creer ID alea
    //enregistrer dans le fichier
<<<<<<< HEAD
    res.status(200).json({result : "success", message : "The episode has been created"});
=======
    res.send({result : "success", message : "The episode has been created"});
>>>>>>> b8d69a5db7723f3f1597ffa81d8b9794a21209f6
  }
});

module.exports = router;
