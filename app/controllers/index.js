
// Hello World on '/'
function root(req, res) {
  res.json({ message: 'Hello World' });
}

function scoop(req, res) {
  res.json({ message: 'Scooped You!' });
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
  scoop,
  fail,
  notFound
};
