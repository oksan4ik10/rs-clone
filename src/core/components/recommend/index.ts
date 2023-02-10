import Component from '../../templates/components';
import { BooksAPI } from '../../../api/api';


class Recommendation extends Component {

    btnReview: HTMLElement;
    blockImg: HTMLElement;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.btnReview = document.createElement('button');
        this.blockImg = document.createElement('div');

    }


    async renderRecommendation() {
        const book = await BooksAPI.getRandomBooks('all');
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
        this.btnReview.textContent = 'Подробнее';
        this.btnReview.setAttribute('id',book._id)
        recommendInfo.append(this.btnReview);

        wrapper.append(recommendInfo);

        
        this.blockImg.className = 'recommend__book';
        const img = document.createElement('img');
        img.src = book.img;
        this.blockImg.append(img);
        this.blockImg.setAttribute('id', book._id);

        wrapper.append(this.blockImg);

        wrapperContainer.style.backgroundImage = `url(${book.img})`;
        wrapperContainer.append(wrapper);
        this.container.append(wrapperContainer);
    }
    openDesc(e:Event){
        const target = e.currentTarget as HTMLElement;
        const id = target.getAttribute('id');
        window.location.hash = `id=${id}`;
    }

    render() {
        this.btnReview.addEventListener('click', this.openDesc.bind(this));
        this.blockImg.addEventListener('click', this.openDesc.bind(this));
        this.renderRecommendation();
        return this.container;
    }
}

export default Recommendation;