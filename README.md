
# AutoLotto from lottery.com exercise

## Description

Powerball is a popular US lottery game with draws twice a week.  For the purposes of this exercise, a Powerball lottery "ticket" includes one or more "picks".  Each "pick" is a set of 5 integers (from `1`-`69`) along with a 6th integer (the _Powerball_, from `1`-`26`) that the user has chosen to play during a specific draw.

For example, a pick for the draw on `2017-11-09` might be: 

`02 14 19 21 61` `25`

The application's API accepts data for a lottery ticket, and respond with whether each pick has won, the prize won per-pick, and the total of all prizes won on the ticket.

The test end point used is:

https://games.api.lottery.com/api/v2.0/results?game=59bc2b6031947b9daf338d32

To calculate the prize, the prize matrix image below is used:

![](https://raw.githubusercontent.com/autolotto/interview/master/powerball_rules.png)



## Installation

This app requires: 

- A Linux or MacOS Environment *(Windows Untested)*
- Node.js 8.9+

If you do not have node.js installed: 

1. [Install NVM](https://github.com/creationix/nvm#installation)
2. [Install Node 8.9](https://github.com/creationix/nvm#usage) `nvm install 8.9`
3. [Switch to Node 8.9](https://github.com/creationix/nvm#usage) `nvm use 8.9`

## Starting the App

From the checked-out application folder, run: 

`npm start`

You should see output like this: 

```
node index.js
App listening on port 3000
```

You can then hit the endpoint with POST:

with a REQUEST LIKE:

# Example REQUEST

    [
        {
        "message": "2 Win the Lotto!",
        "game": "powerball",
        "gameDate": "2018-04-01",
        "powerPlay": true,
        "line": [
            {
              "value": "8",
              "type": "NUMBER"
            },
            {
              "value": "4",
              "type": "NUMBER"
            },
            {
              "value": "2",
              "type": "NUMBER"
            },
            {
              "value": "5",
              "type": "NUMBER"
            },
            {
              "value": "1",
              "type": "NUMBER"
            },
            {
              "value": "71",
              "type": "NUMBER",
              "name": "Powerball",
              "category": "EXTRA"
            }
          ]
    },
    {
        "message": "Win the Lotto!",
        "game": "powerball",
        "gameDate": "2018-04-01",
        "powerPlay": false,
        "line": [
            {
              "value": "8",
              "type": "NUMBER"
            },
            {
              "value": "24",
              "type": "NUMBER"
            },
            {
              "value": "52",
              "type": "NUMBER"
            },
            {
              "value": "55",
              "type": "NUMBER"
            },
            {
              "value": "61",
              "type": "NUMBER"
            },
            {
              "value": "21",
              "type": "NUMBER",
              "name": "Powerball",
              "category": "EXTRA"
            }
          ]
    }
    ]

`http://localhost:3000/api`

You should see something like this: 

```json
{
    "totalAmountWon": 50000000,
    "results": [
        {
            "date": "2018-04-01",
            "powerPlay": true,
            "powerBall": "71",
            "originalWhites": [
                "8",
                "4",
                "2",
                "5",
                "1"
            ],
            "matchedPowerBall": false,
            "matchingNumbers": [
                "8"
            ],
            "amountWon": 0
        },
        {
            "date": "2018-04-01",
            "powerPlay": false,
            "powerBall": "21",
            "originalWhites": [
                "8",
                "24",
                "52",
                "55",
                "61"
            ],
            "matchedPowerBall": true,
            "matchingNumbers": [
                "8",
                "24",
                "52",
                "55",
                "61"
            ],
            "amountWon": 50000000
        }
    ]
}
```

To shutdown the server simply send a `^C`.

## Testing

To run the existing (sample) tests simply use: 

`npm test`

You should see output like this: 

```
  
  ✔ app › App Environment
  ✔ app › App Base Path
  ✔ app › App Includes Error Handler Middleware
  ✔ controllers › index › Hello World Controller
  ✔ controllers › index › Fail Controller
  ✔ controllers › index › Not Found Controller
  ✔ middleware › errors › Error Handler Middleware
  ✔ middleware › errors › Error Handler for NotFound Case
  ✔ routes › routes › Router Setup
  
  9 tests passed
  
```



 
