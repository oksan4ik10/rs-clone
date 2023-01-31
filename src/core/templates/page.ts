abstract class Page {
    protected container: HTMLElement;
    static TextObject = {};

    constructor(id: string) {
        this.container = document.createElement('div');
        this.container.id = id;
    }

    render() {
        return this.container;
    }
}

export default Page;
