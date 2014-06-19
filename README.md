# ng-Complete

A simple autocompler directive for Angular.

## These are not Examples

+ [Example Plunkers - Simple Usage](http://plnkr.co/edit/GE34ojss9xMGm0024FvM?p=preview)

+ [Example Plunkers - Advanced Usage](http://plnkr.co/edit/GF3nM3XfYX9El2w11pGo?p=preview)

## Usage

Include the required libraries 
```html
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>
```

Declare a dependency on the `ngAutocomplete` module
``` javascript
var app = angular.module('myModule', ['ngAutocomplete']);
```

Add the directive to a textbox

``` javascript
<input type="text"  ng-autocomplete ng-model="value" source="https://www.example.com/json?q={{value}}"/>
```

## Documentation

+ ng-model - autocomplete textbox value

+ source - use this to configure your url

## Authors

**Will Wettersten** (http://github.com/wbw20)

**Will Palahnuk** (http://github.com/wpalahnuk)

## Copyright and license

    The MIT License

	Copyright (c) 2014 Will Palahnuk

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
