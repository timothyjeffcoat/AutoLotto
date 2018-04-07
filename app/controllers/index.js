'use strict'

let request = require('request')
let _ = require('underscore');
// Hello World on '/'
function root(req, res) {
  res.json({ message: 'Hello World' });
}

// API on '/api'
function api(req, res) {
  let requestBody = req.body
  console.log('requestBody')
  let tickets_lines = []
  requestBody.forEach(function(ticket, i){
    if(ticket.hasOwnProperty("line")){
      if(ticket.line.length>1){
        let line = []
        let line2 = []
        console.log(ticket.gameDate)
        line[0] = ticket.gameDate.substr(0, 10)
        line[1] = ticket.powerPlay
        ticket.line.forEach(function(numbers, x){
          if(numbers.type === 'NUMBER'){
            if(x < 5) {
              line2[x] = numbers.value
            }else if(x == 5) {
              line[2] = numbers.value // powerball
              line[3] = line2 // powerball
              tickets_lines.push(line)
              line2 = null
              line = null
            }
          }
        })

      }
    }
  });
  console.log(tickets_lines)
  request.get(
    'https://games.api.lottery.com/api/v2.0/results?game=59bc2b6031947b9daf338d32',
    function(err, response, body){
      let result = JSON.parse(body)
      console.log("intersection")
      let intersect = _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])
      // console.log(intersect);
      let results_lines = []
      result.forEach(function(ticket, i){
        if(ticket.hasOwnProperty("results") && ticket.results.hasOwnProperty('values')){
          if(ticket.results.values.length>1){
            let line = []
            let line2 = []
            line[0] = ticket.resultsAnnouncedAt.substr(0, 10)
            ticket.results.values.forEach(function(numbers, x){
              if(numbers.type === 'NUMBER'){
                if(x < 5) {
                  line2[x] = numbers.value
                }else if(x == 5) {
                  line[1] = numbers.value // powerball
                }else if(x == 6) {
                  line[2] = numbers.value // powerplay
                  line[3] = line2
                  results_lines.push(line)
                  tickets_lines.forEach(function (purchasedTicket, x) {
                    // compare dates
                    if(purchasedTicket[0] == line[0]){
                      console.log("Date")
                      console.log(line[0])
                      let intersect = _.intersection(purchasedTicket[3], line[3])
                      console.log("matching numbers");
                      console.log(intersect);
                      let powerBall = false
                      if(line[1] == purchasedTicket[2]){
                        powerBall = true
                      }
                      // todo determine winnings and put results in an array
                      /* if intersect is non zero then
                        if powerBall = true and intersect.length = 0 then win $4
                        if powerBall = true and intersect.length = 1 then win $4
                        if powerBall = true and intersect.length = 2 then win $7
                        if powerBall = true and intersect.length = 3 then win $100
                        if powerBall = true and intersect.length = 4 then win $50000
                        if powerBall = true and intersect.length = 5 then win GRAND PRIZE
                        if powerBall = false and intersect.length = 5 then win $1000000
                        if powerBall = false and intersect.length = 4 then win $100
                        if powerBall = false and intersect.length = 3 then win $7

                        if powerPlay = true (purchasedTicket[1]) then multiply winnings by powerPlay Value line[2]
                          The 10X multiplier is only in play when the advertised jackpot annuity is $150 million or less.

                          The Match 5 prize with Power Play is always $2 million. Without it, it's $1 million.

                          The multiplier does not apply to a jackpot prize.





                        Update each of the tickets_lines records with fields for
                        1. Respond with whether each pick has won
                        2. The prize won per-pick
                       */

                    }
                  })
                  line2 = null
                  line = null
                }
              }
            })
          }
        }
      });
      /* todo return matching and winning info
        In the form of a JSON with attributes of
        1. The total of all prizes won on the ticket. Should have a var that keeps track of total winnings
       */
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
