# jquery-jt - Javascript Template

A very and really fast and simple jquery template engine. A lot of attributes supported in only 1,2 KB (0,84 KB with gzip)

## Installation

```
npm install jquery-jt --save
```

## Include
```html
<script type="text/javascript" src="node_modules/jquery-jt/dist/jt.min.js"></script>
```

## Template attributes:

jQuery-jT uses the *data* attribute to define what every HTML tags will be managed:

* **data-jt-text**: appends text in the element
* **data-jt-class**: adds attribute to the element
* **data-jt-link**: set href attribute of the element
* **data-jt-src**: set src attribute of the element
* **data-jt-alt**:  set alt attribute of the element
* **data-jt-data**:  set data attribute of the element
* **data-jt-title**:  set title attribute of the element

## Fully example
```html
[...]

<!-- The container of rendered template  -->
<div id="container"></div>

<!-- Template definition -->
<div id="template">
    <a data-jt="hello"
       data-jt-src="hello_source"
       data-jt-title="tooltip"
       data-jt-alt="hello_alternative"
       data-jt-link="lang"
       data-jt-class="color"></a>
</div>

<script>
    // Configuration of jT
    $(function () {
        $("#template").jt({
            destination: "#container",
            data: [
                {
                    hello: "Hello world!",
                    hello_source: "en",
                    tooltip: "Hello world",
                    hello_alternative: "Hello",
                    lang: "#en",
                    color: "black"
                },
                [...]
            ],
            beforeRender: [
                function ($template, item) {
                    $template.append(item.hello_source);
                    return $template;
                }
            ]
        });
    });
</script>

[...]
```

The result will be:

```html

<div id="template">
    <a src="en" title="Hello world" alt="Hello" href="#en" class="black">Hello world!</a>
en
[...]
</div>

```

## Configuration

* **template** (string - default value: undefined): the selector of the element containing the template. Use it only for the subConfiguration.
* **destination** (string - default value undefined): the selector of the element which will contain the rendered template.
* **data** (array/object - default value []): the data to render using template. 
* **subConfiguration** (array of configurations/configuration - default value []): jquery-jt supports sub template
* **beforeRender** (array of functions/ function - default value []): the signature is "*function($template: JQuery, item: any)*". Every functions will be called before render the template for each item in data. *$template* is the template jQuery element and *record* is the current item of the data.
* **afterRender** (array of functions/ function - default value []): the signature is "*function($template: JQuery, item: any)*". Every functions will be called after render the template for each item in data. *$template* is the template jQuery element and *record* is the current item of the data.

## Examples

To see other examples navigate to the project folder "_test/html_". 

## Browsers support

All the browsers supported by you jQuery version is supported by jQuery-jT library. 

## How to contribute

If you are reading this it's already a good sign and we are thankful for it!
Every kind of helps are welcomed: code, documentation, testing...

To contribute to the project follow these simple steps:
* Install _npm_
* Install _DalekJS_:
```
npm install dalek-cli -g
```
* Clone the repository:
```
git clone https://github.com/MpStyle/jt.git
```
* In the root of the project run:
```
npm install
```
* To build the library run:
```
grunt
```
* To run the tests:
```
npm test
```
* Create a pull request.

## History

* 1.0.2: Updated documentation and project files, created automatic tests
* 1.0.1: Updated documentation and package.json
* 1.0.0