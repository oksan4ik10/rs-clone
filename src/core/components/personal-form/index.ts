import Component from '../../templates/components';
import Header from '../header';
import { UsersAPI } from '../../../api/api';


class Personal extends Component {
    form: HTMLFormElement;
    submit: HTMLButtonElement;
    cross: HTMLElement;
    input: HTMLInputElement;
    avatar: HTMLImageElement;
    name: HTMLInputElement;

    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.form = document.createElement('form');
        this.submit = document.createElement('button');
        this.cross = document.createElement('div');
        this.input = document.createElement('input');
        this.avatar = document.createElement('img');
        this.name = document.createElement('input');
    }

    async renderEdit() {
        const token = localStorage.getItem('token');

        if(token) {
            const user = await UsersAPI.infoUser(token);
            console.log(user);
            
   
            this.form.classList.add('personal__form');

            const title = document.createElement('div');
            title.textContent = 'Редактировать профиль';
            title.classList.add('authorisation__title');

            this.cross.classList.add('personal__cross', 'cross');


            const wrapperPersonalFile = document.createElement('div');
            wrapperPersonalFile.className = 'personal__wrapper-file';
            const label = document.createElement('label');
            label.className = 'personal__file';
            this.input.className = 'personal__input';
            this.input.type = 'file';
            this.input.name = 'file';
            const span = document.createElement('span');
            span.textContent = 'Выберите файл';
            span.className ='personal__file-btn';
            label.append(this.input);
            label.append(span);

            this.avatar.className = 'personal__avatar';
            this.avatar.src = user.img;
            
            wrapperPersonalFile.append(this.avatar);
            wrapperPersonalFile.append(label);

            this.name.className = 'personal__name';
            this.name.value = user.name;

            this.submit.classList.add('button', 'personal__submit');
            this.submit.type = 'submit';
            this.submit.textContent = 'Сохранить';

        
            this.form.appendChild(title);
            this.form.appendChild(wrapperPersonalFile);
            this.form.appendChild(this.name);
            this.form.appendChild(this.cross);
            this.form.appendChild(this.submit);
            this.container.appendChild(this.form);
    }
        
    }

    render() {
        this.renderEdit();

        this.cross.addEventListener('click', () => {
            Header.prototype.closeForm('personal-form');
            Header.formActive = false;
        })

        this.form.addEventListener('submit', async (event) => {
            event.preventDefault();
                   
            Header.prototype.closeForm('personal-form');
            Header.formActive = false;
        })
        
        return this.container;
    }
}

export default Personal;