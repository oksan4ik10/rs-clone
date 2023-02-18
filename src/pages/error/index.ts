import Page from '../../core/templates/page';

export const enum ErrorTypes {
    Error_404 = 404,
}

class ErrorPage extends Page {
    private errorType: ErrorTypes | string;

    static TextObject: { [prop: string]: string } = {
        '404': 'Error! The page was not found.',
    };
    
    constructor(id: string, errorType: ErrorTypes | string) {
        super(id);
        this.errorType = errorType;
    }
    createPage() {
        const section = document.createElement('section');
        section.classList.add('error__section');
        const wrapper = document.createElement('wrapper');
        wrapper.classList.add('wrapper');
        const box = document.createElement('div');
        box.classList.add('error__box');
        const img = document.createElement('div');
        img.classList.add('error__img');
        const container = document.createElement('div');
        container.classList.add('error__container');
        const title = document.createElement('h2');
        title.classList.add('error__title');
        title.textContent = 'Ошибка 404';
        const subTitle = document.createElement('div');
        subTitle.classList.add('error__subtitle');
        subTitle.textContent = 'Такой страницы на сайте не существует.';
        const text = document.createElement('div');
        text.classList.add('error__text');
        text.textContent = 'Не печальтесь, попробуйте воспользоваться другими разделами нашего сайта:';
        const linksList = document.createElement('ul');
        linksList.classList.add('error__links');

        const li1 = document.createElement('li');
        li1.classList.add('error__link');
        li1.textContent = 'Главная страница';

        const li2 = document.createElement('li');
        li2.classList.add('error__link');
        li2.textContent = 'Генератор случайных книг';

        const li3 = document.createElement('li');
        li3.classList.add('error__link');
        li3.textContent = 'Немного о приложении и, конечно, о нас';
        
        li1.addEventListener('click', () => {
            window.location.hash = 'main-page';
        })

        li2.addEventListener('click', () => {
            window.location.hash = 'random';
        })

        li3.addEventListener('click', () => {
            // window.location.hash = 'random';
        })
        
        section.append(wrapper);
        wrapper.append(box);
        box.append(img);
        box.append(container);
        container.append(title);
        container.append(subTitle);
        container.append(text);
        container.append(linksList);
        linksList.append(li1);
        linksList.append(li2);
        linksList.append(li3);
        return section;
    }

    render() {
        this.container.append(this.createPage());
        return this.container;
    }
}

export default ErrorPage;
