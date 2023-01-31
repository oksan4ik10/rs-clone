import Page from "../../core/templates/page";
class Sign extends Page {

    constructor(id: string) {
        super(id);
    }

    createMainPage() {
        const section = document.createElement('section');
        


        return section;
    }

    render() {
        this.container.append(this.createMainPage());
        return this.container;
    }
}

export default Sign;
