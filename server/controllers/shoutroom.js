var _echos = [];

var _getLast = function() {
        return {
            room: 'My beautiful room',
            echos: _echos.sort(function(a,b) {
                return b.date - a.date;
            }).slice(0, 5).reverse()
        };
    };

var _getAll = function() {
        return {
            room: 'My beautiful room',
            echos: _echos
        };
    };

module.exports = {
    shouts: function(req, res) {
        res.set('content-type', 'application/json');
        res.send(_getAll());
    },

    lastShouts: function(req, res) {
        res.set('content-type', 'application/json');
        res.send(_getLast());
    },

    newShout: function(req, res) {
        if (req.body.shout) {
            _echos.push(req.body.shout);
        }
        res.set('content-type', 'application/json');
        res.send(_getLast());
    }
};