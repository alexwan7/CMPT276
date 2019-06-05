const express = require('express')
var app = express();
var http = require('http');
var fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3002;
const {Pool} = require('pg');
var pool = new Pool({
	user: 'vixuaezwojkhju',
	password:'04dffbeeacb64cb1f66573f8a3df82a7ac3a239e3660053960fd587303b5cac1',
	host:'ec2-23-21-186-85.compute-1.amazonaws.com',
	database:'de5jas1v51563d',
	port:'5432'
});

app.use('/', express.static('./public'));
app.get('/', function (req, res, next) {
        var web = fs.readFileSync('./public/students.html');
        res.write(web);
        res.end();
});

http.createServer(app).listen(PORT);