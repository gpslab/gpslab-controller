/**
 * GpsLab Controller
 * https://github.com/gpslab/gpslab-controller
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
var Locker = function(options) {
    this._is_lock = false; // private
    this._body = $('body'); // private
    this._options = $.extend({
        body_class: 'locker_wait',
        element_class: 'locker_lock'
    }, options || {}); // private
};

Locker.prototype = {
    lock: function(el, el_class) {
        this._is_lock = true;
        this._body.addClass(this._options.body_class);
        if (el) {
            el.addClass(el_class || this._options.element_class);
        }
    },

    unlock: function(el, el_class) {
        this._is_lock = false;
        this._body.removeClass(this._options.body_class);
        if (el) {
            el.removeClass(el_class || this._options.element_class);
        }
    },

    isLock: function()
    {
        return this._is_lock;
    }
};
