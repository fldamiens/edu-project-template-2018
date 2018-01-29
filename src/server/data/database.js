var fs = require('fs');

function createEpisode(req, res, data, cb){
  var message, status;
  var obj = {};
  var path = "data/episode_"+data['id'];
  if(fs.existsSync(path)){
    cb({data : data, result : "error", message : "Error the file already exist", status : 400});
  }else{
    fs.writeFile(path,JSON.stringify(data),function(err){
      var obj = {};
      if(err){
        obj['status'] = 400;
        obj['message'] = "Error during the file creation";
        obj['result'] = "error"
      }else {
        obj['status'] = 200;
        obj['message'] = "The file was correctly created";
        obj['result'] = "success"
      }
      cb({data : data, result : obj['result'], message : obj['message'], status : obj['status']});
    })
  }
}

function findAll(cb){
  var message, status;
  var obj = {}
  var dirname = "data/";
  fs.readdir(dirname,function(err,filenames){
    if(err){
      obj['error'] = "Error when oppening the directory";
      cb(obj);
    }
    obj["data"] = [];
    var promise = new Promise(function(resolve,reject){
      var cpt = 0;
      filenames.forEach(function(filename){
        fs.readFile(dirname+filename,'utf-8',function(err,content){
          if(err){
            obj['error'] = "Error when oppening the file";
            cb(obj);
          }
          obj["data"].push(JSON.parse(content));
          cpt++;
          if(cpt==filenames.length){
            resolve(obj);
          }
        })
      });
    });
    promise.then(function(data){
      cb(data);
    })
  })
}

module.exports.createEpisode = createEpisode;
module.exports.findAll = findAll;
