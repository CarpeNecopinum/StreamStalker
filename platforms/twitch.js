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
            .then((body) => !!(JSON.parse(body)['stream']));
    },

    avatarFor: function (channelUrl)
    {
        let username = this.nameOf(channelUrl);
        return rp(`https://api.twitch.tv/kraken/channels/${username}?client_id=${clientId}`)
            .then((body) => JSON.parse(body)['logo']);
    }
};
