import Component from '../../templates/components';


class Reviews extends Component {

    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPageReviews() {
        this.container.innerHTML = 
            `<div class="wrapper">
                <h3 class="reviews__title">ПОСЛЕДНИЕ РЕЦЕНЗИИ НА КНИГИ</h3>
                <div class="reviews__block">
                    <div class="review__container">
                        <div class="review__block review__first">
                            <div class="review__book">
                                <div class="review__book__img"></div>
                                <div class="review__book__info">
                                    <div class="review__book__author">Автор</div>
                                    <div class="review__book__name">Наименование книги</div>
                                </div>
                            </div>
                            <div class="review__text"></div>
                            <div class="review__info">   
                                <div class="review__info__foto"></div>
                                <div class="review__info__name">Никнейм</div>
                            </div>
                        </div>
                    </div>
                    <div class="review__container">
                        <div class="review__block review__first">
                            <div class="review__book">
                                <div class="review__book__img"></div>
                                <div class="review__book__info">
                                    <div class="review__book__author">Автор</div>
                                    <div class="review__book__name">Наименование книги</div>
                                </div>
                            </div>
                            <div class="review__text"></div>
                            <div class="review__info">   
                                <div class="review__info__foto"></div>
                                <div class="review__info__name">Никнейм</div>
                            </div>
                        </div>
                    </div>
                    <div class="review__container">
                        <div class="review__block review__first">
                            <div class="review__book">
                                <div class="review__book__img"></div>
                                <div class="review__book__info">
                                    <div class="review__book__author">Автор</div>
                                    <div class="review__book__name">Наименование книги</div>
                                </div>
                            </div>
                            <div class="review__text"></div>
                            <div class="review__info">   
                                <div class="review__info__foto"></div>
                                <div class="review__info__name">Никнейм</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reviews__control">
                    <div class="reviews__control_button"></div>
                    <div class="reviews__control_button"></div>
                    <div class="reviews__control_button"></div>
                    <div class="reviews__control_button"></div>
                    <div class="reviews__control_button"></div>
                    <div class="reviews__control_button"></div>
                    <div class="reviews__control_button"></div>
                    <div class="reviews__control_button"></div>
                </div>
            </div>`
    }

    render() {
        this.renderPageReviews();
        return this.container;
    }
}

export default Reviews;