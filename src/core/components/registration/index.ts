import Component from '../../templates/components';


class Registration extends Component {
    
    constructor(tagName: string, className: string) {
        super(tagName, className);

    }

    renderRegistration() {
       const form = document.createElement('form');
       form.classList.add('registration__form');

       const title = document.createElement('div');
       title.textContent = 'Зарегистрируйтесь, и вы сможете:';
       title.classList.add('registration__title');

       this.container.appendChild(form);
       form.appendChild(title);
    }

    render() {
        this.renderRegistration();

        return this.container;
    }
}

export default Registration;