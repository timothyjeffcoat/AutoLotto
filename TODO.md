# TODO

1. Create an end point or route for a GET that accepts a JSON REQUEST
2. The JSON REQUEST includes array of lottery numbers and associated dates
3. Make a http call to https://games.api.lottery.com/api/v2.0/results?game=59bc2b6031947b9daf338d32 to retrieve a JSON containing a list of Draw results and their dates.
4. Compare the JSON REQUEST with the JSON DRAW RESULTS.
5. Return a JSON RESPONSE returning the array received in REQUEST along with matching numbers for each along with resulting prizes.
6. Host on LotteryScoop.com
