export class AbstractView {
	constructor() {
		this.app = document.getElementById('root')
	}

	clear() {
		this.app.innerHTML = ''
	}

	setTitle(title) {
		document.title = title
	}

	render() {
		return
	}

	destroy() {
		return
	}
}
