import Component from '../../templates/components';
import Header from '../../components/header';


class Registration extends Component {
    cross: HTMLElement;
    name: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
    passwordRepeat: HTMLInputElement;
    nameCheck: boolean;
    emailCheck: boolean;
    passwordCheck: boolean;
    submit: HTMLButtonElement;
    
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.cross = document.createElement('div');
        this.name = document.createElement('input');
        this.email = document.createElement('input');
        this.password = document.createElement('input');
        this.passwordRepeat = document.createElement('input');
        this.submit = document.createElement('button');
        this.nameCheck = true;
        this.emailCheck = true;
        this.passwordCheck = true;
    }

    renderRegistration() {
        const form = document.createElement('form');
        form.classList.add('registration__form');

        const title = document.createElement('div');
        title.textContent = 'Регистрация';
        title.classList.add('registration__title');

        this.cross.classList.add('registration__cross');

        this.name.classList.add('registration__name', 'input');
        this.name.placeholder = 'Логин';
        this.name.type = 'text';
        const divName = document.createElement('div');
        divName.className = 'registration__error';

        this.email.classList.add('registration__email', 'input');
        this.email.placeholder = 'E-mail адрес';
        this.email.type = 'email';
        const divEmail = document.createElement('div');
        divEmail.className = 'registration__error';

        this.password.classList.add('registration__password', 'input');
        this.password.placeholder = 'Пароль';
        this.password.type = 'password';

        this.passwordRepeat.classList.add('registration__password', 'input');
        this.passwordRepeat.placeholder = 'Повторите пароль';
        this.passwordRepeat.type = 'password';

        const divPassword = document.createElement('div');
        divPassword.className = 'registration__error';

        this.submit.classList.add('button', 'registration__submit');
        this.submit.type = 'submit';
        this.submit.textContent = 'Регистрация';

        this.container.appendChild(form);
        form.appendChild(title);
        form.appendChild(this.cross);
        form.appendChild(this.email);
        form.appendChild(divEmail);
        form.appendChild(this.name);
        form.appendChild(divName);
        form.appendChild(this.password);
        form.appendChild(this.passwordRepeat);
        form.appendChild(divPassword);
        form.appendChild(this.submit);
    }

    render() {
        this.renderRegistration();

        this.cross.addEventListener('click', () => {
            Header.prototype.closeForm('registration');
            Header.formActive = false;
        })

        return this.container;
    }
}

export default Registration;