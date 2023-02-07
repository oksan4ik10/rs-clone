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

        const tab = document.createElement('div');
        tab.classList.add('personal__tab');

        const read = document.createElement('div');
        read.classList.add('personal__tab__button');
        read.textContent = 'Прочитанные книги'

        const willRead = document.createElement('div');
        willRead.classList.add('personal__tab__button');
        willRead.textContent = 'Хочу прочитать';

        const readWrapper = document.createElement('div');
        readWrapper.classList.add('personal__tab__wrapper')

        const readContent = document.createElement('div');
        readContent.classList.add('personal__tab__content');
        const readTitle = document.createElement('div');
        readTitle.textContent = 'У вас пока нет прочитанных книг';
        readContent.append(readTitle);

        const willReadContent = document.createElement('div');
        willReadContent.classList.add('personal__tab__content')
        const willReadTitle = document.createElement('div');
        willReadTitle.textContent = 'У вас пока нет книг, которые вы хотите прочесть';
        willReadContent.append(willReadTitle);

        read.addEventListener('click', () => {
            readContent.style.display = 'block';
            read.classList.add('personal__button-active');
            willRead.classList.remove('personal__button-active');
            willReadContent.style.display = 'none';
        })

        willRead.addEventListener('click', () => {
            willReadContent.style.display = 'block';
            willRead.classList.add('personal__button-active');
            read.classList.remove('personal__button-active');
            readContent.style.display = 'none';
        })

        section.append(this.main);
        this.main.append(infoUserContainer);
        infoUserContainer.append(wrapper);
        wrapper.append(name);
        this.main.append(content);
        content.append(wrapper2);
        wrapper2.append(tab);
        tab.append(read);
        tab.append(willRead);
        wrapper2.append(readWrapper);
        readWrapper.append(readContent);
        readWrapper.append(willReadContent);
        
        return section;
    }

    //добавление прочитанных книг



    render() {
        this.container.append(this.createMainPage());
        return this.container;
    }
}

export default PersonalArea;
