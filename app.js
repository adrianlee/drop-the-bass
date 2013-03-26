var fs = require('fs');
  _ = require('lodash');

var config = require('./config');

fs.readdir(config.dir || __dirname, function (err, files) {
  files = _.filter(files, function(filename) {
    return filename.substr((~-filename.lastIndexOf(".") >>> 0) + 2) == "mp3";
  });

  console.log(files);
});