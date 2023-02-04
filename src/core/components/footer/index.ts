import Component from '../../templates/components';
import { PageIds } from '../../../types';

class Footer extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderFooter() {
        this.container.innerHTML = 
            `<div class="wrapper">
                <a href=#${PageIds.MainPage} class="logo footer__logo">LOGO</a>
                <div class="footer__developers">
                    <a href="https://github.com/olya-full" class="footer__git">Olya</a>
                    <a href="https://github.com/oksan4ik10" class="footer__git">Oksana</a>
                    <a href="https://github.com/Florence100" class="footer__git">Nastya</a>
                </div>
                <div class="footer__container">
                    <div class="footer__year">©2023</div>
                    <a href="https://rs.school/js/" class="footer__rs">RSschool</a>
                </div>
            </div>`
    }

    render() {
        this.renderFooter();

        return this.container;
    }
}
export default Footer;
