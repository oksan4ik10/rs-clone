import Component from '../../templates/components';


class PopularBooks extends Component {

    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPagePopularBooks() {
        this.container.innerHTML = 
            `<div class="wrapper">
                <h3 class="reviews__title">ПОПУЛЯРНЫЕ КНИГИ</h3>
                <div class="popular__container">
                    <div class="popular__colomn popular__colomn-first">
                        <div class="popular__book"></div>
                        <div class="popular__author">Имя автора</div>
                        <div class="popular__name">Название книги</div>
                    </div>                
                    <div class="popular__colomn popular__colomn-second">
                        <div class="popular__book"></div>
                        <div class="popular__author">Имя автора</div>
                        <div class="popular__name">Название книги</div>
                    </div>                
                    <div class="popular__colomn popular__colomn-third">
                        <div class="popular__book"></div>
                        <div class="popular__author">Имя автора</div>
                        <div class="popular__name">Название книги</div>
                    </div>
                </div>
            </div>`
    }

    render() {
        this.renderPagePopularBooks();
        return this.container;
    }
}

export default PopularBooks;