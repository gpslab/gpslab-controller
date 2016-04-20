# js-controller
Micro framework for JavaScript

## How to

Create control
```js
// FormDate.js
var FormDate = function() {
};

extend(FormDate, ControllerControl);

FormDate.prototype.bind = function(target) {
    target.datepicker({dateFormat: 'yy-mm-dd'});
};
```

Add new control to controller

```js
// common.js
var Container = {}; // access to Controller from global namespace

$(function(){
    // is not required
    //Container.FormToken = new FormToken();
    //Container.Locker = new Locker();

    Container.Controller = new Controller();
    Container.Controller.addControl('form-date', new FormDate());
    Container.Controller.bind();
});
```

Use in HTML

```html
<!-- ... -->

<script src="js/js-controller/build/controller.min.js"></script>
<script src="js/FormDate.js"></script>
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
Container.Controller.bind(content);
$('body').append(content);
```
