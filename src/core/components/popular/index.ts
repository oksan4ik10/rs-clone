import Component from '../../templates/components';
import { BooksAPI } from '../../../api/api';
import { IOneBook } from '../../../types';


class PopularBooks extends Component {

    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    renderBook(obj:IOneBook){
        const elem = document.createElement('div');
        elem.className = "popular__colomn popular__colomn-second";
        elem.setAttribute('data-id',obj._id);
        elem.innerHTML = `<div class="popular__book">
            <img src=${obj.img} alt=${obj.title}>
            <span class="popular__raiting">${obj.raiting}</span> 
        </div>
        <div class="popular__author">${obj.author}</div>
        <div class="popular__name">${obj.title}</div>`
         
        return elem;
    }

    async renderPagePopularBooks() {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        const title = document.createElement('h3');
        title.className = 'reviews__title';
        title.textContent = 'ПОПУЛЯРНЫЕ КНИГИ'; 
        wrapper.append(title);

        const popularContainer = document.createElement('div');
        popularContainer.className = 'popular__container';
        
        const items = await BooksAPI.getBestBooks();
        items.forEach((element, index) => {
            if(index > 2) return
            popularContainer.append(this.renderBook(element))
        });

        wrapper.append(popularContainer);
        this.container.append(wrapper);

    }

    render() {
        this.renderPagePopularBooks();
        return this.container;
    }
}

export default PopularBooks;