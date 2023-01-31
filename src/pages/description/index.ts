
import Page from '../../core/templates/page';
class DescriptionPage extends Page {


    constructor(id: string) {
        super(id);
    }
    createPage() {
        const main = document.createElement('main');
        



        return main;
    }
    render() {
        this.container.append(this.createPage());
        return this.container;
    }
}

export default DescriptionPage;
