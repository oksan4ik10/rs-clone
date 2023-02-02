import Page from "../../core/templates/page";
import Reviews from "../../core/components/reviews";
import PopularBooks from "../../core/components/popular";
import Recommendation from "../../core/components/recommend";
import ViewBooks from "../../core/components/viewed";

class MainPage extends Page {

    constructor(id: string) {
        super(id);
    }

    createMainPage() {
        const main = document.createElement('main');
        main.classList.add('main');

        const preview = document.createElement('section');
        preview.classList.add('preview');

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        
        const title = document.createElement('h3');
        title.classList.add('preview__title');
        title.textContent = 'Найди свою книгу';

        const form = document.createElement('form');
        form.classList.add('preview__form');

        const input = document.createElement('input');
        input.type = 'search';
        input.classList.add('input');
        input.classList.add('preview__search__input');
        input.placeholder = 'Введите название книги...';

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
        img1.classList.add('preview__about__img');
        const text1 = document.createElement('div');
        text1.classList.add('preview__about__text');
        text1.textContent = 'Находите интересные книги';
        div1.appendChild(img1);
        div1.appendChild(text1);

        const div2 = document.createElement('div');
        div2.classList.add('preview__about__column');
        const img2 = document.createElement('div');
        img2.classList.add('preview__about__img');
        const text2 = document.createElement('div');
        text2.classList.add('preview__about__text');
        text2.textContent = 'Собирайте свою библиотеку';
        div2.appendChild(img2);
        div2.appendChild(text2);

        const div3 = document.createElement('div');
        div3.classList.add('preview__about__column');
        const img3 = document.createElement('div');
        img3.classList.add('preview__about__img');
        const text3 = document.createElement('div');
        text3.classList.add('preview__about__text');
        text3.textContent = 'Оценивайте и обсуждайте';
        div3.appendChild(img3);
        div3.appendChild(text3);

        const div4 = document.createElement('div');
        div4.classList.add('preview__about__column');
        const img4 = document.createElement('div');
        img4.classList.add('preview__about__img');
        const text4 = document.createElement('div');
        text4.classList.add('preview__about__text');
        text4.textContent = 'Следите за тем, что читают друзья';
        div4.appendChild(img4);
        div4.appendChild(text4);

        const buttonMore = document.createElement('button');
        buttonMore.classList.add('button');
        buttonMore.classList.add('preview__more');
        buttonMore.textContent = 'Хотите узнать больше?';

        main.appendChild(preview);
        preview.appendChild(wrapper);
        wrapper.appendChild(title);
        wrapper.appendChild(form);
        form.appendChild(input);
        form.appendChild(button);
        wrapper.appendChild(about);
        about.appendChild(div1);
        about.appendChild(div2);
        about.appendChild(div3);
        about.appendChild(div4);
        wrapper.appendChild(buttonMore);

        const popular = new PopularBooks('section', 'popular');
        main.appendChild(popular.render());

        const recommendation = new Recommendation('section', 'recommend');
        main.appendChild(recommendation.render());

        const reviews = new Reviews('section', 'review');
        main.appendChild(reviews.render());

        const viewed = new ViewBooks('section', 'viewed');
        main.appendChild(viewed.render());

        return main;
    }

    render() {
        this.container.append(this.createMainPage());
        return this.container;
    }
}

export default MainPage;
