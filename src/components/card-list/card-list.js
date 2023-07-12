import { DivComponent } from '../../common/div-component'
import { Card } from '../card/card'
import './card-list.css'

export class CardList extends DivComponent {
	constructor(appState, state) {
		super()
		this.appState = appState
		this.state = state
	}

	render() {
		if (this.state.isLoading) {
			this.element.innerHTML = `<div class='card-list__loader'>Loading...</div>`
			return this.element
		}
		const cardList = document.createElement('div')
		cardList.className = 'card-list'
		for (const item of this.state.list) {
			cardList.append(new Card(this.appState, item).render())
		}

		this.element.append(cardList)

		return this.element
	}
}
