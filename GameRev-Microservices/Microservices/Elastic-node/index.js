//require the Elasticsearch librray
const elasticsearch = require('elasticsearch');

// instantiate an elasticsearch client
const elasticUrl = process.env.ELASTIC_URL || "http://192.168.99.100:9200";
const client = new elasticsearch.Client({
  hosts: [elasticUrl]
});

//require Express
const express = require('express');
// instanciate an instance of express and hold the value in a constant called app
const app = express();
//require the body-parser library. will be used for parsing body requests
const bodyParser = require('body-parser')
//require the path library
const path = require('path');

// ping the client to be sure Elasticsearch is up
client.ping({
  requestTimeout: 30000,
}, function (error) {
  // at this point, eastic search is down, please check your Elasticsearch service
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('Everything is ok');
  }
});


// use the bodyparser as a middleware
app.use(bodyParser.json())
// set port for the app to listen on
app.set('port', process.env.PORT || 3000);
// set path to serve static files
app.use(express.static(path.join(__dirname, 'public')));
// enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// defined the base route and return with an HTML file called tempate.html
app.get('/', function (req, res) {
  res.sendFile('template.html', {
    root: path.join(__dirname, 'views')
  });
})

// define the /search route that should return elastic search results
app.get('/search', function (req, res) {
  // declare the query object to search elastic search and return only 200 results from the first result found.
  // also match any data where the name is like the query string sent in
  let body = {
    size: 200,
    from: 0,
    query: {
      match: {
        description: req.query['q']
      }
    }
  }
  // perform the actual search passing in the index, the search query and the type
  client.search({
      index: 'scotch.io-tutorial',
      body: body,
      type: 'tutorials_list'
    })
    .then(results => {
      res.send(results.hits.hits);
    })
    .catch(err => {
      console.log(err)
      res.send([]);
    });

})
// listen on the specified port
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});