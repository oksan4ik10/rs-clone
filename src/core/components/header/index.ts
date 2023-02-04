import Component from '../../templates/components';
import { PageIds } from '../../../types';
import Registration from '../registration';
import MainPage from '../../../pages/main';
import { HeaderSearch } from './header-search';
import { BooksAPI } from '../../../api/api';


class Header extends Component {

    logo: HTMLAnchorElement;
    searchContainer: HTMLElement;
    search: HTMLInputElement;
    searchActive: HTMLElement;
    random: HTMLElement;
    registration: HTMLButtonElement;
    enter: HTMLElement;

    static formActive = false;
    
    constructor(tagName: string, className: string) {
        super(tagName, className);

        this.logo = document.createElement('a');
        this.searchContainer = document.createElement('div');
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

        //const searchContainer = document.createElement('div');
        this.searchContainer.classList.add('header__search');

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
        wrapper.appendChild(this.searchContainer);
        this.searchContainer.appendChild(form);
        form.appendChild(this.search);
        form.appendChild(this.searchActive);
        this.searchContainer.appendChild(this.random);
        wrapper.appendChild(cabinet);
        cabinet.appendChild(this.enter);
        cabinet.appendChild(this.registration);
    }

    openForm(form: string) {
        const darkBackground = document.createElement('div');
        const registration = new Registration('section', form);
        const body = document.querySelector('.body') as HTMLBodyElement;

        body.appendChild(registration.render());
        body.appendChild(darkBackground);

        setTimeout(function(){
            darkBackground.classList.add('dark-background');
            darkBackground.classList.add('dark-background_opacity');
        }, 100);

        Header.formActive = true;

        darkBackground.addEventListener('click', () => {
            this.closeForm(form);
            Header.formActive = false;
        })
    }

    closeForm(form: string) {
        const registration = document.querySelector(`.${form}`) as HTMLElement;
        registration.remove();
        const darkBackground = document.querySelector('.dark-background') as HTMLElement;

        darkBackground.classList.remove('dark-background_opacity');

        setTimeout(function(){
            darkBackground.classList.remove('dark-background');
            darkBackground.remove();
        }, 800);
    }

    render() {
        this.renderPageHeader();

        this.registration.addEventListener('click', () => {
            if (Header.formActive === false) {
                this.openForm('registration');
            }
        })

        this.search.addEventListener('keyup', async () => {
            const allBooks = await BooksAPI.getAllBooks();
            if (this.search.value.length > 0) {
                const headerSearch = new HeaderSearch(
                    'div',
                    'search__results__header__wrapper', 
                    allBooks,
                    this.search.value);
                const oldHeaderSearch = document.querySelector('.search__results__header__wrapper');
                if (oldHeaderSearch) {
                    oldHeaderSearch.remove();
                }
                this.searchContainer.append(headerSearch.render());

                window.addEventListener('click', (event) => {
                    if (event.target instanceof HTMLElement 
                        && !event.target.classList.contains('search__results__header__wrapper')){

                        const oldSearch = document.querySelector('.search__results__header__wrapper');
                        if (oldSearch) {
                            oldSearch.remove();
                        }

                        this.search.value = '';
                    }
                })
            } else if (this.search.value.length <= 0) {
                const oldHeaderSearch = document.querySelector('.search__results__header__wrapper');
                if (oldHeaderSearch) {
                    oldHeaderSearch.remove();
                }
            }

        });
            

        return this.container;
    }
}

export default Header;
