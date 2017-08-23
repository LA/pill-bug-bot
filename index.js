require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const log = (text) => {
  console.log('[' + new Date().toUTCString() + ']', text);
}

app.listen(port, () => {
  console.log('Listening on Port:', port);

  // Build snoowrap and snoostorm clients
  const r = new Snoowrap({
    userAgent: process.env.USER_AGENT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
  });
  const client = new Snoostorm(r);

  const streamOptions = {
    subreddit: 'all',
    results: 100,
    pollTime: 2000,
  };

  // Create Snoostorm CommentStream with the specified options
  const comments = client.CommentStream(streamOptions);

  // On comment, roll
  comments.on('comment', (comment) => {
    let body = comment.body;
    body = body.split(' ');
    if (body[0] == '!PBRoll' && body.length > 1) {
      log('PBRoll Found!');
      let num = body[1];
      num = parseInt(num);
      if (typeof num == 'number' && num > 0) {
        const startNum = 1;
        const returnNum = Math.floor(Math.random() * num) + startNum;
        comment.reply('Rollie Pollie rolled ' + returnNum + '.');
        log('Rollie Pollie rolled ' + returnNum + '.');
      }
    }
  });
});
