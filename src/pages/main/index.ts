import Page from "../../core/templates/page";
import Reviews from "../../core/components/reviews";
import PopularBooks from "../../core/components/popular";
import Recommendation from "../../core/components/recommend";
import ViewBooks from "../../core/components/viewed";
import { BooksAPI } from "../../api/api";
import { HeaderSearch } from "../../core/components/header/header-search";
import ResetPassword from "../../core/components/reset-password";
import Header from "../../core/components/header";


class MainPage extends Page {
    main: HTMLElement;
    input: HTMLInputElement;
    form: HTMLFormElement;
    token: string;

    constructor(id: string, token:string) {
        super(id);
        this.main = document.createElement('main');
        this.input = document.createElement('input');
        this.form = document.createElement('form');
        this.token = token;
    }

    createMainPage() {
        this.main.classList.add('main');

        const preview = document.createElement('section');
        preview.classList.add('preview');

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        
        const title = document.createElement('h3');
        title.classList.add('preview__title');
        title.textContent = 'НАЙДИ СВОЮ КНИГУ';

        this.form.classList.add('preview__form');

        this.input.type = 'search'; 
        this.input.classList.add('input');
        this.input.classList.add('preview__search__input');
        this.input.placeholder = 'Введите название книги...';

        const button = document.createElement('button');
        button.classList.add('button');
        button.classList.add('preview__search');
        button.textContent = 'Найти книгу';
        button.type = 'submit';

        const about = document.createElement('div');
        about.classList.add('preview__about');

        const div1 = document.createElement('div');
        div1.classList.add('preview__about__column');
        const img1 = document.createElement('div');
        img1.classList.add('preview__about__img', 'preview_img1');
        const text1 = document.createElement('div');
        text1.classList.add('preview__about__text');
        text1.textContent = 'Находите интересные книги';
        div1.appendChild(img1);
        div1.appendChild(text1);

        const div2 = document.createElement('div');
        div2.classList.add('preview__about__column');
        const img2 = document.createElement('div');
        img2.classList.add('preview__about__img', 'preview_img2');
        const text2 = document.createElement('div');
        text2.classList.add('preview__about__text');
        text2.textContent = 'Собирайте свою библиотеку';
        div2.appendChild(img2);
        div2.appendChild(text2);

        const div3 = document.createElement('div');
        div3.classList.add('preview__about__column');
        const img3 = document.createElement('div');
        img3.classList.add('preview__about__img', 'preview_img3');
        const text3 = document.createElement('div');
        text3.classList.add('preview__about__text');
        text3.textContent = 'Оценивайте и обсуждайте';
        div3.appendChild(img3);
        div3.appendChild(text3);

        const div4 = document.createElement('div');
        div4.classList.add('preview__about__column');
        const img4 = document.createElement('div');
        img4.classList.add('preview__about__img', 'preview_img4');
        const text4 = document.createElement('div');
        text4.classList.add('preview__about__text');
        text4.textContent = 'Делитесь книгами с друзьями';
        div4.appendChild(img4);
        div4.appendChild(text4);

        const buttonMore = document.createElement('button');
        buttonMore.classList.add('button');
        buttonMore.classList.add('preview__more');
        buttonMore.textContent = 'Хотите узнать больше?';
        buttonMore.addEventListener('click', () => window.location.hash = 'about');

        this.main.appendChild(preview);
        preview.appendChild(wrapper);
        wrapper.appendChild(title);
        wrapper.appendChild(this.form);
        this.form.appendChild(this.input);
        this.form.appendChild(button);
        wrapper.appendChild(about);
        about.appendChild(div1);
        about.appendChild(div2);
        about.appendChild(div3);
        about.appendChild(div4);
        wrapper.appendChild(buttonMore);

        const popular = new PopularBooks('section', 'popular');
        this.main.appendChild(popular.render());

        const recommendation = new Recommendation('section', 'recommend');
        this.main.appendChild(recommendation.render());

        const reviews = new Reviews('section', 'review');
        this.main.appendChild(reviews.render());

        const viewed = new ViewBooks('section', 'viewed');
        this.main.appendChild(viewed.render());

        if(this.token){
            const darkBackground = document.createElement('div');
            const registration = new ResetPassword('section', 'reset', this.token);
            const body = document.querySelector('.body') as HTMLBodyElement;

            body.appendChild(registration.render());
            body.appendChild(darkBackground);
    
            setTimeout(function(){
                darkBackground.classList.add('dark-background');
                darkBackground.classList.add('dark-background_opacity');
            }, 100);

            darkBackground.addEventListener('click', () => {
                Header.prototype.closeForm('reset');
                Header.formActive = false;
            })    
    
        }

        // this.main.appendChild(this.darkBackground);
        // this.darkBackground.classList.add('dark-background');

        return this.main;
    }

    render() {
        this.container.append(this.createMainPage());

        this.input.addEventListener('keyup', async () => {
            const allBooks = await BooksAPI.getAllBooks();
            if (this.input.value.length > 0) {
                const headerSearch = new HeaderSearch(
                    'div',
                    'search__results__main__wrapper', 
                    allBooks,
                    this.input.value);
                const oldHeaderSearch = document.querySelector('.search__results__main__wrapper');
                if (oldHeaderSearch) {
                    oldHeaderSearch.remove();
                }
                this.form.append(headerSearch.render());

                window.addEventListener('click', (event) => {
                    if (event.target instanceof HTMLElement 
                        && !event.target.classList.contains('search__results__main__wrapper')){

                        const oldSearch = document.querySelector('.search__results__main__wrapper');
                        if (oldSearch) {
                            oldSearch.remove();
                        }

                        this.input.value = '';
                    }
                })
            } else if (this.input.value.length <= 0) {
                const oldHeaderSearch = document.querySelector('.search__results__main__wrapper');
                if (oldHeaderSearch) {
                    oldHeaderSearch.remove();
                }
            }
        })

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            window.location.hash = 'random';
        }, true)

        return this.container;
    }
}

export default MainPage;
