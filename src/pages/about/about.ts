import Page from "../../core/templates/page";

export default class AboutPage extends Page {

    constructor(id: string) {
        super(id);
    }

    createAboutPage() {
        const section = document.createElement('section');
        section.classList.add('wrapper');
        


        return section;
    }

    render() {
        this.container.append(this.createAboutPage());
        return this.container;
    }
}
