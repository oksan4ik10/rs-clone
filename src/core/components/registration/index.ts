import Component from '../../templates/components';
import { PageIds } from '../../../types';

class Registration extends Component {
    
    
    constructor(tagName: string, className: string) {
        super(tagName, className);

    }

    renderRegistration() {
       const form = document.createElement('form');
       form.classList.add('registration__form');

       this.container.appendChild(form);
    
    }

    render() {
        this.renderRegistration();

        return this.container;
    }
}

export default Registration;