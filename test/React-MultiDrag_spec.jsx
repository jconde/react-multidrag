import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import { expect } from 'chai';

import { MultiDrag, MultiDrop } from '../dist/React-MultiDrag';

describe('MultiDrag', () => {
	
	describe('Basic', () => {
	
	
		it('sets dragging initial state', () => {
			const component = renderIntoDocument(
				<MultiDrag/>
			);
			
			expect(component.state.selected.size).to.equal(0);
			expect(component.state.ctrl).to.equal(false);
		});
	
	
		it('renders the content', () => {
			const component = renderIntoDocument(
				<MultiDrag>
					<span>yay!</span>
				</MultiDrag>
			);
			
			const elements = scryRenderedDOMComponentsWithTag(component, 'span');
			
			expect(elements.length).to.equal(1);
			expect(elements[0].textContent).to.equal('yay!');
		});
	
	
		it('calls a function on drop', () => {
			
			let drop = '';
			const cb = elements => drop = elements;
			
			const component = renderIntoDocument(
				<MultiDrop mdOnDrop={cb}>
					<input type="text"/>
				</MultiDrop>
			);
			
			const target = scryRenderedDOMComponentsWithTag(component, 'input')[0];

			Simulate.drop(target, { dataTransfer: { getData: () => JSON.stringify(['Element 1']) } });
			
			expect(drop.length).to.equal(1);
			expect(drop[0]).to.equal('Element 1');
		});
		
		
		it('listens to keydown event', () => {
			const component = renderIntoDocument(
				<MultiDrag/>
			);
			window.emit('keydown', { keyCode: 17 });
			expect(component.state.ctrl).to.equal(true);
			window.emit('keyup', { keyCode: 17 });
			expect(component.state.ctrl).to.equal(false);
		});
		
		
	});
	
	
	describe('when nothing is selected', () => {
		
		it('sets as active an inactive element on mouseDown', () => {
			const component = renderIntoDocument(
				<MultiDrag>
					<span mdKey="Element 1">Element 1</span>
				</MultiDrag>
			);
			
			const elements = scryRenderedDOMComponentsWithTag(component, 'span');
	
			Simulate.mouseDown(elements[0]);
			Simulate.mouseUp(elements[0]);
			
			expect(component.state.selected.size).to.equal(1);
			expect(elements[0].classList.contains('md-active')).to.equal(true);
		});
	
	});
	
	describe('when there is a selected group', () => {
		
		describe('pressing CTRL', () => {
			
			it('adds inactive element to group on click', () => {
				const component = renderIntoDocument(
					<MultiDrag>
						<span mdKey="Element 1">Element 1</span>
						<span mdKey="Element 2">Element 2</span>
					</MultiDrag>
				);
				
				const elements = scryRenderedDOMComponentsWithTag(component, 'span');
				
				component.setState({ ctrl: true });
				Simulate.mouseDown(elements[0]);
				Simulate.mouseUp(elements[0]);
				Simulate.mouseDown(elements[1]);
				Simulate.mouseUp(elements[1]);
				
				expect(elements[0].classList.contains('md-active')).to.equal(true);
				expect(elements[1].classList.contains('md-active')).to.equal(true);
				expect(component.state.selected.size).to.equal(2);
			});
			
			it('removes active element from group on click', () => {
				const component = renderIntoDocument(
					<MultiDrag>
						<span mdKey="Element 1">Element 1</span>
						<span mdKey="Element 2">Element 2</span>
					</MultiDrag>
				);
				
				const elements = scryRenderedDOMComponentsWithTag(component, 'span');
				
				component.setState({ ctrl: true, selected: new Set(["Element 1","Element 2"]) });
				Simulate.mouseDown(elements[0]);
				Simulate.mouseUp(elements[0]);
				
				expect(elements[0].classList.contains('md-item')).to.equal(true);
				expect(elements[1].classList.contains('md-active')).to.equal(true);
				expect(component.state.selected.size).to.equal(1);
				expect(component.state.selected.has('Element 1')).to.equal(false);
				expect(component.state.selected.has('Element 2')).to.equal(true);
			});
			
		});
		
		describe('NOT pressing CTRL', () => {
			
			it('sets active element as the only an active element on click', () => {
				const component = renderIntoDocument(
					<MultiDrag>
						<span mdKey="Element 1">Element 1</span>
						<span mdKey="Element 2">Element 2</span>
					</MultiDrag>
				);
				
				const elements = scryRenderedDOMComponentsWithTag(component, 'span');
				
				Simulate.mouseDown(elements[0]);
				Simulate.mouseUp(elements[0]);
				
				expect(elements[0].classList.contains('md-active')).to.equal(true);
				expect(elements[1].classList.contains('md-item')).to.equal(true);
				expect(component.state.selected.size).to.equal(1);
			});
			
			it('sets inactive element as the only an active element on click', () => {
				const component = renderIntoDocument(
					<MultiDrag>
						<span mdKey="Element 1">Element 1</span>
						<span mdKey="Element 2">Element 2</span>
					</MultiDrag>
				);
				
				const elements = scryRenderedDOMComponentsWithTag(component, 'span');
				
				component.setState({ selected: new Set(['Element 2']) });
				Simulate.mouseDown(elements[0]);
				Simulate.mouseUp(elements[0]);
				
				expect(elements[0].classList.contains('md-active')).to.equal(true);
				expect(elements[1].classList.contains('md-item')).to.equal(true);
				expect(component.state.selected.size).to.equal(1);
				expect(component.state.selected.has('Element 1')).to.equal(true);
			});
			
		});
		
	});
	
});