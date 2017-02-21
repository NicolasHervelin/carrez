/*var somme = 0;

for(var i = 2; i < process.argv.length; i++){
  somme += Number(process.argv[i]);
}

console.log(somme);
*/

/*
var fs = require('fs');
var path = process.argv[2];
var buf = fs.readFileSync(path);
var str = buf.toString();
var tab = str.split('\n');
var count = 0;

for(var i = 0; i < tab.length - 1; i++){
  count ++;
}

console.log(count);*/

var fs = require('fs'); // require is a special function provided by node
var path = process.argv[2];

fs.readFile(path, function (err, contents) {
if(err){
  return console.log(err);
}
  var myNumber = contents.toString().split('\n').length - 1;
  console.log(myNumber);
})
