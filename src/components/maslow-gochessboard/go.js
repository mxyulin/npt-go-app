const PT_EMPTY = 0
const PT_BLACK = 1
const PT_WHITE = 2
const SEQ_NULL = 0

/**
 * 棋盘位置结构
 */
class Point {
	constructor(c, r, type, seq) {
		this.c = c
		this.r = r
		this.type = type || PT_EMPTY
		this.seq = seq || SEQ_NULL
	}

	empty() {
		this.type = PT_EMPTY
		this.seq = SEQ_NULL
	}

	clone() {
		return new Point(this.c, this.r, this.type, this.seq)
	}

	toString() {
		return `[${this.c},${this.r},${this.type}]`
	}
}

/**
 * 围棋状态机
 */
class Game {
	constructor(size) {
		this.size = size
		this.points = []
		this.points_copy = [] // points 副本
		this.type = PT_WHITE
		this.seq = SEQ_NULL
		this.history = []
		this.updateHook = () => {}
		this.init()
	}


	init() {
		this.reset()
	}

	// 重置棋盘
	reset() {
		this.points = []
		const size = this.size
		for (let r = 0; r < size; r++) {
			this.points[r] = []
			for (let c = 0; c < size; c++) {
				this.points[r][c] = new Point(c, r, PT_EMPTY, SEQ_NULL)
			}
		}
		this.type = PT_WHITE
		this.seq = SEQ_NULL
		this.history = []
		this.points_copy = []

		this.updateHook()
	}

	// 落子
	put(c, r) {
		
		this.validatePosition(c, r)

		if (this.isForbidden(c, r))
			return false
			
		this.history.push(this.clonePoints())
				
		this.points = this.points_copy // 副本数据转正

		this.type = this.getNextType()
		this.seq = this.seq + 1
		
		this.updateHook()

		return true
	}

	setUpdateCallBack(fn) {
		if (typeof fn !== 'function')
			throw new Error('fn must be a function')

		this.updateHook = function() {
			if (typeof fn === 'function') fn()
		}
	}

	// 判断禁着点
	isForbidden(c, r) {

		this.points_copy = this.clonePoints()

		const points = this.points_copy
		const point = points[r][c]

		if (point.type !== PT_EMPTY)
			return true

		// 落子
		point.type = this.getNextType()
		point.seq = this.seq + 1


		// 检查是否需要提对方的子
		const enemies = this.getNeighbors(points, c, r)
			.filter(p => p.type === this.type)

		let droplist = []
		for (const em of enemies) {
			if (this.isDead(em.c, em.r)) {
				const arr = this.getAround(points, em.c, em.r)
				droplist = droplist.concat(arr)
			}
		}

		// 提子
		for (const dp of droplist) {
			const p = points[dp.r][dp.c]
			p.type = PT_EMPTY
			p.seq = SEQ_NULL
		}

		// 落子能提对方子，则不是禁入点
		if (droplist.length) {
			return false
		}

		// 检查是否死棋（禁入点）
		const dead = this.isDead(c, r)
		return dead
	}


	clonePoints() {
		const size = this.size
		const points = []
		for (let r = 0; r < size; r++) {
			points[r] = []
			for (let c = 0; c < size; c++) {
				const point = this.points[r][c]
				points[r][c] = point.clone()
			}
		}
		return points
	}

	// 回退
	back() {
		if (!this.history.length)
			return false

		this.points = this.history.pop()
		this.type = this.getNextType()
		this.seq = this.seq--

		this.updateHook()

		return true
	}

	getNextType() {
		return this.getEnemyType(this.type)
	}

	// 获取相反的棋色
	getEnemyType(type) {
		return type === PT_BLACK ? PT_WHITE : PT_BLACK
	}

	// 判断指定棋子是否已死
	isDead(c, r) {
		const points_copy = this.points_copy
		const point = points_copy[r][c]
		const enemyType = this.getEnemyType(point.type)
		const scanned = [] // 标记已扫描过的位置
		const that = this

		function _dead(c, r) {
			const nbrs = that.getNeighbors(points_copy, c, r)
			let qi = nbrs.length // 气数，初始为周围总位置数

			for (const nbr of nbrs) {
				// 有空，活棋
				if (nbr.type === PT_EMPTY)
					return false

				// 有敌子，气数 -1
				if (nbr.type === enemyType) {
					qi--
					continue
				}

				// 有友子
				scanned.push(`${c},${r}`) // 标记自身
				if (scanned.includes(`${nbr.c},${nbr.r}`)) {
					qi--
					continue
				}

				if (_dead(nbr.c, nbr.r))
					qi--
			}
			return qi === 0
		}

		return _dead(c, r)
	}

	// 获取一块相连的同色棋
	getAround(points, c, r) {
		const p = points[r][c]
		const type = p.type
		if (type === PT_EMPTY)
			return

		const scanned = [] // 标记已扫描过的位置
		const arounds = []
		const that = this

		function _scan(c, r) {
			scanned.push(`${c},${r}`) // 标记自身
			arounds.push({
				c,
				r
			})

			// 获取周边同色棋
			const fellows = that.getNeighbors(points, c, r)
				.filter(nbr => nbr.type === type)

			if (!fellows.length)
				return

			for (const f of fellows) {
				if (scanned.includes(`${f.c},${f.r}`)) {
					continue
				}

				_scan(f.c, f.r)
			}
		}

		_scan(c, r)

		return arounds
	}

	// 获取棋子相邻的位置
	getNeighbors(points, c, r) {
		this.validatePosition(c, r)

		const size = this.size

		const left = c > 0 ? points[r][c - 1] : null
		const top = r > 0 ? points[r - 1][c] : null
		const right = c < size - 1 ? points[r][c + 1] : null
		const bottom = r < size - 1 ? points[r + 1][c] : null

		const nbrs = [left, right, top, bottom].filter(nbr => nbr)
		return nbrs
	}

	// 判断棋盘坐标是否合法
	validatePosition(c, r) {
		if (c < 0 || c > this.size - 1)
			throw new Error(`invalid row number: ${r}`)
		if (r < 0 || r > this.size - 1)
			throw new Error(`invalid row number: ${r}`)
	}

	// 返回棋盘数据
	getData() {
		return this.points
	}
}

const go =  {
	Game,
	PT_EMPTY,
	PT_BLACK,
	PT_WHITE,
	SEQ_NULL
}

// module.exports = {
// 	Game,
// 	PT_EMPTY,
// 	PT_BLACK,
// 	PT_WHITE,
// 	SEQ_NULL
// }

export default go;
