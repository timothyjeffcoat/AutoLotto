'use strict'

let request = require('request')

// Hello World on '/'
function root(req, res) {
  res.json({ message: 'Hello World' });
}

// API on '/api'
function api(req, res) {
  // todo : use the request to make a call to https://games.api.lottery.com/api/v2.0/results?game=59bc2b6031947b9daf338d32
  request.get(
  'https://games.api.lottery.com/api/v2.0/results?game=59bc2b6031947b9daf338d32',
  function(err, response, body){
    let result = JSON.parse(body)
    console.log(result)
    res.json(result);
  })


}

// Simulate a Failure on '/fail'
function fail(req, res) {
  throw new Error('Hello Error');
}

// 404 Handler
function notFound(req, res) {
  const err = new Error('Not Found');
  err.status = 404;
  throw err;
}

module.exports = {
  root,
  fail,
  api,
  notFound
};
