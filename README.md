js-controller is a JavaScript micro framework
=============================================

## Require

jQuery 1.11+

## How to

Create control

```js
// ControlFormDate.js
var ControlFormDate = function() {
};

$.extend(ControlFormDate, ControllerControl);

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

    Container.Controller.addControl('form-date', new ControlFormDate());
    Container.Controller.bind();
});
```

Use in HTML

```html
<!-- ... -->

<script src="/js/js-controller/build/controller.min.js"></script>
<script src="/js/ControlFormDate.js"></script>
<script src="/js/common.js"></script>

<!-- ... -->

<form>
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

## Locker util

Util for lock page and element on page.

```js
var Container = {
    Locker: new Locker()
}
Container.Locker.lock(); // add css class 'locker_wait' to body tag
Container.Locker.isLock(); // return true
Container.Locker.unlock(); // remove class 'locker_wait'
```

Lock element

```js
var Container = {
    Locker: new Locker()
}

var el = $('.example');
Container.Locker.lock(el); // add class 'locker_wait' to body and add class 'locker_lock' to element
Container.Locker.unlock(el); // remove all added classes
```

### Use locker from control

```js
// ControlLock.js
var ControlLock = function(locker) {
    this._locker = locker;
};

$.extend(ControlLock, ControllerControl);

ControlLock.prototype.bind = function(target) {
    var that = this;
    target.keydown(function() {
        that._locker.lock(target);
    }).keyup(function() {
        that._locker.unlock(target);
    });
};
```

```js
// common.js
$(function() {
    var Container = {
        Controller: new Controller(),
        Locker: new Locker()
    }

    Container.Controller.addControl('lock', new ControlLock(Container.Locker));
    Container.Controller.bind();
});
```

Use in HTML

```html
<!-- ... -->

<script src="/js/js-controller/build/controller.min.js"></script>
<script src="/js/js-controller/build/locker.min.js"></script>
<script src="/js/ControlLock.js"></script>
<script src="/js/common.js"></script>

<!-- ... -->

<button type="button" data-control="lock">Lock me</button>
```

## Best practice

### Control container

Will be better create new control container on bind control

```js
// ControlLockContainer.js
var ControlLockContainer = function(target, locker) {
    this._target = target;
    this._locker = locker;

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
    this._locker = locker;
};

$.extend(ControlLock, ControllerControl);

ControlLock.prototype.bind = function(target) {
    new ControlLockContainer(target, this._locker);
};
```

### Combine files

Will be better combine all JS files to one file.
You can use [grunt-concat](https://www.npmjs.com/package/grunt-concat) and
[grunt-contrib-uglify](https://www.npmjs.com/package/grunt-contrib-uglify) for it.

## License

This bundle is under the [MIT license](http://opensource.org/licenses/MIT). See the complete license in the file: LICENSE
