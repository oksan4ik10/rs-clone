import Component from '../../templates/components';


class Recommendation extends Component {

    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderRecommendation() {
        this.container.innerHTML = 
            `<div class="wrapper">
                <div class="recommend__info">
                    <div class="recommend__name">Наименование книги</div>
                    <div class="recommend__author">Автор</div>
                    <div class="recomend__discr">Красивое и длинное описание книги. Красивое и длинное описание книги. Красивое и длинное описание книги.</div>
                    <button class="button recomend__button">Рецензии</button>
                </div>
                <div class="recommend__book"></div>
            </div>`
    }

    render() {
        this.renderRecommendation();
        return this.container;
    }
}

export default Recommendation;