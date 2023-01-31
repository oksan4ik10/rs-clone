import Component from '../../templates/components';
import { PageIds } from '../../../types';


class Header extends Component {

    constructor(tagName: string, className: string) {
        super(tagName, className);

    }

    renderPageHeader() {
        this.container.innerHTML = `<a href=#${PageIds.MainPage} class="logo header__logo">
        <img src="./images/fav.png" alt="logo" class="logo__img">
        </a>
   `;
      
    }

    render() {
        this.renderPageHeader();

        return this.container;
    }
}

export default Header;
