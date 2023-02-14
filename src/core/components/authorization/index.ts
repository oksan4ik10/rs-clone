import Component from '../../templates/components';
import Header from '../../components/header';
import { UsersAPI } from '../../../api/api';
import RandomPage from '../../../pages/random-book/random';
import DescriptionPage from '../../../pages/description';


class Authorization extends Component {
    form: HTMLFormElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
    error: HTMLElement;
    submit: HTMLButtonElement;
    button: HTMLElement;
    cross: HTMLElement;

    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.form = document.createElement('form');
        this.email = document.createElement('input');
        this.password = document.createElement('input');
        this.error = document.createElement('div');
        this.submit = document.createElement('button');
        this.cross = document.createElement('div');
        this.button = document.createElement('div');
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

        this.password.classList.add('authorisation__password', 'input', 'authorisation-registration', 'input-authorisation');
        this.password.placeholder = 'Пароль';
        this.password.type = 'password';
        this.password.setAttribute('required', 'true');

        this.error.className = 'authorisation__error';

        this.submit.classList.add('button', 'authorisation__submit');
        this.submit.type = 'submit';
        this.submit.textContent = 'Войти';

        const title2 = document.createElement('div');

        title2.textContent = 'Еще не зарегистрированы?';
        title2.classList.add('authorisation__subtitle');

        this.button.classList.add('button', 'authorisation__submit');
        this.button.textContent = 'Регистрация';

        this.container.appendChild(this.form);
        this.form.appendChild(title);
        this.form.appendChild(this.cross);
        this.form.appendChild(this.email);
        this.form.appendChild(this.password);
        this.form.appendChild(this.error);
        this.form.appendChild(this.submit);
        this.form.appendChild(title2);
        this.form.appendChild(this.button);
    }

    render() {
        this.renderRegistration();

        this.cross.addEventListener('click', () => {
            Header.prototype.closeForm('authorisation');
            Header.formActive = false;
        })

        this.button.addEventListener('click', () => {
            Header.prototype.closeForm('authorisation');
            Header.formActive = false;
            Header.prototype.openRegistr('registration');
        })

        this.form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const obj = {
                email: this.email.value,
                password: this.password.value
            }
            const res = await UsersAPI.authUser(obj);
            if(res.message){
                this.error.textContent = res.message;
                return
            }                  
            
            localStorage.setItem("token", res.token);
                   
            Header.prototype.closeForm('authorisation');
            Header.formActive = false;
            Header.renderPersonalCabinet(res.token);

            // перезагрузка страницы при логине, когда юзер на странице описания книги
            if (window.location.hash.slice(1, 5).includes('id=')){
                const currentBookId = window.location.hash.split('=')[1]
                window.location.hash = '';
                window.location.hash = `id=${currentBookId}`;
            }

            if (window.location.hash.includes('random')){
                console.log('includes random')
                window.location.hash = '';
                window.location.hash = 'random';
            }
        
        })
        
        return this.container;
    }
}

export default Authorization;