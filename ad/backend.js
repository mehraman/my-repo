var express = require('express');
var app = express();
var fs = require("fs");
var server = app.listen(8888);
var bodyParser = require('body-parser')


app.use('/static', express.static(__dirname + '/public'))

app.use(bodyParser.json())

app.post('/ad', function (req, res) {
   
 console.log(req.body);
   
   fs.readFile( __dirname + "/" + "ad.json", 'utf8', function (err, data) {
      
	  data = JSON.parse(data);
	  
	  if(data[req.body.pid] == null) {
	  
		  data[req.body.pid] = req.body;
		  
		  console.log( data );
		  
		  fs.writeFile( __dirname + "/" + "ad.json", JSON.stringify(data), function (err) {
		 
		  console.log(err);
		  
		  });
		  
		 
		  res.end( JSON.stringify(data));
	  }
	  else{
		  
		  
		  res.status(500).end("Campaign already exists for Partner ID "+ req.body.pid);
	  }
   });  
   
})

app.get('/ad/getAll', function (req, res) {
	
   fs.readFile( __dirname + "/" + "ad.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get('/ad/:id', function (req, res) {
   
   fs.readFile( __dirname + "/" + "ad.json", 'utf8', function (err, data) {
      adlist = JSON.parse( data );
      var ad = adlist[req.params.id] 
      console.log( ad );
	  
	  if(ad == null)
	  {
		  res.status(500).end("Campaign does not exist for Partner ID "+ req.params.id); 
		  
	  }
	  var currTime = new Date().getTime();
	  
	  var adTime = ad.createTime + (ad.time *1000);
	  
	  if(currTime < adTime){
	  
      res.end( JSON.stringify(ad));
	  }
	  else{
		  
		 res.status(500).end("Campaign already expired for Partner ID "+ ad.pid); 
	  }
   });
})




