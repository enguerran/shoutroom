var express = require('express');
var app = express();
var routes = require('./routes/routes');

app.use(express.json());
app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use('/client', express.static('client'));
app.enable('strict routing');

var port = Number(process.env.PORT || 5000);

routes(app);

var server = app.listen(port, function() {
    console.log('server is listening on port %d', server.address().port);
});

module.exports = app;
