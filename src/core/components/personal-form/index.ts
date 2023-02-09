import Component from '../../templates/components';
import Header from '../header';


class Personal extends Component {
    form: HTMLFormElement;
    submit: HTMLButtonElement;
    cross: HTMLElement;

    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.form = document.createElement('form');
        this.submit = document.createElement('button');
        this.cross = document.createElement('div');
    }

    renderRegistration() {
        this.form.classList.add('personal__form');

        const title = document.createElement('div');
        title.textContent = 'Редактировать профиль';
        title.classList.add('authorisation__title');

        this.cross.classList.add('personal__cross', 'cross');

        this.submit.classList.add('button', 'personal__submit');
        this.submit.type = 'submit';
        this.submit.textContent = 'Сохранить';

        this.container.appendChild(this.form);
        this.form.appendChild(title);
        this.form.appendChild(this.cross);
        this.form.appendChild(this.submit);
    }

    render() {
        this.renderRegistration();

        this.cross.addEventListener('click', () => {
            Header.prototype.closeForm('personal-form');
            Header.formActive = false;
        })

        this.form.addEventListener('submit', async (event) => {
                   
            Header.prototype.closeForm('personal-form');
            Header.formActive = false;
        })
        
        return this.container;
    }
}

export default Personal;