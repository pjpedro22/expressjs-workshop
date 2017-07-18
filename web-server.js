var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/hello', function (req, res) {
  console.log(req.query);
  var name = req.query.name;
  res.send('<h1>Hello ' + name + '!</h1>');
});

app.get('/calculator/:operation', function (req, res) {
  
  
  
  var num1 = parseInt(req.query.num1);
  var num2 = parseInt(req.query.num2);
  
  console.log(req.params);
  console.log(req.query);
  
  //equal to the correct params key
  var operation = req.params.operation;
  var solution;
  
  if (!req.query.num1 ) {
    num1 = 0;
  
  }
  else if(!req.query.num2){
    num2 = 0;
  }
  
  else if(!req.query.num2 && !req.query.num1 ){
    num1 = 0;
    num2 = 0;
  }

        if (operation === 'add') {
          solution = num1 + num2;
        }
        
        else if (operation === 'mult') {
          solution = num1 * num2;
        }
        
        else {
          res.status(400).send(`Bad request`);
        }
    
    

  
  var operationObject = {
      "operation": operation,
      "firstOperand": num1,
      "secondOperand": num2,
      "solution": solution
    };
    
    res.end(JSON.stringify(operationObject, null, 2));
});


/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
