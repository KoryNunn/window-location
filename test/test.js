var grape = require('grape'),
    Window = require('../window'),
    url = require('url'),
    testUrl = 'http://localhost:8080/things/0/stuff/0?whatsits=1#majiggers',
    urlParts = url.parse(testUrl);

grape('set location', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.toString(), testUrl);
});

grape('set location from pathname', function(t){
    t.plan(1);

    var win = new Window();

    win.location = urlParts.pathname;

    t.equal(win.location.toString(), urlParts.pathname);
});

grape('pathname sets', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.pathname, urlParts.pathname);
});

grape('set pathname resolves to url', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    win.location.pathname = '/stuff';

    t.equal(win.location.toString(), urlParts.protocol + '//' + urlParts.host + '/stuff');
});

grape('get pathname from pathname', function(t){
    t.plan(1);

    var win = new Window();

    win.location = url.parse(testUrl).pathname;

    t.equal(win.location.pathname, urlParts.pathname);
});

grape('get port', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.port, urlParts.port);
});

grape('get protocol', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.protocol, urlParts.protocol);
});

grape('get hostname', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.hostname, urlParts.hostname);
});

grape('get search', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.search, urlParts.search);
});

grape('get hash', function(t){
    t.plan(1);

    var win = new Window();

    win.location = testUrl;

    t.equal(win.location.hash, urlParts.hash);
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