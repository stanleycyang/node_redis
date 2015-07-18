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

// store meals hash
client.hmset('meals', {
  'curry': 'meat and potatoes',
  'soup': 'clamchowder',
  'grapes': 'red'
});

// Get back all the meals
client.hgetall('meals', function(error, hash){
  if(error){
    response.send(error);
  }
  console.log(hash);
});

// Responds with 3, the length of the bears list
client.rpush(['bears', 'brown', 'black', 'polar'], function(error, response){
  console.log(response);
});

// Retrieve the elements of the list

// Get -1 as the third argument to get the whole thing
client.lrange('bears', 0, -1, function(error, response){
  console.log(response);
});

//Sets are similar to lists, except they dont have duplicates
// this is a set
client.sadd(['tags', 'emberjs', 'angularjs', 'backbonejs', 'emberjs'], function(error, response){
  console.log(response);
});

// Retrieve all the members of the set, the order is not preserved when retrieving the members
client.smembers('tags', function(error, response){
  console.log(response);
});

// Check is the key bear exists
client.exists('bears', function(error, response){
  if(response === 1){
    // delete the key bears
    client.del('bears', function(err, res){
      console.log('removed ' + res);
    });
  }
});

// 30 seconds before the key1 expires
client.set('key1', 'val1');
client.expire('key1', 30);

// Incrementing and decrementing
// incr increments by 1
// If a different value is needed, then we will use incrby()
// decr and decrby
client.set('key2', 10, function(){
  client.incr('key2', function(error, response){
    console.log(response);
  });
});
