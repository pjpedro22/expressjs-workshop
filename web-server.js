'use strict';

var express = require('express');
var app = express();

//exercise 4
var RedditAPI = require("./reddit.js");
var request = require('request-promise');
var mysql = require('promise-mysql');

  var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'reddit',
    connectionLimit: 10
  });

    //Use myReddit to insert new data.
  var myReddit = new RedditAPI(connection);


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

app.get('/posts', function(req, res) {

myReddit.getAllPosts()
  .then(dbPost => {
    var myHTMLString = `
    <div id="posts">
      <h1>List of posts</h1>
        <ul class="posts-list">`;

    dbPost.forEach(post => {
      //looking for post value.
      console.log(post, 'This is my post value');
      myHTMLString += `
      <li class="post-item">
          <h2 class="post-item__title">
            <a href=`+ post.url + `>`+ post.title + `</a>
          </h2>
          <p>Created by ` + post.username + `</p>
        </li>`;
    });


    myHTMLString += `
      </ul>
    </div>`;
  res.send(myHTMLString);

});//end of then

});//end of app.get /posts






/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(4242, function () {
  console.log('Example app listening at http://localhost:4242');
});
