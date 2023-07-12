import { DivComponent } from '../../common/div-component'
import './search.css'

export class Search extends DivComponent {
	constructor(state) {
		super()
		this.state = state
	}

	search() {
		const value = this.element.querySelector('input').value
		this.state.searchQuery = value
	}

	render() {
		this.element.className = 'search'
		this.element.innerHTML = `
      <div class="search__wrapper">
        <input 
          type='text'
          placeholder='Find a book or author...' 
          value='${this.state.searchQuery || ''}'
          class='search__wrapper__input'
        />
        <img src='/static/search.svg' alt='search'/>
      </div>
      <button class='search__button' aria-label='Search'>
        <img src='/static/search-btn.svg' alt='search-btn' />
      </button>
    `

		this.element
			.querySelector('.search__button')
			.addEventListener('click', this.search.bind(this))

		this.element
			.querySelector('.search__wrapper__input')
			.addEventListener('keydown', e => {
				if (e.code === 'Enter') {
					this.search()
				}
			})

		return this.element
	}
}
