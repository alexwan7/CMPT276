const express = require('express')
var app = express();
var http = require('http');
var fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3002;
const {Pool} = require('pg');
var pool = new Pool({
	user: 'postgres',
	password:'root',
	host:'localhost',
	database:'postgres',
});

app.use('/', express.static('./public'));
app.get('/', function (req, res, next) {
        var web = fs.readFileSync('./public/students.html');
        res.write(web);
        res.end();
});

http.createServer(app).listen(PORT);