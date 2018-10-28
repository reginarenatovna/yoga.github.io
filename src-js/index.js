window.addEventListener('DOMContentLoaded', function(){

'use strict';
let tabs = require('./parts/tabs.js'),
		form = require('./parts/form.js'),
		timer = require('./parts/timer.js'),
		modal = require('./parts/modal.js'),
		slider = require('./parts/slider.js'),
		calc = require('./parts/calc.js');
tabs();
form();
timer();
modal();
slider();
calc();
});
