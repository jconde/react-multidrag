import React from 'react';

export class MultiDrag extends React.Component {

	constructor(props) {
		super(props);
		
		this.mouseDown = this.mouseDown.bind(this);
		this.mouseUp = this.mouseUp.bind(this);
		this.dragStart = this.dragStart.bind(this);
		this.keyDownListener = this.keyDownListener.bind(this);
		this.keyUpListener = this.keyUpListener.bind(this);
		
		this.state = { selected: new Set(), ctrl: false, removing: false };
		
		window.addEventListener('keydown', this.keyDownListener);
		window.addEventListener('keyup', this.keyUpListener);
	}
	
	componentWillUnmount() {
		// Removing listeners when the component gets unmounted
		window.removeEventListener('keydown', this.keyDownListener);
		window.removeEventListener('keyup', this.keyUpListener);
	}

	shouldComponentUpdate(nextProps) {
		// If elements change, selection gets cleared
		if (this.props.children != nextProps.children)
			this.state.selected.clear();
		return true;
	}
	
	keyDownListener(e) {
		if (e.keyCode == 17)
			this.setState({ ctrl: true });
	}
	
	keyUpListener(e) {
		if (e.keyCode == 17)
			this.setState({ ctrl: false });
	}
	
	mouseDown(id) {
		if (this.state.selected.has(id)) {
			this.setState({ removing: true });
		} else {
			if (this.state.ctrl) {
				let newSelected = this.state.selected;
				newSelected.add(id);
				this.setState({ selected: newSelected });
			} else
				this.setState({ selected: new Set([id]) });
		}
	}
	
	mouseUp(id) {
		if (this.state.removing) {
			if (this.state.ctrl) {
				let newSelected = this.state.selected;
				newSelected.delete(id);
				this.setState({ selected: newSelected });
			} else
				this.setState({ selected: new Set([id]) });
			this.setState({ removing: false });
		}
	}
	
	dragStart(e) {
		e.dataTransfer.setData('selected', JSON.stringify(Array.from(this.state.selected)));
	}

	render() {
		return <div
			className={this.props.className}
			onDragStart={this.dragStart}
			onDragOver={this.dragOver}
		>
			{
				React.Children.map(this.props.children, (child) => {
					if (child.props.mdKey) {
						let className = child.props.className + (this.state.selected.has(child.props.mdKey) ? ' md-active' : '');
						return React.cloneElement(child, { 
							onMouseDown: () => this.mouseDown(child.props.mdKey),
							onMouseUp: () => this.mouseUp(child.props.mdKey),
							className,
							draggable: true,
							mdKey: undefined
						});
					} else
						return React.cloneElement(child);
				})
			}
		</div>;
	}

}


export class MultiDrop extends React.Component {

	constructor(props) {
		super(props);
		
		this.drop = this.drop.bind(this);
		this.dragOver = this.dragOver.bind(this);
		this.dragEnter = this.dragEnter.bind(this);
		this.dragLeave = this.dragLeave.bind(this);
		
		this.state = { draggingOver: 0 };
	}
	
	dragOver(e) {
		e.preventDefault();
		e.stopPropagation();
		e.dataTransfer.dropEffect = 'move';
		return false;
	}
	
	dragEnter(e) {
		this.setState({ draggingOver: ++this.state.draggingOver });
	}
	
	dragLeave(e) {
		this.setState({ draggingOver: --this.state.draggingOver });
	}

	drop(e) {
		e.preventDefault();
		let keys =	JSON.parse(e.dataTransfer.getData('selected'));
		this.props.mdOnDrop(keys);
		this.setState({ draggingOver: 0 });
	}

	render() {
		const containerClass = this.state.draggingOver > 0 ? 
			this.props.className + ' md-dragging' : this.props.className;
		return <div
			className={containerClass}
			onDrop={this.drop}
			onDragEnd={this.dragEnd}
			onDragOver={this.dragOver}
			onDragEnter={this.dragEnter} 
			onDragLeave={this.dragLeave}
		>
			{this.props.children}
		</div>;
	}

}