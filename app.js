var fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  express = require('express'),
  app = express();

app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

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
  // var output = "";
  // _.forEach(files, function (file, r) {
  //   output += "<p>" + file + "<br/><audio controls preload=\"auto\" autobuffer src=\"/play/" + file + "\"></audio><br/></p>";
  // });
  // res.send(output);
  res.render('index.jade');
});

app.get('/play/:filename', function (req, res) {
  var filePath = path.join(music_path, req.param('filename'));
  console.log(filePath);
  res.sendfile(filePath);
});


var chunk, end, ini, range, total, _ref;

// if (blob) {
//   range = req.headers.range;
//   if (!range) {
//     res.writeHead(200, {
//       'Content-Type': blob.type
//     });
//     res.end(blob.body);
//   } else {
//     _ref = _.map(range.replace(/bytes=/, '').split('-'), function(n) {
//       return parseInt(n, 10);
//     }), ini = _ref[0], end = _ref[1];
//     total = blob.size;
//     chunk = end - ini + 1;
//     res.writeHead(206, {
//       'Content-Type': blob.type,
//       'Content-Length': chunk,
//       'Content-Range': "bytes " + ini + "-" + end + "/" + total,
//       'Accept-Ranges': 'bytes'
//     });
//     res.end(blob.body);
//   }
// } else {
//   res.writeHead(404);
//   res.end();
// }

var socket = require('./socket.js')