var express = require('express');
var app = express();

var CreateAccount = require('CreateAccount');

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   
   res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a GET request for the /list_user page.
app.get('/GetBalance', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})