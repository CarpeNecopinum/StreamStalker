let streams = [
    "https://beam.pro/xilana",
    "https://www.hitbox.tv/Spinningtop5",
    "https://www.hitbox.tv/Lufia",
    "https://www.twitch.tv/willfe",
    "https://www.twitch.tv/Direwolf20"
];
let cache = require('./avatarcache');


let statusOf = require('./stream_stalker').statusOf;
let avatarFor = require('./stream_stalker').avatarFor;
let nameOf = require('./stream_stalker').nameOf;


let libnotify = require('libnotify');

let announceOnline = (url) => {
    const name = nameOf(url);
    const message = name + " started streaming.";

    avatarFor(url)
    .then(cache)
    .then((avatar) => libnotify.notify(message, {image: avatar}))
    .catch(() => libnotify.notify(message));
};

let announceOffline = (url) => {
    const name = nameOf(url);
    const message = name + " stopped streaming.";

    avatarFor(url)
    .then(cache)
    .then((avatar) => libnotify.notify(message, {image: avatar}))
    .catch(() => libnotify.notify(message));
};

let statusmap = {};
streams.forEach(item => statusmap[item] = false);
let statusobj = (url) => statusOf(url).then((status) => ({url, status}));

let checkSubs = () => {
    Promise.all(streams.map(statusobj))
    .then((urls) => urls.map(({url, status}) => {
        console.log({url, status});
        if (status && !statusmap[url]) {
            announceOnline(url);
        } else if (!status && statusmap[url]) {
            announceOffline(url);
        }
        statusmap[url] = status;
    }));
};

setInterval(checkSubs, 30000);
checkSubs();
