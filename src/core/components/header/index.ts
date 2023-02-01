import Component from '../../templates/components';
import { PageIds } from '../../../types';


class Header extends Component {

    constructor(tagName: string, className: string) {
        super(tagName, className);

    }

    renderPageHeader() {
        this.container.innerHTML = 
            `<div class="wrapper">
                <a href=#${PageIds.MainPage} class="logo header__logo">LOGO</a>
                <div class="header__search">
                    <form action="" class="header__form">
                        <input type="search" class="input header__search__input" placeholder="Поиск автора или книги...">
                        <div class="header__search__active"></div>
                    </form>
                    <div class="header__random"></div>
                </div>
                <div class="header__cabinet">
                    <div class="header__cabinet__enter">Войти</div>
                    <button class="button header__cabinet__registration">Регистрация</button>
                </div>
            </div>`
    }

    render() {
        this.renderPageHeader();
        return this.container;
    }
}

export default Header;
