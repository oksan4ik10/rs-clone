import Page from "../../core/templates/page";
import Personal from '../../core/components/personal-form';
import Header from '../../core/components/header';
import { UsersAPI, BooksAPI, GradesAPI, ReviewsAPI } from '../../api/api';
import { IOneBook } from '../../types';

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

    isAuthorised() {
        const storageStatus = localStorage.getItem('token');
        if (storageStatus !== null){
            return storageStatus;
        } 
        return false;
    }

    authStatus = this.isAuthorised();

    async getInfoUser() {
        return await UsersAPI.infoUser(this.authStatus as string);
    }

    showReadBook(data: IOneBook) {
        const container = document.createElement('div');
        container.classList.add('personal__read__book');

        const colomn = document.createElement('div');
        colomn.classList.add('personal__read__box');

        const infoBook = document.createElement('div');
        infoBook.classList.add('personal__read__info');

        const img = document.createElement('div');
        img.classList.add('personal__read__info__img');
        img.style.backgroundImage = `url('${data.img}')`;

        const name = document.createElement('div');
        name.classList.add('personal__read__info__name');
        name.textContent = `${data.title}`;

        const author = document.createElement('div');
        author.classList.add('personal__read__info__author');
        author.textContent = `${data.author}`;

        const buttonRemove = document.createElement('button');
        buttonRemove.classList.add('button', 'personal__reviews__button');
        buttonRemove.textContent = 'Удалить из прочитанного';

        const reviewsBlock = document.createElement('div');
        reviewsBlock.classList.add('personal__reviews');

        const title = document.createElement('h3');
        title.classList.add('personal__reviews__title');
        title.textContent = 'МОЙ ОТЗЫВ';

        const reviewsContainer = document.createElement('div');
        reviewsContainer.classList.add('personal__reviews__container');

        //узнать, есть ли оценка и отзыв пользователя на эту книгу

        const containerForGrade = document.createElement('div');
        containerForGrade.classList.add('personal__reviews__grade');

        const containerForReview = document.createElement('div');
        containerForReview.classList.add('personal__reviews__review');

        this.getInfoUser().then((res) => {
            GradesAPI.getGradeByUser(res._id, data._id).then((result) => {
                //есть ли оценка?
                if (result) {
                    // Оля рисует звездочки
                    containerForGrade.textContent = `${result}/10`;
                } else {
                    containerForGrade.textContent = 'Оценка не выставлена';
                }
            })
            ReviewsAPI.getReviewsByUser(this.authStatus as string, data._id).then((res) => {
                if (res) {
                    containerForReview.textContent = res.text;
                } else {
                    const button = document.createElement('div');
                    button.classList.add('personal__reviews__button', 'button');
                    button.textContent = 'Оставить отзыв';
                    containerForReview.append(button);

                    button.addEventListener('click', () => {
                        const id = data._id;
                        window.location.hash = `id=${id}`;
                    })
                }
            })
        })


        this.readContent.append(container);
        container.append(colomn);
        colomn.append(infoBook);
        colomn.append(buttonRemove);
        infoBook.append(img);
        infoBook.append(name);
        infoBook.append(author);
        container.append(reviewsBlock);
        reviewsBlock.append(title);
        reviewsBlock.append(reviewsContainer);
        reviewsContainer.append(containerForGrade);
        reviewsContainer.append(containerForReview);

        buttonRemove.addEventListener('click', () => {
            buttonRemove.textContent = 'Подтвердите удаление';
            buttonRemove.addEventListener('click', () => {
                UsersAPI.removeBooksRead(data._id, this.authStatus as string);
                container.remove();
            })
            document.addEventListener('click', (e) => {
                if(e.target !== buttonRemove) {
                    buttonRemove.textContent = 'Удалить из прочитанного';
                }
            })
        })

        img.addEventListener('click', () => {
            const id = data._id;
            window.location.hash = `id=${id}`;
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

        this.getInfoUser().then((res) => {
            name.textContent = res.name;
        })
        
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

        this.readContent.classList.add('personal__tab__content');
        this.readContent.style.display = 'block';
        read.classList.add('personal__button-active');


        //добавить проверку на наличие книг в списке прочитанных 
        this.getInfoUser().then((res) => {
            if (res.books.length === 0) {
                const readTitle = document.createElement('div');
                readTitle.textContent = 'У вас пока нет прочитанных книг';
                this.readContent.append(readTitle);
            } else {
                for (let i = 0; i < res.books.length; i ++) {
                    BooksAPI.getBookById(res.books[i]).then(data => {
                        //отрисовка каждой книги из списка прочитанных
                        this.showReadBook(data);
                    })
                }
            }
        })


        const willReadContent = document.createElement('div');
        willReadContent.classList.add('personal__tab__content');

        //добавить проверку на наличие книг в списке желаемых к прочитаннию

        const willReadTitle = document.createElement('div');
        willReadTitle.textContent = 'У вас пока нет книг, которые вы хотите прочесть';
        willReadContent.append(willReadTitle);

        read.addEventListener('click', () => {
            this.readContent.style.display = 'block';
            read.classList.add('personal__button-active');
            willRead.classList.remove('personal__button-active');
            willReadContent.style.display = 'none';
        })

        willRead.addEventListener('click', () => {
            willReadContent.style.display = 'block';
            willRead.classList.add('personal__button-active');
            read.classList.remove('personal__button-active');
            this.readContent.style.display = 'none';
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
        readWrapper.append(this.readContent);
        readWrapper.append(willReadContent);
        
        return section;
    }

    render() {
        this.container.append(this.createMainPage());
        return this.container;
    }
}

export default PersonalArea;
