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


(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module !== "undefined" && module.exports) {
    // CommonJS/Node module
    module.exports = factory();
  } else {
    // Browser globals
    root.Controller = factory();
  }
}(this, function () {

  const registeredControls = [];

  class Controller {
    /**
     * Register control by name.
     * @param {string} name
     * @param {Function} control
     * @returns {boolean}
     */
    static registerControl(name, control) {
      if (typeof control === 'function') {
        registeredControls[name] = control;

        return true;
      }

      return false;
    }

    /**
     * Register multiple controls at the same time.
     * @param {Object.<string, Function>} controls
     * @returns {boolean}
     */
    static registerControls(controls) {
      for (const name in controls) {
        if (controls.hasOwnProperty(name)) {
          Controller.registerControl(name, controls[name]);
        } else {
          return false;
        }
      }

      return true;
    }

    /**
     * Binding the control for single specific element.
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    static singleBind(element) {
      // separate the control names by ' ' or ','
      const names = element.getAttribute('control').replace(/[, ]+/g, ' ').split(' ');

      let binded = false;
      // find control by name
      for (let i = 0; i < names.length; i++) {
        if (typeof registeredControls[names[i]] === 'function') {
          registeredControls[names[i]](element);
          binded = true;
        }
      }

      return binded;
    }

    /**
     * Find the controls in element and children elements and binding it.
     * @param {?HTMLElement} [element=null]
     * @returns {boolean}
     */
    static bind(element) {
      element = element || document.getElementsByTagName('body')[0];

      let binded = false;
      if (element.getAttribute('control')) {
        binded = Controller.singleBind(element);
      }

      element.querySelectorAll('[data-control]').forEach((control) => {
        Controller.singleBind(control);
        binded = true;
      });

      return binded;
    }
  }

  return Controller;
}));
