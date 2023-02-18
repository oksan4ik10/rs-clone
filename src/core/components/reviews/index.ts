

import Component from '../../templates/components';
import { ReviewsAPI } from '../../../api/api';
import { BooksAPI } from '../../../api/api';
import { IOneReview } from '../../../types';
import App from '../../../pages/app';


class Reviews extends Component {
    static count = 0;

    swiper:HTMLElement;
    start:boolean
    constructor(tagName: string, className: string) {
        super(tagName, className);
        Reviews.count++;
        this.swiper = document.createElement('swiper-container');
        this.swiper.classList.add(`tt${Reviews.count}`);
        this.start = true;
        this.swiper.setAttribute('style','--swiper-pagination-color: #bc8c5b80; --swiper-pagination-bullet-width: 12px; --swiper-pagination-bullet-height: 12px; --swiper-navigation-color: #bc8c5b80;'); 
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

       
       this.swiper.className = 'reviews__block swiper mySwiper';

        await data.forEach(async (element) => {
            const el = await this.renderReview(element);
            this.swiper.append(el);
        });
        App.closeLoader();

        wrapper.append(this.swiper);
        this.container.append(wrapper);

    }
    setResizeSlider(){
        const windowInnerWidth = window.innerWidth;

        if((windowInnerWidth > 1040)&&(this.swiper.getAttribute('slides-per-view') === '3'))  return;
        if((windowInnerWidth > 768 && windowInnerWidth <= 1040 )&&(this.swiper.getAttribute('slides-per-view') === '2'))  return;
        if((windowInnerWidth <= 768 )&&(this.swiper.getAttribute('slides-per-view') === '1'))  return;
  

        if((windowInnerWidth > 1040) && this.swiper.matches('.swiper-initialized') ){
            this.swiper.setAttribute('slides-per-view','3');
        }  else if (windowInnerWidth > 768 && this.swiper.matches('.swiper-initialized') ) {
            this.swiper.setAttribute('slides-per-view','2');
            
        } else if (this.swiper.matches('.swiper-initialized') ){
            this.swiper.setAttribute('slides-per-view','1');
        }
    
        if(this.start && windowInnerWidth > 768){
            this.swiper.setAttribute('pagination','true');
            this.swiper.setAttribute('pagination-clickable','true');
            this.swiper.setAttribute('autoplay-delay','4000');
        } else if(this.start){
            this.swiper.setAttribute('navigation','true');
        }
        this.start = false;
    }

    render() {
        this.renderPageReviews();
        this.setResizeSlider();
        window.addEventListener('resize',this.setResizeSlider.bind(this));
        return this.container;
    }
}

export default Reviews;