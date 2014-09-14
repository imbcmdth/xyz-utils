# XYZ-UTILS

A simple set of functions to convert between XYZ and other color spaces (currently, supports `RGB` and `xyY`). All pixels are floating point to support high dynamic range imaging.

## Contents

* [Installation](#install)

* [Basic Usage](#basic-usage)

* [API](#api)

* [Versions](#versions)

* [License](#license---mit)

## Install

````bash
npm install xyz-utils
````

..then `require` xyz-utils:

````javascript
var xyzUtils = require('xyz-utils');
````

## Basic Usage

```javascript
var xyzUtils = require('xyz-utils');

var rgbColor = [1.2, 22.5, 1.9];

var xyzColor = xyzUtils.fromRGB(rgbColor);

xyzUtils.toRGB(xyzColor); //=> [1.2, 22.5, 1.9]
```

## API

All functions are of the format: `outputArray = function (inputColorArray[, outputArray])`. All "from\*" functions return XYZ and all "to\*" functions expect XYZ.

Current functions are:

* toRGB
* fromRGB
* toxyY
* fromxyY
* toLuv
* fromLuv

## Versions

* [v0.5.1](https://github.com/imbcmdth/xyz-utils/archive/v0.5.1.zip) Allows an optional second argument for an array to fill to avoid allocating tons of little arrays in hot loops
* [v0.5.0](https://github.com/imbcmdth/xyz-utils/archive/v0.5.0.zip) Initial public release

## License - MIT

> Copyright (C) 2013 Jon-Carlos Rivera
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
