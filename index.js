console.log('i am index.js');
var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var mongoDb;
var bodyParser = require('body-parser');
var mongourl = 'mongodb://localhost:27017/local';

var urlencodedParser = bodyParser.urlencoded({extended: false})

app.get('/', function (request, response) {
    response.sendFile('app/views/home.html', {root: __dirname});
})

app.get('/login', function (request, response) {
    response.sendFile('app/views/login.html', {root: __dirname});
})

app.post('/', urlencodedParser, function (request, response) {

    console.log('== name== is', request.body.name)
    console.log('== email== is', request.body.email)
    console.log('== password== is', request.body.password)

    var data = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    }
    mongoClient.connect(mongourl, function (err, db) {
        if (db) {
            console.log('db coonnn');
            var m = db.collection('new-user').insert(data, function (x, y) {
                if (y) console.log('inserted sucessfully'), response.send('registered sucessfully');
                else console.log('insertion failed');
            })
        }
    })
})

app.get('/test', function (request, response) {
    console.log('line number 42 =*=*=*=*=*=*=* got test')
    response.send('success');
})

app.get('/getalldata', function (request, response) {
    mongoClient.connect(mongourl, function (err, db) {
        var resultArray = [];
        if (db) {
            var m = db.collection('new-user').find({});

            m.each(function (err, doc) {
                if (doc) {
                    resultArray.push(doc);
                    console.log('line   47', doc)
                }
// else console.log('line number  48', resultArray);
            });
        }
    })
})

app.listen(3000, function () {
    console.log('app listening to port number 3000');
    createMongpDbConnection(mongourl);
})

function createMongpDbConnection(mongourl) {
    if (mongoClient != null && mongoClient != undefined) {
        mongoClient.connect(mongourl, function (error, dbinstance) {
            if (error) {
                mongoDb = error;
                console.log('mongodb couldnot connected sucessfully')
            } else {
                mongoDb = dbinstance;
                console.log('mongodb  connected');
            }
        })
    }
}

//todo for reference
// https://www.youtube.com/watch?v=SDmKnANLwmE
//https://www.youtube.com/watch?v=rin7gb9kdpk
//https://stackoverflow.com/questions/41256936/express-js-mongodb-referenceerror-db-is-not-defined-when-calling-a-function
//https://www.youtube.com/watch?v=G0BzzuXS8gI&t=745s