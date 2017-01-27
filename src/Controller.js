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
 * Controller for apply controls
 */
var Controller = function() {
    this._controls = []; // private
};

Controller.prototype = {
    registerControl: function(name, control) {
        if (control instanceof ControllerControl) {
            this._controls[name] = control;
        }

        return this;
    },

    bindControl: function(target) {
        // separate the control names by ' ' or ','
        var names = target.data('control').replace(/[, ]+/g, ' ').split(' ');

        for (var i = 0; i < names.length; i++) {
            if (this._controls[names[i]] instanceof ControllerControl) {
                this._controls[names[i]].bind(target);
            }
        }

        return this;
    },

    bind: function(target) {
        target = $(target || 'body');

        if (target.data('control')) {
            this.bindControl(target);
        } else {
            var that = this;
            target.find('[data-control]').each(function () {
                that.bindControl($(this));
            });
        }

        return this;
    }
};
