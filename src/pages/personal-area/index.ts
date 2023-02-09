import Page from "../../core/templates/page";
import Personal from '../../core/components/personal-form';
import Header from '../../core/components/header';

class PersonalArea extends Page {
    main: HTMLElement;
    readContent: HTMLElement;
    button: HTMLButtonElement;

    static formActive = false;

    constructor(id: string) {
        super(id);
        this.main = document.createElement('main');
        this.button = document.createElement('button');
        this.readContent = document.createElement('div');
    }

    openForm(form: string) {
        const darkBackground = document.createElement('div');
        const changePersonal = new Personal('section', form);
        const body = document.querySelector('.body') as HTMLBodyElement;

        body.appendChild(changePersonal.render());
        body.appendChild(darkBackground);

        setTimeout(function(){
            darkBackground.classList.add('dark-background');
            darkBackground.classList.add('dark-background_opacity');
        }, 100);

        PersonalArea.formActive = true;

        darkBackground.addEventListener('click', () => {
            Header.prototype.closeForm(form);
            PersonalArea.formActive = false;
        })
    }

    createMainPage() {
        this.main.classList.add('personal__page__wrapper');
        const section = document.createElement('section');
        section.classList.add('personal');

        const infoUserContainer = document.createElement('div');
        infoUserContainer.classList.add('personal__user');
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        const nameBlock = document.createElement('div');
        nameBlock.classList.add('personal__user__block');

        const img = document.createElement('img');
        img.src = './images/avatar.jpg';
        img.classList.add('personal__user__img');

        const avatar = document.createElement('div');
        avatar.classList.add('personal__user__avatar');

        const name = document.createElement('div');
        name.classList.add('personal__user__name');
        name.textContent = (document.querySelector('.header__personal__name-user') as HTMLSpanElement).textContent;
        
        this.button.classList.add('personal__user__change', 'button');
        this.button.textContent = 'Редактировать профиль';

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

        this.button.addEventListener('click', () => {
            this.openForm('personal-form')
        })

        section.append(this.main);
        this.main.append(infoUserContainer);
        infoUserContainer.append(wrapper);
        wrapper.append(nameBlock);
        nameBlock.append(avatar);
        avatar.append(img);
        nameBlock.append(name);
        wrapper.append(this.button);
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
