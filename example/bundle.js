(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.startDrag = factory());
}(this, (function () { 'use strict';

	function getStyle(obj, attr) {
		if (obj.currentStyle) {
			return parseFloat(obj.currentStyle[attr]) || 0;
		}
		return parseFloat(getComputedStyle(obj)[attr]) || 0;
	}

	/* 获取绝对位置 */
	function posLeft(obj) {
		var resLeft = 0;
		while (obj) {
			resLeft += obj.offsetLeft;
			obj = obj.offsetParent;
			if (obj && obj !== document.body && obj !== document.documentElement) {
				resLeft += getStyle(obj, 'borderLeftWidth');
			}
		}
		return resLeft;
	}
	function posTop(obj) {
		var resTop = 0;
		while (obj) {
			resTop += obj.offsetTop;
			obj = obj.offsetParent;
			if (obj && obj !== document.body && obj !== document.documentElement) {
				resTop += getStyle(obj, 'borderTopWidth');
			}
		}
		return resTop;
	}

	var drag = function drag() {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    target = _ref.target,
		    _ref$wrapper = _ref.wrapper,
		    wrapper = _ref$wrapper === undefined ? document.body : _ref$wrapper;

		var range = void 0;
		if (wrapper) {
			range = {
				left: posLeft(wrapper),
				right: posLeft(wrapper) + wrapper.offsetWidth - target.offsetWidth,
				top: posTop(wrapper),
				bottom: posTop(wrapper) + wrapper.offsetHeight - target.offsetHeight
			};
		}

		target.onmousedown = function (ev) {
			var ev = ev || window.event;

			var relaX = ev.clientX - this.offsetLeft;
			var relaY = ev.clientY - this.offsetTop;

			// 获取当前鼠标位置，减去与div的相对位置得到当前div应该被拖拽的位置
			document.onmousemove = function (ev) {
				var ev = ev || window.event;
				if (!wrapper) {
					// 不限制拖拽范围
					target.style.left = ev.clientX - relaX + 'px';
					target.style.top = ev.clientY - relaY + 'px';
					return;
				}
				if (ev.clientX - relaX < range.left) {
					target.style.left = range.left + 'px';
				} else if (ev.clientX - relaX > range.right) {
					target.style.left = range.right + 'px';
				} else {
					target.style.left = ev.clientX - relaX + 'px';
				}
				if (ev.clientY - relaY < range.top) {
					target.style.top = range.top + 'px';
				} else if (ev.clientY - relaY > range.bottom) {
					target.style.top = range.bottom + 'px';
				} else {
					target.style.top = ev.clientY - relaY + 'px';
				}
			};
			document.onmouseup = function (ev) {
				var ev = ev || window.event;
				document.onmousemove = null;
				document.onmouseup = null;
			};
		};
	};

	return drag;

})));
