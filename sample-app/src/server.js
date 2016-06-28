var express = require('express');
var server = express();
var request = require('request');
var bodyParser = require('body-parser')
var domain = require('domain').create();
var http = require('http');

server.use( bodyParser.json() );
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

function setupStoreFrontCall(method, nodePath, apiRequest) {
  server.get('/' + nodePath, function (serverRequest, response) {
    var url = "http://rest:8080/SampleApp" + apiRequest;

    var query = {};
    for (var key in serverRequest.query) {
      if (serverRequest.query.hasOwnProperty(key)) {
        query[key] = serverRequest.query[key];
      }
    }

    data = {
      method: method,
      url: url
    };

    if (method == 'POST') {
      data['form'] = query;
    } else if (method == 'GET') {
      data['qs'] = query;
    } else {
      if (query.hasOwnProperty("id")) {
        data.url += "/" + query.id;
      }
      if (query.hasOwnProperty("name")) {
        data.url += "/" + query.name;
      }
      if (query.hasOwnProperty("stock")) {
        data.url += "/" + query.stock;
      }
    }

    request(data, function (error, apiResponse, body) {
      if (apiResponse && body) {
        response.send(body);
      } else {
        response.send('[]');
      }
    });
  });
}

server.use(express.static(__dirname + '/public'));
setupStoreFrontCall('GET', 'products', '/products');
setupStoreFrontCall('PUT', 'update', '/put');
setupStoreFrontCall('DELETE', 'delete', '/del');
setupStoreFrontCall('GET', 'exceptionJava', '/exception');
setupStoreFrontCall('GET', 'exceptionSql', '/sqlexception');
setupStoreFrontCall('GET', 'slowrequest', '/slowrequest');

domain.on('error', function (err) {
});

server.post('/add', function(serverRequest, res) {
  data = JSON.stringify(serverRequest.body.params);

  options = {
    host: 'rest',
    port: '8080',
    path: '/SampleApp/products',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': '1164'
    }
  };

  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      console.log("body: " + chunk);
    });
    response.on('end', function() {
      res.send(data);
    })
  });
  httpreq.write(data);
  httpreq.end();
});

server.get('/exception', function (serverRequest, response) {
  domain.run(function () {
    throw new Error('User triggered exception!');
  });
  response.send("[]");
});

server.listen(3000, '0.0.0.0', function () {
  console.log('Node Server Started');
});
server.on('error', function (e) {
  console.log('Node Server Failed');
  console.log(e);
});
