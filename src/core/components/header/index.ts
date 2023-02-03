import Component from '../../templates/components';
import { PageIds } from '../../../types';
import Registration from '../registration';

const formOpen = false;


class Header extends Component {

    logo: HTMLAnchorElement;
    search: HTMLInputElement;
    searchActive: HTMLElement;
    random: HTMLElement;
    registration: HTMLButtonElement;
    enter: HTMLElement;
    
    constructor(tagName: string, className: string) {
        super(tagName, className);

        this.logo = document.createElement('a');
        this.search = document.createElement('input');
        this.searchActive = document.createElement('div');
        this.random = document.createElement('div');
        this.registration = document.createElement('button');
        this.enter = document.createElement('div');
    }

    renderPageHeader() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        this.logo.classList.add('logo', 'header__logo');
        this.logo.href = `#${PageIds.MainPage}`;
        this.logo.textContent = 'LOGO';

        const searchContainer = document.createElement('div');
        searchContainer.classList.add('header__search');

        const form = document.createElement('form');
        form.classList.add('header__form');

        this.search.classList.add('input', 'header__search__input');
        this.search.placeholder = 'Поиск автора или книги...';

        this.searchActive.classList.add('header__search__active');

        this.random.classList.add('header__random');

        const cabinet = document.createElement('div');
        cabinet.classList.add('header__cabinet');

        this.enter.classList.add('header__cabinet__enter');
        this.enter.textContent = 'Войти';

        this.registration.classList.add('header__cabinet__registration', 'button');
        this.registration.textContent = 'Регистрация';

        this.container.appendChild(wrapper);
        wrapper.appendChild(this.logo);
        wrapper.appendChild(searchContainer);
        searchContainer.appendChild(form);
        form.appendChild(this.search);
        form.appendChild(this.searchActive);
        searchContainer.appendChild(this.random);
        wrapper.appendChild(cabinet);
        cabinet.appendChild(this.enter);
        cabinet.appendChild(this.registration);
    }

    render() {
        this.renderPageHeader();
        this.registration.addEventListener('click', () => {
            // if (formOpen === false) {
            //     console.log('false!!!');
            //     const registration = new Registration('section', 'registration');
            //     const body = document.querySelector('.body') as HTMLBodyElement;
            //     body.appendChild(registration.render());

            //     //дописать генерацию формы!
                
            //     formOpen = true;
            // } else {
            //     console.log('true!!!');
            //     formOpen = false;
            // }
        })
        return this.container;
    }
}

export default Header;
