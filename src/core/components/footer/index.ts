import Component from '../../templates/components';

class Footer extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPageHeader() {
        this.container.innerHTML = `<span>©2023</span><a href="https://github.com/oksan4ik10" class="footer__git"><img src="./assets/img/github1.png" alt="oksan4ik10"></a>
        <a href="https://rs.school/js/" class="footer__rs"><img src="./assets/img/rs.svg" alt="rs"></a>
        <a href="https://github.com/FilMaxim" class="footer__git"><img src="./assets/img/github1.png" alt="FilMaxim"></a>`;
    }

    render() {
        this.renderPageHeader();

        return this.container;
    }
}
export default Footer;
