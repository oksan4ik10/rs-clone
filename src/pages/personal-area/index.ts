import Page from "../../core/templates/page";
class PersonalArea extends Page {
    main: HTMLElement;
    readContent: HTMLElement;

    constructor(id: string) {
        super(id);
        this.main = document.createElement('main');
        
        this.readContent = document.createElement('div');
        
    }

    createMainPage() {
        this.main.classList.add('personal__page__wrapper');
        const section = document.createElement('section');
        section.classList.add('personal');

        const infoUserContainer = document.createElement('div');
        infoUserContainer.classList.add('personal__user');
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        const name = document.createElement('div');
        name.classList.add('personal__user__name');
        name.textContent = (document.querySelector('.header__personal__name-user') as HTMLSpanElement).textContent;

        const content = document.createElement('div');
        content.classList.add('personal__content');

        const wrapper2 = document.createElement('div');
        wrapper2.classList.add('wrapper');

        const readBooks = document.createElement('div');
        readBooks.classList.add('personal__read');

        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('personal__read__wrapper')
        
        const titleRead = document.createElement('div');
        titleRead.classList.add('personal__read__title');
        titleRead.textContent = 'Последние прочитанные';

        const titleMore = document.createElement('div');
        titleMore.classList.add('personal__read__more');
        titleMore.textContent = 'Показать все';

        this.readContent.classList.add('personal__read__content');
        this.readContent.textContent = 'У Вас пока нет прочитанных книг';

        section.append(this.main);
        this.main.append(infoUserContainer);
        infoUserContainer.append(wrapper);
        wrapper.append(name);
        this.main.append(content);
        content.append(wrapper2);
        wrapper2.append(readBooks);
        readBooks.append(titleWrapper);
        titleWrapper.append(titleRead);
        titleWrapper.append(titleMore);
        readBooks.append(this.readContent);

        return section;
    }

    //добавление прочитанных книг



    render() {
        this.container.append(this.createMainPage());
        return this.container;
    }
}

export default PersonalArea;
