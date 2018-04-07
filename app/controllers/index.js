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
  let tickets_lines = []
  requestBody.forEach(function(ticket, i){
    if(ticket.hasOwnProperty("line")){
      if(ticket.line.length>1){
        let line = []
        let line2 = []
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
  request.get(
    'https://games.api.lottery.com/api/v2.0/results?game=59bc2b6031947b9daf338d32',
    function(err, response, body){
      let totalAmountWon = 0
      let result = JSON.parse(body)
      let intersect = _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])
      let results_lines = []
      result.forEach(function(ticket, i){

        if(ticket.hasOwnProperty("results") && ticket.results.hasOwnProperty('values')){
          if(ticket.results.values.length>1){
            let line = []
            let line2 = []
            let jackpot = 0

            line[0] = ticket.resultsAnnouncedAt.substr(0, 10)

            if(ticket.prizes.values.length>0){
              jackpot = ticket.prizes.values[0].value
            }

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
                    let applyMultiplier = function (playMultiplier, amountWon, powerPlayValue) {
                      if (playMultiplier == true) {
                        amountWon = amountWon * powerPlayValue;
                      }
                      return amountWon;
                    };

                    if(purchasedTicket[0] == line[0]){
                      let intersect = _.intersection(purchasedTicket[3], line[3])
                      let powerBall = false
                      if(line[1] == purchasedTicket[2]){
                        powerBall = true
                        purchasedTicket[4] = true
                      }else{
                        purchasedTicket[4] = false
                      }
                      if(intersect.length>0){
                        // add the intersection array
                        purchasedTicket[5] = intersect
                      }
                      let playMultiplier = purchasedTicket[1]
                      let amountWon = 0
                      let powerPlayValue = line[2]
                      /*
                          You can multiply non-jackpot prizes by 2, 3, 4, 5 or 10 times!

                          The 10X multiplier is only in play when the advertised jackpot annuity is $150 million or less.

                          The Match 5 prize with Power Play is always $2 million. Without it, it's $1 million.

                          The multiplier does not apply to a jackpot prize.


                          When the advertised annuity jackpot is less than or equal to the Major Jackpot Level,
                          the multiplier will be either 2X, 3X, 4X, 5X or 10X.

                          When the advertised annuity jackpot is greater than the Major Jackpot Level,
                          the multiplier will be either 2X, 3X, 4X or 5X.

                          The Major Jackpot Level is defined as "the level above which
                          Powerball drawings will no longer include a Power Play of 10X."
                          The Major Jackpot Level is currently $150,000,000.

                          The 10X multiplier is not available when the jackpot is above the Major Jackpot Level
                       */
                      if (powerBall == true && intersect.length == 0) {
                        amountWon = 4
                        amountWon = applyMultiplier(playMultiplier, amountWon, powerPlayValue);
                      }
                      if (powerBall == true && intersect.length == 1) {
                        amountWon = 4
                        amountWon = applyMultiplier(playMultiplier, amountWon, powerPlayValue);
                      }
                      if (powerBall == true && intersect.length == 2) {
                        amountWon = 7
                        amountWon = applyMultiplier(playMultiplier, amountWon, powerPlayValue);
                      }
                      if (powerBall == true && intersect.length == 3) {
                        amountWon = 100
                        amountWon = applyMultiplier(playMultiplier, amountWon, powerPlayValue);
                      }
                      if (powerBall == true && intersect.length == 4) {
                        amountWon = 50000
                        amountWon = applyMultiplier(playMultiplier, amountWon, powerPlayValue);
                      }
                      if (powerBall == true && intersect.length == 5) {
                        amountWon = jackpot
                      }
                      if (powerBall == false && intersect.length == 5) {
                        if(playMultiplier == true){
                          amountWon = 2000000
                        }else{
                          amountWon = 1000000
                        }
                      }
                      if (powerBall == false && intersect.length == 4) {
                        amountWon = 100
                        amountWon = applyMultiplier(playMultiplier, amountWon, powerPlayValue);
                      }
                      if (powerBall == false && intersect.length == 3) {
                        amountWon = 7
                        amountWon = applyMultiplier(playMultiplier, amountWon, powerPlayValue);
                      }

                      purchasedTicket[6] = amountWon

                      totalAmountWon += amountWon
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

      // Create return JSON object

      let jsonRoot = {totalAmountWon: totalAmountWon}
      let json_response = []
      tickets_lines.forEach(function(ticket, i){
        let jsonTicket = {
          date: ticket[0],
          powerPlay: ticket[1],
          powerBall: ticket[2],
          originalWhites: ticket[3],
          matchedPowerBall: ticket[4],
          matchingNumbers: ticket[5],
          amountWon: ticket[6],
        }
        json_response.push(jsonTicket)
      })
      jsonRoot.results = json_response
      res.json(jsonRoot);
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
