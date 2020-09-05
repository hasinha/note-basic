const fs = require('fs');
const prompt = require('prompt-sync')();

var action = prompt('Add(a)/Remove(r)/Display(d)?: ');

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

switch (action){
  case 'a':
    var id = prompt('Note id: ');
    var text = prompt('Note Text: ');
    var sampleJson = {};
    sampleJson['text'] = text;
    sampleJson['id'] = id;
    array.push(sampleJson);

    fs.writeFile('notes.txt', JSON.stringify(array), function(err){
      if(err){
        console.log('Could not write to file. Error occurred: ', err);
      }
      console.log('Written to file');
    });

    break;
  case 'r':
    if(array.length < 1){
      console.log('No notes found')
      break;
    }
    var idx, i;
    for(i=0;i<array.length;i++){
      console.log(array[i]['id'] + ' : ' + array[i]['text'])
      var toRemove = prompt('Remove(y)? : ')
      if(toRemove === 'y'){
        idx = i;
        break;
      }
    }
    if(idx != undefined){
      array.splice(idx, 1);
      console.log(JSON.stringify(array));
      fs.writeFile('notes.txt', JSON.stringify(array), function(err){
        if(err){
          console.log('Could not write to file. Error occurred: ', err);
        }
        console.log('Written to file');
      });
    }

    break;
  case 'd':
    if(array.length < 1){
      console.log('No notes found');
      break;
    }
    array.forEach((item, i) => {
      console.log(item['id'] + ' : ' + item['text']);
    });
    break;
  default:
    console.log('Invalid action');
    break;
}
