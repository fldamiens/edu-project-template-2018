var fs = require('fs');
var FindFiles = require("node-find-files");

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
      reject({result : "error", message : 'Illegal value in the score parameters'});
    }else if(fs.existsSync("data/episode_"+data['id'])){
      reject({data : data, result : "error", message : "Error the file already exist", status : 400});
    }else{
      fs.writeFile("data/episode_"+data['id'],JSON.stringify(data),function(err){
        if(err) reject({data : data, result : "error", message : "Error during the file creation", status : 400});
        else resolve({data : data, result : "success", message : "The file was correctly created", status : 200});
      });
    }
  });
}

function findAll(){
  return new Promise(function(resolve,reject){
    fs.readdir('data/',function(err,filenames){
      let files = [];
      Promise.all(filenames.map(function(filename) {
        return readFile('data/'+filename).then(function(result){
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
    readFile('data/episode_'+id);
  });
}

function deleteFile(id){
  return new Promise(function(resolve,reject){
    readFile("data/episode_"+id).then(function(succ){
      fs.unlink("data/episode_"+id);
      resolve(succ);
    },function(err){
      reject(err);
    });
  });
}

function updateFile(episode){
  return new Promise(function(resolve,reject){
    readFile("data/episode_"+episode['id']).then(function(succ){
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
