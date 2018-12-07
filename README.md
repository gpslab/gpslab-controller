GpsLab Controller is a JavaScript micro framework
=============================================

[![NPM](https://nodei.co/npm/gpslab-controller.png?downloads=true&stars=true)](https://nodei.co/npm/gpslab-controller/)

## Require

jQuery 1.11+

## Installation

```
$ npm install gpslab-controller
```

## How to

Create control

```js
// ControlFormDate.js
var ControlFormDate = function() {
};

extend(ControlFormDate, ControllerControl);

ControlFormDate.prototype.bind = function(target) {
    target.datepicker({dateFormat: 'yy-mm-dd'});
};
```

Add new control to controller

```js
// common.js
$(function() {
    var Container = {
        Controller: new Controller()
    }

    Container.Controller.registerControl('form-date', new ControlFormDate());
    Container.Controller.bind();
});
```

Use in HTML

```html
<!-- ... -->

<script src="/node_modules/gpslab-controller/src/Controller/Control.js"></script>
<script src="/node_modules/gpslab-controller/src/Controller.js"></script>
<script src="/node_modules/gpslab-controller/src/util/extend.js"></script>
<script src="/js/ControlFormDate.js"></script>
<script src="/js/common.js"></script>

<!-- ... -->

<form>
    <!-- add Datepicker for this element -->
    <input type="date" name="date" data-control="form-date" />
    <button type="submit">Submit</button>
</form>
```

## Rebind

You can bind the added controls for a new content:

```js
var input = $('<input type="date" name="date" data-control="form-date" />');
$('body').append(input);

Container.Controller.bind(input);
```

## Multi controls

You can bind several controls to one DOM element.
Use spaces (` `) or commas (`,`) for separate control names in the `data` attribute.

```html
<form>
    <input
        type="date"
        name="date"
        required="required"
        data-control="form-date form-required form-related"
        data-related-target="#date_related"
    />
    <input type="date" name="date_related" data-control="form-date" id="date_related" />
    <button type="submit">Submit</button>
</form>
```

## Best practice

### Combine files

Will be better combine all JS files to one file.
You can use [grunt-concat](https://www.npmjs.com/package/grunt-concat) and
[grunt-contrib-uglify](https://www.npmjs.com/package/grunt-contrib-uglify) for it.

### Control container

Will be better create new control container on bind control

```js
// ControlLockContainer.js
var ControlLockContainer = function(target, locker) {
    this._target = target; // private
    this._locker = locker; // private

    var that = this;
    this._target.keydown(function() {
        that.lock();
    }).keyup(function() {
        that.unlock();
    });
};

ControlLockContainer.prototype = {
    lock: function() {
        this._locker.lock(this._target);
    },

    unlock: function() {
        this._locker.unlock(this._target);
    }
};
```

```js
// ControlLock.js
var ControlLock = function(locker) {
    this._locker = locker; // private
};

extend(ControlLock, ControllerControl);

ControlLock.prototype.bind = function(target) {
    new ControlLockContainer(target, this._locker);
};
```

### Rebind

On mouse click to target element append to it new data input element and bind to it `ControlFormDate` control.

```js
// ControlAppendContainer.js
var ControlAppendContainer = function(target, element, controller) {
    this._target = target; // private
    this._element = element; // private
    this._controller = controller; // private

    var that = this;
    this._target.click(function() {
        that.append();
    });
};

ControlAppendContainer.prototype = {
    append: function() {
        var el = this._element.clone();
        this._controller.bind(el);
        this._target.append(el);
    }
};
```

```js
// ControlAppend.js
var ControlAppend = function(element, controller) {
    this._element = $(element); // private
    this._controller = controller; // private
};

extend(ControlLock, ControlAppend);

ControlAppend.prototype.bind = function(target) {
    new ControlAppendContainer(target, this._element, this._controller);
};
```

```js
// common.js
$(function() {
    var Container = {
        Controller: new Controller(),
    }

    Container.Controller.registerControls({
        'form-date': new ControlFormDate(),
        'append': new ControlAppend('<input type="date" name="date" data-control="form-date" />', Container.Controller)
    });
    Container.Controller.bind();
});
```

Use in HTML

```html
<!-- ... -->

<script src="/node_modules/gpslab-controller/src/Controller/Control.js"></script>
<script src="/node_modules/gpslab-controller/src/Controller.js"></script>
<script src="/node_modules/gpslab-controller/src/util/extend.js"></script>
<script src="/js/ControlAppendContainer.js"></script>
<script src="/js/ControlAppend.js"></script>
<script src="/js/ControlFormDate.js"></script>
<script src="/js/common.js"></script>

<!-- ... -->

<button type="button" data-control="append">Append</button>
```

## License

This bundle is under the [MIT license](http://opensource.org/licenses/MIT). See the complete license in the file: LICENSE
