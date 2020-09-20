const request = require('request')
const express = require('express')
const app = express()
const port = process.env.PORT || 80
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  var array = [];
  var text = fs.readFileSync('notes.txt', 'utf8', function(err,data){
      if (!err) {
        return data;
          // array = JSON.parse(data);
          // console.log("parsed data: " + array);
      } else {
          console.log(err);
      }
  });
  if(text){
    console.log(text);
    array = JSON.parse(text);
  }
  res.json(array);
})

app.post('/', (req, res) => {
  var oBody = req.body;
  var title = oBody.title;
  var body = oBody.body;

  var array = [];
  var text = fs.readFileSync('notes.txt', 'utf8', function(err,data){
      if (!err) {
        return data;
          // array = JSON.parse(data);
          // console.log("parsed data: " + array);
      } else {
          console.log(err);
      }
  });
  if(text){
    console.log(text);
    array = JSON.parse(text);
  }

  var duplicate = array.find(note => note.id == title);
  if(duplicate){
    res.send('Duplicate')
    return;
  }
  var sampleJson = {};
  sampleJson['text'] = body;
  sampleJson['id'] = title;
  array.push(sampleJson);

  fs.writeFile('notes.txt', JSON.stringify(array), function(err){
    if(err){
      console.log('Could not write to file. Error occurred: ', err);
      res.send('Failed')
    }
    console.log('Written to file');
  });
  res.send('Success')
})

app.delete('/', (req, res) => {
  var oBody = req.body;
  var title = oBody.title;
  var array = [];
  var text = fs.readFileSync('notes.txt', 'utf8', function(err,data){
      if (!err) {
        return data;
          // array = JSON.parse(data);
          // console.log("parsed data: " + array);
      } else {
          console.log(err);
      }
  });
  if(text){
    console.log(text);
    array = JSON.parse(text);
  }

  var idx = array.map(function(e) { return e.id; }).indexOf(title);
  if(idx != undefined && idx !== -1){
    array.splice(idx, 1);
    console.log(JSON.stringify(array));
    fs.writeFile('notes.txt', JSON.stringify(array), function(err){
      if(err){
        console.log('Could not write to file. Error occurred: ', err);
        res.send('Failed')
      }
      console.log('Written to file');
    });
    res.send('Success')
  }else{
    res.send('Not Found')
  }
})

app.get('/id', (req, res) => {
  var id = req.body.title;
  var array = [];
  var text = fs.readFileSync('notes.txt', 'utf8', function(err,data){
      if (!err) {
        return data;
          // array = JSON.parse(data);
          // console.log("parsed data: " + array);
      } else {
          console.log(err);
      }
  });
  if(text){
    console.log(text);
    array = JSON.parse(text);
  }

  var note = array.find(note => note.id == id);
  res.send(note.text);
})

app.listen(port, () => {
  console.log('App listening on port : ', port);
})
