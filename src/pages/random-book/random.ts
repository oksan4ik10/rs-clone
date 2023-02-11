import Page from "../../core/templates/page";

export default class RandomPage extends Page {

  constructor(id: string) {
    super(id);
  }

  createRandomPage() {
    const randomPageWrapper = document.createElement('div');
    randomPageWrapper.classList.add('randompage__wrapper');
    randomPageWrapper.textContent = 'Здесь будет самая рандомная страница в мире';

    

    return randomPageWrapper;
  }


  render() {
    this.container.append(this.createRandomPage());
    return this.container;
}

}