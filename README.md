shoutroom
===========

A shout room with express.

Shoutroom is a chat [server api](https://github.com/enguerran/shoutroom/tree/master/server) with easy [static integration](https://github.com/enguerran/shoutroom/tree/master/client). 

Try the [demo >>](http://tranquil-cliffs-6650.herokuapp.com/client/)

## routes

* `GET /hello`: say hello to check it's up
* `GET /shout`: get all the shouts
* `GET /shout/last`: get last 5 shouts
* `POST /shout`: post some data. data must be a json containing:

```
{
    room: 'My beautiful room',
    shout: {
        author: 'John Doe',
        message: 'Lorem ipsum',
        date: Date.now()
    }
}
```

## test and deploy

* run the tests: `grunt test`
* deploy on node stack: `git push heroku master`

![TEST AND DEPLOY or Seek and Destroy](http://cl.ly/image/021F0X2h1W1W/test-and-deploy-or-seek-and-destroy-1.png)

# Evolution

1. shoutroom as an node express module
```js
var express = require('express'),
    app = express();
var shoutroom = require('shoutroom');
var baseroute = '/api/chat';
shoutroom.init(app, baseroute);
```