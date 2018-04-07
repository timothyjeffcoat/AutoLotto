const test = require('ava');
const td = require('testdouble');

const { root, api, fail, notFound } = require('../../../app/controllers');

test('Hello World Controller', t => {
  const res = { json: td.function() };
  root({}, res);
  t.notThrows(() =>
    td.verify(res.json({ message: 'Hello World' }))
  );
});

test('API Controller', t => {
  var quack = td.function('api')

  td.when(quack()).thenReturn('some return value')

  quack() // 'some return value'


  const res = { json: td.function()};
  // todo: create a request calculated from most recent powerball date
  let requestbody = [
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

  api({body: requestbody}, res);
  console.log("JSON.stringify(res,null,2)")
  console.log(JSON.stringify(res.json,null,2))
  t.notThrows(() =>
    td.verify(res.json({}))
  );
});

test('Fail Controller', t => {
  t.throws(() => fail(), 'Hello Error');
});


test('Not Found Controller', t => {
  t.throws(() => notFound(), 'Not Found');
});