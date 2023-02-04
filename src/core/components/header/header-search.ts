import Component from "../../templates/components";
import { IOneBook } from "../../../types";

export class HeaderSearch extends Component {
  allBooks: Array<IOneBook>;
  searchValue: string;

  constructor (tagName: string, clasName: string, allBooks: Array<IOneBook>, searchValue: string) {
    super(tagName, clasName)
    this.allBooks = allBooks;
    this.searchValue = searchValue;
  }

  searchBooks(allBooks: Array<IOneBook>, searchValue: string){
    const searchResult = (function(innerAllBooks: Array<IOneBook>, innerSearchValue: string){
      return innerAllBooks.filter((obj: IOneBook) => { return Object.keys(obj).some(key => { 
        if (key === "author" || 
            key === "title" || 
            key === "year" || 
            key === "genre"){
          if (typeof obj !== undefined) {
            return obj[key].toString().toLowerCase().includes(innerSearchValue.toLowerCase());
          }
        }
      })})
    }(allBooks, searchValue));

    return searchResult;
  }

  renderSearchHeader(){
    const booksFound: Array<IOneBook> = this.searchBooks(this.allBooks, this.searchValue);

    const maxResultFixed = 6;
    const maxResultShow = Math.min(booksFound.length, maxResultFixed);

    const resultsWrapper = document.createElement('div');
    resultsWrapper.classList.add('search__results__header');

    const resultsHeader = document.createElement('div');
    resultsHeader.classList.add('results__header__top');
    const resultsBody = document.createElement('div');
    resultsBody.classList.add('results__header__bottom');
    const resultsText = document.createElement('div');
    resultsText.classList.add('results__header__item');
    resultsText.textContent = 'Книги';
    const resultsAmount = document.createElement('div');
    resultsAmount.classList.add('results__header__item');
    resultsAmount.textContent = maxResultShow.toString();
    resultsHeader.append(resultsText, resultsAmount);
    resultsWrapper.append(resultsHeader, resultsBody);

    for (let i = 0; i < maxResultShow; i++){
      const bookWrapper = document.createElement('div');
      bookWrapper.classList.add('results__header__bookwrapper');
      bookWrapper.id = booksFound[i]._id;
      bookWrapper.addEventListener('click', () => {
        console.log(`clicked on id ${bookWrapper.id}`);
      })

      const bookCover = document.createElement('div');
      bookCover.classList.add('results__header__bookcover');
      bookCover.style.background = `url(${booksFound[i].img}) 0% / contain no-repeat`;

      const bookInfoWrapper = document.createElement('div');
      bookInfoWrapper.classList.add('results__header__bookinfo');
      const bookTitle = document.createElement('div');
      bookTitle.classList.add('results__header__title');
      bookTitle.textContent = booksFound[i].title;
      const bookAuthor = document.createElement('div');
      bookAuthor.classList.add('results__header__author');
      bookAuthor.textContent = booksFound[i].author;

      bookInfoWrapper.append(bookTitle, bookAuthor);
      bookWrapper.append(bookCover, bookInfoWrapper);
      resultsBody.append(bookWrapper);
    }

    this.container.append(resultsWrapper);
  }

  render(){
    this.renderSearchHeader();

    return this.container;
  }

}