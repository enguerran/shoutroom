var request = require('supertest')('http://localhost:5000');
var expect = require('chai').expect;

describe('General app tests', function() {
    describe('GET /hello', function() {
        it('should say hello', function(done) {
            request
                .get('/hello')
                .expect(200)
                .expect('Hello, World!', done);
        });
    });
});

describe('GET /shout', function() {
    it('should get a json', function(done) {
        var shout = {
            room: 'My beautiful room'
        };

        request
            .get('/shout')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('content-type', 'application/json')
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body.room).to.equal(shout.room);
                done();
            });
    });
});

describe('POST /shout', function() {
    it('should post a shout', function(done) {
        var shout = {
            room: 'My beautiful room',
            shout: {
                author: 'John Doe',
                message: 'Lorem ipsum',
                date: Date.now()
            }
        };

        request
            .post('/shout')
            .send(shout)
            .expect(200)
            .expect('content-type', 'application/json')
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body.room).to.equal(shout.room);
                expect(res.body.echos).to.contain(shout.shout);
                done();
            });
    });

    it('should send/get the date correctly', function(done) {
        var myDate = Date.now();
        var myshout = {
            room: 'My beautiful room',
            shout: {
                author: 'John Doe',
                message: 'Lorem ipsum',
                date: myDate
            }
        };

        request
            .post('/shout')
            .send(myshout)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                var echos = res.body.echos;
                echos.forEach(function(shout) {
                    if(shout.shout === myshout.shout) {
                        var date = new Date(shout.shout.date);
                        expect(date).to.equal(myDate);
                    }
                });
                done();
            });
    });

    it('should send three posts and receive them', function(done) {
        var shouts = [];
        for (var i = 0; i < 3; i++) {
            shouts.push({
                shout: {
                    author: 'user ' + i,
                    message: 'message ' + i,
                    date: Date.now() - (i * 1000000000)
                }
            });
        }
        request.post('/shout').send(shouts[0])
            .expect('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.body.echos).to.contain(shouts[0].shout);
            });
        request.post('/shout').send(shouts[1])
            .expect('content-type', 'application/json')
            .end(function(err, res) {
                expect(res.body.echos).to.contain(shouts[0].shout);
                expect(res.body.echos).to.contain(shouts[1].shout);
            });
        request.post('/shout').send(shouts[2])
            .expect('content-type', 'application/json')
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body.echos).to.contain(shouts[0].shout);
                expect(res.body.echos).to.contain(shouts[1].shout);
                expect(res.body.echos).to.contain(shouts[2].shout);
                done();
            });
    });

    it('should get only 5 message in the json', function(done) {

        var shout = {
            room: 'My beautiful room',
            shout: {
                author: 'John Doe',
                message: 'Lorem ipsum',
                date: Date.now()
            }
        };
        request
            .post('/shout').send(shout)
            .end(function(err, res) {
                request
                    .get('/shout/last')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('content-type', 'application/json')
                    .end(function(err, res) {
                        if (err) {
                            return done(err);
                        }
                        expect(res.body.echos.length).to.equal(5);
                        done();
                    });
            });
    });
});