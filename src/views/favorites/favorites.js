import onChange from 'on-change'
import { AbstractView } from '../../common/view.js'
import { CardList } from '../../components/card-list/card-list.js'
import { Header } from '../../components/header/header.js'

export class FavoritesView extends AbstractView {
	constructor(appState) {
		super()
		this.appState = onChange(appState, changedProp =>
			this.appStateHook(changedProp)
		)
		this.setTitle('Favorite Books')
	}

	destroy() {
		onChange.unsubscribe(this.appState)
	}

	appStateHook(changedProp) {
		if (changedProp === 'favorites') {
			this.render()
		}
	}

	render() {
		const main = document.createElement('main')
		main.innerHTML = `<h1>Favorites</h1>`
		main.append(
			new CardList(this.appState, {
				list: this.appState.favorites,
				isLoading: false
			}).render()
		)
		this.clear()
		this.app.append(main)
		this.renderHeader()
	}

	renderHeader() {
		const header = new Header(this.appState).render()
		this.app.prepend(header)
	}
}
