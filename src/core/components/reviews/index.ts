

import Component from '../../templates/components';
import { ReviewsAPI } from '../../../api/api';
import { BooksAPI } from '../../../api/api';
import { IOneReview } from '../../../types';
// import { register } from 'swiper/element/bundle';

// register();

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
        title.className = 'reviews__title';
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

    //     this.container.innerHTML = `  <swiper-container class="mySwiper" pagination="true" pagination-clickable="true" space-between="30"
    //     slides-per-view="3">
    //     <swiper-slide>Slide 1</swiper-slide>
    //     <swiper-slide>Slide 2</swiper-slide>
    //     <swiper-slide>Slide 3</swiper-slide>
    //     <swiper-slide>Slide 4</swiper-slide>
    //     <swiper-slide>Slide 5</swiper-slide>
    //     <swiper-slide>Slide 6</swiper-slide>
    //     <swiper-slide>Slide 7</swiper-slide>
    //     <swiper-slide>Slide 8</swiper-slide>
    //     <swiper-slide>Slide 9</swiper-slide>
    //   </swiper-container>`

        
        // this.container.innerHTML = 
        //     `<div class="wrapper">
        //         <h3 class="reviews__title">ПОСЛЕДНИЕ РЕЦЕНЗИИ НА КНИГИ</h3>
        //         <div class="reviews__block">
        //             <div class="review__container">
        //                 <div class="review__block review__first">
        //                     <div class="review__book">
        //                         <div class="review__book__img"></div>
        //                         <div class="review__book__info">
        //                             <div class="review__book__author">Автор</div>
        //                             <div class="review__book__name">Наименование книги</div>
        //                         </div>
        //                     </div>
        //                     <div class="review__text"></div>
        //                     <div class="review__info">   
        //                         <div class="review__info__foto"></div>
        //                         <div class="review__info__name">Никнейм</div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div class="review__container">
        //                 <div class="review__block review__first">
        //                     <div class="review__book">
        //                         <div class="review__book__img"></div>
        //                         <div class="review__book__info">
        //                             <div class="review__book__author">Автор</div>
        //                             <div class="review__book__name">Наименование книги</div>
        //                         </div>
        //                     </div>
        //                     <div class="review__text"></div>
        //                     <div class="review__info">   
        //                         <div class="review__info__foto"></div>
        //                         <div class="review__info__name">Никнейм</div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div class="review__container">
        //                 <div class="review__block review__first">
        //                     <div class="review__book">
        //                         <div class="review__book__img"></div>
        //                         <div class="review__book__info">
        //                             <div class="review__book__author">Автор</div>
        //                             <div class="review__book__name">Наименование книги</div>
        //                         </div>
        //                     </div>
        //                     <div class="review__text"></div>
        //                     <div class="review__info">   
        //                         <div class="review__info__foto"></div>
        //                         <div class="review__info__name">Никнейм</div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="reviews__control">
        //             <div class="reviews__control_button"></div>
        //             <div class="reviews__control_button"></div>
        //             <div class="reviews__control_button"></div>
        //             <div class="reviews__control_button"></div>
        //             <div class="reviews__control_button"></div>
        //             <div class="reviews__control_button"></div>
        //             <div class="reviews__control_button"></div>
        //             <div class="reviews__control_button"></div>
        //         </div>
        //     </div>`
            

        //     this.container.innerHTML = `<div class="swiper mySwiper">
        //     <div class="swiper-wrapper">
        //       <div class="swiper-slide">Slide 1</div>
        //       <div class="swiper-slide">Slide 2</div>
        //       <div class="swiper-slide">Slide 3</div>
        //       <div class="swiper-slide">Slide 4</div>
        //       <div class="swiper-slide">Slide 5</div>
        //       <div class="swiper-slide">Slide 6</div>
        //       <div class="swiper-slide">Slide 7</div>
        //       <div class="swiper-slide">Slide 8</div>
        //       <div class="swiper-slide">Slide 9</div>
        //     </div>
        //     <div class="swiper-pagination"></div>
        //   </div>`;

    }

    render() {
        this.renderPageReviews();
        return this.container;
    }
}

export default Reviews;