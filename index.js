var express = require('express');

const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
    input: fs.createReadStream('mazeData.txt'),
    output: process.stdout,
    console: false
});

const readInterface_1 = readline.createInterface({
    input: fs.createReadStream('mazeData_1.txt'),
    output: process.stdout,
    console: false
});

let linesLevel0 = [];
let linesLevel1 = [];
let mazeLines = [];
let lineCounter0 = 0;

readInterface.on('line', function(line) {
    console.log(line);
    linesLevel0[lineCounter0] = line;
    lineCounter0++;
});

mazeLines = linesLevel0;

let lineCounter1 = 0;

readInterface_1.on('line', function(line) {
    console.log(line);
    linesLevel1[lineCounter1] = line;
    lineCounter1++;
});

var app = express();

app.get('', function(req, res){

    res.sendFile('/index.html', { root: '.' });
});

app.use(express.static('public'));
app.use(express.static('files'));
app.use('/static', express.static('public'));

// app.get('/winner', function(req, res){

//     res.sendFile('/static/winnerScreen.html', { root: '.' });
// });

app.get('/prepareLevel0', (req, res) => {
    mazeLines = linesLevel0;
    console.log(prepareLevel0);
    var jsonArr = [];
    res.json(jsonArr);
});
app.get('/prepareLevel1', (req, res) => {
    mazeLines = linesLevel1;
    var jsonArr = [];
    res.json(jsonArr);
});

var serverScore = 0;

app.post('/mazedata', (req, res) => {
    console.log(req.body);

    // var  n1 = parseInt(req.body.f1);
    // var n2 = parseInt(req.body.f2);
    // var operation = req.body.f3;
    // var r = null;

    // switch(operation)
    // {
    //     case "+":
    //         r = n1 + n2;
    //         break;
    //     case "-":
    //         r = n1 - n2;
    //         break;
    //     case "/":
    //         r = n1 / n2;
    //         break;
    //     case "*":
    //         r = n1 * n2;
    //         break;
    // }

    //res.json({ mazeData: 123 });
    var jsonArr = [];
    for (var i = 0; i < mazeLines.length; i++) {
        jsonArr.push({
            id: i,
            optionValue: mazeLines[i]
        });
    }
    res.json(jsonArr);
   });


app.post('/addScore', (req, res) => {
    console.log(req.body);
    serverScore++;
    var jsonArr = [];
    jsonArr.push({id: serverScore, serverScore: serverScore});
    res.json(jsonArr);
});

app.get('/getScore', (req, res) => {
    console.log(req.body);
    var jsonArr = [];
    jsonArr.push({id: serverScore, serverScore: serverScore});
    res.json(jsonArr);
});


app.listen(3000);