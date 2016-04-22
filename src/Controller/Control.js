
/**
 * Controller control
 */
var ControllerControl = function() {
    this._controller = null;
};

ControllerControl.prototype = {
    setController: function(controller) {
        this._controller = controller;
    },

    getController: function() {
        return this._controller;
    },

    bind: function(target) {
        throw new Error('Must be implemented');
    }
};
