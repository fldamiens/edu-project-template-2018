const fs = require('fs');
const FindFiles = require("node-find-files");
const config = require('./../config.js');

/* ----------- SOURCE DES DONNEES ----------- */
const pathData = config.data;

function readFile(path){
  return new Promise(function(resolve,reject){
    fs.readFile(path, 'utf-8', function (err, res){
      if (err)  reject({status : 400, result : "error", message : "Error when oppening the file"});
      else resolve({status : 200, result : "success", data : JSON.parse(res)});
    });
  });
}

function createEpisode(data){
  return new Promise(function(resolve,reject){
    if(!("name" in data) || !("code" in data) || !("score" in data)){
      reject({result : "error", message : 'Wrong parameters keys in the request'});
    }else if((typeof(data["name"]) != 'string' && data["name"].length != 0) || (typeof(data["code"]) != 'string' && data["code"].length != 0)){
      reject({result : "error", message : 'Illegal value in the request'});
    }else if(isNaN(parseFloat(data["score"])) ||  (typeof(parseFloat(data["score"])) != "number")){
      reject({result : "error", message : 'Illegal value in the score parameters'});
    }else if(data["score"] < 0 || data["score"] > 10){
      reject({result : "error", message : 'Illegal score'});
    }else if(fs.existsSync(pathData + "/episode_"+data['id'])){
      reject({data : data, result : "error", message : "Error the file already exist", status : 400});
    }else{
      var fileName = data['id'];
      data['id'] += "";
      data['score'] = parseFloat(data['score']);
      fs.writeFile(pathData + "/episode_"+fileName,JSON.stringify(data),function(err){
        if(err) reject({data : data, result : "error", message : "Error during the file creation", status : 400});
        else resolve({data : data, result : "success", message : "The file was correctly created", status : 201});
      });
    }
  });
}

function findAll(){
  return new Promise(function(resolve,reject){
    fs.readdir(pathData + '/',function(err,filenames){
      let files = [];
      Promise.all(filenames.map(function(filename) {
        return readFile(pathData + '/'+filename).then(function(result){
          files.push(result);
        },function(err){
          reject(err);
        });
      })).then(function(results) {
        resolve(files);
      })
    });
  });
}

function find(id){
  return new Promise(function(resolve,reject){
    readFile(pathData + '/episode_'+id).then(function(result){
      resolve(result);
    }, function(err){
      reject(err);
    });
  });
}

function deleteFile(id){
  return new Promise(function(resolve,reject){
    readFile(pathData + "/episode_"+id).then(function(succ){
      fs.unlink(pathData + "/episode_"+id, function(err){
        if(err == null){
          succ['message'] = 'The file was correctly removed';
          resolve(succ);
        }else{
          var ret = {}
          ret['message'] = 'The file was not removed';
          ret['status'] = 400;
          ret['result'] = 'error';
          reject(ret);
        }
      });
    },function(err){
      var ret = {}
      ret['message'] = 'An error occured during the treament';
      ret['status'] = 500;
      ret['result'] = 'error';
      reject(ret);
    });
  });
}

function updateFile(episode){
  return new Promise(function(resolve,reject){
    readFile(pathData + "/episode_"+episode['id']).then(function(succ){
      updatedEpisode = {
        id : episode['id'],
        code : (typeof(episode['code']) != 'undefined' ? episode['code'] : succ.data['code'] ),
        score : (typeof(episode['score']) != 'undefined' ? episode['score'] : succ.data['score']),
        name : (typeof(episode['name']) != 'undefined'? episode['name'] : succ.data['name']),
      };
      deleteFile(episode['id']).then(function(succ){
        createEpisode(updatedEpisode).then(function(succ){
          resolve(succ);
        },function(err){
          createEpisode(succ.data);
          reject(err);
        });
      },function(err){
        reject(err);
      })
    },function(err){
      reject(err);
    });
  });
}

module.exports.createEpisode = createEpisode;
module.exports.findAll = findAll;
module.exports.find = find;
module.exports.delete = deleteFile;
module.exports.updateFile = updateFile;
