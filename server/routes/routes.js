var ShoutRoom = require('../controllers/shoutroom');
module.exports = function setup(app) {

    app.get('/hello', function(req, res) {
        res.send('Hello, World!');
    });

    app.get('/shout', ShoutRoom.shouts);
    app.get('/shout/last', ShoutRoom.lastShouts);

    app.post('/shout', ShoutRoom.newShout);
};
