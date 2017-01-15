let request = require('request');

module.exports = {
    nameOf: function(channelUrl) {
        let regex = /beam\.pro\/(\w+)/;
        return channelUrl.match(regex)[1];
    },

    isOnline: function(channelUrl)
    {
        let username = this.nameOf(channelUrl);
        return new Promise((resolve, reject) => {
            request(
                `https://beam.pro/api/v1/channels/${username}`,
                function(error, response, body) {
                    if (error) {
                        reject(response);
                    } else {
                        const data = JSON.parse(body);
                        resolve(!!data.online);
                    }
                }
            );
        });
    },

    avatarFor: function(channelUrl)
    {
        let username = this.nameOf(channelUrl);
        return new Promise((resolve, reject) => {
            request(
                `https://beam.pro/api/v1/channels/${username}`,
                function(error, response, body) {
                    if (error) {
                        reject(response);
                    } else {
                        const data = JSON.parse(body);
                        resolve(data.user.avatarUrl);
                    }
                }
            );
        });
    }
};
