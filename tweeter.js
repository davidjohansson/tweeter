var https = require('https');
var OAuth= require('oauth').OAuth;
var keys = require('./twitterkeys');

var twitterer = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  keys.consumerKey,
  keys.consumerSecret,
  '1.0',
  null,
  'HMAC-SHA1'
);


function tweet(date){
	console.log("Sending " + date);
	twitterer.post("http://api.twitter.com/1/statuses/update.json",
	       keys.token, keys.secret, {status : date}, "application/json",
	       function (error, data, response2) {
		   if(error){
		       console.log('Error: Something is wrong.\n'+JSON.stringify(error)+'\n');
				/*
		       for (i in response2) {
			       out = i + ' : ';
			       try {
				   out+=response2[i];
			       } catch(err) {}
			       out += '/n';
			       console.log(out);
			   }
			*/
		   }else{
		       console.log('Twitter status updated.\n');
		       console.log(response2+'\n');
		   }
	 	}
	);
}	

function log(date) {
	console.log(date);
}

setInterval(function (){
		tweet(Math.random().toString(36).substr(2,16));
}, 2 * 60 * 1000);
