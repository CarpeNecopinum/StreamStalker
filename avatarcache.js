let r = require('request');
let path = require('path');
let md5 = require('md5');
let fs = require('fs');

module.exports = (imageUrl) => {
    console.log("Cache asked for " + imageUrl);
    if (!imageUrl) return Promise.reject("null image");

    const filename = '/tmp/' + md5(imageUrl) + path.extname(imageUrl);
    if (fs.existsSync(filename)) return Promise.resolve(filename);

    return new Promise((resolve) => {
        console.log("Miss, loading to " + filename);
        let stream = fs.createWriteStream(filename);
        r(imageUrl).pipe(stream);
        stream.on('finish', () => resolve(filename));
    });
};
