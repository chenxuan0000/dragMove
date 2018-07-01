import { posLeft, posTop } from './util/getPos'

const drag = ({ target, wrapper = document.body } = {}) => {
	let range
	if (wrapper) {
		range = {
			left: posLeft(wrapper),
			right: posLeft(wrapper) + wrapper.offsetWidth - target.offsetWidth,
			top: posTop(wrapper),
			bottom: posTop(wrapper) + wrapper.offsetHeight - target.offsetHeight
		}
	}

	target.onmousedown = function(ev) {
		var ev = ev || window.event

		let relaX = ev.clientX - this.offsetLeft
		let relaY = ev.clientY - this.offsetTop

		// 获取当前鼠标位置，减去与div的相对位置得到当前div应该被拖拽的位置
		document.onmousemove = function(ev) {
			var ev = ev || window.event
			if (!wrapper) {
				// 不限制拖拽范围
				target.style.left = ev.clientX - relaX + 'px'
				target.style.top = ev.clientY - relaY + 'px'
				return
			}
			if (ev.clientX - relaX < range.left) {
				target.style.left = range.left + 'px'
			} else if (ev.clientX - relaX > range.right) {
				target.style.left = range.right + 'px'
			} else {
				target.style.left = ev.clientX - relaX + 'px'
			}
			if (ev.clientY - relaY < range.top) {
				target.style.top = range.top + 'px'
			} else if (ev.clientY - relaY > range.bottom) {
				target.style.top = range.bottom + 'px'
			} else {
				target.style.top = ev.clientY - relaY + 'px'
			}
		}
		document.onmouseup = function(ev) {
			var ev = ev || window.event
			document.onmousemove = null
			document.onmouseup = null
		}
	}
}

export default drag
