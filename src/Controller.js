
/**
 * Controller for apply controls
 */
var Controller = function(locker) {
    this._locker = locker; // private
    this._controls = []; // private
};

Controller.prototype = {
    addControl: function(name, control) {
        if (control instanceof ControllerControl) {
            control.setController(this);
            this._controls[name] = control;
        }
        return this;
    },

    bindControl: function(target) {
        var name = target.data('control');
        if (this._controls[name] instanceof ControllerControl) {
            this._controls[name].bind(target);
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
    },

    getLocker: function() {
        return this._locker;
    }
};
