export default class LoadMoreButton {
    constructor({ selector }) {
        this.refs = this.getRefs(selector);
    }
     getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.label = refs.button.querySelector('.label');
        return refs;
    }
    hide() {
        this.refs.button.classList.add('is-hidden');
        
    }
    show() {
        this.refs.button.classList.remove('is-hidden');
    }
    enableBtn() {
        this.refs.button.disabled = false;
        
    }
    disableBtn() {
        this.refs.button.disabled = true;
        
    }
}
    

