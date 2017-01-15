let request = require('request');

module.exports = {
    nameOf: function(url)
    {
        let regex = /hitbox\.tv\/(\w+)/;
        return url.match(regex)[1];
    },

    isOnline: function(channelUrl)
    {
        return new Promise((resolve, reject) => {
            request(
                `https://api.hitbox.tv/user/${this.nameOf(channelUrl)}.json?showHidden=true`,
                function(error, response, body) {
                    if (error) {
                        reject(response);
                    } else {
                        const data = JSON.parse(body);
                        resolve(data.is_live === "1");
                    }
                }
            );
        });
    },

    avatarFor: function(channelUrl)
    {
        return new Promise((resolve, reject) => {
            request(
                `https://api.hitbox.tv/user/${this.nameOf(channelUrl)}.json?showHidden=true`,
                function(error, response, body) {
                    if (error) {
                        reject(response);
                    } else {
                        const data = JSON.parse(body);
                        resolve("https://edge.sf.hitbox.tv"+data["user_logo"]);
                    }
                }
            );
        });
    }
};
