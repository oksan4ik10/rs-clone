import Page from "../../core/templates/page";

export default class RandomPage extends Page {

  constructor(id: string) {
    super(id);
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
    const pageDropdownWrapper = document.createElement('select');
    pageDropdownWrapper.classList.add('random__page__select');
    const pageSearch = document.createElement('input');
    pageSearch.type = 'search';
    const pageResultsWrapper = document.createElement('div');
    pageResultsWrapper.classList.add('random__page__dropdown__results');
    const pageDropdownFirst = document.createElement('option');
    pageDropdownFirst.disabled = true;
    pageDropdownFirst.textContent = 'Выберите жанр';

    
    pageResultsWrapper.append(pageDropdownFirst);



    pageDropdownWrapper.append(pageSearch, pageResultsWrapper);
    pageSubTitleWrapper.append(pageSubtitle, pageDropdownWrapper);
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