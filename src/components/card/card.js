import { DivComponent } from '../../common/div-component'
import './card.css'

export class Card extends DivComponent {
	constructor(appState, cardState) {
		super()
		this.appState = appState
		this.cardState = cardState
	}

	#addToFavorites() {
		this.appState.favorites.push(this.cardState)
		this.element.classList.add('active')
	}

	#removeFromFavorites() {
		this.appState.favorites = this.appState.favorites.filter(
			({ key }) => key !== this.cardState.key
		)
		this.element.classList.remove('active')
	}

	render() {
		this.element.className = 'card'
		const isInFavorites = !!this.appState.favorites.find(
			({ key }) => key === this.cardState.key
		)
		this.element.innerHTML = `
      <div class="card__img">
        <img
          src="https://covers.openlibrary.org/b/olid/${
						this.cardState.cover_edition_key
					}-M.jpg" 
          alt='cover'
        />
      </div>
      <div class="card__info">
        <div class='card__info__tag'>
          ${this.cardState.subject ? this.cardState.subject[0] : 'Unknown'}
        </div>
        <div class="card__info__name">
          ${this.cardState.title}
        </div>
        <div class="card__info__author">
          ${
						this.cardState.author_name
							? this.cardState.author_name[0]
							: 'Unknown'
					}
        </div>
        <div class="card__info__pick-favorite">
          <button class='card__info__pick-favorite__btn ${
						isInFavorites ? 'active' : ''
					}'>
            <img src="/static/favorites.svg"/>
          </button>
        </div>
      </div>
    `

		this.element
			.querySelector('.card__info__pick-favorite__btn')
			.addEventListener('click', () => {
				if (isInFavorites) {
					this.#removeFromFavorites()
				} else {
					this.#addToFavorites()
				}
			})

		return this.element
	}
}
