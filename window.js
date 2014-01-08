var url = require('url');

function updateLocationValues(location, propertyName){
    if(location._updating){
        return;
    }
    location._updating = true;
    if(propertyName === 'href'){
        var locationParts = url.parse(location.href);

        if(locationParts){
            for(var key in locationParts){
                if(locationParts.hasOwnProperty(key)){
                    location[key] = locationParts[key];
                }
            }
        }
        delete location._updating;
        return;
    }

    var host = location.hostname + (location.port ? ':' + location.port : '');

    location.origin = location.protocol + '//' + host;

    location.path = location.pathname + location.search + location.hash;

    location.href = location.origin + location.path;

    delete location._updating;
}

var locationProperties = ['host', 'hostname', 'href', 'origin', 'pathname', 'port', 'protocol', 'search', 'hash'];
function Location(window){
    var location = this;
    for(var i = 0; i < locationProperties.length; i++) {
        (function(){
            var prop = locationProperties[i],
                propValue = '';

            Object.defineProperty(location, prop, {
                get: function(){
                    return propValue || '';
                },
                set: function(value){
                    if(prop === 'href'){
                        value = url.resolve(location.href, value);
                    }
                    propValue = value;
                    updateLocationValues(location, prop);
                    if(prop === 'hash'){
                        window._emit('hashchange');
                    }
                }
            });
        }());
    }
}
Location.prototype.toString = function(){
    return this.href;
};

function Window(){
    this._events = {};
    this._location = new Location(this);
    Object.defineProperty(this, 'location', {
        get: function(){
            return this._location;
        },
        set: function(value){
            this._location.href = value;
        }
    });
}
Window.prototype.addEventListener = function(eventName, callback){
    this._events[eventName] = this._events[eventName] || [];
    this._events[eventName].push(callback);
};
Window.prototype._emit = function(eventName, event){
    if(this['on' + eventName]){
        this['on' + eventName](event);
    }
    if(this._events[eventName]){
        for(var i = 0; i < this._events[eventName].length; i++) {
            this._events[eventName][i](event);
        }
    }
};

module.exports = Window;