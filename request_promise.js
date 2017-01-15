const request = require('request');

module.exports = (options) => new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
        if (error) {
            console.log(error);
            reject(JSON.stringify({options, error, response, body}));
        } else {
            resolve(body);
        }
    });
});
