import Component from '../../templates/components';


class ViewBooks extends Component {

    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderViewBooks() {
        this.container.innerHTML = 
            `<div class="wrapper">
                <h3 class="viewed__title">ВЫ СМОТРЕЛИ</h3>
                <div class="viewed__container">
                    <div class="viewed__colomn">
                        <div class="viewed__book"></div>
                        <div class="viewed__author">Автор</div>
                        <div class="viewed__name">Наименование книги</div>
                    </div>
                    <div class="viewed__colomn">
                        <div class="viewed__book"></div>
                        <div class="viewed__author">Автор</div>
                        <div class="viewed__name">Наименование книги</div>
                    </div>
                    <div class="viewed__colomn">
                        <div class="viewed__book"></div>
                        <div class="viewed__author">Автор</div>
                        <div class="viewed__name">Наименование книги</div>
                    </div>
                </div>
            </div>`
    }

    render() {
        this.renderViewBooks();
        return this.container;
    }
}

export default ViewBooks;