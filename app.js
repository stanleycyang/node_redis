var redis = require('redis');
var port = 6379;
var host = '127.0.0.1';
var client = redis.createClient(port, host); // Creates a client

client.on('connect', function(){
  console.log('connected');
});

// Commands to store

// key: framework, value: ReactJS
client.set('framework', 'ReactJS');
client.get('framework', function(error, object){
  console.log(object);
});

client.set('jack', 'daniels', function(error, reply){
  console.log(reply);
});

client.get('jack', function(error, object){
  console.log(object);
});

// Storing hash
client.hmset('frameworks', 'javascript', 'tdd', 'bdd', 'css', 'bootstrap', 'nodejs');

// Get the framework hash, which will return javascript:tdd, bdd:css, bootstrap:nodejs
client.hgetall('frameworks', function(error, object){
  if(error){
    response.send(error);
  }
  console.log(object);
});

client.hmset('meals', {
  'curry': 'meat and potatoes',
  'soup': 'clamchowder',
  'grapes': 'red'
});

client.hgetall('meals', function(error, hash){
  if(error){
    response.send(error);
  }
  console.log(hash);
});

client.rpush(['bears', 'brown', 'black', 'polar'], function(error, response){
  console.log(response);
});
