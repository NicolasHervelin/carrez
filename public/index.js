var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var leboncoin = require('leboncoin');
var meilleursagents = require('meilleurs-agents');
var app = express();
/*
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.render('index.html', { url_input : req.body.url_input });

  res.send('Check the console');
  //res.sendFile(__dirname + "index.html");
})

urlLeBoncoin = 'https://www.leboncoin.fr/ventes_immobilieres/1089637884.htm?ca=12_s';
console.log(urlLeBoncoin);
/*leboncoin.scrapLeboncoinJSON(urlLeBoncoin);
var city = leboncoin.getCityLBC();
getPricePerM();
getType();

urlMeilleursAgents = 'https://www.meilleursagents.com/prix-immobilier/' + getCity() +'/';
console.log(urlMeilleursAgents);
/*meilleursagents.scrapMeilleursAgentsJSON(urlMeilleursAgents);
getLowPriceApp();
getMediumPriceApp();
getHighPriceApp();*/

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("listening at http://%s:%s", host, port);
})

app.get('/', function(req,res){
 res.sendFile(__dirname + '\\index.html');
});

//function dealing with leboncoin module
function readJSON(filename){
  var json;
  fs.readFile(filename, function (err, contents){
    if(err){
      return console.log(err);
    }
    var data = contents.toString();
    var json = JSON.parse(data);
  })
  return json;
}

function getCity(){
  var city;
  fs.readFile('outputLeboncoin.json', function (err, contents){
    if(err){
      return console.log(err);
    }
    var data = contents.toString();
    var json = JSON.parse(data);
    city = json['city'];
    console.log(city);
  })
  return city;
}

function getPricePerM(){
  var price;
  var surface;
  var pricePerM;
  fs.readFile('outputLeboncoin.json', function (err, contents){
    if(err){
      return console.log(err);
    }
    var data = contents.toString();
    var json = JSON.parse(data);
    price = json['price'];
    surface = json['surface'];
    pricePerM = price / surface;
    console.log(pricePerM);
  })
  return pricePerM;
}

function getType(){
  var type = '';
  fs.readFile('outputLeboncoin.json', function (err, contents){
    if(err){
      return console.log(err);
    }
    var data = contents.toString();
    var json = JSON.parse(data);
    type = json['type'];
    console.log(type);
  })
  return type;
}

//function dealing with meilleurs-agents module
function getLowPriceApp(){
  var price;
  fs.readFile('outputMeilleursAgents.json', function (err, contents){
    if(err){
      return console.log(err);
    }
    var data = contents.toString();
    var json = JSON.parse(data);
    price = json['lowPriceApp'];
    console.log(price);
  })
  return price;
}

function getMediumPriceApp(){
  var price;
  fs.readFile('outputMeilleursAgents.json', function (err, contents){
    if(err){
      return console.log(err);
    }
    var data = contents.toString();
    var json = JSON.parse(data);
    price = json['mediumPriceApp'];
    console.log(price);
  })
  return price;
}

function getHighPriceApp(){
  var price;
  fs.readFile('outputMeilleursAgents.json', function (err, contents){
    if(err){
      return console.log(err);
    }
    var data = contents.toString();
    var json = JSON.parse(data);
    price = json['highPriceApp'];
    console.log(price);
  })
  return price;
}

function getLowPriceHouse(){
  var price;
  fs.readFile('outputMeilleursAgents.json', function (err, contents){
    if(err){
      return console.log(err);
    }
    var data = contents.toString();
    var json = JSON.parse(data);
    price = json['lowPriceHouse'];
    console.log(price);
  })
  return price;
}

function getMediumPriceHouse(){
  var price;
  fs.readFile('outputMeilleursAgents.json', function (err, contents){
    if(err){
      return console.log(err);
    }
    var data = contents.toString();
    var json = JSON.parse(data);
    price = json['mediumPriceHouse'];
    console.log(price);
  })
  return price;
}

function getHighPriceHouse(){
  var price;
  fs.readFile('outputMeilleursAgents.json', function (err, contents){
    if(err){
      return console.log(err);
    }
    var data = contents.toString();
    var json = JSON.parse(data);
    price = json['highPriceHouse'];
    console.log(price);
  })
  return price;
}



function isGoodDeal(){
  var isgooddeal = 'YES, IT IS A GOOD DEAL !'
  var isNotgooddeal = 'NO ! IT IS UPPER THAN THE MEAN PRICE/M² IN ' + getCity();
  var type = getType();
  var pricePerM = getPricePerM();
  var lowPriceApp = getLowPriceApp();
  var mediumPriceApp = getMediumPriceApp();
  var highPriceApp = getHighPriceApp();
  var lowPriceHouse = getLowPriceHouse();
  var mediumPriceHouse = getMediumPriceHouse();
  var highPriceHouse = getHighPriceHouse();

  if(type == 'appartement'){
    if(lowPriceApp < pricePerM < highPriceApp){
      if(pricePerM > mediumPriceApp){
        isgooddeal = isNotgooddeal;
        return isgooddeal;
      }
    }
    else{
      isgooddeal = 'BE CAREFUL THIS BID IS PROBABLY FAKE !!!';
      return isgooddeal;
    }
  }
  else{
    if(lowPriceHouse < pricePerM < highPriceHouse){
      if(pricePerM > mediumPriceHouse){
        isgooddeal = isNotgooddeal;
        return isgooddeal;
      }
    }
    else{
      isgooddeal = 'BE CAREFUL THIS BID IS PROBABLY FAKE !!!';
      return isgooddeal;
    }
  }
}
