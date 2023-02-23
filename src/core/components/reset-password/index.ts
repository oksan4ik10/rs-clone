import Component from '../../templates/components';
import Header from '../../components/header';
import { UsersAPI } from '../../../api/api';


class ResetPassword extends Component {
    form: HTMLFormElement;
    password: HTMLInputElement;
    error: HTMLElement;
    submit: HTMLButtonElement;
    cross: HTMLElement;
    token:string;
    checkPassword: boolean

    constructor(tagName: string, className: string, token:string) {
        super(tagName, className);
        this.form = document.createElement('form');
        this.password = document.createElement('input');
        this.error = document.createElement('div');
        this.submit = document.createElement('button');
        this.cross = document.createElement('div');
        this.token = token;
        this.checkPassword = false;
        Header.formActive = true;
    }

    renderRegistration() {
        
        this.form.className = ('reset__form');

        const title = document.createElement('div');
        title.textContent = 'Изменить пароль';
        title.classList.add('authorisation__title');

        this.cross.classList.add('authorisation__cross', 'cross');

        this.password.classList.add('input', 'input-authorisation');
        this.password.placeholder = 'Новый пароль';
        this.password.type = 'password';
        this.password.setAttribute('required', 'true');

        this.error.className = 'authorisation__error';

        this.submit.classList.add('button', 'authorisation__submit');
        this.submit.type = 'submit';
        this.submit.textContent = 'Сохранить';


        this.container.appendChild(this.form);
        this.form.appendChild(title);
        this.form.appendChild(this.cross);
        this.form.appendChild(this.password);
        this.form.appendChild(this.error);
        this.form.appendChild(this.submit);
    }
    checkNewPass(){
        if(this.password.value.length < 8){
            this.error.textContent = 'Недостаточно сложный пароль. Пожалуйста, введите пароль минимум 8 символов';
            return
        } else{
            this.error.textContent = '';
            this.checkPassword = true;
        }
    }

    render() {
        this.renderRegistration();

        this.cross.addEventListener('click', () => {
            Header.prototype.closeForm('reset');
            Header.formActive = false;
        })

        this.form.addEventListener('submit', async (event) => {
            event.preventDefault();
            this.checkNewPass();
            if(!this.checkPassword){
                this.password.addEventListener('blur',this.checkNewPass.bind(this));
                return;
            }
            const obj = {
                resetLink: this.token,
                newPass: this.password.value
            }
            const res = await UsersAPI.setNewPassword(obj);
            if(res.message){
                this.error.textContent = res.message;
                return
            } 
            this.form.textContent = '';
            const title = document.createElement('div');
            title.className = "title registration__title registration__success";
            title.textContent = 'Пароль изменен!';
            this.form.append(title);
            setTimeout(()=>{
                Header.prototype.closeForm('reset');
                Header.formActive = false; 
            }, 1000) 
            
           Header.prototype.openAuth('authorisation');
        
        })
        
        return this.container;
    }
}

export default ResetPassword;