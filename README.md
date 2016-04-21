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
var cont = new Controller();
cont.addControl('form-date', new FormDate());

$(function(){
    cont.bind();
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
cont.bind(content);
$('body').append(content);
```