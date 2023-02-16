import Page from "../../core/templates/page";
import { BooksAPI, GradesAPI, ReviewsAPI, UsersAPI } from "../../api/api";
import DescriptionPage from "../description";
import Header from "../../core/components/header";
import App from "../app";


export default class RandomPage extends Page {
  pageDropdownWrapper: HTMLSelectElement;
  bookId: string;
  allRating: HTMLDivElement;
  addToReadButton: HTMLButtonElement;
  wantToReadButton: HTMLButtonElement;
  socialMediaWrapper: HTMLDivElement;
  upperThreeWrapper: HTMLDivElement;

  socialText: HTMLSpanElement;
  facebookLink: HTMLAnchorElement;
  twitterLink: HTMLAnchorElement;
  vkLink: HTMLAnchorElement;
  telegramLink: HTMLAnchorElement;
  

  constructor(id: string) {
    super(id);
    this.pageDropdownWrapper = document.createElement('select');
    this.pageDropdownWrapper.classList.add('random__page__select');
    this.bookId = '';
    this.allRating = document.createElement('div');
    this.allRating.classList.add('description__allrating');
    this.addToReadButton = document.createElement('button');
    this.wantToReadButton = document.createElement('button');
    this.socialMediaWrapper = document.createElement('div');
    this.socialMediaWrapper.classList.add('random__page__social__wrapper');
    this.upperThreeWrapper = document.createElement('div');
    this.upperThreeWrapper.classList.add('random__page__three__wrapper');

    this.socialText = document.createElement('span');
    this.facebookLink = document.createElement('a');
    this.twitterLink = document.createElement('a');
    this.vkLink = document.createElement('a');
    this.telegramLink = document.createElement('a');
  }

  authStatus = DescriptionPage.prototype.isAuthorised();

  showAuthPopUp() {
    if (this.authStatus === false) {
        Header.prototype.openAuth('authorisation');
        const authText = document.querySelector('.authorisation__title');
        if (authText) {
            authText.textContent = 'Авторизуйтесь, чтобы продолжить';
        }
     }
  }

  async toggleToWantBook() {
     if (this.wantToReadButton.textContent === 'Удалить из планов') {
          this.wantToReadButton.textContent = 'Хочу прочитать';
          this.addToReadButton.style.display = 'inline-block';
          return await UsersAPI.removeBooksWantRead(this.bookId, this.authStatus as string);
      } else {
        this.wantToReadButton.textContent = 'Удалить из планов';
        this.addToReadButton.style.display = 'none';
        return await UsersAPI.addBooksWantRead(this.bookId, this.authStatus as string);
      }
  }

  async toggleToReadBook() {
      if (this.addToReadButton.textContent === 'Удалить из прочитанного') {
          this.wantToReadButton.style.display = 'inline-block';
          this.addToReadButton.textContent = 'Добавить в прочитанное';
          
          return await UsersAPI.removeBooksRead(this.bookId, this.authStatus as string);
      } else {
          this.wantToReadButton.style.display = 'none';
          this.addToReadButton.textContent = 'Удалить из прочитанного';
          return await UsersAPI.addBooksRead(this.bookId, this.authStatus as string);
      }
  }

  checkButtonsAdd() {
    if (typeof this.authStatus !== 'boolean'){
        UsersAPI.checkBooksLikeRead(this.bookId, this.authStatus).then(bookStatus => {

            if (bookStatus === "false") {
                this.wantToReadButton.style.display = 'inline-block';
                this.addToReadButton.style.display = 'inline-block';
                
                this.addToReadButton.addEventListener('click', () => {
                    this.toggleToReadBook();
                })
                this.wantToReadButton.addEventListener('click', () => {
                    this.toggleToWantBook();
                })

            } else if (bookStatus === 'booksLike') {
                this.wantToReadButton.textContent = 'Удалить из планов';
                this.wantToReadButton.style.display = 'inline-block';

                this.wantToReadButton.addEventListener('click', () => {
                    this.toggleToWantBook();
                })
                this.addToReadButton.addEventListener('click', () => {
                    this.toggleToReadBook();
                })

            } else if (bookStatus === 'books') {
                this.addToReadButton.textContent = 'Удалить из прочитанного';
                this.addToReadButton.style.display = 'inline-block';

                this.wantToReadButton.addEventListener('click', () => {
                    this.toggleToWantBook();
                })
                this.addToReadButton.addEventListener('click', () => {
                    this.toggleToReadBook();
                })
            }
        })

    } else {
        this.wantToReadButton.style.display = 'inline-block';
        this.addToReadButton.style.display = 'inline-block';
    }
  }

  async determinePossibleGenres() {
    const genres: Array<string> = ['Выберите жанр'];
    await BooksAPI.getAllBooks().then(allBooks => {
      for (let i = 0; i < allBooks.length; i++) {
        if (!(genres.includes(allBooks[i].genre))) {
            genres.push(allBooks[i].genre);
        }
      }
    })
    .then(()=> App.closeLoader())
    return genres;
  }

  createObjectsForDropdown(genres: Array<string>) {
    const dropdownObjectsArray = [];

    dropdownObjectsArray.push({
      value: "",
      label: genres[0],
      selected: true,
      disabled: false,
    })

    for (let i = 1; i < genres.length; i++){
      dropdownObjectsArray.push({
        value: genres[i],
        label: genres[i],
      })
    }

    return dropdownObjectsArray;
  }

  createChoicesDropdown() {
    const newWindow = window as any;

    this.determinePossibleGenres().then(genres => {
      const choices = new newWindow.Choices(this.pageDropdownWrapper, {
        choices: this.createObjectsForDropdown(genres),
        searchPlaceholderValue: 'Поиск по жанру',
        allowHTML: false,
        shouldSort: false,
        itemSelectText: 'Выбрать',
        noResultsText: 'Нет совпадений',
      });
    })
  }

  getCurrentGenre(){
    if(this.pageDropdownWrapper.children[0] instanceof HTMLOptionElement){
      const genreOption = this.pageDropdownWrapper.children[0].value;

      return genreOption;
    }
    return "";
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

  renderRatingArea() {
    const greatRatingWrapper = document.createElement('div');
    greatRatingWrapper.classList.add('random__page__rating__wrapper');

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

    const allRatingText = document.createElement('span');
    allRatingText.classList.add('description__allrating__text');
    allRatingText.textContent = 'Средняя оценка:';
    
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
            this.allRating.textContent = newAllRating.raiting.toString();
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
                    this.allRating.textContent = newRating.toString();
                    mySubRating.textContent = currentRating.toString();
                    subRatingWrapper.style.display = 'block';
                }
            }
        }
      })
      ratingWrapper.append(myRatingText, ratingContainer, allRatingText, this.allRating);
      subRatingWrapper.append(mySubRatingText, mySubRating, deleteMyRating);
      greatRatingWrapper.append(ratingWrapper, subRatingWrapper);

      return greatRatingWrapper;
  }

  renderAddReadButtons(){
    const randomButtonsOuter = document.createElement('div');
    randomButtonsOuter.classList.add('random__page__buttons__outer');
    this.addToReadButton.classList.add('button', 'random__page__lucky');
    this.addToReadButton.textContent = 'Добавить в прочитанное';
    this.wantToReadButton.classList.add('button', 'random__page__lucky');
    this.wantToReadButton.textContent = 'Хочу прочитать';
    this.wantToReadButton.style.display = 'none';
    this.addToReadButton.style.display = 'none';

    this.checkButtonsAdd();

    randomButtonsOuter.append(this.addToReadButton, this.wantToReadButton);
    return randomButtonsOuter;
  }

  renderRandomBook(genre?: string) {
    const randomBookBigWrap = document.createElement('div');
    randomBookBigWrap.classList.add('random__page__bigbook');

    const randomBookWrapper = document.createElement('div');
    randomBookWrapper.classList.add('random__page__book__wrapper');

    const randomBookInfoWrapper = document.createElement('div');
    randomBookInfoWrapper.classList.add('random__page__bookwrap');
    const randomBookTitle = document.createElement('div');
    randomBookTitle.classList.add('random__page__book__title');
    const randomBookSubtitle = document.createElement('div');
    randomBookSubtitle.classList.add('random__page__book__subtitle');
    const randomBookDescr = document.createElement('div');
    randomBookDescr.classList.add('random__page__descr');

    BooksAPI.getRandomBooks(genre)
    .then(book => {
      const randomBookImg = document.createElement('img');
      randomBookImg.classList.add('random__page__bookcover');
      randomBookImg.src = book.img;
      randomBookTitle.textContent = book.title;
      randomBookSubtitle.textContent = `${book.author}, ${book.year} год, ${book.genre}`;
      randomBookDescr.textContent = book.desc;
      this.allRating.textContent = book.raiting.toString();
      
      this.bookId = book._id;
      this.facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/#id=${this.bookId}`;
      this.twitterLink.href = `https://twitter.com/share?url=${window.location.origin}/#id=${this.bookId}+&text=Замечательная книга!`;
      this.vkLink.href = `https://vk.com/share.php?url=${window.location.origin}/#id=${this.bookId}`;
      this.telegramLink.href = `https://t.me/share/url?url=${window.location.origin}/#id=${this.bookId}&text=Замечательная книга!`;
      this.upperThreeWrapper.style.backgroundImage = `url(${book.img})`;
      this.socialText.textContent = ' Расскажите о книге своим друзьям! ';

      randomBookInfoWrapper.append(randomBookTitle, randomBookSubtitle, randomBookDescr);
      randomBookBigWrap.append(randomBookImg, randomBookInfoWrapper);
      randomBookWrapper.append(randomBookBigWrap, this.renderRatingArea(), this.renderAddReadButtons());

      randomBookImg.addEventListener('click', () => {
        window.location.hash = `id=${this.bookId}`;
      })
    })
    .then(() => App.closeLoader())

    return randomBookWrapper;
  }

  renderSocialMedia(){
    const socialTitle = document.createElement('div');
    socialTitle.classList.add('random__page__social__title');
    this.socialText.classList.add('random__page__social__text');
    this.socialText.textContent = 'Не знаете, что почитать? Попробуйте случайную книгу!';

    const socialLinksWrapper = document.createElement('div');
    socialLinksWrapper.classList.add('random__page__social__links');
    
    this.facebookLink.target = '_blank';
    this.facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/#random`;
    const facebookImg = document.createElement('img');
    facebookImg.classList.add('random__facebook__img');
    facebookImg.src = './images/facebook.png';
    this.facebookLink.append(facebookImg);

    this.twitterLink.target = '_blank';
    this.twitterLink.href = `https://twitter.com/share?url=${window.location.origin}/#random+&text=Найдите книгу себе по душе!`;
    const twitterImg = document.createElement('img');
    twitterImg.classList.add('random__twitter__img');
    twitterImg.src = './images/twitter.png';
    this.twitterLink.append(twitterImg);

    this.vkLink.target = '_blank';
    this.vkLink.href = `https://vk.com/share.php?url=${window.location.origin}/#random`;
    const vkImg = document.createElement('img');
    vkImg.classList.add('random__vk__img');
    vkImg.src = './images/vk.png';
    this.vkLink.append(vkImg);

    this.telegramLink.target = '_blank';
    this.telegramLink.href = `https://t.me/share/url?url=${window.location.origin}/#random&text=Найдите книгу по душе на этом прекрасном сайте!`;
    const telegramImg = document.createElement('img');
    telegramImg.classList.add('random__telegram__img');
    telegramImg.src = './images/telegram.png';
    this.telegramLink.append(telegramImg);


    socialTitle.append(this.socialText);
    socialLinksWrapper.append(this.facebookLink, this.twitterLink, this.vkLink, this.telegramLink);
    this.socialMediaWrapper.append(socialTitle, socialLinksWrapper);
    return this.socialMediaWrapper;
  }

  createRandomPage() {
    const randomPageWrapper = document.createElement('div');
    randomPageWrapper.classList.add('randompage__wrapper');

    const randomPageThreeBlur = document.createElement('div');
    randomPageThreeBlur.classList.add('randompage__blur');

    const pageTitle = document.createElement('div');
    pageTitle.classList.add('random__page__title');
    pageTitle.textContent = 'Случайная книга';

    const pageSubTitleWrapper = document.createElement('div');
    pageSubTitleWrapper.classList.add('random__page__subtitle__wrapper');
    const pageSubtitle = document.createElement('div');
    pageSubtitle.classList.add('random__page__subtitle');
    pageSubtitle.textContent = 'Не знаете, что прочитать? Воспользуйтесь нашим генератором случайных книг.';

    const luckyButtonWrapper = document.createElement('div');
    luckyButtonWrapper.classList.add('random__page__button__wrapper')
    const luckyButton = document.createElement('button');
    luckyButton.classList.add('random__page__lucky', 'button');
    luckyButton.textContent = 'Мне повезёт!';

    luckyButton.addEventListener('click', () => {
      document.body.append(App.loaderRender());
      luckyButton.disabled = true;
      const currentGenre = this.getCurrentGenre();

      if (this.socialMediaWrapper.previousElementSibling?.classList.contains('random__page__book__wrapper')){
        this.socialMediaWrapper.previousElementSibling.remove();
      }

      if (currentGenre.length > 0){
        this.socialMediaWrapper.before(this.renderRandomBook(currentGenre));
      } else {
        this.socialMediaWrapper.before(this.renderRandomBook());
      }

      setTimeout(() => {
        luckyButton.disabled = false;
      }, 1500);
    })

    this.createChoicesDropdown();

    luckyButtonWrapper.append(luckyButton);
    pageSubTitleWrapper.append(pageSubtitle, this.pageDropdownWrapper);
    randomPageThreeBlur.append(pageTitle, pageSubTitleWrapper, luckyButtonWrapper);
    this.upperThreeWrapper.append(randomPageThreeBlur);
    randomPageWrapper.append(this.upperThreeWrapper, this.renderSocialMedia());
    return randomPageWrapper;
  }

  render() {
    this.container.append(this.createRandomPage());
    return this.container;
}

}