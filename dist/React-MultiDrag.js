(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-multidrag"] = factory(require("react"));
	else
		root["react-multidrag"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("C:\\Users\\Javi\\Desktop\\md\\react-multidrag\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("C:\\Users\\Javi\\Desktop\\md\\react-multidrag\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.MultiDrop = exports.MultiDrag = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MultiDrag = exports.MultiDrag = function (_React$Component) {
		_inherits(MultiDrag, _React$Component);

		function MultiDrag(props) {
			_classCallCheck(this, MultiDrag);

			var _this = _possibleConstructorReturn(this, (MultiDrag.__proto__ || Object.getPrototypeOf(MultiDrag)).call(this, props));

			_this.mouseDown = _this.mouseDown.bind(_this);
			_this.mouseUp = _this.mouseUp.bind(_this);
			_this.dragStart = _this.dragStart.bind(_this);
			_this.keyDownListener = _this.keyDownListener.bind(_this);
			_this.keyUpListener = _this.keyUpListener.bind(_this);

			_this.state = { selected: new Set(), ctrl: false, removing: false };

			window.addEventListener('keydown', _this.keyDownListener);
			window.addEventListener('keyup', _this.keyUpListener);
			return _this;
		}

		_createClass(MultiDrag, [{
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				// Removing listeners when the component gets unmounted
				window.removeEventListener('keydown', this.keyDownListener);
				window.removeEventListener('keyup', this.keyUpListener);
			}
		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps) {
				// If elements change, selection gets cleared
				if (this.props.children != nextProps.children) this.state.selected.clear();
				return true;
			}
		}, {
			key: 'keyDownListener',
			value: function keyDownListener(e) {
				if (e.keyCode == 17) this.setState({ ctrl: true });
			}
		}, {
			key: 'keyUpListener',
			value: function keyUpListener(e) {
				if (e.keyCode == 17) this.setState({ ctrl: false });
			}
		}, {
			key: 'mouseDown',
			value: function mouseDown(id) {
				if (this.state.selected.has(id)) {
					this.setState({ removing: true });
				} else {
					if (this.state.ctrl) {
						var newSelected = this.state.selected;
						newSelected.add(id);
						this.setState({ selected: newSelected });
					} else this.setState({ selected: new Set([id]) });
				}
			}
		}, {
			key: 'mouseUp',
			value: function mouseUp(id) {
				if (this.state.removing) {
					if (this.state.ctrl) {
						var newSelected = this.state.selected;
						newSelected.delete(id);
						this.setState({ selected: newSelected });
					} else this.setState({ selected: new Set([id]) });
					this.setState({ removing: false });
				}
			}
		}, {
			key: 'dragStart',
			value: function dragStart(e) {
				e.dataTransfer.setData('selected', JSON.stringify(Array.from(this.state.selected)));
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				return _react2.default.createElement(
					'div',
					{
						className: this.props.className,
						onDragStart: this.dragStart,
						onDragOver: this.dragOver
					},
					_react2.default.Children.map(this.props.children, function (child) {
						if (child.props.mdKey) {
							var className = child.props.className + (_this2.state.selected.has(child.props.mdKey) ? ' md-active' : '');
							return _react2.default.cloneElement(child, {
								onMouseDown: function onMouseDown() {
									return _this2.mouseDown(child.props.mdKey);
								},
								onMouseUp: function onMouseUp() {
									return _this2.mouseUp(child.props.mdKey);
								},
								className: className,
								draggable: true,
								mdKey: undefined
							});
						} else return _react2.default.cloneElement(child);
					})
				);
			}
		}]);

		return MultiDrag;
	}(_react2.default.Component);

	var MultiDrop = exports.MultiDrop = function (_React$Component2) {
		_inherits(MultiDrop, _React$Component2);

		function MultiDrop(props) {
			_classCallCheck(this, MultiDrop);

			var _this3 = _possibleConstructorReturn(this, (MultiDrop.__proto__ || Object.getPrototypeOf(MultiDrop)).call(this, props));

			_this3.drop = _this3.drop.bind(_this3);
			_this3.dragOver = _this3.dragOver.bind(_this3);
			_this3.dragEnter = _this3.dragEnter.bind(_this3);
			_this3.dragLeave = _this3.dragLeave.bind(_this3);

			_this3.state = { draggingOver: 0 };
			return _this3;
		}

		_createClass(MultiDrop, [{
			key: 'dragOver',
			value: function dragOver(e) {
				e.preventDefault();
				e.stopPropagation();
				e.dataTransfer.dropEffect = 'move';
				return false;
			}
		}, {
			key: 'dragEnter',
			value: function dragEnter(e) {
				this.setState({ draggingOver: ++this.state.draggingOver });
			}
		}, {
			key: 'dragLeave',
			value: function dragLeave(e) {
				this.setState({ draggingOver: --this.state.draggingOver });
			}
		}, {
			key: 'drop',
			value: function drop(e) {
				e.preventDefault();
				var keys = JSON.parse(e.dataTransfer.getData('selected'));
				this.props.mdOnDrop(keys);
				this.setState({ draggingOver: 0 });
			}
		}, {
			key: 'render',
			value: function render() {
				var containerClass = this.state.draggingOver > 0 ? this.props.className + ' md-dragging' : this.props.className;
				return _react2.default.createElement(
					'div',
					{
						className: containerClass,
						onDrop: this.drop,
						onDragEnd: this.dragEnd,
						onDragOver: this.dragOver,
						onDragEnter: this.dragEnter,
						onDragLeave: this.dragLeave
					},
					this.props.children
				);
			}
		}]);

		return MultiDrop;
	}(_react2.default.Component);

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("C:\\Users\\Javi\\Desktop\\md\\react-multidrag\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "React-MultiDrag.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;