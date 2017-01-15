const handlers = {
    "www.hitbox.tv": require('./platforms/hitbox'),
    "www.twitch.tv": require('./platforms/twitch'),
    "www.beam.pro" : require('./platforms/beam')
};

function handlerFor(channelUrl)
{
    const regex = /([a-zA-Z\.]+)\//;
    const index = channelUrl.match(regex)[1];
    if (index in handlers) {
        return handlers[index];
    } else if (`www.${index}` in handlers) {
        return handlers[`www.${index}`];
    } else {
        console.error(`No handler for ${index}!`);
        return null;
    }
}

function avatarFor(channelUrl)
{
    let handler = handlerFor(channelUrl);
    if (handler.avatarFor) return handler.avatarFor(channelUrl);
    return Promise.reject("Platform has no handler");
}

function statusOf(channelUrl)
{
    let handler = handlerFor(channelUrl);
    return handler.isOnline(channelUrl);
}

function nameOf(url)
{
    let handler = handlerFor(url);
    return handler.nameOf(url);
}

module.exports = {
    nameOf,
    handlerFor,
    avatarFor,
    statusOf
};
