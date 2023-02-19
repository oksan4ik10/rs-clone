import Component from '../../templates/components';
import Header from '../../components/header';
import { UsersAPI } from '../../../api/api';


class Restore extends Component {
    form: HTMLFormElement;
    email: HTMLInputElement;
    error: HTMLElement;
    submit: HTMLButtonElement;
    cross: HTMLElement;

    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.form = document.createElement('form');
        this.email = document.createElement('input');
        this.error = document.createElement('div');
        this.submit = document.createElement('button');
        this.cross = document.createElement('div');
    }

    renderRestore() {
        this.form.classList.add('restore__form');

        const title = document.createElement('div');
        title.textContent = 'Восстановление пароля';
        title.classList.add('restore__title');

        this.cross.classList.add('restore__cross', 'cross');

        this.email.classList.add('restore__email', 'input', 'input-authorisation');
        this.email.placeholder = 'E-mail адрес';
        this.email.type = 'email';
        this.email.setAttribute('required', 'true');

        this.error.className = 'restore__error';

        this.submit.classList.add('button', 'restore__submit');
        this.submit.type = 'submit';
        this.submit.textContent = 'Восстановить';

        this.container.appendChild(this.form);
        this.form.appendChild(title);
        this.form.appendChild(this.cross);
        this.form.appendChild(this.email);
        this.form.appendChild(this.error);
        this.form.append(this.submit);
    }

    render() {
        this.renderRestore();

        this.cross.addEventListener('click', () => {
            Header.prototype.closeForm('restore');
            Header.formActive = false;
        })

        this.form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const obj = {
                email: this.email.value,
            }
            const res = await UsersAPI.resetPassword(obj);
            if(res.message === "Пользователь с таким email не найден"){
                this.error.textContent = "Пользователь с таким e-mail не найден";
                return
            }                  
            
            this.form.textContent = '';
            const title = document.createElement('div');
            title.className = "title restore__title restore__success";
            title.textContent = 'Письмо об изменении пароля отправлено Вам на e-mail';
            this.form.append(title);
            setTimeout(()=>{
                Header.prototype.closeForm('restore');
                Header.formActive = false; 
            }, 3000)
        
        })
        
        return this.container;
    }
}

export default Restore;