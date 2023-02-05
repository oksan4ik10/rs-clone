
import { BooksAPI } from '../../api/api';
import Page from '../../core/templates/page';

class DescriptionPage extends Page {
    addToReadButton: HTMLButtonElement;
    main: HTMLElement;
    bookdId: string;

    constructor(id: string) {
        super(id);
        this.addToReadButton = document.createElement('button');
        this.main = document.createElement('main');
        this.bookdId = window.location.hash.split('=')[1];
    }

    /*
    static async getCurrentBook() {        
        return await BooksAPI.getBookById(window.location.hash.split('=')[1]);
        
    }
    //currentBook = this.getCurrentBook();
    async assignCurrentBook() {
        this.currentBook = await DescriptionPage.getCurrentBook();
    } */

    createPage() {
        //this.assignCurrentBook()
        
        this.main.classList.add('description__page__wrapper');

        const descrContentWrapper = document.createElement('div');
        descrContentWrapper.classList.add('desc__content__wrapper');
        const descrImgWrapper = document.createElement('div');
        descrImgWrapper.classList.add('desc__img__wrapper');

        const descrName = document.createElement('div');
        descrName.classList.add('decription__name');
        const descrAuthor = document.createElement('div');
        descrAuthor.classList.add('description__author');
        const descrYear = document.createElement('div');
        descrAuthor.classList.add('description__year');
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
        myRatingText.classList.add('descriotion__myrating__text');
        myRatingText.textContent = 'Моя оценка';
        const myRating = document.createElement('div');
        myRating.classList.add('description__myrating');
        myRating.textContent = "...Звёздочки...";
        const allRatingText = document.createElement('span');
        allRatingText.classList.add('descriotion__allrating__text');
        allRatingText.textContent = 'Средняя оценка';
        const allRating = document.createElement('div');
        allRating.classList.add('description__allrating');

        // присваиваем элементам информацию по книге
        BooksAPI.getBookById(this.bookdId).then(bookInfo => {
            const currentBook = bookInfo;
            console.log(currentBook);

            descrName.textContent = currentBook.title;
            descrAuthor.textContent = `Автор книги: ${currentBook.author}`;
            descrYear.textContent = `Год написания: ${currentBook.year}`;
            descrGenre.textContent = `Жанр: ${currentBook.genre}`;
            descrDescr.textContent = currentBook.desc;
            allRating.textContent = currentBook.raiting.toString();
        });

        ratingWrapper.append(myRatingText, myRating, allRatingText, allRating);
        descrDescrWrapper.append(descrDescrTitle, descrDescr);
        descrContentWrapper.append(descrName, descrAuthor, descrYear, descrGenre, descrDescrWrapper, ratingWrapper);
        this.main.append(descrContentWrapper, descrImgWrapper);

        return this.main;
    }
    render() {
        this.container.append(this.createPage());
        return this.container;
    }
}

export default DescriptionPage;
