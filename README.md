React-MultiDrag
===============

[![Build Status](https://travis-ci.org/jconde/react-multidrag.svg?branch=master)](https://travis-ci.org/jconde/react-multidrag)

React component that allows easy multi selected drag and drop. Multiselection is
achieved by pressing Ctrl key and the behavior emulates the standard WM icon
selection behavior.

Try quick [demo](https://jconde.github.io/react-multidrag/example/dist/).


Usage
-----
```javascript
import { MultiDrag, MultiDrop } from '../../src/React-MultiDrag';

ReactDOM.render(
	<div>
		<span>Dragging Area:</span>
		<MultiDrag>
			<div mdKey="item 1">Item 1</div>
			<div mdKey="item 2">Item 2</div>
			<div>Item 3</div>
		</MultiDrag>
		<span>Dropping Area:</span>
		<MultiDrop mdOnDrop={(keys) => alert(keys.join(', ')) + ' dropped')}/>
	</div>,
	document.getElementById('container')
);
```

* ```mdKey``` on ```MultiDrag``` children represents the item key that will be
	passed to ```mdOnDrop``` when the item is active and dropped in the area.
* ```mdOnDrop``` on ```MultiDrop``` will be the callback that receives the array
	of mdKeys that have been selected and dropped into the area.

Note that ```Item 3``` does not have mdKey in the above list, that means that
item will be rendered as is and won't be draggable or selectable.

There are two classes in CSS that will determine the style of the items when
they are selected in ```MultiDrag``` and the ```MultiDrop``` area style when
dragging over:

```css
/* WILL DETERMINE STYLE WHEN DRAGGING OVER */
.md-dragging {
	border: 1px dotted;
}
/* WILL DETERMINE STYLE WHEN ACTIVE IN DRAGGING LIST */
.md-active {
	background: #DDDDFF;
}
```


Running example
---------------
In order to run the attached example follow the steps:
* ```$ npm install```
* ```$ cd example```
* ```$ webpack-dev-server```
* Open http://localhost:8080 in your browser