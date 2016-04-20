function extend(Child, Parent) {
    var F = function() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

var Controller = function() {
    this._controls = []; // private
};

Controller.prototype.addControl = function(name, control) {
    if (control instanceof ControllerControl) {
        control.setController(this);
        this._controls[name] = control;
    }
};

Controller.prototype.bindControl = function(target) {
    var name = target.data('control');
    if (this._controls[name] instanceof ControllerControl) {
        this._controls[name].bind(target);
    }
};

Controller.prototype.bind = function(target) {
    target = $(target || 'body');

    if (target.data('control')) {
        this.bindControl(target);
    } else {
        var that = this;
        target.find('[data-control]').each(function () {
            that.bindControl($(this));
        });
    }
};

var ControllerControl = function() {
};

ControllerControl.prototype.setController = function(controller) {
};

ControllerControl.prototype.bind = function(target) {
    throw new Error('Must be implemented');
};

var FormToken = function() {
    this._token = ''; // private
    this._url = ''; // private
    this._wait = false; // private
};

FormToken.prototype.getToken = function() {
    return this._token;
};

FormToken.prototype.setUrl = function(url) {
    this._url = url;
    if (url && !this._token) {
        this.refreshToken();
    }
};

FormToken.prototype.refreshToken = function(callback) {
    if (!this._wait && this._url) {
        this._wait = true;
        var that = this;
        $.ajax({
            url: this._url,
            type: 'POST',
            dataType: 'text',
            processData: false,
            contentType: false,
            success: function (response) {
                that._token = response;
                that._wait = false;
                (callback || function () {})();
            },
            complete: function() {
                that._wait = false;
            }
        });
    }
};

var Locker = function() {
    this._is_lock = false; // private
    this._body = $('body'); // private
};

Locker.prototype.lock = function(el) {
    this._is_lock = true;
    this._body.addClass('locker_wait');
    if (el) {
        el.addClass('locker_lock');
    }
};

Locker.prototype.unlock = function(el) {
    this._is_lock = false;
    this._body.removeClass('locker_wait');
    if (el) {
        el.removeClass('locker_lock');
    }
};

Locker.prototype.isLock = function()
{
    return this._is_lock;
};
