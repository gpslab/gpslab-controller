/**
 * GpsLab Controller
 * https://github.com/gpslab/js-controller
 *
 * Copyright 2017, Peter Gribanov
 * http://peter-gribanov.ru
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/**
 * Util for lock page and element on page
 */
var Locker = function() {
    this._is_lock = false; // private
    this._body = $('body'); // private
};

Locker.prototype = {
    lock: function(el) {
        this._is_lock = true;
        this._body.addClass('locker_wait');
        if (el) {
            el.addClass('locker_lock');
        }
    },

    unlock: function(el) {
        this._is_lock = false;
        this._body.removeClass('locker_wait');
        if (el) {
            el.removeClass('locker_lock');
        }
    },

    isLock: function()
    {
        return this._is_lock;
    }
};
