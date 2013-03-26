var fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  express = require('express'),
  app = express();

var config = require('./config'),
  music_path = config.dir || __dirname,
  files;

fs.readdir(music_path, function (err, filenames) {
  files = _.filter(filenames, function(filename) {
    return filename.substr((~-filename.lastIndexOf(".") >>> 0) + 2) == "mp3";
  });

  console.log(files);

  app.listen(3002);
});

app.get('/', function (req, res) {
  res.send("<audio controls preload=\"auto\" autoplay autobuffer src=\"/play/" + files[0] + "\"></audio>");
});

app.get('/play/:filename', function (req, res) {
  var filePath = path.join(music_path, req.param('filename'));
  console.log(filePath);
  res.sendfile(filePath);
});