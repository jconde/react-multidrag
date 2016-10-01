import jsdom from 'jsdom';
import chai from 'chai';
import EventEmitter from 'events';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

const windowClass = class extends EventEmitter {
	constructor() {
		super(doc.defaultView);
		this.__defineSetter__('onkeydown', f => this.on('keydown', f));
		this.__defineSetter__('onkeyup', f => this.on('keyup', f));
	}
	addEventListener (e,f) {
		this.on(e,f);
	}
};

const win = new windowClass();

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
