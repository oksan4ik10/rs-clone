import Component from '../../templates/components';
import Header from '../../components/header';
import { BooksAPI } from '../../../api/api';


class Authorization extends Component {
    form: HTMLFormElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
    error: HTMLElement;
    submit: HTMLButtonElement;
    cross: HTMLElement;

    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.form = document.createElement('form');
        this.email = document.createElement('input');
        this.password = document.createElement('input');
        this.error = document.createElement('div');
        this.submit = document.createElement('button');
        this.cross = document.createElement('div');
    }

    renderRegistration() {
        this.form.classList.add('authorisation__form');

        const title = document.createElement('div');
        title.textContent = 'Авторизация';
        title.classList.add('authorisation__title');

        this.cross.classList.add('authorisation__cross', 'cross');

        this.email.classList.add('authorisation__email', 'input', 'input-authorisation');
        this.email.placeholder = 'E-mail адрес';
        this.email.type = 'email';
        this.email.setAttribute('required', 'true');

        this.password.classList.add('authorisation__password', 'input', 'authorisation-registration');
        this.password.placeholder = 'Пароль';
        this.password.type = 'password';
        this.password.setAttribute('required', 'true');

        this.error.className = 'authorisation__error';

        this.submit.classList.add('button', 'authorisation__submit');
        this.submit.type = 'submit';
        this.submit.textContent = 'Войти';

        this.container.appendChild(this.form);
        this.form.appendChild(title);
        this.form.appendChild(this.cross);
        this.form.appendChild(this.email);
        this.form.appendChild(this.password);
        this.form.appendChild(this.error);
        this.form.appendChild(this.submit);
    }

    render() {
        this.renderRegistration();

        this.cross.addEventListener('click', () => {
            Header.prototype.closeForm('authorisation');
            Header.formActive = false;
        })

        this.form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const obj = {
                email: this.email.value,
                password: this.password.value
            }
            const res = await BooksAPI.authUser(obj);
            if(res.message){
                this.error.textContent = res.message;
                return
            }                  
            Header.prototype.closeForm('authorisation');
            Header.formActive = false;
        })
        
        return this.container;
    }
}

export default Authorization;