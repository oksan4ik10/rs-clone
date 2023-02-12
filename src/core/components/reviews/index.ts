

import Component from '../../templates/components';
import { ReviewsAPI } from '../../../api/api';
import { BooksAPI } from '../../../api/api';
import { IOneReview } from '../../../types';


class Reviews extends Component {

    pagination:HTMLElement;
    swiper:HTMLElement;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.pagination = document.createElement('div');
        this.swiper = document.createElement('div');
    }

    async renderReview(obj: IOneReview){
        const book = await BooksAPI.getBookById(obj.bookId);
        const element = document.createElement('swiper-slide');
        element.className = ('swiper-slide review__block');
        const reviewBlock = document.createElement('div');
        reviewBlock.className = 'review__block';
        element.setAttribute('id',obj.bookId);
        reviewBlock.innerHTML= `
                <div class="review__book">
                    <img class="review__book__img" src=${book.img}>
                        <div class="review__book__info">
                            <div class="review__book__author">${book.author}</div>
                            <div class="review__book__name">${book.title}</div> 
                        </div>
                </div>
                    <div class="review__text">
                        <p>
                            ${obj.text}
                        </p>
                    </div>
                    <div class="review__info">   
                        <img class="review__info__foto" src=${obj.userImg}>
                        <div class="review__info__name">${obj.userName}</div>
                    </div>
                </div>`;
            element.append(reviewBlock);
            element.addEventListener('click', (e: Event) => {
                const target = e.currentTarget as HTMLElement;
                const id = target.getAttribute('id');
                if(id) window.location.hash = `id=${id}`;
            })
            return element;
    }

    async renderPageReviews() {
        const data:IOneReview[] = await ReviewsAPI.getLastReviews();
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        const title = document.createElement('h3');
        title.className = 'main__title reviews__title';
        title.textContent = 'ПОСЛЕДНИЕ РЕЦЕНЗИИ НА КНИГИ';
        wrapper.append(title);

       const swiper = document.createElement('swiper-container');
       swiper.className = 'reviews__block swiper mySwiper';
       swiper.setAttribute('slides-per-view','3');
       swiper.setAttribute('pagination','true');
       swiper.setAttribute('pagination-clickable','true');
       swiper.setAttribute('autoplay-delay','1500');
       swiper.setAttribute('style','--swiper-pagination-color: #bc8c5b80; --swiper-pagination-bullet-width: 12px; --swiper-pagination-bullet-height: 12px');  

        data.forEach(async (element) => {
            const el = await this.renderReview(element);
            swiper.append(el);
        });

        wrapper.append(swiper);
        this.container.append(wrapper);

    }

    render() {
        this.renderPageReviews();
        return this.container;
    }
}

export default Reviews;