let streams = [
    "https://beam.pro/xilana",
    "https://www.hitbox.tv/Spinningtop5",
    "https://www.hitbox.tv/Lufia",
    "https://www.twitch.tv/willfe",
    "https://www.twitch.tv/Direwolf20",
    "https://www.twitch.tv/marimkay",
    "https://www.twitch.tv/Drako_Gaming"
];
let cache = require('./avatarcache');


let statusOf = require('./stream_stalker').statusOf;
let avatarFor = require('./stream_stalker').avatarFor;
let nameOf = require('./stream_stalker').nameOf;


let libnotify = require('libnotify');

let announceOnline = (url, status) => {
    const name = nameOf(url);
    const message = `${name} started streaming '${status.game}'`;
    const title = status.title;

    avatarFor(url)
    .then(cache)
    .then((avatar) => libnotify.notify(title, {image: avatar, title: message}))
    .catch(() => libnotify.notify(title, {title: message}));
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
            announceOnline(url, status);
        } else if (!status && statusmap[url]) {
            announceOffline(url, status);
        }
        statusmap[url] = !!status;
    }));
};

setInterval(checkSubs, 30000);
checkSubs();
