import { BooksAPI, GradesAPI, ReviewsAPI, UsersAPI } from '../../api/api';
import Header from '../../core/components/header';
import { OneReview } from '../../core/components/one-review/review';
import Page from '../../core/templates/page';
import { IOptions } from '../../types';

class DescriptionPage extends Page {
    addToReadButton: HTMLButtonElement;
    wantToReadButton: HTMLButtonElement;
    main: HTMLElement;
    bookId: string;
    descrContentWrapper: HTMLElement;

    constructor(id: string) {
        super(id);
        this.addToReadButton = document.createElement('button');
        this.wantToReadButton = document.createElement('button');
        this.main = document.createElement('main');
        this.main.classList.add('description__page__wrapper');
        this.descrContentWrapper = document.createElement('div');
        this.descrContentWrapper.classList.add('desc__content__wrapper');
        this.bookId = window.location.hash.split('=')[1];
    }
    
    isAuthorised() {
        const storageStatus = localStorage.getItem('token');
        if (storageStatus !== null){
            return storageStatus;
        } 
        return false;
    }

    authStatus = this.isAuthorised();

    showAuthPopUp() {
        if (this.authStatus === false) {
            Header.prototype.openAuth('authorisation');
            const authText = document.querySelector('.authorisation__title');
            if (authText) {
                authText.textContent = 'Авторизуйтесь, чтобы продолжить';
            }
        }
    }

    listenAuthorizedAction = (event: Event) => {
        if (event.target instanceof Element && (
            event.target.classList.contains('button') ||
            event.target.classList.contains('decr__form') ||
            event.target.tagName === 'LABEL')
        ){
            this.showAuthPopUp();
        }
    }

    async getRatingByAuthorizedUser() {
        if (typeof this.authStatus === 'string'){
            const res = await UsersAPI.infoUser(this.authStatus);
            return await GradesAPI.getGradeByUser(res._id, this.bookId).then(grade => {
                if (grade) {
                    return grade;
                } 
                return null;
            })
        }
        return null;
    }

    async toggleToWantBook() {
        if (this.wantToReadButton.textContent === 'Удалить из планов') {
            //удалить книгу из планов
            this.wantToReadButton.textContent = 'Хочу прочитать';
            this.addToReadButton.style.display = 'block';
            return await UsersAPI.removeBooksWantRead(this.bookId, this.authStatus as string);
        } else {
            //добавить книгу в планы
            this.wantToReadButton.textContent = 'Удалить из планов';
            this.addToReadButton.style.display = 'none';
            return await UsersAPI.addBooksWantRead(this.bookId, this.authStatus as string);
        }
    }

    async toggleToReadBook() {
        if (this.addToReadButton.textContent === 'Удалить из прочитанного') {
            //удалить книгу из прочитанного
            this.wantToReadButton.style.display = 'block';
            this.addToReadButton.textContent = 'Добавить в прочитанное';
            
            // проверка, есть ли у этого юзера отзыв, если есть, то обновляем отзывы
            let result;
            if (typeof this.authStatus === 'string'){
                const hasReview = await ReviewsAPI.hasUserReview(this.bookId, this.authStatus);
                
                result = await UsersAPI.removeBooksRead(this.bookId, this.authStatus as string);

                if (hasReview) {
                    this.reCreateReviews();
                }
            }
            return result;
        } else {
            //добавить книгу в прочитанное
            this.wantToReadButton.style.display = 'none';
            this.addToReadButton.textContent = 'Удалить из прочитанного';
            return await UsersAPI.addBooksRead(this.bookId, this.authStatus as string);
        }
    }

    checkButtonsAdd() {
        if (typeof this.authStatus !== 'boolean'){
            UsersAPI.checkBooksLikeRead(this.bookId, this.authStatus).then(bookStatus => {

                if (bookStatus === "false") {
                    this.wantToReadButton.style.display = 'block';
                    this.addToReadButton.style.display = 'block';
                    
                    this.addToReadButton.addEventListener('click', () => {
                        this.toggleToReadBook();
                    })
                    this.wantToReadButton.addEventListener('click', () => {
                        this.toggleToWantBook();
                    })

                } else if (bookStatus === 'booksLike') {
                    this.wantToReadButton.textContent = 'Удалить из планов';
                    this.wantToReadButton.style.display = 'block';

                    this.wantToReadButton.addEventListener('click', () => {
                        this.toggleToWantBook();
                    })
                    this.addToReadButton.addEventListener('click', () => {
                        this.toggleToReadBook();
                    })

                } else if (bookStatus === 'books') {
                    this.addToReadButton.textContent = 'Удалить из прочитанного';
                    this.addToReadButton.style.display = 'block';

                    this.wantToReadButton.addEventListener('click', () => {
                        this.toggleToWantBook();
                    })
                    this.addToReadButton.addEventListener('click', () => {
                        this.toggleToReadBook();
                    })
                }
            })

        } else {
            this.wantToReadButton.style.display = 'block';
            this.addToReadButton.style.display = 'block';
        }
    }

    createPage() {
        const descrImgWrapper = document.createElement('div');
        descrImgWrapper.classList.add('desc__img__wrapper');
        descrImgWrapper.addEventListener('click', this.listenAuthorizedAction);

        const descrName = document.createElement('div');
        descrName.classList.add('decription__name');
        const descrAuthor = document.createElement('div');
        descrAuthor.classList.add('description__author');
        const descrYear = document.createElement('div');
        descrYear.classList.add('description__year');
        const descrGenre = document.createElement('div');
        descrGenre.classList.add('description__genre');

        const descrDescrWrapper = document.createElement('div');
        descrDescrWrapper.classList.add('description__descr__wrapper');
        const descrDescrTitle = document.createElement('div');
        descrDescrTitle.classList.add('description__descr__title');
        descrDescrTitle.textContent = "Описание";
        const descrDescr = document.createElement('div');
        descrDescr.classList.add('description__descr__content');

        // строка с рейтингом
        const ratingWrapper = document.createElement('div');
        ratingWrapper.classList.add('decription__rating__wrapper');
        const myRatingText = document.createElement('span');
        myRatingText.classList.add('description__myrating__text');
        myRatingText.textContent = 'Моя оценка:';
        const myRating = document.createElement('div');
        myRating.classList.add('description__myrating');
        const ratingContainer = document.createElement('div');

        const subRatingWrapper = document.createElement('div');
        subRatingWrapper.classList.add('decription__subrating__wrapper');
        subRatingWrapper.style.display = 'none';
        const mySubRatingText = document.createElement('span');
        mySubRatingText.classList.add('description__mysubrating__text');
        mySubRatingText.textContent = 'Вы оценили книгу на';
        const mySubRating = document.createElement('div');
        mySubRating.classList.add('description__mysubrating');
        const deleteMyRating = document.createElement('span');
        deleteMyRating.classList.add('description__delete__myrating');
        deleteMyRating.textContent = 'Отменить оценку?'
        
        deleteMyRating.addEventListener('click', async () => {
            if (typeof this.authStatus === 'string'){
                const newAllRating = await GradesAPI.deleteMyRating(this.bookId, this.authStatus);

                const previousCheckedStars = document.querySelectorAll('.desc__my__rat');
                previousCheckedStars.forEach(star => {
                    if (star instanceof HTMLInputElement) {
                        star.checked = false;
                    }
                })
                
                subRatingWrapper.style.display = 'none';
                allRating.textContent = newAllRating.raiting.toString();

                const hasReview = await ReviewsAPI.hasUserReview(this.bookId, this.authStatus);
                if (hasReview) {
                    console.log(hasReview);
                    this.reCreateReviews();
                }
            }
        })

        this.getRatingByAuthorizedUser().then(rating => {
            const ratingByUser = rating;

            // рисуем звёздочки
            for (let i = 10; i > 0; i--) {
                const inputElement = document.createElement('input');
                inputElement.type = 'radio';
                inputElement.id = `myrating-${i}`;
                inputElement.name = 'myrating';
                inputElement.value = i + '';
                inputElement.classList.add('desc__my__rat')

                if (ratingByUser === i) {
                    inputElement.checked = true;
                    mySubRating.textContent = ratingByUser.toString();
                    subRatingWrapper.style.display = 'block';
                }

                const labelElement = document.createElement('label');
                labelElement.htmlFor = `myrating-${i}`;
                labelElement.id = `myratinglbl-${i}`;
                labelElement.classList.add('descr_star');

                myRating.append(inputElement, labelElement);
            }
            
            const myratingNumbers = document.createElement('div');
            myratingNumbers.classList.add('myrating__numbers');

            // рисуем цифры к звёздочкам
            for (let i = 1; i <= 10; i++) {
                const iElement = document.createElement('i');
                iElement.textContent = i + '';

                myratingNumbers.append(iElement);
            }
            
            ratingContainer.append(myRating, myratingNumbers);

        })

        ratingContainer.addEventListener('click', async (event) => {
            if (event.target instanceof HTMLLabelElement && event.target.classList.contains('descr_star')) {
                event.preventDefault();
            
                if (!this.authStatus){
                    this.showAuthPopUp();
                } else if (typeof this.authStatus === 'string') {
                    const currentRating = +event.target.id.split('-')[1];
                    const previousCheckedStar = document.querySelector('.descr_star');
                    if (previousCheckedStar instanceof HTMLInputElement) {
                        previousCheckedStar.checked = false;
                    }
                    
                    const inputChecked = event.target.previousElementSibling;
                    if (inputChecked instanceof HTMLInputElement){
                        inputChecked.checked = true;
                    }

                    const newRating = await GradesAPI.postGrade(currentRating, this.bookId, this.authStatus);
                    if (newRating){
                        allRating.textContent = newRating.toString();
                        mySubRating.textContent = currentRating.toString();
                        subRatingWrapper.style.display = 'block';

                        const hasReview = await ReviewsAPI.hasUserReview(this.bookId, this.authStatus);
                        if (hasReview) {
                            console.log(hasReview);
                            this.reCreateReviews();
                        }
                    }
                }
            }
        })

        // продолжаем создавать страницу описания книги
        const allRatingText = document.createElement('span');
        allRatingText.classList.add('description__allrating__text');
        allRatingText.textContent = 'Средняя оценка:';
        const allRating = document.createElement('div');
        allRating.classList.add('description__allrating');

        const descrImgOuter = document.createElement('div');
        descrImgOuter.classList.add('description__image__outer');
        const descrImg = document.createElement('img');
        descrImg.classList.add('description__image');
        descrImg.alt = 'Book cover picture';
        this.addToReadButton.classList.add('description__addtoread', 'button');
        this.addToReadButton.textContent = 'Добавить в прочитанное';
        this.wantToReadButton.classList.add('description__wanttoread', 'button');
        this.wantToReadButton.textContent = 'Хочу прочитать';
        this.wantToReadButton.style.display = 'none';
        this.addToReadButton.style.display = 'none';

        // присваиваем элементам информацию по книге
        BooksAPI.getBookById(this.bookId).then(bookInfo => {
            descrName.textContent = bookInfo.title;
            descrAuthor.textContent = `Автор книги: ${bookInfo.author}`;
            descrYear.textContent = `Год написания: ${bookInfo.year}`;
            descrGenre.textContent = `Жанр: ${bookInfo.genre}`;
            descrDescr.textContent = bookInfo.desc;
            allRating.textContent = bookInfo.raiting.toString();
            descrImg.src = bookInfo.img;
        });

        descrImgWrapper.append(descrImgOuter);

        this.checkButtonsAdd();

        descrImgWrapper.append(this.addToReadButton, this.wantToReadButton);

        ratingWrapper.append(myRatingText, ratingContainer, allRatingText, allRating);
        subRatingWrapper.append(mySubRatingText, mySubRating, deleteMyRating);
        descrDescrWrapper.append(descrDescrTitle, descrDescr);
        descrImgOuter.append(descrImg);
        this.descrContentWrapper.append(descrName, descrAuthor, descrYear, 
            descrGenre, descrDescrWrapper, ratingWrapper, subRatingWrapper, this.createReviews());
        this.main.append(this.descrContentWrapper, descrImgWrapper);

        return this.main;
    }

    reCreateReviews() {
        if (this.descrContentWrapper.lastChild){
            this.descrContentWrapper.removeChild(this.descrContentWrapper.lastChild);
        }

        this.descrContentWrapper.append(this.createReviews());
    }

    createReviews() {
        const reviewsAreaWrapper = document.createElement('div');
        reviewsAreaWrapper.classList.add('descr__reviewsarea__wrapper');

        const descrReviewsTitle = document.createElement('div');
        descrReviewsTitle.classList.add('description__descr__title');
        descrReviewsTitle.textContent = "Рецензии";

        const newReviewForm = document.createElement('form');
        newReviewForm.classList.add('decr__form');
        const newReviewText = document.createElement('textarea');
        newReviewText.name = 'text';
        newReviewText.classList.add('decr__textarea');
        newReviewText.placeholder = "Оставить рецензию...";
        const newReviewSubmit = document.createElement('button');
        newReviewSubmit.classList.add('button', 'desc_button__submit');
        newReviewSubmit.type = 'submit';
        newReviewSubmit.textContent = 'Отправить';
        newReviewSubmit.style.display = 'none';
        newReviewForm.append(newReviewText, newReviewSubmit);

        const sendNewReview = (event: Event) => {
            event.preventDefault();

            if (newReviewText.value.length > 0 && typeof this.authStatus === 'string'){
                ReviewsAPI.postNewReview(newReviewText.value, this.bookId, this.authStatus).then(() => {
                    this.reCreateReviews();

                    this.wantToReadButton.style.display = 'none';
                    this.addToReadButton.style.display = 'block';
                    this.addToReadButton.textContent = 'Удалить из прочитанного';
                    this.wantToReadButton.textContent= 'Хочу прочитать';
                }); 
            }
        }

        newReviewSubmit.addEventListener('click', sendNewReview);

        const toggleReviewSubmit = (event: Event) => {
            if (newReviewText === document.activeElement && this.authStatus && newReviewText.value.length > 0){
                newReviewSubmit.style.display = 'block';
            } else if (newReviewText === document.activeElement && !this.authStatus) {
                this.showAuthPopUp();
            } else if(event.target instanceof HTMLElement && !event.target.classList.contains('desc_button__submit') && newReviewText.value.length <= 0) {
                setTimeout(() => {
                    newReviewSubmit.style.display = 'none';
                }, 100) 
            }
        }

        newReviewText.addEventListener('input', () => {
            if (newReviewText.value.length > 0){
                newReviewSubmit.style.display = 'block';
            } else {
                newReviewSubmit.style.display = 'none';
            }
        })

        document.addEventListener('click', toggleReviewSubmit);

        const reviewsWrapper = document.createElement('div');
        reviewsWrapper.classList.add('descr__reviews__wrapper');

        ReviewsAPI.getAllReviews(this.bookId).then( async allReviews => {

            if (allReviews.length === 0){
                reviewsWrapper.textContent = 'Будьте первым, кто оставит рецензию!'
            }

            for (let i = 0; i < allReviews.length; i++) {
                const newReview = new OneReview('div', '', allReviews, this.bookId, i);
                reviewsWrapper.append(newReview.render());
            }
        })

        reviewsAreaWrapper.append(descrReviewsTitle, newReviewForm, reviewsWrapper);
        return reviewsAreaWrapper;
    }

    render() {
        this.container.append(this.createPage());
        return this.container;
    }
}

export default DescriptionPage;
