# js-controller
Micro framework for JavaScript

## Require

jQuery 1.11+

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
var cont = new Controller();
cont.addControl('form-date', new ControlFormDate());

$(function(){
    cont.bind();
});
```

Use in HTML

```html
<!-- ... -->

<script src="js/js-controller/build/controller.min.js"></script>
<script src="js/ControlFormDate.js"></script>
<script src="js/common.js"></script>

<!-- ... -->

<form>
    <input type="date" name="date" data-control="form-date" />
    <button type="submit">Submit</button>
</form>
```

## Rebind

You can bind the added controls for a new content:

```js
var content = $('<input type="date" name="date" data-control="form-date" />');
cont.bind(content);
$('body').append(content);
```

## Locker util

Util for lock page and element on page.

```js
var lock = new Locker();
lock.lock(); // add css class 'locker_wait' to body tag
lock.isLock(); // return true
lock.unlock(); // remove class 'locker_wait'
```

Lock element

```js
var el = $('.example');
var lock = new Locker();
lock.lock(el); // add class 'locker_wait' to body and add class 'locker_lock' to element
lock.unlock(el); // remove all added classes
```
