import Component from '../../templates/components';
import { BooksAPI } from '../../../api/api';


class Recommendation extends Component {

    btnReview: HTMLElement;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.btnReview = document.createElement('button');
    }


    async renderRecommendation() {
        const book = await BooksAPI.getRandomBooks('all');
        console.log(book);
        const wrapperContainer = document.createElement('div');
        wrapperContainer.className = 'wrapper';
        const wrapper = document.createElement('div');
        wrapper.className = 'recommend__blur';
        
        const recommendInfo = document.createElement('div');
        recommendInfo.className = 'recommend__info';

        const name = document.createElement('div');
        name.className = 'recommend__name';
        name.textContent = book.title;
        recommendInfo.append(name);

        const author = document.createElement('div');
        author.className = 'recommend__author';
        author.textContent = book.author;
        recommendInfo.append(author);

        const desc = document.createElement('div');
        desc.className = 'recommend__discr';
        desc.textContent = book.desc;
        recommendInfo.append(desc);

        this.btnReview.className = 'button recomend__button';
        this.btnReview.textContent = 'Подробнее'
        recommendInfo.append(this.btnReview);

        wrapper.append(recommendInfo);

        const imgBook = document.createElement('div');
        imgBook.className = 'recommend__book';
        const img = document.createElement('img');
        img.src = book.img;
        imgBook.append(img);

        wrapper.append(imgBook);

        wrapperContainer.style.backgroundImage = `url(${book.img})`;
        wrapperContainer.append(wrapper);
        this.container.append(wrapperContainer);

        // this.container.innerHTML = 
        //     `<div class="wrapper">
        //         <div class="recommend__info">
        //             <div class="recommend__name">Наименование книги</div>
        //             <div class="recommend__author">Автор</div>
        //             <div class="recomend__discr">Красивое и длинное описание книги. Красивое и длинное описание книги. Красивое и длинное описание книги.</div>
        //             <button class="button recomend__button">Рецензии</button>
        //         </div>
        //         <div class="recommend__book"></div>
        //     </div>`
    }

    render() {
        this.renderRecommendation();
        return this.container;
    }
}

export default Recommendation;