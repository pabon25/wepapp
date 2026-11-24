const test = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../app');

test('home page responds successfully', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const response = await fetch(`http://127.0.0.1:${server.address().port}/`);
  const body = await response.text();
  assert.equal(response.status, 200);
  assert.match(body, /Build, ship, and/);
});

test('login page responds successfully', async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const response = await fetch(`http://127.0.0.1:${server.address().port}/login`);
  const body = await response.text();
  assert.equal(response.status, 200);
  assert.match(body, /Sign in/);
});
