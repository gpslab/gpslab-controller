Controller
==========

[![NPM](https://nodei.co/npm/gpslab-controller.png?downloads=true&stars=true)](https://nodei.co/npm/gpslab-controller/)

GpsLab Controller is a JavaScript micro framework. This framework allow to dynamic bind some controls to DOM elements.

Controller find elements with attribute `data-control` and bind controls to this elements by control name from value
of `data-control` attribute. For example, you can bind [the jQuery datepicker](https://jqueryui.com/datepicker/) to
all date input tags and all input tags that will be added later. See the [Usage](#usage) section for more examples.

## Installation

Install from [NPM](https://nodei.co/npm/gpslab-controller/):

```
$ npm install gpslab-controller
```

Or download the script [here](https://github.com/gpslab/gpslab-controller/blob/master/src/controller.js) and include it (unless you are packaging scripts somehow else):

```html
<script src="/path/to/controller.js"></script>
```

Or include it via [jsDelivr CDN](https://www.jsdelivr.com/package/npm/gpslab-controller):

```html
<script src="https://cdn.jsdelivr.net/npm/gpslab-controller@2/src/controller.js"></script>
```

## Methods

The library exposes these methods: `registerControl()`, `registerControls()`, `singleBind()`, `bind()`.

### Controller.registerControl

Register control by name.

#### Arguments

1. `name` (**string**) Control name
2. `control` (**Function**) Control function

#### Returns

**boolean** : True, if the control is successfully registered.

* * *

### Controller.registerControls

Register multiple controls at the same time.

#### Arguments

1. `controls` (**Object.<string, Function>**) The list of controls whose keys are the names of the controls, and the values ​​are controls.

#### Returns

**boolean** : True, if all controls is successfully registered.

* * *

### Controller.singleBind

Binding the control for single specific element.

#### Arguments

1. `element` (**HTMLElement**) HTMLElement for binding.

#### Returns

**boolean** : True, if successfully binding the controls.

* * *

### Controller.bind

Find the controls in element and children elements and binding it.

#### Arguments

1. `element` (**HTMLElement**) HTMLElement for binding.

#### Returns

**boolean** : True, if successfully binding the controls.

## Usage

Create new control for bind [the jQuery datepicker](https://jqueryui.com/datepicker/) to input and register it in
controller:

```js
Controller.registerControl('form-date', element => $(element).datepicker({dateFormat: 'yy-mm-dd'}));

document.addEventListener('DOMContentLoaded', function() {
  Controller.bind(document.getElementsByTagName('body')[0]); // find input and bind datepicker control to it
});
```

Use in HTML:

```html
<form>
    <!-- after document loaded Datepicker will be binded to this element -->
    <input type="date" name="date" data-control="form-date">
    <button type="submit">Submit</button>
</form>
```

### Binding new elements

You can bind controls for a new added elements:

```js
const input = document.createElement('input');
input.setAttribute('type', 'date');
input.setAttribute('name', 'date');
input.setAttribute('data-control', 'form-date');

// add element to document first
// sometimes controls incorrectly works if you binding them before add element to a document
document.getElementById('my-form').appendChild(input);
// binding the controls
Controller.bind(input);
// or you can single bind specific element if you know for sure that there are no nested controls
//Controller.singleBind(input);
```

### Multi controls

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
    >
    <input type="date" name="date_related" data-control="form-date" id="date_related">
    <button type="submit">Submit</button>
</form>
```

### Use classes for controls

It will be better create new classes for define control and encapsulate all logic in them:

```js
class SomeControl {
  constructor(element, dependency) {
    this.element = element;
    this.dependency = dependency;

    this.element.onclick = () => this.onClick();
  }

  onClick() {
    // do something...
  }
}

Controller.registerControl('some', element => new SomeControl(element, dependency));
```

### Use data attributes

On mouse click to target element append to it new data input element and bind to it jQuery datepicker control:

```js
class AppendControl {
  constructor(element) {
    this.element = element;
    this.prototype_template = element.getAttribute('data-prototype').trim();

    this.element.onclick = () => this.append();
  }

  append() {
    // create element from HTML template
    const template = document.createElement('template');
    template.innerHTML = this.prototype_template;

    Controller.bind(this.element.appendChild(template.firstChild));
  }
}

Controller.registerControls({
    'form-date': element => $(element).datepicker({dateFormat: 'yy-mm-dd'}),
    'append': element => new AppendControl(element),
});
Controller.bind(document.getElementsByTagName('body')[0]);
```

Use in HTML:

```html
<button
    type="button"
    data-control="append"
    data-prototype="<input type='date' name='date' data-control='form-date' />"
>Append</button>
```

## Building

For contributors:

* Run `npm install` to install all the dependencies.
* Run `gulp`. The default task will build minify files.

For repo owners, after a code change:

* Run `npm version` to tag the new release.
* Run `npm login`, `npm publish` to release on npm.

## License

This bundle is under the [MIT license](http://opensource.org/licenses/MIT). See the complete license in the file: LICENSE
