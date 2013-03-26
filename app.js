var fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  express = require('express'),
  app = express();

var config = require('./config'),
  music_path = process.argv[2] || config.dir || path.join(process.env.HOME, '/Music') || __dirname,
  files;

// Get mp3 files form directory
fs.readdir(music_path, function (err, filenames) {
  files = _.filter(filenames, function(filename) {
    return filename.substr((~-filename.lastIndexOf(".") >>> 0) + 2) == "mp3";
  });

  console.log(files);

  // Start Server
  app.listen(3002);
});

app.get('/', function (req, res) {
  var output = "";
  _.forEach(files, function (file, r) {
    output += "<p>" + file + "<br/><audio controls preload=\"auto\" autobuffer src=\"/play/" + file + "\"></audio><br/></p>";
  });
  res.send(output);
});

app.get('/play/:filename', function (req, res) {
  var filePath = path.join(music_path, req.param('filename'));
  console.log(filePath);
  res.sendfile(filePath);
});