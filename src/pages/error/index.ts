import Page from '../../core/templates/page';

export const enum ErrorTypes {
    Error_404 = 404,
}

class ErrorPage extends Page {
    private errorType: ErrorTypes | string;

    static TextObject: { [prop: string]: string } = {
        '404': 'Error! The page was not found.',
    };
    

    constructor(id: string, errorType: ErrorTypes | string) {
        super(id);
        this.errorType = errorType;
    }
    createPage() {
        const section = document.createElement('section');




        
        return section;
    }

    render() {
        this.container.append(this.createPage());
        return this.container;
    }
}

export default ErrorPage;
