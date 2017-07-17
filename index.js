var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/Hello', function (req, res) {
  if(app.get('/hello?name=John')) {
    res.send('<h1>Hello John</h1>');
  }
  else {
    res.send('<h1>Hello World!</h1>');
  }
});

app.get('/calculator/:operation/:value1/:value2', function (req, res, next) {
  
  console.log(req.params.operation);
  var var1 = parseInt(req.params.value1);
  var var2 = parseInt(req.params.value2);

  switch(req.params.operation) {
    case 'add':
      var answer = var1 + var2;
      res.render('index', { title: 'The answer is ' + answer });
      break;
    
    case 'times':
      var answer = var1 * var2;
      res.render('index', { title: 'The answer is ' + answer });
      break;
    
    default:
      res.status("http-status-code-400");
  }
});




/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
