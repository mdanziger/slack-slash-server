const request = require('request');

module.exports = (app) => {
  app.post('/win', (req, res) => {
    const flubrUrl = 'http://flubr.herokuapp.com/api/images/random/pass';
    request(flubrUrl, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const payload = {
          channel: req.channel,
          text: body,
          icon_emoji: ':thumbsup:',
        };

        const requestOpts = {
          url: app.get('webhook'),
          form: {payload: JSON.stringify(payload)},
        };

        request.post(requestOpts, (err) => {
          if (err) {
            return res.status(500).send({success: false, error: err.message});
          }
          return res.status(200).send();
        });
      }
    });
  });
};
