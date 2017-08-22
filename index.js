require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

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
  subreddit: 'testingground4bots',
  results: 25
};

// Create Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOptions);

// On comment, roll
comments.on('comment', (comment) => {
  let body = comment.body;
  body = body.split(' ');
  if (body[0] == '!PBRoll' && body.length > 1) {
    let num = body[1];
    num = parseInt(num);
    if (typeof num == 'number' && num > 0) {
      const startNum = 1;
      const returnNum = Math.floor(Math.random() * num) + startNum;
      comment.reply('Rollie Pollie rolled a ' + returnNum + '.');
      console.log('Rollie Pollie rolled a ' + returnNum + '.');
    }
  }
});
