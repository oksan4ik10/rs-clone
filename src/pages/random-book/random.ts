import Page from "../../core/templates/page";
import { BooksAPI } from "../../api/api";

export default class RandomPage extends Page {
  pageDropdownWrapper: HTMLSelectElement;

  constructor(id: string) {
    super(id);
    this.pageDropdownWrapper = document.createElement('select');
    this.pageDropdownWrapper.classList.add('random__page__select');
  }

  async determinePossibleGenres() {
    const genres: Array<string> = ['Выберите жанр'];
    console.log('getting genres');
    await BooksAPI.getAllBooks().then(allBooks => {
      for (let i = 0; i < allBooks.length; i++) {
        if (!(genres.includes(allBooks[i].genre))) {
            genres.push(allBooks[i].genre);
        }
      }
    })

    console.log(genres);
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
    console.log(dropdownObjectsArray);
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
      });

      //const placeholderItem = choices._getTemplate( 'placeholder', 'Выберите жанр' ); 
      //choices.itemList.append(placeholderItem);
    })
    
    
  }

  createRandomPage() {
    const randomPageWrapper = document.createElement('div');
    randomPageWrapper.classList.add('randompage__wrapper');

    const pageTitle = document.createElement('div');
    pageTitle.classList.add('random__page__title');
    pageTitle.textContent = 'Случайная книга';

    const pageSubTitleWrapper = document.createElement('div');
    pageSubTitleWrapper.classList.add('random__page__subtitle__wrapper');
    const pageSubtitle = document.createElement('div');
    pageSubtitle.classList.add('random__page__subtitle');
    pageSubtitle.textContent = 'Не знаете, что прочитать? Воспользуйтесь нашим генератором случайных книг.';

    this.createChoicesDropdown();


    pageSubTitleWrapper.append(pageSubtitle, this.pageDropdownWrapper);
    randomPageWrapper.append(pageTitle, pageSubTitleWrapper)
    return randomPageWrapper;
  }

  createShareSocialMedia() {
    
    /*


    // делимся в Твиттере
    var url = "http://google.com";
    var text = "Replace this with your text";
    window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');


    // делимся в Фейсбуке
<a href="https://www.facebook.com/sharer/sharer.php?u=example.org" target="_blank">
  Share on Facebook
</a>

    */
  }


  render() {
    this.container.append(this.createRandomPage());
    return this.container;
}

}