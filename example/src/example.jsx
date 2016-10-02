import React from 'react';
import ReactDOM from 'react-dom';
import { MultiDrag, MultiDrop } from '../../src/React-MultiDrag';

function onDrop(keys) {
	let msg = "Nothing was dropped"
	if (keys.length) {
		msg = "Dropped " + keys.join(', ');
	}
	document.getElementById('dropped').textContent = msg;
}

ReactDOM.render(
	<div>
		<span className="title">Dragging Area, use ctrl key for multiselection:</span>
		<MultiDrag className="drag">
			<div className="md-item" mdKey="banana">Banana</div>
			<div className="md-item" mdKey="apple">Apple</div>
			<div className="md-item" mdKey="orange">Orange</div>
			<div className="md-item" mdKey="cherry">Cherry</div>
			<div className="md-disabled">Disabled</div>
		</MultiDrag>
		<span className="title">Dropping Area:</span>
		<MultiDrop className="md-container" mdOnDrop={onDrop}>
			<span id="dropped"></span>
		</MultiDrop>
	</div>,
	document.getElementById('container')
);