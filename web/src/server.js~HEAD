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
// server.use(express.json());       // to support JSON-encoded bodies
// server.use(express.urlencoded());

function setupStoreFrontCall(method, nodePath, apiRequest) {
  server.get('/' + nodePath, function (serverRequest, response) {
    var url = "http://rest:8080/SampleApp" + apiRequest;
    // var url = 'http://localhost:' + javaPort + '/rest/appdserver' + apiRequest;
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

    var fakeData = "";
    if (method == 'POST') {
      data['form'] = query;
      // fakeData= '[{"id":4,"name":"'+ data['form'].name + '","stock":'+ data['form'].stock +'},';
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
        response.send( fakeData + '{"id":1,"name":"iPad","stock":1},{"id":2,"name":"iPad","stock":100},{"id":3,"name":"cookies","stock":200}]');
      }
    });
  });
}

server.use(express.static(__dirname + '/public'));
setupStoreFrontCall('GET', 'products', '/products');
setupStoreFrontCall('GET', 'retrieve', '');
setupStoreFrontCall('PUT', 'update', '/put');
setupStoreFrontCall('DELETE', 'delete', '/del');
setupStoreFrontCall('GET', 'exceptionJava', '/exception');
setupStoreFrontCall('GET', 'exceptionSql', '/sqlexception');
setupStoreFrontCall('GET', 'slowrequest', '/slowrequest');

domain.on('error', function (err) {
});

server.post('/add', function(serverRequest, res) {


  data = JSON.stringify(serverRequest.body.params);


  console.log(data);

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
