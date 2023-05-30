export declare function isFullscreen(): boolean

export declare function toggleFullscreen(
	el?: HTMLElement,
	fullscreen?: boolean
): boolean

export declare function colorHex(): string

export declare function uuid(len: number, radix: number): string

export declare function exportExcel(xlsx: any, json: any, name: string): void

const obj = {
	container = document.body,
	width = '300px',
	height = '200px',
	textAlign = 'center',
	textBaseline = 'middle',
	font = '20px Microsoft Yahei',
	fillStyle = 'rgba(184, 184, 184, 0.6)',
	content = '水印',
	rotate = '45',
	zIndex = 10000,
}
type canvasWMType = Pratial<typeof obj>
export declare function __canvasWM(obj: canvasWMType): void

export declare function divTOimage(
	el: stringl,
	callback: (a: HTMLElement) => void
): void
