const clientId = require('./secrets/twitch.json').clientId;
const rp = require('../request_promise');

module.exports = {
    nameOf: function(channelUrl) {
        let regex = /twitch\.tv\/(\w+)/;
        return channelUrl.match(regex)[1];
    },

    isOnline: function(channelUrl)
    {
        let username = this.nameOf(channelUrl);
        return rp(`https://api.twitch.tv/kraken/streams/${username}?client_id=${clientId}`)
            .then((body) => {
                const data = JSON.parse(body);
                return data.stream ? {
                    game: data.stream.game,
                    title: data.stream.channel.status
                } : false;
            });
    },

    avatarFor: function (channelUrl)
    {
        let username = this.nameOf(channelUrl);
        return rp(`https://api.twitch.tv/kraken/channels/${username}?client_id=${clientId}`)
            .then((body) => JSON.parse(body)['logo']);
    }
};
