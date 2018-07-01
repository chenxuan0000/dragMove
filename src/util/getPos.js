function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return parseFloat(obj.currentStyle[attr]) || 0
	}
	return parseFloat(getComputedStyle(obj)[attr]) || 0
}

/* 获取绝对位置 */
function posLeft(obj) {
	let resLeft = 0
	while (obj) {
		resLeft += obj.offsetLeft
		obj = obj.offsetParent
		if (obj && obj !== document.body && obj !== document.documentElement) {
			resLeft += getStyle(obj, 'borderLeftWidth')
		}
	}
	return resLeft
}
function posTop(obj) {
	let resTop = 0
	while (obj) {
		resTop += obj.offsetTop
		obj = obj.offsetParent
		if (obj && obj !== document.body && obj !== document.documentElement) {
			resTop += getStyle(obj, 'borderTopWidth')
		}
	}
	return resTop
}

export { posLeft, posTop }
