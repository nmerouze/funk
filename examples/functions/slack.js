const task = require('../../src').task;
const slack = require('../../src/functions/slack')({
  token: process.env.SLACK_TOKEN
});

module.exports = task('every 10 seconds', () => {
  slack.sendMessage('#general', 'Hello World!').then(data => {
    console.log(data);
  });
});
