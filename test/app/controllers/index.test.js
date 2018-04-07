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
  const res = { json: td.function()};
  // todo: create a request calculated from most recent powerball date
  api({body: [{message:'TEST_MONEY'}]}, res);
  t.notThrows(() =>
    td.verify(res.json({ prizes: 'TEST_MONEY' }))
  );
});

test('Fail Controller', t => {
  t.throws(() => fail(), 'Hello Error');
});


test('Not Found Controller', t => {
  t.throws(() => notFound(), 'Not Found');
});