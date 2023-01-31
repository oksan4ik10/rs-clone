import Page from "../../core/templates/page";
class MainPage extends Page {

    constructor(id: string) {
        super(id);
    }

    createMainPage() {
        const main = document.createElement('main');
        


        return main;
    }

    render() {
        this.container.append(this.createMainPage());
        return this.container;
    }
}

export default MainPage;
