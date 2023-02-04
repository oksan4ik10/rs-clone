import Component from "../../templates/components";
import { BooksAPI } from "../../../api/api";
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
    let searchResult = (function(allBooks: Array<IOneBook>, searchValue: string){
      return allBooks.filter((obj: IOneBook) => { return Object.keys(obj).some(key => { 
        if (key === "author" || 
            key === "title" || 
            key === "year" || 
            key === "genre"){
          if (typeof obj !== undefined) {
            return obj[key].toString().toLowerCase().includes(searchValue.toLowerCase());
          }          
        }
      })})
    }(allBooks, searchValue));

    return searchResult;
  }

  renderSearchHeader(){
    const booksFound: Array<IOneBook> = this.searchBooks(this.allBooks, this.searchValue);

    const wrapper = document.createElement('div');
    wrapper.classList.add('search__results__header__wrapper');

    console.log("rendering books...", booksFound);  
  }


}