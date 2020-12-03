const fetch = require('node-fetch');
//require the Elasticsearch librray
const elasticsearch = require('elasticsearch');
// instantiate an Elasticsearch client

const elasticUrl = process.env.ELASTIC_URL || "http://192.168.99.100:9200";

const client = new elasticsearch.Client({
    hosts: [elasticUrl]
});

// ping the client to be sure Elasticsearch is up
client.ping({
    requestTimeout: 30000,
}, function (error) {
    // at this point, eastic search is down, please check your Elasticsearch service
    if (error) {
        console.error('Elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});

// create a new index called scotch.io-tutorial. If the index has already been created, this function fails safely
client.indices.create({
    index: 'game-guide'
}, function (error, response, status) {
    if (error) {
        //console.log(error);
    } else {
        //console.log("created a new index", response);
    }
});
// add a data to the index that has already been created
client.index({
    index: 'game-guide',
    id: '1',
    type: 'gameguides_list',
    body: {
        "Key1": "Content for key one",
        "Key2": "Content for key two",
        "key3": "Content for key three",
    }
}, function (err, resp, status) {
    //console.log(resp);
});

// require the array of tutorials that was downloaded
//const tutorials = require('./tutorials.json');

getData();

async function getData() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const gameguides = await fetch("http://192.168.99.100:8080/api/gameguide", requestOptions)
        .then(response => {
            return response.json()
        })
        .catch(error => console.log('error', error));
    index(gameguides);
}

function index(gameguides) {
    var bulk = [];
    gameguides.forEach(gameguide => {
        bulk.push({
            index: {
                _index: "game-guide",
                _type: "gameguides_list",
            }
        })
        bulk.push(gameguide)
    })
    //perform bulk indexing of the data passed
    client.bulk({
        body: bulk
    }, function (err, response) {
        if (err) {
            console.error("Failed Bulk operation", err)
        } else {
            console.info("Successfully imported %s", gameguides.length);
        }
    });
}