var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var bodyParser = require('body-parser');

app.use(bodyParser());

require('./app/routes.js')(app);

app.listen(port);
console.log('Application server is up and running on port: ' + port);