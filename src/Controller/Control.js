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
 * Controller control
 */
var ControllerControl = function() {
};

ControllerControl.prototype = {
    bind: function(target) {
        throw new Error('Must be implemented');
    }
};
