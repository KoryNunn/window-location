var grape = require('grape'),
    Window = require('../window'),
    url = require('url'),
    testUrl = 'http://localhost:8080/things/0/stuff/0?whatsits=1#majiggers';

grape('set location', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.toString(), testUrl);
});

grape('set location from pathname', function(t){
    t.plan(1);

    var win = new Window();

    win.location = url.parse(testUrl).pathname;

    t.equal(win.location.toString(), url.parse(testUrl).pathname);
});

grape('pathname sets', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.pathname, url.parse(testUrl).pathname);
});

grape('get pathname from pathname', function(t){
    t.plan(1);

    var win = new Window();

    win.location = url.parse(testUrl).pathname;

    t.equal(win.location.pathname, url.parse(testUrl).pathname);
});

grape('get port', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.port, url.parse(testUrl).port);
});

grape('get protocol', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.protocol, url.parse(testUrl).protocol);
});

grape('get hostname', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.hostname, url.parse(testUrl).hostname);
});

grape('get search', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.search, url.parse(testUrl).search);
});

grape('get hash', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.hash, url.parse(testUrl).hash);
});

grape('onhashchange', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    win.onhashchange = function(){
        t.pass();
    };

    win.location.hash = 'things';
});

grape('addEventListener hashchange', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    win.addEventListener('hashchange', function(){
        t.pass();
    });

    win.location.hash = 'things';
});