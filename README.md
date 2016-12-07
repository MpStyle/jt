# jT - Javascript Template

Javascript Template Engine. Fast and simple. A lot of attributes supported in only 1,5 KB

## Include
```html
<script type="text/javascript" src="dist/jquery-mtemplatejs.min.js"></script>
```

## Template attributes:
* data-jt-text
* data-jt-class
* data-jt-href
* data-jt-src
* data-jt-alt
* data-jt-data
* data-jt-title

## Fully example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test 2</title>
    <script src="jquery.min.js"></script>
    <script src="jt.js"></script>
</head>
<body>

<script>
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
                {
                    hello: "Ciao mondo",
                    hello_source: "it",
                    tooltip: "Ciao mondo",
                    hello_alternative: "Ciao",
                    lang: "#it",
                    color: "red"
                },
                {
                    hello: "aaa",
                    hello_source: "bbb",
                    tooltip: "ccc",
                    hello_alternative: "ddd",
                    lang: "eee",
                    color: "fff"
                }
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

<div id="container"></div>

<div id="template">
    <a data-jt="hello"
       data-jt-src="hello_source"
       data-jt-title="tooltip"
       data-jt-alt="hello_alternative"
       data-jt-link="lang"
       data-jt-class="color"></a>
</div>

</body>
</html>
```

# Development
- Clone the repository
- Install NPM
- In the root of the project run:
```
npm install
```
To build run:
```
grunt
```

# History

### 1.0.0