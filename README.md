# Funk

Create micro-services by chaining pre-defined functions.

This framework is born out of the necessity to create small APIs and recurring tasks for my static websites. Zapier cheapest plan when you exceed the limits of the free plan is already too expensive for small websites. And you can't make APIs with it.

There are some examples at the bottom to show what funk could be capable of in the future.

# Usage

The NPM package hasn't been published yet, name is not definitive either because there's already a package with this name.

``` js
// index.js
const path = require('path');
const funk = require('funk');

funk.start({
  port: 3000,
  functionsPath: path.resolve(__dirname, 'functions')
});
```

Functions can either be routes:

``` js
// functions/hello.js
const route = require('funk').route;

module.exports = route({ method: 'GET', path: '/hello' }, (req, res) => {
  res.send('hello');
});
```

Or tasks:

``` js
// functions/foobar.js
const task = require('funk').task;

module.exports = task('every 1 minute', () => {
  console.log('foobar');
});
```

# Examples

These are non-working examples to showcase where this project is heading.

CSV to JSON API:

``` js
const route = require('funk').route;

const csv = require('funk/functions/csv')({
  path: 'path/to/teas.csv'
});

module.exports = route({ method: 'GET', path: '/teas' }, (req, res) => {
  csv.toJSON().then(v => res.send(v));
});
```

Login API:

``` js
const login = require('funk/functions/login');

const pg = require('funk/functions/pg')({
  databaseString: process.env.DATABASE_URL
});

module.exports = login({
  db: pg,
  path: '/login'
});
```

Receiving web hooks from Stripe:

``` js
const stripe = require('funk/functions/stripe')({
  apiKey: process.env.STRIPE_API_KEY
});

const slack = require('funk/functions/slack')({
  token: process.env.SLACK_TOKEN
});

module.exports = stripe.newPaymentWebhook((payment, done) => {
  slack.sendMessage('#general', `New payment received: ${payment}`).then(done);
});
```

Running a daily task:

``` js
const task = require('funk').task;

const google = require('funk/functions/google')({
  apiKey: process.env.GOOGLE_API_KEY
});

const slack = require('funk/functions/slack')({
  token: process.env.SLACK_TOKEN
});

module.exports = task('every day', () => {
  google.getYesterdayVisitors('inappcloud.com')
    .then(visitors => slack.sendMessage('#general', `You got ${visitors} on inappcloud.com yesterday`))
    .then(v => console.log(v));
});
```
