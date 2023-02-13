import Component from '../../templates/components';
import { BooksAPI } from '../../../api/api';
import { IOneBook } from '../../../types';


class ViewBooks extends Component {

    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    async getDataBook(id:string){
        return await BooksAPI.getBookById(id);

    }
    renderBook(dataBook:IOneBook){
        const book = document.createElement('div');
        book.setAttribute('id',dataBook._id);
        book.className = 'viewed__colomn';
        book.innerHTML = `
            <div class="viewed__book"><img src=${dataBook.img}></div>
            <div class="viewed__author">${dataBook.author}</div>
            <div class="viewed__name">${dataBook.title}</div>
        `;
        book.addEventListener('click', (e: Event)=>{
            const target = e.currentTarget as HTMLElement;
            window.location.hash = `id=${target.id}`;
        })
        return book;
    }

    async renderViewBooks() {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        const title = document.createElement('h3');
        title.className = 'viewed__title main__title';
        title.textContent = 'ВЫ СМОТРЕЛИ';
        wrapper.append(title);

        const viewedContainer = document.createElement('div');
        viewedContainer.className = 'viewed__container';

        const local = localStorage.getItem('books');
        
        if(!local){
            const elem = document.createElement('p');
            elem.className = 'viewed__text';
            elem.textContent = 'У Вас пока нет просмотренных книг...';
            viewedContainer.append(elem);            
        } else{
            const books:string[] = JSON.parse(local);
            const requests = books.map(url => this.getDataBook(url));
            const t = await Promise.all(requests);
            
            t.forEach(async element => {
                viewedContainer.append(this.renderBook(element))
            });
        }
        wrapper.append(viewedContainer);
        this.container.append(wrapper);

}

    render() {
        this.renderViewBooks();
        return this.container;
    }
}

export default ViewBooks;