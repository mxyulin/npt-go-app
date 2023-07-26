<template>
	<view class="board-wrap">
		<canvas canvas-id="board-main" @touchstart="onTouchStart" class="main-canvas" :style="'height:' + boardHeight + 'px; width:' + boardWidth + 'px'">
		</canvas>
		<view class="board-controls">
			<button plain="true" type="default" size="mini" @click="reset">重置</button>
			<button plain="true" type="default" size="mini" @click="back">后退</button>
		</view>
	</view>
</template>

<script>
	import go from './go'

	export default {
		props: {
			size: {
				type: Number,
				default: 19
			},
			width: {
				type: Number,
				default: 375
			}
		},
		data() {
			return {
				mainCanvasId: 'board-main',
				mainContext: null,
				boardHeight: 300,
				boardWidth: 300,
				boardSize: 19,
				boardPadding: 20,
				game: null
			}
		},
		methods: {
			async render() {				
				const ctx = this.mainContext
				this.drawBoard(ctx)
				this.drawPieces(ctx)
				await ctx.draw()
			},
			drawAxes(ctx) {
				const pad = this.boardPadding
				const width = this.boardWidth - pad * 2
				const size = this.boardSize
				const cw = width / (size - 1)

				ctx.save()
				const fontSize = 10
				ctx.beginPath()
				ctx.setFontSize(fontSize)
				ctx.setFillStyle('gray')

				// 纵坐标
				ctx.setTextAlign('center')
				ctx.setTextBaseline('middle')
				for (let i = 0; i < size; i++) {
					const letter = String.fromCharCode(65 + i)
					ctx.fillText(letter, pad - fontSize / 2 - 2, i * cw + pad)
				}

				// 横坐标
				ctx.setTextAlign('center')
				ctx.setTextBaseline('bottom')
				for (let j = 0; j < size; j++) {
					ctx.fillText(`${j + 1}`, j * cw + pad, pad - 2)
				}
				ctx.restore()
			},
			drawPieces(ctx) {
				const size = this.boardSize
				const data = this.game.getData()
				for (let r = 0; r < size; r++) {
					for (let c = 0; c < size; c++) {
						const p = data[r][c]
						if (p.type === go.PT_BLACK) {
							this.drawBlackPiece(ctx, c + 1, r + 1)
						}
						if (p.type === go.PT_WHITE) {
							this.drawWhitePiece(ctx, c + 1, r + 1)
						}
					}
				}
			},
			drawBoard(ctx) {
				this.drawCells(ctx)
				this.drawAxes(ctx)
				this.drawDots(ctx)
			},
			drawCells(ctx) {
				const pad = this.boardPadding
				const width = this.boardWidth - pad * 2
				const size = this.boardSize
				const cw = width / (size - 1)

				ctx.beginPath()
				for (let i = 0; i < size; i++) {
					ctx.moveTo(pad, i * cw + pad)
					ctx.lineTo(width + pad, i * cw + pad)
				}
				for (let j = 0; j < size; j++) {
					ctx.moveTo(j * cw + pad, pad)
					ctx.lineTo(j * cw + pad, width + pad)
				}

				ctx.stroke()
			},
			drawDots(ctx) {
				const size = this.boardSize
				const center = Math.round(size / 2)
				const corner = size > 11 ? 4 : 3

				// 4 corner points
				this.drawDot(ctx, corner, corner)
				this.drawDot(ctx, size - corner + 1, corner)
				this.drawDot(ctx, corner, size - corner + 1)
				this.drawDot(ctx, size - corner + 1, size - corner + 1)

				if (size % 2 === 0)
					return

				// center points
				if (size >= 9) {
					this.drawDot(ctx, center, center)
				}
				// 4 side points
				if (size >= 13) {
					this.drawDot(ctx, corner, center)
					this.drawDot(ctx, size - corner + 1, center)
					this.drawDot(ctx, center, corner)
					this.drawDot(ctx, center, size - corner + 1)
				}
			},
			drawDot(ctx, c, r) {
				const {
					x,
					y
				} = this.boardToCanvasPoint(c, r)

				ctx.beginPath()
				ctx.arc(x, y, 2, 0, 2 * Math.PI)
				ctx.fill()
			},
			drawBlackPiece(ctx, c, r) {
				const size = this.boardSize
				const pad = this.boardPadding
				const width = this.boardWidth - pad * 2
				const cw = width / (size - 1)

				const {
					x,
					y
				} = this.boardToCanvasPoint(c, r)

				ctx.beginPath()
				ctx.arc(x, y, cw / 2 - 1, 0, 2 * Math.PI)
				ctx.fill()
			},
			drawWhitePiece(ctx, c, r) {
				const size = this.boardSize
				const pad = this.boardPadding
				const width = this.boardWidth - pad * 2
				const cw = width / (size - 1)

				const {
					x,
					y
				} = this.boardToCanvasPoint(c, r)

				ctx.beginPath()
				ctx.save()
				ctx.setFillStyle('white')
				ctx.arc(x, y, cw / 2 - 1, 0, 2 * Math.PI)
				ctx.fill()
				ctx.restore()
				ctx.stroke()
			},
			boardToCanvasPoint(c, r) {
				const size = this.boardSize
				const pad = this.boardPadding
				const width = this.boardWidth - pad * 2
				const cw = width / (size - 1)

				return {
					x: pad + (c - 1) * cw,
					y: pad + (r - 1) * cw
				}
			},
			canvasPointToBoard(x, y) {
				const size = this.boardSize
				const pad = this.boardPadding
				const width = this.boardWidth - pad * 2
				const cw = width / (size - 1)

				return {
					c: Math.round((x - pad) / cw + 1),
					r: Math.round((y - pad) / cw + 1)
				}
			},
			onTouchStart(e) {
				const {
					c,
					r
				} = this.canvasPointToBoard(e.touches[0].x, e.touches[0].y)
				if(c > 0 && c <= this.boardSize && r > 0 && r <= this.boardSize){
					this.game.put(c - 1, r - 1)
				}
			},
			back() {
				this.game.back()
			},
			reset() {
				this.game.reset()
			}
		},
		mounted() {
			this.boardSize = this.size
			this.boardWidth = this.boardHeight = this.width
		},
		async created() {
			this.game = new go.Game(this.boardSize)
			this.mainContext = uni.createCanvasContext(this.mainCanvasId, this)
			await this.render()
			
			const that = this
			async function loop (){
				const start = Date.now()
				await that.render()
				const end = Date.now()
				const d = end - start
				// console.log(d + 'ms renderred')
				setTimeout(loop, 50)
			}
			loop()

			// this.game.setUpdateCallBack(this.render.bind(this))
		}
	}
</script>

<style scoped>
	.board-wrap {
		padding: 0;
	}
	
	.board-controls {
		display: flex;
		justify-content: center;
	}
</style>
