import Component from '../../templates/components';
import Header from '../../components/header';
import { UsersAPI } from '../../../api/api';


class Registration extends Component {
    cross: HTMLElement;
    name: HTMLInputElement;
    errorName: HTMLElement;
    email: HTMLInputElement;
    errorEmail: HTMLElement;
    password: HTMLInputElement;
    passwordRepeat: HTMLInputElement;
    errorPassword: HTMLElement;
    nameCheck: boolean;
    emailCheck: boolean;
    passwordCheck: boolean;
    submit: HTMLButtonElement;
    form: HTMLFormElement;
    
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.form = document.createElement('form');
        this.cross = document.createElement('div');
        this.name = document.createElement('input');
        this.errorName = document.createElement('div');
        this.email = document.createElement('input');
        this.errorEmail = document.createElement('div');
        this.password = document.createElement('input');
        this.passwordRepeat = document.createElement('input');
        this.errorPassword = document.createElement('div');
        this.submit = document.createElement('button');
        this.nameCheck = true;
        this.emailCheck = true;
        this.passwordCheck = true;
    }

    
    renderRegistration() {
        this.form.classList.add('registration__form');

        const title = document.createElement('div');
        title.textContent = 'Регистрация';
        title.classList.add('registration__title');

        this.cross.classList.add('registration__cross', 'cross');

        this.name.classList.add('registration__name', 'input', 'input-registration');
        this.name.placeholder = 'Имя';
        this.name.type = 'text';
        this.name.setAttribute('required', 'true');
        this.name.pattern = '[А-Яа-яЁёa-zA-Z0-9-_\.]*';
        this.errorName.className = 'registration__error';

        this.email.classList.add('registration__email', 'input', 'input-registration');
        this.email.placeholder = 'E-mail адрес';
        this.email.type = 'email';
        this.email.setAttribute('required', 'true');
        this.errorEmail.className = 'registration__error';

        this.password.classList.add('registration__password', 'input', 'input-registration');
        this.password.placeholder = 'Пароль';
        this.password.type = 'password';
        this.password.setAttribute('required', 'true');

        this.passwordRepeat.classList.add('registration__password', 'input', 'input-registration');
        this.passwordRepeat.placeholder = 'Повторите пароль';
        this.passwordRepeat.type = 'password';
        this.passwordRepeat.setAttribute('required', 'true');

        this.errorPassword.className = 'registration__error';

        this.submit.classList.add('button', 'registration__submit');
        this.submit.type = 'submit';
        this.submit.textContent = 'Регистрация';

        this.container.appendChild(this.form);
        this.form.appendChild(title);
        this.form.appendChild(this.cross);
        this.form.appendChild(this.email);
        this.form.appendChild(this.errorEmail);
        this.form.appendChild(this.name);
        this.form.appendChild(this.errorName);
        this.form.appendChild(this.password);
        this.form.appendChild(this.passwordRepeat);
        this.form.appendChild(this.errorPassword);
        this.form.appendChild(this.submit);
    }

    render() {
        this.renderRegistration();

        this.cross.addEventListener('click', () => {
            Header.prototype.closeForm('registration');
            Header.formActive = false;
        })

        this.name.addEventListener('blur', () => {
            this.name.classList.remove('input-valid');
            if (this.name.value.length > 0) {
                if (!this.name.checkValidity()) {
                    this.nameCheck = false;
                    this.name.classList.add('input-invalid');
                    this.name.classList.remove('input-valid');
                    this.errorName.textContent = `Убедитесь, что значение состоит из букв, цифр, символoв тире, подчеркивания и точки`;
                } else if (this.name.value.length < 3) {    
                    this.nameCheck = false;
                    this.name.classList.add('input-invalid');
                    this.name.classList.remove('input-valid');
                    this.errorName.textContent = `Убедитесь, что это значение содержит не менее 3 символов (сейчас ${this.name.value.length}).`
                } else if (this.name.value.length > 30) {
                    this.nameCheck = false;
                    this.name.classList.add('input-invalid');
                    this.name.classList.remove('input-valid');
                    this.errorName.textContent = `Убедитесь, что это значение содержит не более 30 символов (сейчас ${this.name.value.length}).`
                } else {
                    this.nameCheck = true;
                    this.name.classList.remove('input-invalid');
                    this.name.classList.add('input-valid');
                    this.errorName.textContent = '';
                }
            }
        })

        this.email.addEventListener('blur', () => {
            this.email.classList.remove('input-valid');
            if (this.email.value.length > 0) {
                if (!this.email.checkValidity()) {
                    this.emailCheck = false;
                    this.email.classList.add('input-invalid');
                    this.email.classList.remove('input-valid');
                    this.errorEmail.textContent = `Пожалуйста, введите корректный e-mail`;
                } else {
                    this.emailCheck = true;
                    this.email.classList.remove('input-invalid');
                    this.email.classList.add('input-valid');
                    this.errorEmail.textContent = '';
                }
            }
        })

        this.password.addEventListener('blur', () => {
            this.password.classList.remove('input-valid');
            if (this.password.value.length > 0) {
                if (this.password.value.length < 8) {
                    this.passwordCheck = false;
                    this.password.classList.add('input-invalid');
                    this.password.classList.remove('input-valid');
                    this.errorPassword.textContent = 'Недостаточно сложный пароль. Пожалуйста, введите пароль минимум 8 символов';
                } else {
                    this.passwordCheck = true;
                    this.password.classList.remove('input-invalid');
                    this.password.classList.add('input-valid');
                    this.errorPassword.textContent = '';

                    this.form.addEventListener('submit', async (event) => {
                        event.preventDefault();
                        if (this.password.value !== this.passwordRepeat.value) {
                            this.passwordCheck = false;
                            this.passwordRepeat.classList.add('input-invalid');
                            this.passwordRepeat.classList.remove('input-valid');
                            this.errorPassword.textContent = 'Пожалуйста, повторите пароль';
                        } else {
                            this.passwordCheck = true;
                            this.passwordRepeat.classList.remove('input-invalid');
                            this.passwordRepeat.classList.add('input-valid');
                            this.errorPassword.textContent = '';

                            const user = {
                                name: this.name.value,
                                email: this.email.value,
                                password: this.password.value
                            }
                           
                            const res = await UsersAPI.createUser(user);
                            if(res.message) {
                                this.emailCheck = false;
                                this.email.classList.add('input-invalid');
                                this.email.classList.remove('input-valid');
                                this.errorEmail.textContent = res.message;
                                return
                            }           
            
                            this.form.textContent = '';
                            const title = document.createElement('div');
                            title.className = "title registration__title registration__success";
                            title.textContent = 'Регистрация прошла успешно!';
                            this.form.append(title);
                            setTimeout(()=>{
                                Header.prototype.closeForm('registration');
                                Header.formActive = false; 
                            }, 1000)
                        }
                    })
                }
            }
        })

        return this.container;
    }
}

export default Registration;