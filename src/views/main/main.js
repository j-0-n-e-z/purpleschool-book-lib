import onChange from 'on-change'
import { AbstractView } from '../../common/view.js'
import { CardList } from '../../components/card-list/card-list.js'
import { Header } from '../../components/header/header.js'
import { Search } from '../../components/search/search.js'

export class MainView extends AbstractView {
	state = {
		list: [],
		isLoading: false,
		searchQuery: undefined,
		offset: 0,
		numFound: 0,
		cardListHeading: 'Found books - '
	}

	constructor(appState) {
		super()
		this.appState = onChange(appState, this.appStateHook.bind(this))
		this.state = onChange(this.state, changedProp =>
			this.stateHook(changedProp)
		)
		this.setTitle('Search Book')
	}

	destroy() {
		onChange.unsubscribe(this.appState)
		onChange.unsubscribe(this.state)
	}

	async loadList(query, offset) {
		const res = await fetch(
			`https://openlibrary.org/search.json?q=${query}&offset=${offset}`
		)
		return res.json()
	}

	appStateHook(changedProp) {
		if (changedProp === 'favorites') {
			this.render()
		}
	}

	async stateHook(changedProp) {
		if (changedProp === 'searchQuery') {
			this.state.isLoading = true
			const data = await this.loadList(
				this.state.searchQuery,
				this.state.offset
			)
			this.state.isLoading = false
			this.state.numFound = data.numFound
			this.state.list = data.docs
		}

		if (changedProp === 'list' || changedProp === 'isLoading') {
			this.render()
		}
	}

	render() {
		const main = document.createElement('main')
		main.append(new Search(this.state).render())
		if (!this.state.isLoading) {
			main.append(
				Object.assign(document.createElement('h1'), {
					textContent: `Found books - ${this.state.numFound}`
				})
			)
		}
		main.append(new CardList(this.appState, this.state).render())
		this.clear()
		this.app.append(main)
		this.renderHeader()
	}

	renderHeader() {
		const header = new Header(this.appState).render()
		this.app.prepend(header)
	}
}
