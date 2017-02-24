let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let leboncoin = require('leboncoin')
let meilleursagents = require('meilleurs-agents')
var request = require('request');

//Template motor
app.set('view engine', 'ejs')

//Middleware
app.use(express.static('style'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Routes
app.get('/', (request, response) => {
  response.render('pages/index')
})

app.post('/', (request, response) => {

  if(request.body.urlInput === undefined || request.body.urlInput === ''){
    response.render('pages/index')
  }
  else{
    var urlLeBoncoin = request.body.urlInput
    var urlMeilleursAgents = '';
    var dataLBC = '';
    var dataMA = '';
    var isGoodDeal = '';
    console.log(urlLeBoncoin);
    leboncoin.scrapLeboncoinJSON(urlLeBoncoin,function(dataLBC){
      dataLBC=JSON.parse(dataLBC);
      console.log(dataLBC);
      urlMeilleursAgents = 'https://www.meilleursagents.com/prix-immobilier/' + dataLBC.city + '/';
      meilleursagents.scrapMeilleursAgentsJSON(urlMeilleursAgents, function(dataMA){
        dataMA=JSON.parse(dataMA);
        console.log(dataMA);
        isGoodDeal= meilleursagents.isGoodDeal(dataLBC, dataMA)
      });
    })
     
    response.render('pages/index', {goodDeal : isGoodDeal})
  }




})

app.listen(3000)
