/**
 * GpsLab Controller
 * https://github.com/gpslab/gpslab-controller
 *
 * Copyright 2019 by Peter Gribanov (http://peter-gribanov.ru)
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */


(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    // CommonJS/Node module
    module.exports = factory();
  } else {
    // Browser globals
    global.Controller = factory();
  }
}(typeof window !== 'undefined' ? window : this, function () {

  /**
   * @type {Object.<string, Function>}
   */
  const registry = [];

  class Controller {
    /**
     * Bind all controls for all elements after content loaded.
     */
    static register() {
      document.addEventListener('DOMContentLoaded', () => {
        Controller.bind(document.getElementsByTagName('body').item(0));
      });
    }

    /**
     * Register control by name.
     * @param {string} name
     * @param {Function} control
     * @returns {boolean}
     */
    static registerControl(name, control) {
      if (typeof control === 'function') {
        registry[name] = control;

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
     * @param {Element} element
     * @returns {boolean}
     */
    static singleBind(element) {
      if (!(element instanceof Element)) {
        throw new Error(`The element to be binding must be instance of Element, now it's "${typeof element}".`);
      }

      if (!element.getAttribute('data-control')) {
        return false;
      }

      // separate the control names by ' ' or ','
      const control_names = element.getAttribute('data-control').replace(/[, ]+/g, ' ').split(' ');

      let binded = false;
      // find control by name
      for (let i = 0; i < control_names.length; i++) {
        if (typeof registry[control_names[i]] === 'function') {
          registry[control_names[i]](element);
          binded = true;
        }
      }

      return binded;
    }

    /**
     * Find the controls in element and children elements and binding it.
     * @param {Element} element
     * @returns {boolean}
     */
    static bind(element) {
      if (!(element instanceof Element)) {
        throw new Error(`The element to be binding must be instance of Element, now it's "${typeof element}".`);
      }

      let binded = Controller.singleBind(element);

      element.querySelectorAll('[data-control]').forEach((control) => {
        Controller.singleBind(control);
        binded = true;
      });

      return binded;
    }
  }

  return Controller;
}));
