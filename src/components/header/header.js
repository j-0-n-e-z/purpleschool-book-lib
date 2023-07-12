import { DivComponent } from '../../common/div-component'
import './header.css'

export class Header extends DivComponent {
	constructor(appState) {
		super()
		this.appState = appState
	}

	render() {
		this.element.className = 'header'
		this.element.innerHTML = `
      <div>
        <img src='/static/logo.svg' alt='logo' />
      </div>
      <div class="menu">
        <a href="#" class="menu__item">
          <img src='/static/search.svg' alt='search' />
          <span>Search a book</span>
        </a>
        <a href="#favorites" class="menu__item">
          <img src='/static/favorites.svg' alt='favorites' />
          <span>Favorites</span>
          <div class="menu__counter">
            ${this.appState.favorites.length}
          </div>
        </a>
      </div>
    `
		return this.element
	}
}
