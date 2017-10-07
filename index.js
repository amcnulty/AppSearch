var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var mongoose = require('mongoose');
require('dotenv').config();

var app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(favicon(path.join(__dirname, 'public', 'res/icon/favicon.ico')));
app.use(express.static(path.join(__dirname + '/public')));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(req, res) {
    res.render('index.html');
});