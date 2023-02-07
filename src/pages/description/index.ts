import { BooksAPI, ReviewsAPI } from '../../api/api';
import Page from '../../core/templates/page';
import { IOptions } from '../../types';

class DescriptionPage extends Page {
    addToReadButton: HTMLButtonElement;
    main: HTMLElement;
    bookdId: string;
    descrContentWrapper: HTMLElement;
    

    constructor(id: string) {
        super(id);
        this.addToReadButton = document.createElement('button');
        this.main = document.createElement('main');
        this.main.classList.add('description__page__wrapper');
        this.descrContentWrapper = document.createElement('div');
        this.descrContentWrapper.classList.add('desc__content__wrapper');
        this.bookdId = window.location.hash.split('=')[1];
    }

    createPage() {
        const descrImgWrapper = document.createElement('div');
        descrImgWrapper.classList.add('desc__img__wrapper');

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
        
        // рисуем звёздочки
        for (let i = 10; i > 0; i--) {
            const inputElement = document.createElement('input');
            inputElement.type = 'radio';
            inputElement.id = `myrating-${i}`;
            inputElement.name = 'myrating';
            inputElement.value = i + '';

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

        ratingContainer.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement && event.target.classList.contains('descr_star')) {
                const currentRating = event.target.id.split('-')[1];
                console.log(currentRating);
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

        // присваиваем элементам информацию по книге
        BooksAPI.getBookById(this.bookdId).then(bookInfo => {
            descrName.textContent = bookInfo.title;
            descrAuthor.textContent = `Автор книги: ${bookInfo.author}`;
            descrYear.textContent = `Год написания: ${bookInfo.year}`;
            descrGenre.textContent = `Жанр: ${bookInfo.genre}`;
            descrDescr.textContent = bookInfo.desc;
            allRating.textContent = bookInfo.raiting.toString();
            descrImg.src = bookInfo.img;
        });

        ratingContainer.append(myRating, myratingNumbers);
        ratingWrapper.append(myRatingText, ratingContainer, allRatingText, allRating);
        descrDescrWrapper.append(descrDescrTitle, descrDescr);
        descrImgOuter.append(descrImg);
        descrImgWrapper.append(descrImgOuter, this.addToReadButton);
        this.descrContentWrapper.append(descrName, descrAuthor, descrYear, 
            descrGenre, descrDescrWrapper, ratingWrapper, this.createReviews());
        this.main.append(this.descrContentWrapper, descrImgWrapper);

        return this.main;
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
        newReviewText.classList.add('decr__textarea');
        newReviewText.placeholder = "Оставить рецензию...";
        const newReviewSubmit = document.createElement('button');
        newReviewSubmit.classList.add('button', 'desc_button__submit');
        newReviewSubmit.type = 'submit';
        newReviewSubmit.textContent = 'Отправить';
        newReviewSubmit.style.display = 'none';
        newReviewForm.append(newReviewText, newReviewSubmit);

        const toggleReviewSubmit = () => {

        }

        newReviewText.addEventListener('click', () => {
            
        })

        const reviewsWrapper = document.createElement('div');
        reviewsWrapper.classList.add('descr__reviews__wrapper');

        ReviewsAPI.getAllReviews(this.bookdId).then(allReviews => {
            console.log(allReviews);

            if (allReviews.length === 0){
                reviewsWrapper.textContent = 'Будьте первым, кто оставит рецензию!'
            }

            for (let i = 0; i < allReviews.length; i++) {
                const oneReviewWrapper = document.createElement('div');
                oneReviewWrapper.classList.add('decr__onereiew__wrapper');

                const oneReviewHeader = document.createElement('div');
                oneReviewHeader.classList.add('desc__review__header');

                const reviewUserImage = document.createElement('img');
                reviewUserImage.classList.add('desc__review__img');
                reviewUserImage.alt = "";
                reviewUserImage.src = allReviews[i].userImg;

                const reviewNameDateWrapper = document.createElement('div');                
                reviewNameDateWrapper.classList.add('desc__review__namedatewrap');
                const reviewName = document.createElement('div');
                reviewName.classList.add('desc__review__name');
                reviewName.textContent = allReviews[i].userName;
                const reviewDate = document.createElement('div');
                reviewDate.classList.add('desc__review__date');
                const date = new Date(allReviews[i].date);
                const options: IOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                reviewDate.textContent = date.toLocaleDateString("ru-RU", options);

                //СЮДА ДОБАВИТЬ УСЛОВИЕ ОТОБРАЖНИЯ ЭТОГО БЛОКА ПРИ УСПЕШНОМ ОТВЕТЕ НА ДОП ЗАПРОС
                const reviewRatingWrapper = document.createElement('div');
                reviewRatingWrapper.classList.add('desc__review__ratingwrap');
                const reviewRatingText = document.createElement('div');
                reviewRatingText.classList.add('desc__review__ratingtext');
                reviewRatingText.textContent = 'Оценка книге:';

                // рисуем звёздочки
                const reviewRatingStars = document.createElement('div');
                reviewRatingStars.classList.add('desc__review__ratingstars');
                for (let j = 10; j > 0; j--) {
                    const inputElement = document.createElement('input');
                    inputElement.type = 'radio';
                    inputElement.id = `myrating-${j}`;
                    inputElement.name = 'myrating';
                    inputElement.value = j + '';

                    const labelElement = document.createElement('label');
                    labelElement.htmlFor = `myrating-${j}`;
                    labelElement.id = `myratinglbl-${j}`;
                    labelElement.classList.add('descr_star');

                    reviewRatingStars.append(inputElement, labelElement);
                }

                const reviewRatingNumber = document.createElement('span');
                reviewRatingNumber.classList.add('desc__review__ratingnumber');
                // В СТРОЧКУ НИЖЕ ВСТАВИТЬ ВЫЧИСЛЯЕМУЮ ПЕРЕМЕННУЮ
                reviewRatingNumber.textContent = `0/10`;
                // ЗАКАНЧИВАЕТСЯ УСЛОВИЕ РИСОВАНИЯ БЛОКА С ОЦЕНКОЙ
                
                const oneReviewBody = document.createElement('div');
                oneReviewBody.classList.add('desc__review__body');

                const oneReviewBodyHeader = document.createElement('div');
                oneReviewBodyHeader.classList.add('desc__review__bodyhead');
                const oneReviewBodyText = document.createElement('div');
                oneReviewBodyText.classList.add('desc__review__bodytext');
                oneReviewBodyText.textContent = allReviews[i].text;

                const reviewBookImg = document.createElement('img');
                reviewBookImg.alt = "";

                const reviewBookTitleAuthor = document.createElement('div');
                const reviewBookTitle = document.createElement('div');
                const reviewBookAuthor = document.createElement('div');

                BooksAPI.getBookById(this.bookdId).then(bookInfo => {
                    reviewBookTitle.textContent = bookInfo.title;
                    reviewBookAuthor.textContent = bookInfo.author;
                    reviewBookImg.src = bookInfo.img;
                });
                

                reviewNameDateWrapper.append(reviewName, reviewDate);
                reviewRatingWrapper.append(reviewRatingText, reviewRatingStars, reviewRatingNumber);
                oneReviewHeader.append(reviewUserImage, reviewNameDateWrapper, reviewRatingWrapper);
                reviewBookTitleAuthor.append(reviewBookTitle, reviewBookAuthor);
                oneReviewBodyHeader.append(reviewBookImg, reviewBookTitleAuthor),
                oneReviewBody.append(oneReviewBodyHeader, oneReviewBodyText);
                oneReviewWrapper.append(oneReviewHeader, oneReviewBody);
                reviewsWrapper.append(oneReviewWrapper);
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
