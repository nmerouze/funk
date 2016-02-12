module.exports = (options) => (
  {
    sendMessage(channel, text) {
      const slack = require('slack');

      return new Promise((resolve, reject) => {
        slack.chat.postMessage({token: options.token, channel: channel, text: text}, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
    }
  }
);
