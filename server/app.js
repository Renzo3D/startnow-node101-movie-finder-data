
const express = require('express');
const axios = require('axios');
const app = express();

const cache = {};

app.get('/', function (req, res) {

    var movieId = req.query.i;
    var movieText = req.query.t;


    if (movieId) {
        
        if (cache[movieId]) {
            res.json(cache[movieId])
        }
        else {
            axios.get('http://www.omdbapi.com/?i=' + movieId + '&apikey='+MY_API_KEY)
                .then(function (response) {
                    cache[movieId] = response.data;
                    res.json(response.data);
                })
                .catch(function (error) {
                    res.json(error.message);
                })

        }

    }
    else {
        //movieText = movieText.replace(/\s/g,"-", '%20');
        if(cache[movieText]) {
            res.json(cache[movieText]);
        }
        else {
            axios.get('http://www.omdbapi.com/?t=' + movieText + '&apikey='+MY_API_KEY)
            .then(function (response) {
                cache[movieText] = response.data;
                res.json(response.data);
            })
            .catch(function (error) {
                res.json(error.message);
                })
            }
        }
});

module.exports = app;
