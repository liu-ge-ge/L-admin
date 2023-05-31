//是否全屏
export function isFullscreen() {
	return !!(
		document.fullscreenElement ||
		document.webkitFullscreenElement ||
		document.mozFullScreenElement ||
		document.msFullscreenElement
	)
}
//打开全屏
export function toggleFullscreen(el, fullscreen) {
	if (el == null) {
		el = document.documentElement
	}
	if (fullscreen == null) {
		fullscreen = !isFullscreen()
	}
	if (fullscreen) {
		const rfs =
			el.requestFullscreen ||
			el.requestFullScreen ||
			el.webkitRequestFullScreen ||
			el.mozRequestFullScreen ||
			el.msRequestFullScreen
		if (rfs) {
			rfs.call(el)
		} else {
			throw new Error(
				'\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u5168\u5C4F\u6A21\u5F0F'
			)
		}
	} else {
		const cfs =
			document.exitFullscreen ||
			document.exitFullScreen ||
			document.webkitCancelFullScreen ||
			document.mozCancelFullScreen ||
			document.msExitFullscreen
		cfs && cfs.call(document)
	}
	return fullscreen
}

/**随机颜色 16进制 */
export function colorHex() {
	let r = Math.floor(Math.random() * 256)
	let g = Math.floor(Math.random() * 256)
	let b = Math.floor(Math.random() * 256)
	return `#${r.toString(16) + '' + g.toString(16) + '' + b.toString(16)}`
}
// uuid方法
export function uuid(len, radix) {
	var chars =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

	var uuid = [],
		i

	radix = radix || chars.length

	if (len) {
		// Compact form

		for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
	} else {
		// rfc4122, version 4 form

		var r

		// rfc4122 requires these characters

		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'

		uuid[14] = '4'

		// Fill in random data.  At i==19 set the high bits of clock sequence as

		// per rfc4122, sec. 4.1.5

		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | (Math.random() * 16)

				uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
			}
		}
	}

	return uuid.join('')
}
// 水印方法
export function __canvasWM({
	container = document.body,
	width = '300px',
	height = '200px',
	textAlign = 'center',
	textBaseline = 'middle',
	font = '10px Microsoft Yahei',
	fillStyle = 'rgba(184, 184, 184, 0.6)',
	content = '水印',
	rotate = '25',
	zIndex = 10000,
} = {}) {
	console.log(container)
	const canvas = document.createElement('canvas')

	canvas.setAttribute('width', width)
	canvas.setAttribute('height', height)
	const ctx = canvas.getContext('2d')

	ctx.textAlign = textAlign
	ctx.textBaseline = textBaseline
	ctx.font = font
	ctx.fillStyle = fillStyle
	ctx.rotate((Math.PI / 180) * rotate)
	ctx.fillText(content, parseFloat(width) / 6, parseFloat(height) / 6)

	const base64Url = canvas.toDataURL()
	const __wm = document.querySelector('.__wm')

	const watermarkDiv = __wm || document.createElement('div')
	const styleStr = `
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        width:100%;
        height:100%;
        z-index:${zIndex};
        pointer-events:none;
        background-repeat:repeat;
        background-image:url('${base64Url}')`

	watermarkDiv.setAttribute('style', styleStr)
	watermarkDiv.classList.add('__wm')

	if (!__wm) {
		container.insertBefore(watermarkDiv, container.firstChild)
	}
}

// div转image
export function divTOimage(el, callback) {
	const down = document.querySelector(el)

	const downCopy = down.cloneNode(down) //克隆一份dom，避免样式设置等操作影响原有界面

	downCopy.children[0].children[0].style.background = 'white' //设置div背景为蓝色

	const xmlDom = new XMLSerializer().serializeToString(downCopy)

	const xml = `<?xml version="1.0" standalone="no"?>\r\n${xmlDom}`

	const src = `data:image/svg+xml;base64,${window.btoa(
		unescape(encodeURIComponent(xml))
	)}`
	const img = new Image()
	img.src = src
	const canvas = document.createElement('canvas')
	const canWidth = 1100,
		canHeight = 200
	canvas.width = canWidth
	canvas.height = canHeight
	const context = canvas.getContext('2d')
	img.onload = () => {
		context.drawImage(img, 0, 0, canWidth, canHeight)
		const a = document.createElement('a')
		a.download = '图片.jpg'
		a.href = canvas.toDataURL('image/jepg', 1)
		callback(a)
	}
}

export function bigToW(number) {
	if (number >= 10000) {
		return number / 10000 + '万'
	} else {
		return number
	}
}
