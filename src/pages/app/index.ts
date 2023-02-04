import Page from '../../core/templates/page';
import MainPage from '../main/index';
import DescriptionPage from '../description/index';
import Header from '../../core/components/header/index';
import ErrorPage, { ErrorTypes } from '../error/index';
import Footer from '../../core/components/footer';
import PersonalArea from '../personal-area';
import Sign from '../sign';

import { PageIds } from '../../types';

class App {
    private static container: HTMLElement = document.body;
    private static defaultPageId = 'current-page';
    private header: Header;
    private footer: Footer;

    static renderNewPage(idPage: string) {
        const footer = new Footer('footer', 'footer'); 
        if (idPage === '') return;
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        const footerOld = document.querySelector('footer');
        if(footerOld) footerOld.remove();

        if (currentPageHTML) {
            currentPageHTML.remove();

        }
        let page: Page | null = null;

        if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage);
        } else if (idPage === PageIds.PersonalArea) {
            page = new PersonalArea(idPage);
        } else if (idPage.includes('id=')) {
            page = new DescriptionPage(idPage.replace('id=', ''));
        } else if (idPage === PageIds.Sign) {
            page = new Sign(idPage);
        } else {
            page = new ErrorPage(idPage, ErrorTypes.Error_404);
        }

        if (page) {
            const pageHTML = page.render();

            pageHTML.id = App.defaultPageId;
            App.container.append(pageHTML);
            window.location.hash = idPage;
        }
        App.container.append(footer.render());

    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);

  

        });
    }

    constructor() {
        this.header = new Header('header', 'header');
        this.footer = new Footer('footer', 'footer');
    }

    run() {
        App.container.append(this.header.render());
        if (window.location.hash === '') {
            App.renderNewPage('main-page');
        }
        else App.renderNewPage(window.location.hash.slice(1));
        this.enableRouteChange();
        


    }
}

export default App;
