# TODO

Your application's API will accept data for a lottery ticket,
and respond with whether each pick has won, the prize won per-pick,
and the total of all prizes won on the ticket.

1. The JSON REQUEST includes array of lottery numbers and associated dates
2. Compare the JSON REQUEST with the JSON DRAW RESULTS.
3. Return a JSON RESPONSE returning the array received in REQUEST along with matching numbers for each along with resulting prizes.

Example REQUEST

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
