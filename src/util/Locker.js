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
