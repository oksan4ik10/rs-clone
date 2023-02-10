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
    error: HTMLElement;

    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.form = document.createElement('form');
        this.submit = document.createElement('button');
        this.cross = document.createElement('div');
        this.input = document.createElement('input');
        this.avatar = document.createElement('img');
        this.name = document.createElement('input');
        this.error = document.createElement('span');
    }

    async renderEdit() {
        const token = localStorage.getItem('token');

        if(token) {
            const user = await UsersAPI.infoUser(token);

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

            this.error.className = 'personal__error';            

            this.submit.classList.add('button', 'personal__submit');
            this.submit.type = 'submit';
            this.submit.textContent = 'Сохранить';

        
            this.form.appendChild(title);
            this.form.appendChild(wrapperPersonalFile);
            this.form.appendChild(this.name);
            this.form.appendChild(this.error);
            this.form.appendChild(this.cross);
            this.form.appendChild(this.submit);
            this.container.appendChild(this.form);
        }
        
    }
    async openFile(e:Event){
        const target = e.currentTarget as HTMLInputElement ;
        const file = target.files;
        if(file){
            const formData = new FormData();
            formData.append("avatar",file[0], file[0].name);
     
            const token = localStorage.getItem('token');
            if(token) {
                const res = await UsersAPI.getAvatar(formData, token);
                this.avatar.src = res.img;
            }
        }

    }
    submitForm(e: Event){
        e.preventDefault();
        const form = new FormData(this.form);
        console.log(form);
        
        
                   
        Header.prototype.closeForm('personal-form');
        Header.formActive = false;
    }

    render() {
        this.renderEdit();
        this.input.addEventListener('change',this.openFile.bind(this));

        this.cross.addEventListener('click', () => {
            Header.prototype.closeForm('personal-form');
            Header.formActive = false;
        })

        this.form.addEventListener('submit', this.submitForm.bind(this));
        
        return this.container;
    }
}

export default Personal;