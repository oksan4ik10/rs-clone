import Page from "../../core/templates/page";
import Personal from '../../core/components/personal-form';
import Header from '../../core/components/header';
import { UsersAPI, BooksAPI, GradesAPI, ReviewsAPI } from '../../api/api';
import { IOneBook } from '../../types';
import App from "../app";

class PersonalArea extends Page {
    main: HTMLElement;
    wrapper: HTMLElement;
    readContent: HTMLElement;
    willReadContent: HTMLElement;
    button: HTMLButtonElement;
    openEditReview: boolean;

    static formActive = false;

    constructor(id: string) {
        super(id);
        this.main = document.createElement('main');
        this.button = document.createElement('button');
        this.readContent = document.createElement('div');
        this.willReadContent = document.createElement('div');
        this.wrapper = document.createElement('div');
        this.openEditReview = false;
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
        const gradeStars = document.createElement('div');
        gradeStars.classList.add('personal__reviews__grade__stars');
        const gradeNumber = document.createElement('div');
        gradeNumber.classList.add('personal__reviews__grade__number');

        const containerForReview = document.createElement('div');
        containerForReview.classList.add('personal__reviews__review');

        this.getInfoUser()
        .then((res) => {
            GradesAPI.getGradeByUser(res._id, data._id).then((result) => {
                //есть ли оценка?
                if (result) {
                    for (let j = 0; j < 10; j++) {
                        const inputElement = document.createElement('span');
                        if (result > j){
                            inputElement.classList.add('golden');
                        }                
                        gradeStars.append(inputElement);
                      }
                
                      if (result > 0) {
                        gradeNumber.textContent = `${result}/10`;
                      }
                } else {
                    gradeNumber.textContent = 'Оценка не выставлена';
                    gradeStars.style.display = 'none';
                }
            })

            ReviewsAPI.getReviewsByUser(this.authStatus as string, data._id)
            .then((res) => {
                if (res) {
                    containerForReview.textContent = res.text;

                    //добавить иконку редактирования;
                    const editIcon = document.createElement('div');
                    editIcon.classList.add('personal__reviews__edit');
                    reviewsContainer.append(editIcon);


                    editIcon.addEventListener('click', () => {
                        if (this.openEditReview === false) {
                            const text = res.text;
                            containerForReview.style.display = 'none';
                            const form = document.createElement('form');
                            const textArea = document.createElement('textarea');
                            textArea.classList.add('personal__reviews__textarea')
                            reviewsContainer.append(form);
                            form.classList.add('personal__reviews__form');
                            textArea.value = text;
                            const button = document.createElement('button');
                            button.classList.add('button', 'personal__reviews__button');
                            button.textContent = 'Сохранить';
                            form.append(textArea);
                            form.append(button);
                            this.openEditReview = true;

                            button.addEventListener('click', () => {
                                ReviewsAPI.postNewReview(textArea.value, data._id, this.authStatus as string);
                                form.remove();
                                containerForReview.textContent = textArea.value;
                                containerForReview.style.display = 'block';
                                this.openEditReview = false;
                            })
                        }
                    })
                } else {
                    const button = document.createElement('button');
                    button.classList.add('button', 'personal__reviews__button');
                    button.textContent = 'Оставить отзыв';
                    button.style.marginTop = '80px';
                    containerForReview.append(button);

                    if (this.wrapper.offsetWidth < 561) {
                        title.style.display = 'none';
                        containerForGrade.style.display = 'none';
                        button.style.marginTop = '0px';
                    }

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
        containerForGrade.append(gradeStars, gradeNumber);
        reviewsContainer.append(containerForGrade);
        reviewsContainer.append(containerForReview);

        buttonRemove.addEventListener('click', () => {
            if (buttonRemove.textContent === 'Удалить из прочитанного') {
                buttonRemove.textContent = 'Подтвердите удаление';
            } else if (buttonRemove.textContent === 'Подтвердите удаление') {
                UsersAPI.removeBooksRead(data._id, this.authStatus as string);
                container.remove();
                if (this.readContent.children.length === 0) {
                    const readTitle = document.createElement('div');
                    readTitle.textContent = 'У вас пока нет прочитанных книг';
                    this.readContent.append(readTitle);
                }
            }
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

    showWantReadBook (data: IOneBook) {
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
        name.textContent = data.title;

        const author = document.createElement('div');
        author.classList.add('personal__read__info__author');
        author.textContent = data.author;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('personal__read__buttons');

        const buttonRemove = document.createElement('button');
        buttonRemove.classList.add('button', 'personal__reviews__button');
        buttonRemove.textContent = 'Удалить из списка';

        const buttonRead = document.createElement('button');
        buttonRead.classList.add('button', 'personal__reviews__button');
        buttonRead.textContent = 'Уже прочитал';

        const descrBlock = document.createElement('div');
        descrBlock.classList.add('personal__descr');

        const descrText = document.createElement('div');
        descrText.classList.add('personal__descr__text');
        descrText.textContent = data.desc;

        this.willReadContent.append(container);
        container.append(colomn);
        colomn.append(infoBook);
        infoBook.append(img);
        infoBook.append(name);
        infoBook.append(author);
        container.append(descrBlock);
        descrBlock.append(descrText);
        descrBlock.append(buttonsContainer);
        buttonsContainer.append(buttonRead);
        buttonsContainer.append(buttonRemove);

        img.addEventListener('click', () => {
            const id = data._id;
            window.location.hash = `id=${id}`;
        })


        // нажатие на кнопку Уже прочитал
        buttonRead.addEventListener('click', () => {
            //удаление из списка книг, планируемых к прочтению
            UsersAPI.removeBooksWantRead(data._id, this.authStatus as string).then((res) => {
                UsersAPI.addBooksRead(data._id, this.authStatus as string).then((res) => {
                    const readBooks = document.querySelector('.personal__tab__content-read') as HTMLElement;
                    
                    for (let i = 0; i < readBooks.children.length; i++) {
                        (readBooks.children[i] as HTMLElement).style.display = 'none';
                    }

                    this.getInfoUser().then((res) => {  
                        for (let i = 0; i < res.books.length; i ++) {
                            BooksAPI.getBookById(res.books[i]).then(data => {
                                this.showReadBook(data);
                            })
                        }
                    })
                    container.remove();
                    console.log(this.willReadContent.children.length)
                    
                    if (this.willReadContent.children.length === 0) {
                        const readTitle = document.createElement('div');
                        readTitle.textContent = 'У вас пока нет книг, которые вы хотите прочесть';
                        this.willReadContent.append(readTitle);
                    }
                    });
            });
        })

        // нажатие на кнопку Удалить из списка

        buttonRemove.addEventListener('click', () => {
            UsersAPI.removeBooksWantRead(data._id, this.authStatus as string).then((res) => {
                container.remove();
                console.log('willReadContent.children.length', this.willReadContent.children.length)
                if (this.willReadContent.children.length === 0) {
                    const readTitle = document.createElement('div');
                    readTitle.textContent = 'У вас пока нет книг, которые вы хотите прочесть';
                    this.willReadContent.append(readTitle);
                }
            })
        })
    }

    createMainPage() {
        this.main.classList.add('personal__page__wrapper');
        const section = document.createElement('section');
        section.classList.add('personal');

        const infoUserContainer = document.createElement('div');
        infoUserContainer.classList.add('personal__user');
        // const wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapper');

        const nameBlock = document.createElement('div');
        nameBlock.classList.add('personal__user__block');

        const img = document.createElement('img');
        img.classList.add('personal__user__img');

        const avatar = document.createElement('div');
        avatar.classList.add('personal__user__avatar');

        const name = document.createElement('div');
        name.classList.add('personal__user__name');

        this.getInfoUser().then((res) => {
            name.textContent = res.name;
            img.src = res.img;
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

        this.readContent.classList.add('personal__tab__content', 'personal__tab__content-read');
        this.readContent.style.display = 'block';
        read.classList.add('personal__button-active');


        //добавить проверку на наличие книг в списке прочитанных 
        this.getInfoUser()
        .then((res) => {
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
        .then(()=>{
            App.closeLoader();
        })

        this.willReadContent.classList.add('personal__tab__content', 'personal__tab__content-want');

        //добавить проверку на наличие книг в списке желаемых к прочитаннию

        this.getInfoUser().then((res) => {
            if(res.booksLike.length === 0) {
                const willReadTitle = document.createElement('div');
                willReadTitle.textContent = 'У вас пока нет книг, которые вы хотите прочесть';
                this.willReadContent.append(willReadTitle);
            } else {
                for (let i = 0; i < res.booksLike.length; i ++) {
                    BooksAPI.getBookById(res.booksLike[i]).then(data => {
                        //отрисовка каждой книги из списка желаемых к прочитаннию
                        this.showWantReadBook(data);
                    })
                }
            }
        })

        read.addEventListener('click', () => {
            this.readContent.style.display = 'block';
            read.classList.add('personal__button-active');
            willRead.classList.remove('personal__button-active');
            this.willReadContent.style.display = 'none';
        })

        willRead.addEventListener('click', () => {
            this.willReadContent.style.display = 'block';
            willRead.classList.add('personal__button-active');
            read.classList.remove('personal__button-active');
            this.readContent.style.display = 'none';
        })

        this.button.addEventListener('click', () => {
            this.openForm('personal-form')
        })

        section.append(this.main);
        this.main.append(infoUserContainer);
        infoUserContainer.append(this.wrapper);
        this.wrapper.append(nameBlock);
        nameBlock.append(avatar);
        avatar.append(img);
        nameBlock.append(name);
        this.wrapper.append(this.button);
        this.main.append(content);
        content.append(wrapper2);
        wrapper2.append(tab);
        tab.append(read);
        tab.append(willRead);
        wrapper2.append(readWrapper);
        readWrapper.append(this.readContent);
        readWrapper.append(this.willReadContent);
        
        return section;
    }

    render() {
        this.container.append(this.createMainPage());
        return this.container;
    }
}

export default PersonalArea;
